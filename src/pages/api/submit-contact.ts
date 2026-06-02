
import axios from "axios";

const APPID = process.env.LARK_APP_ID || "";
const APPSECRET = process.env.LARK_APP_SECRET || "";
const FILE_TOKEN = process.env.LARK_CONTACT_FILE_TOKEN || "";

function makeAccessToken() {
  let _accessToken = "";
  return {
    set(token: string) {
      _accessToken = token;
    },
    get() {
      return _accessToken;
    },
  };
}

const accessToken = makeAccessToken();

const httpClient = axios.create({
  baseURL: "https://open.larksuite.com/open-apis",
});

httpClient.interceptors.request.use((config) => {
  const token = accessToken.get();
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

httpClient.interceptors.response.use((response) => {
  if (response.status !== 200) {
    throw new Error(`Request failed with status code ${response.status}`);
  }
  if (response.data.code !== 0) {
    throw new Error(`Request failed with status code ${response.data.msg}`);
  }
  return response;
});

function getExcelColumnName(columnIndex: number) {
  columnIndex -= 1;
  let columnName = "";
  while (columnIndex >= 0) {
    const remainder = columnIndex % 26;
    columnName = String.fromCharCode(65 + remainder) + columnName;
    columnIndex = Math.floor(columnIndex / 26) - 1;
  }
  return columnName;
}

async function getTenantAccessToken() {
  const res = await httpClient.post("/auth/v3/tenant_access_token/internal", { app_id: APPID, app_secret: APPSECRET });
  return res.data.tenant_access_token;
}

async function querySheet(fileToken: string) {
  try {
    const res = await httpClient.get(`/sheets/v3/spreadsheets/${fileToken}/sheets/query`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
}

function makeRange(sheetId: string, startColumnId: number, endColumnId: number, startRowId: number, endRowId: number) {
  return `${sheetId}!${getExcelColumnName(startColumnId)}${startRowId}:${getExcelColumnName(endColumnId)}${endRowId}`;
}

async function getSheetRange(fileToken: string, range: string) {
  const res = await httpClient.get(`/sheets/v2/spreadsheets/${fileToken}/values/${range}?valueRenderOption=ToString`);
  return res.data.data.valueRange.values;
}

async function addSheetRow(fileToken: string, fileSheetId: string, rowIndex: number, row: string[]) {
  try {
    const res = await httpClient.post(`/sheets/v2/spreadsheets/${fileToken}/values_append`, {
      valueRange: {
        range: `${fileSheetId}!A${rowIndex}:G${rowIndex}`,
        values: [row],
      },
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
}

export const POST = async ({ request }: { request: Request }) => {
  const data = await request.json();
  const {
    name,
    companyName,
    business_sectors,
    preferred_contact,
    contact_info_telegram,
    contact_info_phone,
    contact_info_email,
    message,
  } = data;

  const token = await getTenantAccessToken();
  accessToken.set(token);
  const book = await querySheet(FILE_TOKEN);
  const sheetMeta = book.data.sheets[0];
  const sheetId = sheetMeta.sheet_id;
  const columnCount = sheetMeta.grid_properties.column_count;
  const rowCount = sheetMeta.grid_properties.row_count;
  // 时间转成UTC8时间
  const time = new Date().toLocaleString("en-US", { timeZone: "Asia/Shanghai" });
  const company_name = companyName || "";
  const contact_type = preferred_contact;
  const contact_text = contact_info_telegram || contact_info_phone || contact_info_email;
  const row = [time, name, company_name, business_sectors, contact_type, contact_text, message];
  const rowsData = await getSheetRange(FILE_TOKEN, makeRange(sheetId, 1, columnCount, 3, rowCount));
  const existRow = rowsData.filter((row: string[]) => row.filter((cell: string) => cell).length > 0);
  const rowIndex = existRow.length + 3;
  try {
    await addSheetRow(FILE_TOKEN, sheetId, rowIndex, row);
    return new Response(
      JSON.stringify({
        name,
        companyName,
        business_sectors,
        preferred_contact,
        message,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify({ message: "提交失败" }), { status: 500 });
  }
};

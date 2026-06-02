const axios = require("axios");
const dotenv = require("dotenv");
const fs = require("fs");
const path = require("path");

dotenv.config();
dotenv.config({ path: ".env.production", override: true });
dotenv.config({ path: ".env.local", override: true });

function getRequiredEnv(name) {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

const APPID = getRequiredEnv("LARK_APP_ID");
const APPSECRET = getRequiredEnv("LARK_APP_SECRET");
const FILE_TOKEN = getRequiredEnv("LARK_CONFIG_FILE_TOKEN");

function makeAccessToken() {
  let _accessToken = "";
  return {
    set(token) {
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
  return response.data;
});

async function getTenantAccessToken() {
  const res = await httpClient.post("/auth/v3/tenant_access_token/internal", { app_id: APPID, app_secret: APPSECRET });
  return res.tenant_access_token;
}

async function querySheet(fileToken) {
  try {
    const res = await httpClient.get(`/sheets/v3/spreadsheets/${fileToken}/sheets/query`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
}

function getExcelColumnName(columnIndex) {
  columnIndex -= 1;
  let columnName = "";
  while (columnIndex >= 0) {
    const remainder = columnIndex % 26;
    columnName = String.fromCharCode(65 + remainder) + columnName;
    columnIndex = Math.floor(columnIndex / 26) - 1;
  }
  return columnName;
}

function makeRange(sheetId, startColumnId, endColumnId, startRowId, endRowId) {
  return `${sheetId}!${getExcelColumnName(startColumnId)}${startRowId}:${getExcelColumnName(endColumnId)}${endRowId}`;
}

async function getSheetRange(fileToken, range) {
  const res = await httpClient.get(`/sheets/v2/spreadsheets/${fileToken}/values/${range}?valueRenderOption=ToString`);
  return res.data.valueRange.values;
}

(async () => {
  const token = await getTenantAccessToken();
  accessToken.set(token);
  const book = await querySheet(FILE_TOKEN);
  const sheetMeta = book.sheets[5];
  const sheetId = sheetMeta.sheet_id;
  const columnCount = sheetMeta.grid_properties.column_count;
  const rowCount = sheetMeta.grid_properties.row_count;
  const dataHeader = await getSheetRange(FILE_TOKEN, makeRange(sheetId, 1, columnCount, 1, 1));
  const rowsData = await getSheetRange(FILE_TOKEN, makeRange(sheetId, 1, columnCount, 3, rowCount));
  const rowsDataAvailable = rowsData.filter((row) => !row.every((cell) => cell === null) && row[0] === "是");
  const objectArray = rowsDataAvailable.map((row) => {
    const obj = {};
    dataHeader[0].forEach((key, index) => {
      const originValue = row[index];
      let value = originValue;
      if (key === "card" && originValue) {
        console.log("originValue", originValue);
      }
      value = String(originValue);
      if (key !== "is_export" && key) {
        obj[key] = value;
      }
    });
    return obj;
  });
  const currency = JSON.stringify(objectArray);
  fs.writeFileSync(path.resolve(__dirname, "../src/contents/currency.json"), currency);
})();

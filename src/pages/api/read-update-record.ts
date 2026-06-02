import axios from "axios";

// 简化的响应函数，因为 Vercel 已经处理了 CORS
function createResponse(data: any, status: number = 200) {
  const timestamp = new Date().toISOString();
  const randomId = Math.random().toString(36).substring(2, 15);

  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-cache, no-store, must-revalidate, private, max-age=0",
      Pragma: "no-cache",
      Expires: "0",
      "Last-Modified": new Date().toUTCString(),
      ETag: `"${randomId}-${Date.now()}"`,
      "X-Timestamp": timestamp,
      Vary: "Accept-Encoding, Authorization",
    },
  });
}

// 处理 OPTIONS 预检请求
function handleOptionsRequest() {
  const timestamp = new Date().toISOString();
  const randomId = Math.random().toString(36).substring(2, 15);

  return new Response(null, {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-cache, no-store, must-revalidate, private, max-age=0",
      Pragma: "no-cache",
      Expires: "0",
      "Last-Modified": new Date().toUTCString(),
      ETag: `"${randomId}-${Date.now()}"`,
      "X-Timestamp": timestamp,
      Vary: "Accept-Encoding, Authorization",
    },
  });
}

const APPID = process.env.LARK_APP_ID || "";
const APPSECRET = process.env.LARK_APP_SECRET || "";
// 更新记录表的 FILE_TOKEN
const UPDATE_RECORD_FILE_TOKEN = process.env.LARK_UPDATE_RECORD_FILE_TOKEN || "";
// 游戏数据表的 FILE_TOKEN（与 sync-games.cjs 保持一致）
const GAMES_FILE_TOKEN = process.env.LARK_CONFIG_FILE_TOKEN || "";

// GitHub 配置
const GITHUB_TOKEN = process.env.GITHUB_TOKEN || "";
const GITHUB_USERNAME = process.env.GITHUB_USERNAME || "Design@gaming-panda.com";
// 根据环境选择不同的仓库
const TEST_REPO = process.env.GITHUB_TEST_REPO || "kun-g/gmp_office";
const PROD_REPO = process.env.GITHUB_PROD_REPO || "kun-g/gmp_office";
const GITHUB_API_BASE = "https://api.github.com";
// Vercel 部署 webhook
const VERCEL_DEPLOY_HOOK = process.env.VERCEL_DEPLOY_HOOK || "";

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
    throw error;
  }
}

function makeRange(sheetId: string, startColumnId: number, endColumnId: number, startRowId: number, endRowId: number) {
  return `${sheetId}!${getExcelColumnName(startColumnId)}${startRowId}:${getExcelColumnName(endColumnId)}${endRowId}`;
}

async function getSheetRange(fileToken: string, range: string) {
  const res = await httpClient.get(`/sheets/v2/spreadsheets/${fileToken}/values/${range}?valueRenderOption=ToString`);
  return res.data.data.valueRange.values;
}

async function addRowToSheet(fileToken: string, sheetId: string, values: string[][]) {
  const res = await httpClient.post(`/sheets/v2/spreadsheets/${fileToken}/values_append`, {
    valueRange: {
      range: `${sheetId}!A:Z`,
      values: values,
    },
  });
  return res.data;
}

// 直接在 API 中实现同步逻辑，避免外部脚本调用问题
async function syncGamesData() {
  try {
    console.log("开始同步游戏数据...");

    // 获取访问令牌
    console.log("正在获取访问令牌...");
    const token = await getTenantAccessToken();
    accessToken.set(token);
    console.log("访问令牌获取成功");

    // 查询表格信息
    console.log("正在查询表格信息...");
    const book = await querySheet(GAMES_FILE_TOKEN);
    const sheetMeta = book.data.sheets[0];
    const sheetId = sheetMeta.sheet_id;
    const columnCount = sheetMeta.grid_properties.column_count;
    const rowCount = sheetMeta.grid_properties.row_count;
    console.log(`表格信息: sheetId=${sheetId}, 列数=${columnCount}, 行数=${rowCount}`);

    // 获取表头数据（第1行）
    console.log("正在获取表头数据...");
    const dataHeader = await getSheetRange(GAMES_FILE_TOKEN, makeRange(sheetId, 1, columnCount, 1, 1));
    console.log(`表头数据获取成功，共 ${dataHeader[0].length} 列`);

    // 获取所有数据行（从第3行开始，跳过表头和空行）
    console.log("正在获取数据行...");
    const rowsData = await getSheetRange(GAMES_FILE_TOKEN, makeRange(sheetId, 1, columnCount, 3, rowCount));
    console.log(`数据行获取成功，共 ${rowsData.length} 行`);

    // 过滤可用的行数据（第一列为"是"的行）
    const rowsDataAvailable = rowsData.filter(
      (row: any[]) => !row.every((cell) => cell === null || cell === "") && row[0] === "是"
    );
    console.log(`过滤后可用数据行: ${rowsDataAvailable.length} 行`);

    // 转换为对象数组
    console.log("正在转换数据格式...");
    const objectArray = rowsDataAvailable.map((row: any[]) => {
      const obj: any = {};
      dataHeader[0].forEach((key: string, index: number) => {
        const originValue = row[index];
        let value = originValue;

        // 数据类型处理
        switch (key) {
          case "id":
            value = String(originValue || "");
            break;
          case "features":
            value = originValue ? String(originValue).split(",") : [];
            break;
          default:
            value = originValue || "";
            break;
        }

        // 排除 is_export 字段
        if (key !== "is_export") {
          obj[key] = value;
        }
      });
      return obj;
    });

    // 在 Vercel serverless 环境中，不能写入本地文件
    // 直接返回 JSON 内容，由调用方处理
    console.log("正在生成 JSON 内容...");
    const gamesContent = JSON.stringify(objectArray, null, 2);

    console.log(`✅ 同步完成，共处理 ${objectArray.length} 个游戏数据`);
    return {
      success: true,
      count: objectArray.length,
      content: gamesContent,
      metadata: {
        sheetId,
        columnCount,
        rowCount,
        totalRows: rowsData.length,
        validRows: rowsDataAvailable.length,
        processedAt: new Date().toISOString(),
      },
    };
  } catch (error) {
    console.error("❌ 同步游戏数据失败:", error);

    // 提供更详细的错误信息
    let errorMessage = "未知错误";
    if (error instanceof Error) {
      errorMessage = error.message;
      // 如果是网络错误，提供更友好的提示
      if (errorMessage.includes("ENOTFOUND") || errorMessage.includes("timeout")) {
        errorMessage = "网络连接失败，请检查网络状态";
      } else if (errorMessage.includes("401") || errorMessage.includes("403")) {
        errorMessage = "认证失败，请检查 API 密钥配置";
      } else if (errorMessage.includes("404")) {
        errorMessage = "表格文件未找到，请检查表格文件配置";
      }
    }

    throw new Error(`同步游戏数据失败: ${errorMessage}`);
  }
}

// 同步语言数据 (sheets[4])
async function syncLanguageData() {
  try {
    console.log("开始同步语言数据...");

    const token = await getTenantAccessToken();
    accessToken.set(token);

    const book = await querySheet(GAMES_FILE_TOKEN);
    console.log("表格总 sheet 数量:", book.data.sheets.length);
    
    if (!book.data.sheets[4]) {
      throw new Error("sheets[4] 不存在，请检查表格配置");
    }
    
    const sheetMeta = book.data.sheets[4]; // 语言数据在 sheets[4]
    const sheetId = sheetMeta.sheet_id;
    const columnCount = sheetMeta.grid_properties.column_count;
    const rowCount = sheetMeta.grid_properties.row_count;

    const dataHeader = await getSheetRange(GAMES_FILE_TOKEN, makeRange(sheetId, 1, columnCount, 1, 1));
    const rowsData = await getSheetRange(GAMES_FILE_TOKEN, makeRange(sheetId, 1, columnCount, 3, rowCount));
    
    const rowsDataAvailable = rowsData.filter(
      (row: any[]) => !row.every((cell) => cell === null || cell === "") && row[0] === "是"
    );

    const objectArray = rowsDataAvailable.map((row: any[]) => {
      const obj: any = {};
      dataHeader[0].forEach((key: string, index: number) => {
        const originValue = row[index];
        let value = originValue;
        
        switch (key) {
          case "id":
            value = String(originValue || "");
            break;
          default:
            value = String(originValue || "");
            break;
        }
        
        if (key !== "is_export" && key) {
          obj[key] = value;
        }
      });
      return obj;
    });

    const languageContent = JSON.stringify(objectArray, null, 2);
    console.log(`✅ 语言数据同步完成，共处理 ${objectArray.length} 条数据`);

    return {
      success: true,
      count: objectArray.length,
      content: languageContent,
    };
  } catch (error) {
    console.error("❌ 同步语言数据失败:", error);
    throw new Error(`同步语言数据失败: ${error instanceof Error ? error.message : "未知错误"}`);
  }
}

// 同步货币数据 (sheets[5])
async function syncCurrencyData() {
  try {
    console.log("开始同步货币数据...");

    const token = await getTenantAccessToken();
    accessToken.set(token);

    const book = await querySheet(GAMES_FILE_TOKEN);
    console.log("表格总 sheet 数量:", book.data.sheets.length);
    
    if (!book.data.sheets[5]) {
      throw new Error("sheets[5] 不存在，请检查表格配置");
    }
    
    const sheetMeta = book.data.sheets[5]; // 货币数据在 sheets[5]
    const sheetId = sheetMeta.sheet_id;
    const columnCount = sheetMeta.grid_properties.column_count;
    const rowCount = sheetMeta.grid_properties.row_count;

    const dataHeader = await getSheetRange(GAMES_FILE_TOKEN, makeRange(sheetId, 1, columnCount, 1, 1));
    const rowsData = await getSheetRange(GAMES_FILE_TOKEN, makeRange(sheetId, 1, columnCount, 3, rowCount));
    
    const rowsDataAvailable = rowsData.filter(
      (row: any[]) => !row.every((cell) => cell === null || cell === "") && row[0] === "是"
    );

    const objectArray = rowsDataAvailable.map((row: any[]) => {
      const obj: any = {};
      dataHeader[0].forEach((key: string, index: number) => {
        const originValue = row[index];
        const value = String(originValue || "");
        
        if (key !== "is_export" && key) {
          obj[key] = value;
        }
      });
      return obj;
    });

    const currencyContent = JSON.stringify(objectArray, null, 2);
    console.log(`✅ 货币数据同步完成，共处理 ${objectArray.length} 条数据`);

    return {
      success: true,
      count: objectArray.length,
      content: currencyContent,
    };
  } catch (error) {
    console.error("❌ 同步货币数据失败:", error);
    throw new Error(`同步货币数据失败: ${error instanceof Error ? error.message : "未知错误"}`);
  }
}

// 读取 games.json 文件内容
// GitHub API 客户端
const githubClient = axios.create({
  baseURL: GITHUB_API_BASE,
  headers: {
    Authorization: `token ${GITHUB_TOKEN}`,
    Accept: "application/vnd.github.v3+json",
    "User-Agent": "gmp-office-api",
  },
});

// 获取文件的当前 SHA
async function getFileSha(filePath: string, repo: string) {
  try {
    const response = await githubClient.get(`/repos/${repo}/contents/${filePath}`);
    console.log(`获取 ${filePath} 的 SHA: ${response.data.sha}`);
    return response.data.sha;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      console.log(`文件 ${filePath} 不存在，将创建新文件`);
      return null; // 文件不存在
    }
    throw error;
  }
}

// 提交文件到 GitHub
async function commitToGitHub(filePath: string, content: string, commitMessage: string, repo: string) {
  try {
      console.log(`准备提交到 GitHub: ${repo}/${filePath}`);
      
    // 重试机制：最多重试3次
    let retries = 3;
    while (retries > 0) {
      try {
        // 获取最新的 SHA
        const currentSha = await getFileSha(filePath, repo);

        // Base64 编码内容
        const encodedContent = Buffer.from(content, "utf-8").toString("base64");

        // 准备提交数据
        const commitData: any = {
          message: commitMessage,
          content: encodedContent,
          committer: {
            name: "GMP Office API",
            email: GITHUB_USERNAME,
          },
          author: {
            name: "GMP Office API",
            email: GITHUB_USERNAME,
          },
        };

        // 如果文件已存在，需要提供 SHA
        if (currentSha) {
          commitData.sha = currentSha;
        }

        const response = await githubClient.put(`/repos/${repo}/contents/${filePath}`, commitData);

        return {
          success: true,
          sha: response.data.content.sha,
          url: response.data.content.html_url,
          commitSha: response.data.commit.sha,
          commitUrl: response.data.commit.html_url,
          repo: repo,
        };
      } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status === 409) {
          // SHA 冲突，重试
          retries--;
          console.log(`SHA 冲突，剩余重试次数: ${retries}`);
          if (retries > 0) {
            await new Promise(resolve => setTimeout(resolve, 1000)); // 等待1秒
            continue;
          }
        }
        throw error;
      }
    }
    
    throw new Error("提交失败，已超过最大重试次数");
  } catch (error) {
    console.error("GitHub 提交失败:", error);
    if (axios.isAxiosError(error)) {
      throw new Error(`GitHub 提交失败: ${error.response?.data?.message || error.message}`);
    }
    throw new Error(`GitHub 提交失败: ${error instanceof Error ? error.message : "未知错误"}`);
  }
}

// 触发 Vercel 部署
async function triggerVercelDeploy() {
  try {
    const response = await axios.post(VERCEL_DEPLOY_HOOK);
    return {
      success: true,
      jobId: response.data?.job?.id,
      state: response.data?.job?.state,
      createdAt: response.data?.job?.createdAt,
    };
  } catch (error) {
    console.error("Vercel 部署触发失败:", error);
    if (axios.isAxiosError(error)) {
      throw new Error(`Vercel 部署触发失败: ${error.response?.data?.message || error.message}`);
    }
    throw new Error(`Vercel 部署触发失败: ${error instanceof Error ? error.message : "未知错误"}`);
  }
}

// 处理 OPTIONS 预检请求
export const OPTIONS = async () => {
  return handleOptionsRequest();
};

export const GET = async ({ request }: { request: Request }) => {
  try {
    // 获取查询参数
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get("page") || "1");
    const pageSize = parseInt(url.searchParams.get("pageSize") || "10");

    // 参数验证
    if (page < 1 || pageSize < 1 || pageSize > 100) {
      return createResponse(
        {
          success: false,
          message: "无效的分页参数。page >= 1, pageSize 1-100之间",
        },
        400
      );
    }

    // 获取访问令牌
    const token = await getTenantAccessToken();
    accessToken.set(token);

    // 查询表格信息
    const book = await querySheet(UPDATE_RECORD_FILE_TOKEN);
    const sheetMeta = book.data.sheets[0];
    const sheetId = sheetMeta.sheet_id;
    const columnCount = sheetMeta.grid_properties.column_count;
    const rowCount = sheetMeta.grid_properties.row_count;

    // 获取表头数据（第1行）
    const dataHeader = await getSheetRange(UPDATE_RECORD_FILE_TOKEN, makeRange(sheetId, 1, columnCount, 1, 1));

    // 获取所有数据行（从第2行开始，因为第1行是表头）
    const rowsData = await getSheetRange(UPDATE_RECORD_FILE_TOKEN, makeRange(sheetId, 1, columnCount, 2, rowCount));

    // 清理表头，过滤掉空值和null
    const cleanHeaders = dataHeader[0].filter(
      (header: any) => header !== null && header !== undefined && header !== "" && header !== "null"
    );

    // 处理所有行数据
    const processedRows = rowsData.map((row: any[], rowIndex: number) => {
      const obj: any = {
        _rowIndex: rowIndex + 2, // 实际行号（从2开始）
      };

      // 只处理有效的表头字段
      cleanHeaders.forEach((key: string, index: number) => {
        const originValue = row[index];
        let value = "";

        // 数据类型处理
        if (originValue !== null && originValue !== undefined && originValue !== "null") {
          if (typeof originValue === "string") {
            value = originValue.trim();
          } else {
            value = String(originValue);
          }
        }

        obj[key] = value;
      });

      return obj;
    });

    // 过滤掉完全空的行（除了_rowIndex外，所有字段都为空）
    const validRows = processedRows.filter((row: any) => {
      // 获取除了_rowIndex之外的所有值
      const dataValues = Object.entries(row)
        .filter(([key, _]) => key !== "_rowIndex")
        .map(([_, value]) => value);

      // 检查是否至少有一个非空值
      return dataValues.some((val) => val !== "" && val !== null && val !== undefined && val !== "null");
    });

    // 只返回有效行，不返回空行
    const allRows = validRows;

    // 分页处理
    const totalRecords = allRows.length;
    const totalPages = Math.ceil(totalRecords / pageSize);
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedRecords = allRows.slice(startIndex, endIndex);

    return createResponse({
      success: true,
      data: {
        sheetInfo: {
          sheetId,
          columnCount,
          rowCount,
          validHeaders: cleanHeaders.length,
          totalRecords: totalRecords,
        },
        pagination: {
          currentPage: page,
          pageSize: pageSize,
          totalPages: totalPages,
          totalRecords: totalRecords,
          hasNextPage: page < totalPages,
          hasPrevPage: page > 1,
        },
        headers: cleanHeaders,
        records: paginatedRecords,
      },
    });
  } catch (error) {
    console.error("读取更新记录失败:", error);
    return createResponse(
      {
        success: false,
        message: "读取更新记录失败",
        error: error instanceof Error ? error.message : "未知错误",
      },
      500
    );
  }
};

export const POST = async ({ request }: { request: Request }) => {
  console.log("========== POST 请求开始 ==========");
  try {
    // 解析请求体
    const body = await request.json();
    console.log("收到请求参数:", body);
    const { operator, is_test_env, description } = body;

    // 参数验证
    if (!operator) {
      return createResponse(
        {
          success: false,
          message: "operator 是必填项",
        },
        400
      );
    }

    // 获取访问令牌
    const token = await getTenantAccessToken();
    accessToken.set(token);

    // 查询表格信息
    const book = await querySheet(UPDATE_RECORD_FILE_TOKEN);
    const sheetMeta = book.data.sheets[0];
    const sheetId = sheetMeta.sheet_id;
    const columnCount = sheetMeta.grid_properties.column_count;

    // 获取表头数据（第1行）
    const dataHeader = await getSheetRange(UPDATE_RECORD_FILE_TOKEN, makeRange(sheetId, 1, columnCount, 1, 1));
    const cleanHeaders = dataHeader[0].filter(
      (header: any) => header !== null && header !== undefined && header !== "" && header !== "null"
    );

    // 构建新行数据，根据表头顺序填充
    const newRowData: string[] = [];
    const time = new Date().toLocaleString("en-US", { timeZone: "Asia/Shanghai" });
    // 字段映射
    const fieldMapping: { [key: string]: string } = {
      更新时间: time,
      更新说明: description || "",
      操作人: operator || "",
      是否是测试环境: is_test_env ? "是" : "否",
    };

    // 按照表头顺序填充数据
    cleanHeaders.forEach((header: string) => {
      const value = fieldMapping[header] || "";
      newRowData.push(value);
    });

    // 确保数组长度与列数匹配
    while (newRowData.length < columnCount) {
      newRowData.push("");
    }

    // 添加新行到表格
    const result = await addRowToSheet(UPDATE_RECORD_FILE_TOKEN, sheetId, [newRowData]);

    // 执行后续操作：运行脚本和提交到 GitHub
    let gamesResult = null;
    let languageResult = null;
    let currencyResult = null;
    let githubGamesResult = null;
    let githubLanguageResult = null;
    let githubCurrencyResult = null;
    let vercelResult = null;

    try {
      // 1. 同步所有数据
      console.log("开始同步所有数据...");
      const [gamesData, languageData, currencyData] = await Promise.all([
        syncGamesData(),
        syncLanguageData(),
        syncCurrencyData(),
      ]);

      gamesResult = gamesData;
      languageResult = languageData;
      currencyResult = currencyData;

      // 2. 根据环境选择仓库并提交所有文件到 GitHub
      const targetRepo = is_test_env ? TEST_REPO : PROD_REPO;
      console.log(`提交文件到 GitHub 仓库: ${targetRepo}...`);
      const commitMessage = `Update configs - ${time} by ${operator}${description ? ` - ${description}` : ""}`;
      
      // 并行提交三个文件
      const [githubGames, githubLanguage, githubCurrency] = await Promise.all([
        commitToGitHub("src/contents/games.json", gamesData.content, commitMessage, targetRepo),
        commitToGitHub("src/contents/language.json", languageData.content, commitMessage, targetRepo),
        commitToGitHub("src/contents/currency.json", currencyData.content, commitMessage, targetRepo),
      ]);

      githubGamesResult = githubGames;
      githubLanguageResult = githubLanguage;
      githubCurrencyResult = githubCurrency;

      // 3. 如果是正式环境，触发 Vercel 部署
      if (!is_test_env) {
        console.log("正式环境，触发 Vercel 部署...");
        vercelResult = await triggerVercelDeploy();
      }

      console.log("所有操作完成成功");
    } catch (error) {
      console.error("后续操作失败:", error);
      // 即使后续操作失败，也返回成功，但包含错误信息
    }

    return createResponse({
      success: true,
      message: "更新记录添加成功，所有配置文件已同步",
      data: {
        addedRow: {
          update_time: time,
          description: description || "",
          operator,
          is_test_env: is_test_env ? "是" : "否",
        },
        environment: {
          isTestEnv: is_test_env,
          targetRepo: is_test_env ? TEST_REPO : PROD_REPO,
          deploymentTriggered: !is_test_env,
        },
        sheetInfo: {
          sheetId,
          updatedRange: result.data?.updatedRange || "",
          updatedRows: result.data?.updatedRows || 1,
        },
        syncResults: {
          games: gamesResult
            ? {
                success: true,
                count: gamesResult.count,
                message: `同步完成，共处理 ${gamesResult.count} 个游戏数据`,
              }
            : {
                success: false,
                error: "游戏数据同步失败",
              },
          language: languageResult
            ? {
                success: true,
                count: languageResult.count,
                message: `同步完成，共处理 ${languageResult.count} 条语言数据`,
              }
            : {
                success: false,
                error: "语言数据同步失败",
              },
          currency: currencyResult
            ? {
                success: true,
                count: currencyResult.count,
                message: `同步完成，共处理 ${currencyResult.count} 条货币数据`,
              }
            : {
                success: false,
                error: "货币数据同步失败",
              },
        },
        githubCommits: {
          games: githubGamesResult
            ? {
                success: true,
                repo: githubGamesResult.repo,
                commitSha: githubGamesResult.commitSha,
                commitUrl: githubGamesResult.commitUrl,
                fileUrl: githubGamesResult.url,
              }
            : {
                success: false,
                error: "games.json 提交失败",
              },
          language: githubLanguageResult
            ? {
                success: true,
                repo: githubLanguageResult.repo,
                commitSha: githubLanguageResult.commitSha,
                commitUrl: githubLanguageResult.commitUrl,
                fileUrl: githubLanguageResult.url,
              }
            : {
                success: false,
                error: "language.json 提交失败",
              },
          currency: githubCurrencyResult
            ? {
                success: true,
                repo: githubCurrencyResult.repo,
                commitSha: githubCurrencyResult.commitSha,
                commitUrl: githubCurrencyResult.commitUrl,
                fileUrl: githubCurrencyResult.url,
              }
            : {
                success: false,
                error: "currency.json 提交失败",
              },
        },
        vercelDeploy: vercelResult
          ? {
              success: true,
              jobId: vercelResult.jobId,
              state: vercelResult.state,
              createdAt: vercelResult.createdAt,
            }
          : !is_test_env
          ? {
              success: false,
              error: "Vercel 部署触发失败",
            }
          : {
              success: true,
              message: "测试环境，跳过 Vercel 部署",
            },
        filesUpdated: {
          games: !!gamesResult,
          language: !!languageResult,
          currency: !!currencyResult,
        },
      },
    });
  } catch (error) {
    console.error("添加更新记录失败:", error);
    return createResponse(
      {
        success: false,
        message: "添加更新记录失败",
        error: error instanceof Error ? error.message : "未知错误",
      },
      500
    );
  }
};

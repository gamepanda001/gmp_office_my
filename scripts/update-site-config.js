import fs from "fs";
import path from "path";
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log("正在加载环境变量...");
console.log("当前工作目录:", process.cwd());

// 在 Vercel 环境中，优先使用生产环境变量
const isVercel = process.env.VERCEL === '1';
const envFiles = isVercel 
  ? ['.env.production', '.env'] 
  : [
      '.env',
      '.env.local',
      '.env.development',
      '.env.development.local'
    ];

// 遍历所有可能的环境文件并加载它们
for (const file of envFiles) {
  const envPath = path.join(process.cwd(), file);
  if (fs.existsSync(envPath)) {
    console.log(`正在加载环境文件: ${file}`);
    const envConfig = dotenv.config({ path: envPath });
    if (envConfig.error) {
      console.error(`加载 ${file} 出错:`, envConfig.error);
    } else {
      console.log(`成功加载环境文件: ${file}`);
    }
  } else {
    console.log(`环境文件不存在: ${file}`);
  }
}

// 获取环境变量中的站点 URL，如果未设置则使用默认值
const SITE_URL = process.env.SITE_URL || "https://www.gaming-panda.com";
console.log(`最终使用的 SITE_URL: ${SITE_URL}`);

// 去除URL末尾的斜杠（如果有）
const cleanSiteUrl = SITE_URL.endsWith('/') ? SITE_URL.slice(0, -1) : SITE_URL;

// ---- 更新SEO配置 ----
// SEO 配置文件路径
const seoConfigPath = path.join(process.cwd(), "src/config/seo.json");

try {
  // 检查文件是否存在
  if (!fs.existsSync(seoConfigPath)) {
    console.log(`SEO配置文件不存在: ${seoConfigPath}`);
    console.log("跳过SEO配置更新");
  } else {
    // 读取当前的 SEO 配置
    const seoConfig = JSON.parse(fs.readFileSync(seoConfigPath, "utf8"));

    // 更新 siteUrl
    if (seoConfig.globalConfig) {
      seoConfig.globalConfig.siteUrl = SITE_URL;

      // 写回更新后的配置
      fs.writeFileSync(seoConfigPath, JSON.stringify(seoConfig, null, 2), "utf8");
      console.log(`已更新SEO配置中的 siteUrl 为: ${SITE_URL}`);
    } else {
      console.log("SEO配置文件格式不正确，跳过更新");
    }
  }
} catch (error) {
  console.error(`更新SEO配置时出错:`, error);
  console.log("继续构建过程...");
}

console.log("站点配置更新完成！"); 
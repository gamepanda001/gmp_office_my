import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import vercel from "@astrojs/vercel/serverless";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";


console.log(process.env.NODE_ENV)
// 加载 .env 文件（按优先级顺序）
const envFiles = [
  process.env.NODE_ENV === "production"
    ? [".env.production", ".env.production.local"]
    : [".env.development", ".env.development.local"],
].flat();

// 遍历所有可能的环境文件并加载它们
for (const file of envFiles) {
  const envPath = path.join(process.cwd(), file);
  if (fs.existsSync(envPath)) {
    console.log(`astro.config.mjs - 加载环境文件: ${file}`);
    dotenv.config({ path: envPath });
  }
}

// 从环境变量获取站点 URL，确保无论在任何环境下都使用相同的值
const SITE_URL = process.env.SITE_URL || "https://www.gaming-panda.com";
console.log(process.env.SITE_URL, "sss");
// 去除URL末尾的斜杠（如果有）
const cleanSiteUrl = SITE_URL.endsWith("/") ? SITE_URL.slice(0, -1) : SITE_URL;
console.log("astro.config.mjs - 使用的 SITE_URL:", cleanSiteUrl);

// https://astro.build/config
export default defineConfig({
  // Enable React to support React JSX components.
  integrations: [
    react(),
    sitemap({
      // 配置选项
      changefreq: "weekly",
      priority: 0.7,
      lastmod: new Date(),
    }),
  ],
  site: cleanSiteUrl,
  output: "server",
  trailingSlash: "never",
  adapter: vercel({
    webAnalytics: {
      enabled: true,
    },
    imageService: true,
    // 启用ISR
    isr: {
      // 缓存过期时间设置为24小时
      expiration: 60 * 60 * 24,
      exclude: ["/api/submit-contact"],
    },
  }),
  // 配置静态文件处理
  publicDir: './public',
  // 确保server模式下静态资源正确服务
  server: {
    host: true
  }
});
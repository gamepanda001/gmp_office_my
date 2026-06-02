// 在开发环境中创建模拟的sitemap.xml文件
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 获取环境变量
const envFiles = ['.env', '.env.local', '.env.development', '.env.development.local'];
for (const file of envFiles) {
  const envPath = path.join(process.cwd(), file);
  if (fs.existsSync(envPath)) {
    dotenv.config({ path: envPath });
  }
}

// 获取站点URL
const SITE_URL = process.env.SITE_URL || 'https://www.gaming-panda.com';
console.log(`使用的站点URL: ${SITE_URL}`);

// 创建基本的sitemap内容
const createSitemap = () => {
  const publicDir = path.join(process.cwd(), 'public');
  const pagesDir = path.join(process.cwd(), 'src', 'pages');
  const sitemapPath = path.join(publicDir, 'sitemap.xml');
  
  // 递归扫描目录获取所有.astro文件
  const getAllPages = (dir, baseDir = '', result = []) => {
    const files = fs.readdirSync(dir);
    
    for (const file of files) {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);
      const relativePath = path.join(baseDir, file);
      
      if (stat.isDirectory()) {
        // 排除下划线开头的目录（通常是组件或数据目录）
        if (!file.startsWith('_')) {
          getAllPages(filePath, path.join(baseDir, file), result);
        }
      } else if (file.endsWith('.astro') || file.endsWith('.md') || file.endsWith('.mdx')) {
        // 排除下划线开头的文件和游戏详情页
        if (!file.startsWith('_') && !relativePath.includes('game/[')) {
          // 将文件路径转换为URL路径
          let urlPath = relativePath
            .replace(/\\/g, '/') // 替换Windows路径分隔符
            .replace(/\.(astro|md|mdx)$/, ''); // 移除文件扩展名
          
          // 处理index文件
          if (urlPath.endsWith('/index')) {
            urlPath = urlPath.replace(/\/index$/, '/');
          } else if (urlPath === 'index') {
            urlPath = '';
          }
          
          result.push(urlPath);
        }
      }
    }
    
    return result;
  };
  
  // 获取所有页面URL
  const pages = getAllPages(pagesDir);
  console.log(`找到 ${pages.length} 个页面`);
  
  // 创建sitemap内容
  const date = new Date().toISOString();
  let content = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="https://www.sitemaps.org/schemas/sitemap/0.9">`;
  
  // 添加所有页面到sitemap
  for (const page of pages) {
    const pageUrl = `${SITE_URL}/${page}`.replace(/\/$/, ''); // 移除结尾的斜杠（首页除外）
    const priority = page === '' ? '1.0' : '0.7'; // 首页优先级更高
    const changefreq = page === '' ? 'weekly' : 'monthly';
    
    content += `
  <url>
    <loc>${pageUrl}</loc>
    <lastmod>${date}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
  }
  
  content += `
  <!-- 这是开发环境的模拟sitemap，完整版本将在构建时生成 -->
</urlset>`;

  // 写入文件
  fs.writeFileSync(sitemapPath, content, 'utf8');
  console.log(`已在 ${sitemapPath} 创建开发环境的sitemap文件（包含 ${pages.length} 个URL）`);
};

// 执行创建
createSitemap(); 
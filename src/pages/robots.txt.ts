import type { APIRoute } from "astro";

const getRobotsTxt = (sitemapURL: string) => `
User-agent: *
Allow: /
Disallow: /api/submit-contact
Disallow: /api/read-update-record

Sitemap: ${sitemapURL}
`;

export const GET: APIRoute = ({ site }) => {
  // 优先使用环境变量中的SITE_URL，如果没有则使用Astro提供的site参数
  const siteUrl = process.env.SITE_URL ? 
    (process.env.SITE_URL.endsWith("/") ? process.env.SITE_URL.slice(0, -1) : process.env.SITE_URL) :
    site?.toString().replace(/\/+$/, "");
  
  // 构建完整的sitemap URL
  const sitemapURL = `${siteUrl}/sitemap-index.xml`;
  
  return new Response(getRobotsTxt(sitemapURL));
};

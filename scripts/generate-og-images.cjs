const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

// 确保public目录存在
const publicDir = path.join(__dirname, '../public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir);
}

async function generateOGImage({ title, subtitle, outputPath }) {
  const html = `
    <html>
      <head>
        <style>
          body { width: 1200px; height: 630px; margin: 0; background: #81D3E5; display: flex; flex-direction: column; align-items: center; justify-content: center; }
          h1 { font-size: 60px; color: #000; margin: 0; }
          h2 { font-size: 30px; color: #333; margin: 20px 0 0 0; }
        </style>
      </head>
      <body>
        <img src="file://${path.resolve('./src/assets/logo.svg')}" width="300" />
        <h1>${title}</h1>
        <h2>${subtitle}</h2>
      </body>
    </html>
  `;

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 630 });
  await page.setContent(html, { waitUntil: 'networkidle0' });
  await page.screenshot({ path: outputPath, type: 'jpeg' });
  await browser.close();
}

async function main() {
  // 生成主页OG图像
  await generateOGImage({
    title: 'Gaming Panda',
    subtitle: 'High-Quality Gaming Development Studio',
    outputPath: path.join(publicDir, 'og-image.jpg'),
  });

  // 生成游戏页OG图像
  await generateOGImage({
    title: 'Games - Gaming Panda',
    subtitle: 'Explore our collection of high-quality games',
    outputPath: path.join(publicDir, 'og-image-games.jpg'),
  });

  console.log('All OG images generated successfully!');
}

// 执行主函数
main().catch(console.error);

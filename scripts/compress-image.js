import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

/**
 * 压缩图片到指定大小以内
 * @param {string} inputPath - 输入图片路径
 * @param {string} outputPath - 输出图片路径
 * @param {number} maxSizeKB - 最大文件大小（KB）
 * @param {number} maxWidth - 最大宽度（可选）
 * @param {number} maxHeight - 最大高度（可选）
 */
async function compressImage(inputPath, outputPath, maxSizeKB = 30, maxWidth = null, maxHeight = null) {
  try {
    // 检查输入文件是否存在
    if (!fs.existsSync(inputPath)) {
      throw new Error(`输入文件不存在: ${inputPath}`);
    }

    // 获取原始图片信息
    const metadata = await sharp(inputPath).metadata();
    console.log(`原始图片信息:`, {
      width: metadata.width,
      height: metadata.height,
      format: metadata.format,
      size: `${(fs.statSync(inputPath).size / 1024).toFixed(2)} KB`
    });

    let quality = 85;
    let width = metadata.width;
    let height = metadata.height;

    // 预估需要的尺寸缩放，更激进的初始缩放
    const originalSizeKB = fs.statSync(inputPath).size / 1024;
    if (originalSizeKB > maxSizeKB * 3) {
      // 如果原图太大，先大幅缩小尺寸
      const scaleFactor = Math.sqrt(maxSizeKB / originalSizeKB) * 0.8;
      width = Math.round(width * scaleFactor);
      height = Math.round(height * scaleFactor);
      quality = 70; // 同时降低初始质量
    }

    // 如果指定了最大尺寸，先调整尺寸
    if (maxWidth && width > maxWidth) {
      height = Math.round((height * maxWidth) / width);
      width = maxWidth;
    }
    if (maxHeight && height > maxHeight) {
      width = Math.round((width * maxHeight) / height);
      height = maxHeight;
    }

    let outputBuffer;
    let attempts = 0;
    const maxAttempts = 30;

    do {
      attempts++;

      // 创建sharp实例
      let sharpInstance = sharp(inputPath);

      // 调整尺寸
      if (width !== metadata.width || height !== metadata.height) {
        sharpInstance = sharpInstance.resize(width, height, {
          fit: 'inside',
          withoutEnlargement: true
        });
      }

      // 为了达到更小的文件大小，优先使用JPEG格式
      // 只有在原图是PNG且质量很高时才保持PNG格式
      if (metadata.format === 'png' && quality > 80 && attempts <= 3) {
        outputBuffer = await sharpInstance
          .png({
            quality: quality,
            compressionLevel: 9,
            palette: true,
            colors: Math.max(16, 256 - attempts * 32) // 逐步减少颜色数量
          })
          .toBuffer();
      } else if (metadata.format === 'webp') {
        outputBuffer = await sharpInstance
          .webp({
            quality: quality,
            effort: 6,
            smartSubsample: true
          })
          .toBuffer();
      } else {
        // 默认转换为JPEG，提供最好的压缩率
        outputBuffer = await sharpInstance
          .jpeg({
            quality: quality,
            progressive: true,
            mozjpeg: true,
            optimiseScans: true,
            trellisQuantisation: true,
            overshootDeringing: true
          })
          .toBuffer();
      }

      const currentSizeKB = outputBuffer.length / 1024;
      console.log(`尝试 ${attempts}: 质量=${quality}, 尺寸=${width}x${height}, 大小=${currentSizeKB.toFixed(2)}KB`);

      // 如果文件大小符合要求，跳出循环
      if (currentSizeKB <= maxSizeKB) {
        break;
      }

      // 调整参数
      if (currentSizeKB > maxSizeKB * 1.5) {
        // 如果文件太大，同时降低质量和尺寸
        quality = Math.max(10, quality - 15);
        width = Math.round(width * 0.9);
        height = Math.round(height * 0.9);
      } else {
        // 如果文件稍大，只降低质量
        quality = Math.max(10, quality - 10);
      }

      if (attempts >= maxAttempts) {
        console.warn(`达到最大尝试次数 (${maxAttempts})，使用当前结果`);
        break;
      }

    } while (outputBuffer.length / 1024 > maxSizeKB);

    // 保存文件
    fs.writeFileSync(outputPath, outputBuffer);

    const finalSizeKB = outputBuffer.length / 1024;
    console.log(`\n压缩完成!`);
    console.log(`输出文件: ${outputPath}`);
    console.log(`最终大小: ${finalSizeKB.toFixed(2)} KB`);
    console.log(`压缩率: ${((1 - finalSizeKB / (fs.statSync(inputPath).size / 1024)) * 100).toFixed(2)}%`);

    return {
      success: true,
      originalSize: fs.statSync(inputPath).size / 1024,
      finalSize: finalSizeKB,
      compressionRatio: (1 - finalSizeKB / (fs.statSync(inputPath).size / 1024)) * 100
    };

  } catch (error) {
    console.error('压缩图片时出错:', error.message);
    return {
      success: false,
      error: error.message
    };
  }
}

// 命令行使用
if (process.argv.length >= 4) {
  const inputPath = process.argv[2];
  const outputPath = process.argv[3];
  const maxSizeKB = process.argv[4] ? parseInt(process.argv[4]) : 30;
  const maxWidth = process.argv[5] ? parseInt(process.argv[5]) : null;
  const maxHeight = process.argv[6] ? parseInt(process.argv[6]) : null;

  console.log(`开始压缩图片...`);
  console.log(`输入: ${inputPath}`);
  console.log(`输出: ${outputPath}`);
  console.log(`目标大小: ${maxSizeKB} KB`);
  if (maxWidth) console.log(`最大宽度: ${maxWidth}px`);
  if (maxHeight) console.log(`最大高度: ${maxHeight}px`);
  console.log('---');

  compressImage(inputPath, outputPath, maxSizeKB, maxWidth, maxHeight);
} else {
  console.log('使用方法:');
  console.log('node scripts/compress-image.js <输入文件> <输出文件> [最大大小KB] [最大宽度] [最大高度]');
  console.log('');
  console.log('示例:');
  console.log('node scripts/compress-image.js input.jpg output.jpg 30');
  console.log('node scripts/compress-image.js input.png output.jpg 30 800 600');
}

export { compressImage };

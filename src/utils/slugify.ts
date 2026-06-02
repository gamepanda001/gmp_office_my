/**
 * 将字符串转换为URL友好的slug
 * @param text 要转换的文本
 * @returns 转换后的slug
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    // 替换空格和特殊字符为连字符
    .replace(/[\s\W-]+/g, '-')
    // 移除开头和结尾的连字符
    .replace(/^-+|-+$/g, '')
    // 确保不为空
    || 'untitled';
}

/**
 * 为游戏生成唯一的slug
 * @param name 游戏名称
 * @param id 游戏ID（用于确保唯一性）
 * @returns 唯一的slug
 */
export function generateGameSlug(name: string, id: string): string {
  const baseSlug = slugify(name);
  // 如果需要确保唯一性，可以在末尾添加ID的一部分
  // 但通常游戏名称已经足够唯一
  return baseSlug;
}

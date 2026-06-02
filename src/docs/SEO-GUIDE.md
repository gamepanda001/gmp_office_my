# Gaming Panda 网站 SEO 最佳实践指南

本指南旨在帮助开发团队正确优化网站的SEO结构，特别是关于标题标签（H1、H2、H3）的使用和图片的alt属性。

## 标题标签层级结构

标题标签形成了页面的内容层次结构，对搜索引擎和屏幕阅读器非常重要。

### H1 标签

- 每个页面**只使用一个** H1 标签
- H1 标签应包含页面的主要主题或标题
- 通常放在页面的顶部或主要内容区域的开始
- 如果您使用了视觉设计隐藏了H1（如我们的首页），确保它仍然存在于HTML中

示例：
```astro
<h1 class={css({ /* 样式 */ })}>
  Gaming Panda - High-Quality Gaming Development Studio
</h1>
```

### H2 标签

- 用于页面的主要部分或章节
- 应该是H1的逻辑子部分
- 使用`SectionHeader`组件时，现在使用的是H2标签

示例：
```astro
<SectionHeader
  heading="GAMES"
  subheading="Our aim is to provide global players with high-quality games..."
/>
```

### H3 标签

- 用于H2部分内的子部分
- 标记内容的更具体的划分
- 确保在页面结构中遵循正确的层次（先H2，再H3）

示例：
```astro
<h3 class={gameTitleSx}>{game?.title}</h3>
```

## 图片alt属性

所有图片都应该有描述性的alt属性，以提高可访问性和SEO效果。

### 最佳实践

1. **使描述具体且简洁**
   - 好：`alt="Gaming Panda logo"`
   - 差：`alt="logo"` 或 `alt=""`

2. **对装饰性图片使用空alt**
   - 如果图片纯粹是装饰性的，可以使用空alt，但不要完全省略alt属性
   - 例如：`alt=""`（仅适用于纯装饰性图片）

3. **避免在alt中重复使用"图片"、"图像"等词**
   - 好：`alt="Gaming Panda hero character"`
   - 差：`alt="Image of Gaming Panda hero character"`

4. **在轮播图中使用索引**
   - 例如：`alt="Game screenshot ${index + 1}"`

5. **为图标提供功能性描述**
   - 好：`alt="Search icon"` 或 `alt="Right arrow icon"`
   - 差：`alt="icon"`

### 组件中的alt属性

当在组件中使用图片时，考虑将alt文本作为组件属性传递：

```tsx
interface Props {
  cover: ImageMetadata;
  altText: string; // 添加alt文本属性
}

// 使用
<GameCard 
  cover={gameCover} 
  altText="Cover for Fantasy Quest game"
/>

// 组件内部
<img src={cover.src} alt={altText} />
```

## 创建新页面时的检查清单

1. 确保页面只有一个H1标签
2. 使用适当的H2标签划分主要部分
3. 在需要的地方使用H3标签进行子部分划分
4. 为所有图片添加有意义的alt属性
5. 在SEO组件中设置正确的元数据（标题、描述、关键词）

遵循这些最佳实践将有助于提高我们网站的SEO表现和可访问性。 
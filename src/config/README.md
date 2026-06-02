# SEO 配置指南

本文档介绍如何使用和维护网站的SEO配置。

## 配置文件

SEO配置存储在 `src/config/seo.json` 文件中，包含以下主要部分：

1. **全局配置 (global)**：适用于整个网站的默认SEO设置
2. **页面配置 (pages)**：特定页面的SEO设置
3. **分类配置 (categories)**：游戏分类的SEO设置

## 如何修改配置

### 全局配置

修改 `global` 部分来更新整个网站的默认SEO设置：

```json
"global": {
  "siteName": "Gaming Panda",
  "siteUrl": "https://www.gaming-panda.com",
  "defaultTitle": "Gaming Panda - High-Quality Gaming Development Studio",
  "defaultDescription": "Gaming Panda is a gaming development studio offering a wide range of fast and skill games in the gaming industry with stunning visuals and engaging gameplay.",
  "defaultKeywords": "Gaming Panda, gaming development, skill games, online games, casino games, slot games",
  "defaultImage": "/og-image.jpg",
  "twitterHandle": "@gamingpanda",
  "twitterCardType": "summary_large_image",
  "themeColor": "#F74774",
  "language": "en"
}
```

### 页面配置

修改 `pages` 部分来更新特定页面的SEO设置：

```json
"pages": {
  "home": {
    "title": "Gaming Panda - High-Quality Gaming Development Studio",
    "description": "Gaming Panda is a gaming development studio offering a wide range of fast and skill games in the gaming industry with stunning visuals and engaging gameplay.",
    "keywords": "Gaming Panda, gaming development, skill games, online games, casino games, slot games, high-quality games",
    "image": "/og-image-home.jpg"
  },
  "games": {
    "title": "Games - Gaming Panda",
    "description": "Explore our collection of high-quality games with stunning visuals and animations, and engaging gameplay, while maintaining a positive user experience.",
    "keywords": "Gaming Panda games, online games, casino games, slot games, skill games, gaming collection",
    "image": "/og-image-games.jpg"
  }
}
```

### 游戏详情页配置

游戏详情页使用模板字符串，可以在 `pages.gameDetail` 部分进行配置：

```json
"gameDetail": {
  "titleTemplate": "{gameName} - Gaming Panda",
  "descriptionTemplate": "Play {gameName}, a {gameCategory} game by Gaming Panda. {gameDescription}",
  "keywordsTemplate": "{gameName}, {gameCategory}, Gaming Panda, online game, {gameFeatures}"
}
```

模板中的变量会被实际的游戏数据替换：
- `{gameName}` - 游戏名称
- `{gameCategory}` - 游戏类别
- `{gameDescription}` - 游戏描述
- `{gameFeatures}` - 游戏特性

### 分类配置

修改 `categories` 部分来更新特定游戏分类的SEO设置：

```json
"categories": {
  "Slot": {
    "description": "Explore our collection of exciting slot games with high RTP, stunning visuals and engaging gameplay.",
    "keywords": "slot games, online slots, casino slots, high RTP slots"
  }
}
```

## 如何在页面中使用

在Astro页面中，使用 `BaseLayout` 组件并传入SEO属性：

```astro
<BaseLayout
  title="页面标题"
  description="页面描述"
  keywords="关键词1, 关键词2"
  pagePath="/页面路径"
>
  <!-- 页面内容 -->
</BaseLayout>
```

对于游戏详情页，使用 `gameData` 属性：

```astro
<BaseLayout
  gameData={{
    name: game?.name,
    title: game?.title,
    desc: game?.desc,
    category: game?.category,
    features: game?.features.map(f => f.text)
  }}
  pagePath={`/game/${gameId}`}
>
  <!-- 页面内容 -->
</BaseLayout>
```

## 生成Open Graph图像

运行以下命令生成Open Graph图像：

```bash
npm run generate-og
```

这将在 `public` 目录中生成以下文件：
- `og-image.jpg` - 网站默认Open Graph图像
- `og-image-games.jpg` - 游戏页面Open Graph图像

## 添加新页面的SEO配置

1. 在 `seo.json` 的 `pages` 部分添加新页面的配置
2. 在页面组件中使用 `BaseLayout` 并传入SEO属性
3. 如果需要，为新页面生成Open Graph图像

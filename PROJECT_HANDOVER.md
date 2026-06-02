
# GMP Office Website 项目交接文档

### 技术栈
- **前端框架**: Astro 5.13.5 (SSR模式)
- **UI框架**: React 18.2.0
- **样式系统**: Panda CSS
- **部署平台**: Vercel
- **Node.js版本**: 22.x
- **包管理器**: pnpm

## 项目结构

```
gmp_office/
├── astro.config.mjs         # Astro 配置文件
├── package.json             # 项目依赖和脚本
├── panda.config.ts          # Panda CSS 配置
├── vercel.json              # Vercel 部署配置
├── public/                  # 静态资源目录
│   ├── 字体文件/
│   ├── 图片资源/
│   └── favicon.ico
├── scripts/                 # 构建和数据同步脚本
│   ├── sync-games.cjs      # 游戏数据同步脚本
│   ├── sync-currency.cjs   # 货币数据同步脚本
│   ├── sync-language.cjs   # 语言数据同步脚本
│   └── update-site-config.js # 站点配置更新脚本
└── src/                    # 源代码目录
    ├── assets/             # 静态资源
    ├── components/         # 可复用组件
    ├── contents/           # 数据源文件
    ├── layouts/            # 布局组件
    ├── pages/              # 页面文件
    ├── styles/             # 样式文件
    └── utils/              # 工具函数
```

## 如何运行项目

### 环境要求
- Node.js 22.x
- pnpm 包管理器

### 安装依赖
```bash
pnpm install
```

### 开发环境运行
```bash
pnpm dev
# 或
pnpm start
```
访问 http://localhost:4321

### 构建生产版本
```bash
pnpm build
```

### 预览生产版本
```bash
pnpm preview
```

## 核心功能模块

### 1. 首页 (`src/pages/index.astro`)
- **功能**: 网站主页，包含英雄区域、游戏展示、服务介绍、联系方式等
- **主要组件**:
  - GameCoverCarousel: 游戏轮播图 (`src/pages/_components/GameCoverCarousel.tsx`)
  - GamesCard: 游戏卡片展示 (`src/pages/_components/GamesCard.astro`)
  - CountriesCard: 支持国家展示 (`src/pages/_components/CountriesCard.astro`)
  - CoinsCard: 支持货币展示 (`src/pages/_components/CoinsCard.astro`)
  - LanguageCard: 支持语言展示 (`src/pages/_components/LanguageCard.astro`)
  - NewContactCard: 联系表单 (`src/components/NewContactCard.astro`)

### 2. 游戏列表页 (`src/pages/games/index.astro`)
- **功能**: 展示所有游戏的列表页面
- **主要组件**:
  - Carousel: 游戏轮播组件 (`src/pages/games/_components/Carousel.tsx`)
  - GamesTabs: 游戏分类标签页 (`src/pages/games/_components/GamesTabs.tsx`)

### 3. 游戏详情页 (`src/pages/game/[gameSlug].astro`)
- **功能**: 单个游戏的详细信息页面
- **主要组件**:
  - HeroBox/HeroBoxMobile: 游戏英雄区域 (`src/pages/game/_components/HeroBox.tsx` / `src/pages/game/_components/HeroBoxMobile.tsx`)
  - ScreenshotCarousel: 游戏截图轮播 (`src/pages/game/_components/ScreenshotCarousel.tsx`)
  - PlayButton: 游戏试玩按钮 (`src/pages/game/_components/PlayButton.tsx`)
  - FlagGird: 支持国家网格展示 (`src/pages/game/_components/FlagGird.tsx`)

### 4. 布局系统 (`src/layouts/`)
- **BaseLayout.astro**: 基础布局，包含SEO、头部、底部等 (`src/layouts/BaseLayout.astro`)
- **Header.tsx**: 网站头部导航组件 (`src/layouts/Header.tsx`)

### 5. 组件库 (`src/components/`)
- **ContactForm.tsx**: 联系表单组件 (`src/components/ContactForm.tsx`)
- **Modal.tsx**: 模态框组件 (`src/components/Modal.tsx`)
- **VideoModal.tsx**: 视频播放模态框 (`src/components/VideoModal.tsx`)
- **CurrencyModal.tsx**: 货币展示模态框 (`src/components/CurrencyModal.tsx`)
- **SEO.astro**: SEO 优化组件 (`src/components/SEO.astro`)

## 数据源管理

### 游戏数据
- **数据文件**: `src/contents/games.json`
- **类型定义**: `src/contents/Game.ts`
- **处理逻辑**: `src/contents/games.ts`
- **数据来源**: 通过 `scripts/sync-games.cjs` 从飞书表格同步

#### 游戏数据结构
```typescript
interface Game {
  id: string;           // 游戏ID
  name: string;         // 游戏名称
  title: string;        // 游戏标题
  desc: string;         // 游戏描述
  category: string;     // 游戏分类 (Crash, Lottery, Slot等)
  rtp: number;          // 返还率
  features: string[];   // 游戏特性
  releaseDate: number;  // 发布日期
  weight: number;       // 权重(用于排序)
  status: number;       // 状态(1=启用)
  // 图片资源
  icon: string;         // 游戏图标
  cover: string;        // 封面图
  card: string;         // 卡片图
  heroImageBg: string;  // 英雄区背景图
  heroImageFg: string;  // 英雄区前景图
  heroImageMobile: string; // 移动端英雄图
  screenshots: string;  // 游戏截图(逗号分隔)
  // 其他
  maxodd: string;       // 最大赔率
  volatility: string;   // 波动性
  sharepic: string;     // 分享图片
}
```

### 货币数据
- **数据文件**: `src/contents/currency.json`
- **处理逻辑**: `src/contents/coins.ts`
- **同步脚本**: `scripts/sync-currency.cjs`

### 语言数据
- **数据文件**: `src/contents/language.json`
- **同步脚本**: `scripts/sync-language.cjs`

## 环境配置

### 环境变量
项目支持多环境配置，优先级如下：
1. `.env.production` - 生产环境
2. `.env.development` - 开发环境
3. `.env.local` - 本地覆盖
4. `.env` - 基础配置

#### 主要环境变量
```bash
# 站点URL
SITE_URL=https://www.gaming-panda.com


# 飞书API配置(用于数据同步)
LARK_APP_ID=your_lark_app_id
LARK_APP_SECRET=your_lark_app_secret
LARK_CONFIG_FILE_TOKEN=your_config_sheet_token
LARK_UPDATE_RECORD_FILE_TOKEN=your_update_record_sheet_token
LARK_CONTACT_FILE_TOKEN=your_contact_sheet_token
```

## 部署流程

### Vercel 部署
项目配置了自动化部署流程，通过 GitLab CI/CD 和 Vercel 集成实现。

**构建命令**:
```bash
pnpm build:vercel
```

### 部署配置
- **构建命令**: `pnpm build:vercel`
- **安装命令**: `pnpm install`
- **框架**: astro
- **Node.js运行时**: nodejs20.x (注意：已从22.x降级到20.x解决部署问题)

### ISR (增量静态再生)
- **缓存时间**: 24小时 (60 * 60 * 24)
- **排除路径**: `/api/submit-contact`

## 数据同步

### 游戏数据同步
```bash
pnpm sync-games
```
从飞书表格同步游戏数据到 `src/contents/games.json`

### 货币数据同步
```bash
pnpm sync-currency
```

### 语言数据同步
```bash
pnpm sync-language
```


## 样式系统

### Panda CSS
项目使用 Panda CSS 作为样式解决方案：
- **配置文件**: `panda.config.ts`
- **样式文件**: `src/styles/`
- **生成命令**: `pnpm prepare` (自动生成样式系统)

### 主要样式文件
- `src/styles/index.css` - 全局样式
- `src/styles/common.ts` - 通用样式组件
- `src/styles/recipes.ts` - 样式配方
- `src/styles/text-styles.ts` - 文本样式

## API 接口

### 联系表单 API
- **路径**: `/api/submit-contact`
- **方法**: POST
- **功能**: 处理用户联系表单提交

## SEO 优化

### SEO 配置
- **配置文件**: `src/config/seo.json`
- **SEO组件**: `src/components/SEO.astro`
- **站点地图**: 自动生成 (通过 @astrojs/sitemap)

### 页面SEO
每个页面都配置了：
- 标题 (title)
- 描述 (description)
- 关键词 (keywords)
- Open Graph 图片
- 结构化数据

## 性能优化

### 图片优化
- 使用 Astro 的 Image 组件进行自动优化
- 支持 WebP 格式
- 响应式图片加载

### 缓存策略
- 静态资源缓存：1年
- API缓存：根据具体接口配置
- ISR缓存：24小时

## 常见问题与开发陷阱

### 1. 开发环境启动失败
- 检查 Node.js 版本是否为 22.x
- 确保已安装 pnpm
- 删除 `node_modules` 重新安装依赖
- **重要**: 首次运行需要执行 `pnpm prepare` 生成 Panda CSS 样式系统

### 2. 构建失败
- 检查环境变量配置
- 确保所有图片资源存在
- 检查 TypeScript 类型错误
- **注意**: 构建前会自动运行 `update-site-config.js` 脚本

### 3. 部署失败
- 检查 Vercel 配置
- 确认 Node.js 运行时版本
- 检查环境变量是否正确设置

### 4. 数据同步失败
- 检查飞书 API 配置
- 确认网络连接
- 检查数据格式是否正确

## 开发陷阱与注意事项

### 1. 样式系统相关
- **Panda CSS 生成**: 修改 `panda.config.ts` 后必须运行 `pnpm prepare` 重新生成样式系统
- **样式文件路径**: Panda CSS 生成的文件在 `styled-system/` 目录，不要手动修改
- **断点配置**: 项目使用自定义断点 `xl: '1921px'`，注意与标准断点的差异

### 2. 环境变量陷阱
- **环境文件优先级**: `.env.production` > `.env.development` > `.env.local` > `.env`
- **SITE_URL 配置**: 必须在 `.env.production` 中正确设置，影响 sitemap 和 SEO
- **Astro 配置**: 环境变量在 `astro.config.mjs` 中动态加载，修改后需重启开发服务器

### 3. 图片资源管理
- **静态资源**: 使用 Astro 的 Image 组件进行优化，不要直接使用 `<img>` 标签
- **图片格式**: 优先使用 WebP 格式，项目配置了自动优化
- **缓存策略**: 静态资源设置了 1 年缓存，更新图片时注意文件名变更

### 4. 数据同步陷阱
- **飞书 API 限制**: 同步脚本有频率限制，不要频繁执行
- **数据格式验证**: 游戏数据结构变更需要同步更新 TypeScript 类型定义
- **本地开发**: 数据同步脚本会覆盖本地 JSON 文件，注意备份本地修改

### 5. 部署相关陷阱
- **Node.js 版本**: 本地开发使用 22.x，但 Vercel 部署使用 20.x（已在配置中降级）
- **构建命令**: 使用 `build:vercel` 而不是 `build`，两者有细微差别
- **ISR 配置**: 增量静态再生排除了 `/api/submit-contact` 路径
- **环境变量**: Vercel 部署时需要在平台上配置环境变量，不会自动读取 `.env` 文件

### 6. 组件开发陷阱
- **客户端组件**: 使用 `client:load`、`client:idle` 等指令时注意性能影响
- **Astro 组件**: `.astro` 文件中的 JavaScript 在服务端执行，不能使用浏览器 API
- **React 组件**: 在 Astro 中使用 React 组件需要明确指定客户端渲染指令

### 7. SEO 配置陷阱
- **动态路由**: 游戏详情页使用动态路由，确保 sitemap 正确生成
- **Meta 标签**: 每个页面的 SEO 配置都通过 `SEO.astro` 组件统一管理
- **结构化数据**: 游戏页面包含结构化数据，修改游戏数据结构时需要同步更新


---

**注意**: 此文档应随项目更新而及时维护，确保信息的准确性和时效性。

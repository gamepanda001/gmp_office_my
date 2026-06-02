# Vercel 部署配置说明

本项目已配置支持 Vercel 部署，并启用 ISR (Incremental Static Regeneration) 功能，实现页面永不过期，只有重新构建时才更新的需求。

## 配置概览

### 1. Astro 配置 (`astro.config.mjs`)
- **输出模式**: `hybrid` - 支持静态预渲染和按需渲染
- **适配器**: `@astrojs/vercel/serverless` - Vercel 无服务器函数
- **ISR 配置**: `expiration: false` - 页面永不自动过期
- **启用功能**: Web Analytics 和 Speed Insights

### 2. Vercel 配置 (`vercel.json`)
- **构建命令**: `pnpm build`
- **输出目录**: `dist`
- **安装命令**: `pnpm install`
- **缓存策略**: 
  - 静态资源: 1年缓存，不可变
  - 页面内容: ISR 缓存，标记为 `pages`

### 3. 页面预渲染配置
主要页面已添加 `export const prerender = true;` 指令：
- 首页 (`/`)
- 游戏列表页 (`/games`)
- 游戏详情页 (`/game/[gameSlug]`)

## 部署方式

### 方式一：通过 Vercel Dashboard
1. 将代码推送到 Git 仓库 (GitHub/GitLab/Bitbucket)
2. 在 Vercel Dashboard 中导入项目
3. Vercel 会自动检测 Astro 项目并使用正确的设置
4. 每次推送代码到主分支都会自动部署

### 方式二：使用 Vercel CLI
```bash
# 安装 Vercel CLI
npm i -g vercel

# 登录 Vercel
vercel login

# 首次部署
vercel

# 生产环境部署
vercel --prod
```

### 方式三：使用项目脚本
```bash
# 构建并部署到生产环境
pnpm run deploy:vercel

# 使用自定义部署脚本 (需要配置环境变量)
pnpm run deploy
```

## 环境变量配置

在 Vercel Dashboard 或本地 `.env.production` 文件中配置：

```bash
# 必需
SITE_URL=https://your-domain.com

# 可选 - 用于自动化脚本
VERCEL_TOKEN=your_vercel_token
VERCEL_TEAM_ID=your_team_id
VERCEL_PROJECT_ID=your_project_id
```

## ISR 工作原理

1. **首次构建**: 所有标记为 `prerender: true` 的页面在构建时生成静态文件
2. **缓存策略**: 
   - 页面内容缓存 1 年 (`s-maxage=31536000`)
   - 支持 `stale-while-revalidate` 策略
   - 通过缓存标签 `pages` 管理
3. **更新机制**: 
   - 页面不会自动过期 (`expiration: false`)
   - 只有重新部署时才会更新内容
   - 可通过 API 手动清除缓存

## 缓存清除

### 自动清除 (通过部署脚本)
```bash
pnpm run deploy
```

### 手动清除 (通过 API)
```bash
curl -X POST "https://api.vercel.com/v1/purge" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"tags": ["pages"]}'
```

## 性能优化特性

1. **静态资源缓存**: 所有 JS/CSS/图片文件都有 1 年缓存
2. **代码分割**: Vite 构建配置确保最优的文件分割
3. **Web Analytics**: 内置 Vercel Analytics 支持
4. **Speed Insights**: 内置性能监控
5. **边缘缓存**: 利用 Vercel 的全球 CDN

## 监控和调试

1. **Vercel Dashboard**: 查看部署状态、性能指标
2. **Function Logs**: 监控服务器端渲染的日志
3. **Web Analytics**: 分析用户访问数据
4. **Speed Insights**: 监控页面加载性能

## 注意事项

1. **构建时间**: 由于预渲染所有游戏页面，首次构建可能较长
2. **内存限制**: 函数内存设置为 1024MB，超时时间 30 秒
3. **缓存一致性**: 更新内容后必须重新部署才能看到变化
4. **环境变量**: 确保生产环境变量正确配置

## 故障排除

### 构建失败
- 检查依赖版本兼容性
- 确认环境变量设置正确
- 查看构建日志找出具体错误

### 页面不更新
- 确认已重新部署
- 检查缓存策略是否正确
- 尝试清除浏览器缓存

### 性能问题
- 检查 Function Logs 是否有错误
- 优化图片和静态资源
- 考虑增加更多页面的预渲染

## 相关链接

- [Vercel Astro 部署指南](https://vercel.com/guides/deploying-astro-with-vercel)
- [Astro Vercel 适配器文档](https://docs.astro.build/en/guides/integrations-guide/vercel/)
- [Vercel ISR 文档](https://vercel.com/docs/concepts/incremental-static-regeneration) 
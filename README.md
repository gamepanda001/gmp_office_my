# GMP Office Website

The site include a landing page, a game gallery page, and a game playground page.

## Start
These instructions will help you start the project on your local machine and help you build the final product for deployment to a production server.

### Install

First, you should install all the dependencies

```bash
npm install
```

### Start  
```base
npm run dev
```
If all goes well, Astro should now be serving the project on [http://localhost:4321](http://localhost:4321).  

Astro will listen for live file changes in your `src/` directory, so you will not need to restart the server as you make changes during development.  

### Deploy
Run the command `npm run build` to build the site.
```bash
npm run build
```
By default, the build output will be placed at `dist/`, This location can be changed using the [`outDir` configuration options](https://docs.astro.build/en/reference/configuration-reference/#outdir)

## 环境变量配置

为了支持在不同环境（开发、测试、生产）中使用不同的 `siteUrl`，项目现在支持通过环境变量来配置站点 URL。

### 如何配置

1. 在项目根目录创建以下环境文件之一：

   - `.env` - 基础环境配置，适用于所有环境（优先级最低）
   - `.env.development` - 开发环境配置
   - `.env.test` - 测试环境配置
   - `.env.production` - 生产环境配置
   - `.env.local` - 本地覆盖（优先级高于未带 .local 后缀的同名文件）
   - `.env.development.local`, `.env.test.local`, `.env.production.local` - 特定环境的本地覆盖（优先级最高）

2. 在环境文件中设置 `SITE_URL` 变量（**注意：变量名和值之间不要有空格**）：

   ```
   # 正确格式
   SITE_URL=http://localhost:4321
   
   # 错误格式（有空格）
   SITE_URL = http://localhost:4321
   ```

   环境文件示例：
   ```
   # .env.development 中
   SITE_URL=http://localhost:4321
   
   # .env.test 中
   SITE_URL=https://test.gaming-panda.com
   
   # .env.production 中
   SITE_URL=https://www.gaming-panda.com
   ```

3. **环境文件加载优先级**：

   - `.env.*.local` 文件拥有最高优先级
   - `.env.local` 其次
   - `.env.[环境]` 再次
   - `.env` 最低

   例如，如果同时存在 `.env.development` 和 `.env.local`，则 `.env.local` 中的设置会覆盖 `.env.development` 中的同名变量。

4. 当运行 `pnpm dev`、`pnpm build` 或 `pnpm start` 时，系统会自动应用相应环境的 URL 配置。

### 手动更新配置

你也可以单独运行配置更新脚本：

```
pnpm update-seo-config
```

或在命令行直接指定 SITE_URL：

```
SITE_URL=https://your-custom-domain.com pnpm build
```

### 常见问题排查

如果您的环境变量设置没有生效，请检查：

1. 环境文件名称是否正确（包括大小写和前缀点）
2. 变量格式是否正确（变量名和值之间不应有空格）
3. 查看控制台输出的环境变量加载日志，了解实际使用的值

这样就可以在不同环境中使用不同的域名进行测试和验证了。

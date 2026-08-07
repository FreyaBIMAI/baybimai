# BAYBIMAI

[BAYBIMAI.org](https://baybimai.org) 是一个面向 BIM 学习与企业服务的落地页，包含：

- Revit 闪电入门课（Stripe 一次性支付）
- 企业 BIM 培训与 BIM 审计介绍
- 线索收集表单
- Stripe Checkout、签名 Webhook 与 D1 订单记录
- HOTSPOT 周报订阅（$5.9/月或 $59/年）、每周一自动更新与匿名读者反馈闭环

## 技术栈

- Next.js / React / TypeScript
- Vinext + Cloudflare Workers
- Cloudflare D1 + Drizzle ORM
- Stripe Checkout

## 本地运行

需要 Node.js `>=22.13.0`。

```bash
npm install
cp .env.example .env.local
npm run dev
```

## 环境变量

复制 `.env.example` 并填写本地测试值。不要提交 `.env.local` 或任何真实密钥。

- `SITE_URL`
- `STRIPE_PRODUCT_ID`
- `STRIPE_PRICE_ID`
- `STRIPE_SECRET_KEY`
- `STRIPE_WEBHOOK_SECRET`
- `ELEVENLABS_API_KEY`（仅在服务端使用；新闻与 Founder Daily 显示 Adam / Hope；Revit 课程大纲页用 Mark 朗读课程介绍）
- `STRIPE_NEWS_PRODUCT_ID`、`STRIPE_NEWS_MONTHLY_PRICE_ID`、`STRIPE_NEWS_YEARLY_PRICE_ID`
- `NEWS_REFRESH_URL`、`NEWS_REFRESH_TOKEN`（周一内容生成/编辑工作流的受保护入口）
- `BAIDU_NETDISK_APP_KEY`、`BAIDU_NETDISK_SECRET_KEY`、`BAIDU_NETDISK_REFRESH_TOKEN`、`BAIDU_NETDISK_TRANSCRIPT_DIR`
  （课程文稿功能，见下方「课程文稿」一节；不配置时该功能自动隐藏，不影响其余页面）

## 构建与部署

```bash
npm run build
npx wrangler deploy
```

线上密钥通过 Cloudflare Worker Secrets 配置。数据库迁移位于 `drizzle/`。

### HOTSPOT 每周更新

`wrangler.jsonc` 已设置 Cloudflare Cron：每周一 16:00 UTC（太平洋时间周一
08:00–09:00）调用刷新工作流。该工作流应接收一个带 `scheduledAt`、
`requiredLanguages` 与 `requiredSignals` 的 POST 请求，并返回中英文各一份完整
周报；刷新结果会写入 D1 并显示在 `/news` 与 `/en/news` 的头条和信号区。

部署前请应用 `drizzle/0002_news_publications.sql` 和
`drizzle/0003_news_feedback.sql`，并将 `NEWS_REFRESH_URL` 与
`NEWS_REFRESH_TOKEN` 配置为 Worker Secrets。没有配置刷新入口时，站点会安全地
保留当前已发布的周报，而不会生成不可靠的内容。

> GitHub 用于保存和协作源码。由于项目包含 Worker API、Stripe Webhook 和 D1，
> 完整应用继续部署在 Cloudflare，而不是 GitHub Pages。

### 课程文稿（百度网盘）

Revit 闪电入门课的大纲页可以为每一讲显示"文稿"下载链接，文件本身托管在
讲师自己的百度网盘账号里，网站通过百度网盘开放平台 API 按需读取，不需要每次
更新讲义都重新部署代码。

**一次性设置（需要账号所有者手动完成，无法自动化）：**

1. 在 <https://pan.baidu.com/union/index> 注册开发者、完成实名认证、创建应用。
   个人开发者可以申请，但上线前需要百度审核，预留时间。
2. 用要托管讲义的那个百度账号，走一次 OAuth 授权码流程，拿到 `refresh_token`
   （有效期约 10 年，不需要每次重新授权）。
3. 把每一讲的文稿传到网盘同一个文件夹，文件名用课程大纲里的讲次编号命名，
   例如 `07.md`、`Bonus 01.pdf`（编号对照见
   `app/course-revit-fast-start-content.ts` 里每讲的 `code` 字段）。
4. 把 `BAIDU_NETDISK_APP_KEY`、`BAIDU_NETDISK_SECRET_KEY`、
   `BAIDU_NETDISK_REFRESH_TOKEN` 配置为 Cloudflare Worker Secrets，
   `BAIDU_NETDISK_TRANSCRIPT_DIR` 设为该文件夹路径（默认
   `/apps/baybimai/transcripts`）。

配置完成后，之后只要把新文件传到这个网盘文件夹，网站会在下次访问时自动出现
对应的"文稿"链接，不需要改代码或重新部署。四个变量任意一个没配置，该功能
会自动隐藏，不影响页面其余部分。

### 部署预览（GitHub Actions）

`.github/workflows/deploy.yml` 会在每个 PR 上传一个 Cloudflare Workers
预览版本并把预览链接评论到 PR 里，合并到 `main` 后自动跑生产部署。需要在
仓库 Settings → Secrets 里配置 `CLOUDFLARE_API_TOKEN`（Edit Cloudflare
Workers 权限）和 `CLOUDFLARE_ACCOUNT_ID`。

# BAYBIMAI

[BAYBIMAI.org](https://baybimai.org) 是一个面向 BIM 学习与企业服务的落地页，包含：

- Revit 闪电入门课（Stripe 一次性支付）
- 企业 BIM 培训与 BIM 咨询介绍
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
- `ELEVENLABS_API_KEY`（仅在服务端使用；新闻与 Founder Daily 显示 Adam / Hope，Mark 留作后续课程配音）
- `STRIPE_NEWS_PRODUCT_ID`、`STRIPE_NEWS_MONTHLY_PRICE_ID`、`STRIPE_NEWS_YEARLY_PRICE_ID`
- `NEWS_REFRESH_URL`、`NEWS_REFRESH_TOKEN`（周一内容生成/编辑工作流的受保护入口）

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

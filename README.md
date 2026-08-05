# BAYBIMAI

[BAYBIMAI.org](https://baybimai.org) 是一个面向 BIM 学习与企业服务的落地页，包含：

- Revit 闪电入门课（Stripe 一次性支付）
- 企业 BIM 培训与 BIM 审计介绍
- 线索收集表单
- Stripe Checkout、签名 Webhook 与 D1 订单记录

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
- `ELEVENLABS_API_KEY`（仅在服务端使用，用于 Mark / Korina 语音朗读）

## 构建与部署

```bash
npm run build
npx wrangler deploy
```

线上密钥通过 Cloudflare Worker Secrets 配置。数据库迁移位于 `drizzle/`。

> GitHub 用于保存和协作源码。由于项目包含 Worker API、Stripe Webhook 和 D1，
> 完整应用继续部署在 Cloudflare，而不是 GitHub Pages。

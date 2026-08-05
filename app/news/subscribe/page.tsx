import type { Metadata } from "next";
import SubscribeView from "../subscribe-view";

export const metadata: Metadata = {
  title: "订阅每日 BIM 深度报告 | BAYBIMAI",
  description: "每日更新的 BIM 头条与关键信号总结。月度会员 $5.9，年度会员 $59。",
  alternates: {
    canonical: "/news/subscribe",
    languages: {
      "zh-CN": "/news/subscribe",
      en: "/en/news/subscribe",
    },
  },
};

export default function NewsSubscribePage() {
  return <SubscribeView lang="zh" />;
}

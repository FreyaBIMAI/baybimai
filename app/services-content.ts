import type { Lang } from "./dictionaries";

export type ServiceKey = "course" | "training" | "audit";

type ServiceSection = {
  heading: string;
  body: string;
};

type ServiceContent = {
  backLabel: string;
  eyebrow: string;
  title: string;
  intro: string;
  sections: ServiceSection[];
  ctaHeading: string;
  ctaIntro: string;
};

export const servicesContent: Record<Lang, Record<ServiceKey, ServiceContent>> = {
  zh: {
    course: {
      backLabel: "返回首页",
      eyebrow: "TO C · 主线",
      title: "Revit 闪电入门课",
      intro:
        "面向零基础学习者，用最短路径掌握 Revit 建模与真实项目里会用到的工作流程。",
      sections: [
        {
          heading: "适合谁",
          body: "刚接触 BIM/Revit 的设计与工程从业者，或者需要快速补齐建模能力、准备转岗的人。不需要任何 Revit 基础，跟着课程从零开始即可。",
        },
        {
          heading: "你会学到什么",
          body: "从界面与项目样板开始，逐步覆盖建模、族、视图、出图与协同的核心工作流程。每一节都对应真实项目里会遇到的场景，而不是孤立的软件功能介绍。",
        },
        {
          heading: "怎么学",
          body: "购买后立即解锁全部内容，按自己的节奏学习，可以反复回看。遇到具体问题，也可以直接联系我们。",
        },
      ],
      ctaHeading: "开始学习",
      ctaIntro: "$59，一次性购买，永久访问。",
    },
    training: {
      backLabel: "返回首页",
      eyebrow: "TO B · 企业",
      title: "企业 BIM 培训",
      intro:
        "围绕你们团队真实的项目类型、工具现状与交付目标设计课程，让培训直接服务于正在推进的项目，而不是通用的软件教学。",
      sections: [
        {
          heading: "适合谁",
          body: "设计院、施工总包与业主方的 BIM/VDC 团队，尤其是刚组建团队、或正在标准化建模与协同流程的组织。",
        },
        {
          heading: "培训会覆盖什么",
          body: "从建模标准、族库管理到跨专业协同与出图规范，具体内容根据你们团队现有的工作流定制，也可以针对某一个项目做专项培训。",
        },
        {
          heading: "怎么开始",
          body: "填写下面的表单，简单说明团队规模、项目类型和目前遇到的问题，我们了解需求后会给出具体的培训方案与报价。",
        },
      ],
      ctaHeading: "预约企业培训咨询",
      ctaIntro: "留下联系方式，我们会在 1-2 个工作日内回复。",
    },
    audit: {
      backLabel: "返回首页",
      eyebrow: "TO B · 专项",
      title: "BIM 咨询",
      intro:
        "独立检查模型质量、标准执行与交付完整性，在验收或关键节点前提前发现问题。",
      sections: [
        {
          heading: "适合谁",
          body: "需要第三方视角检查模型质量的项目团队，或者需要在交付前确认标准执行情况的项目经理与业主方。",
        },
        {
          heading: "审计会检查什么",
          body: "模型的几何与信息准确性、命名与分类标准、跨专业协同冲突，以及是否满足项目 BIM 执行计划（BEP）的要求。",
        },
        {
          heading: "交付什么",
          body: "一份结构化的审计报告，列出发现的问题、影响程度与具体修改建议，帮助团队在验收前完成整改。",
        },
      ],
      ctaHeading: "预约 BIM 咨询",
      ctaIntro: "告诉我们项目情况和时间节点，我们会尽快联系你安排审计范围。",
    },
  },
  en: {
    course: {
      backLabel: "Back to home",
      eyebrow: "TO C · FLAGSHIP",
      title: "Revit Fast-Start Course",
      intro:
        "For complete beginners — the shortest real path to fluent Revit modeling and the workflows you'll actually use on projects.",
      sections: [
        {
          heading: "Who it's for",
          body: "Design and engineering professionals just getting started with BIM/Revit, or anyone switching roles who needs to get productive fast. No prior Revit experience required.",
        },
        {
          heading: "What you'll learn",
          body: "Starting from the interface and project templates, the course builds up through modeling, families, views, sheets, and coordination. Every lesson maps to a real project scenario, not an isolated feature tour.",
        },
        {
          heading: "How it works",
          body: "Everything unlocks immediately after purchase. Learn at your own pace, revisit any lesson, and reach out directly if you get stuck on something specific.",
        },
      ],
      ctaHeading: "Start learning",
      ctaIntro: "$59, one-time purchase, lifetime access.",
    },
    training: {
      backLabel: "Back to home",
      eyebrow: "TO B · ENTERPRISE",
      title: "Enterprise BIM Training",
      intro:
        "Curriculum built around your team's current tools, project types, and delivery goals — training that serves the work already underway, not a generic software class.",
      sections: [
        {
          heading: "Who it's for",
          body: "BIM/VDC teams at design firms, general contractors, and owners — especially teams that are newly formed or standardizing their modeling and coordination workflows.",
        },
        {
          heading: "What training covers",
          body: "From modeling standards and family library management to cross-discipline coordination and drawing production — content is tailored to your team's existing workflow, or focused on a specific project.",
        },
        {
          heading: "How to start",
          body: "Fill out the form below with your team size, project types, and current pain points. We'll follow up with a concrete training plan and quote.",
        },
      ],
      ctaHeading: "Request enterprise training",
      ctaIntro: "Leave your details and we'll get back to you within 1-2 business days.",
    },
    audit: {
      backLabel: "Back to home",
      eyebrow: "TO B · SPECIALIZED",
      title: "BIM Consulting",
      intro:
        "An independent check of model quality, standards compliance, and delivery completeness — catching issues before a handover or a key milestone.",
      sections: [
        {
          heading: "Who it's for",
          body: "Project teams that need a third-party check on model quality, or project managers and owners confirming standards compliance before delivery.",
        },
        {
          heading: "What we check",
          body: "Geometric and information accuracy, naming and classification standards, cross-discipline coordination clashes, and whether the model meets the project's BIM Execution Plan (BEP).",
        },
        {
          heading: "What you get",
          body: "A structured audit report listing every issue found, its severity, and concrete recommendations — so your team can resolve them before sign-off.",
        },
      ],
      ctaHeading: "Request a BIM audit",
      ctaIntro: "Tell us about your project and timeline, and we'll follow up to scope the audit.",
    },
  },
};

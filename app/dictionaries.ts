export type Lang = "zh" | "en";

export type OfferTheme = "green" | "blue" | "purple" | "paper";

export type Offer = {
  tag: string;
  title: string;
  copy: string;
  note: string;
  featured: boolean;
  detailHref: string;
  theme: OfferTheme;
};

type Dictionary = {
  langToggleLabel: string;
  langToggleAria: string;
  skipLink: string;
  nav: {
    ariaLabel: string;
    brandAria: string;
    homeLabel: string;
    courseLabel: string;
    newsLabel: string;
    careersLabel: string;
    radarLabel: string;
    dailyLabel: string;
  };
  hero: {
    eyebrow: string;
    titleBefore: string;
    titleEm: string;
    titleAfter: string;
    titleLine2: string;
    subtitleLine1: string;
    subtitleLine2: string;
  };
  form: {
    nameLabel: string;
    namePlaceholder: string;
    emailLabel: string;
    emailPlaceholder: string;
    honeypotLabel: string;
    submit: string;
    submitting: string;
    successMessage: string;
    defaultError: string;
  };
  offersSection: {
    eyebrow: string;
    heading: string;
    detailLabel: string;
  };
  offers: Offer[];
  purchase: {
    cta: string;
    loading: string;
    error: string;
  };
  footer: {
    brandAria: string;
    tagline: string;
  };
};

export const floatingTerms: Record<Lang, string[]> = {
  zh: [
    "BIM MANAGER",
    "REVIT 建模",
    "DYNAMO",
    "BIM COORDINATOR",
    "参数化设计",
    "NAVISWORKS",
    "族库管理",
    "LOD 300",
    "模型审计",
    "AUTODESK REVIT",
    "碰撞检测",
    "项目交付",
  ],
  en: [
    "BIM MANAGER",
    "REVIT MODELING",
    "DYNAMO",
    "BIM COORDINATOR",
    "PARAMETRIC DESIGN",
    "NAVISWORKS",
    "FAMILY LIBRARY",
    "LOD 300",
    "MODEL AUDIT",
    "AUTODESK REVIT",
    "CLASH DETECTION",
    "PROJECT DELIVERY",
  ],
};

export const dictionaries: Record<Lang, Dictionary> = {
  zh: {
    langToggleLabel: "EN",
    langToggleAria: "切换到英文",
    skipLink: "跳到主要内容",
    nav: {
      ariaLabel: "主导航",
      brandAria: "BAYBIMAI 首页",
      homeLabel: "HOME",
      courseLabel: "COURSE",
      newsLabel: "NEWS",
      careersLabel: "Careers",
      radarLabel: "HOTSPOT ｜ RADAR",
      dailyLabel: "Founder Daily",
    },
    hero: {
      eyebrow: "从课程到企业落地",
      titleBefore: "把 ",
      titleEm: "BIM",
      titleAfter: " 学到",
      titleLine2: "真正能用。",
      subtitleLine1: "面向个人的实战课程包，面向企业的定制培训。",
      subtitleLine2: "需要更严格的项目把关，我们也提供独立 BIM 审计。",
    },
    form: {
      nameLabel: "姓名（必填）",
      namePlaceholder: "您的姓名",
      emailLabel: "邮件（必填）",
      emailPlaceholder: "name@company.com",
      honeypotLabel: "网站",
      submit: "提交",
      submitting: "提交中…",
      successMessage: "谢谢，已经收到😊",
      defaultError: "暂时无法提交，请稍后再试。",
    },
    offersSection: {
      eyebrow: "发现课程",
      heading: "学习、培训、审计、新闻，一条清晰的能力路径。",
      detailLabel: "了解详情",
    },
    offers: [
      {
        tag: "TO C · 主线",
        title: "Revit 闪电入门课",
        copy: "面向零基础学习者，快速掌握 Revit 基础建模与常用工作流程。随时学习，学完就能上手。",
        note: "$59 · 一次性购买",
        featured: true,
        detailHref: "/course",
        theme: "green",
      },
      {
        tag: "新闻 · 观察",
        title: "BIM 新闻与深度报告",
        copy: "追踪真正影响 BIM、造价与项目控制的施工科技变化，仿古纸阅读页面，支持语音朗读。",
        note: "每周更新 · 支持语音朗读",
        featured: false,
        detailHref: "/news",
        theme: "paper",
      },
      {
        tag: "TO B · 专项",
        title: "BIM 审计",
        copy: "独立检查模型质量、标准执行与交付完整性，提前识别影响协同和验收的问题。",
        note: "适合项目节点与交付前审查",
        featured: false,
        detailHref: "/audit",
        theme: "purple",
      },
      {
        tag: "TO B · 企业",
        title: "企业 BIM 培训",
        copy: "围绕团队现状、项目类型和交付目标定制课程，让培训直接服务于正在发生的项目。",
        note: "适合设计院、施工与业主团队",
        featured: false,
        detailHref: "/training",
        theme: "blue",
      },
    ],
    purchase: {
      cta: "立即购买",
      loading: "正在打开付款页…",
      error: "暂时无法打开付款页，请稍后再试。",
    },
    footer: {
      brandAria: "BAYBIMAI 首页",
      tagline: "让 BIM 能力真正进入工作。",
    },
  },
  en: {
    langToggleLabel: "中文",
    langToggleAria: "Switch to Chinese",
    skipLink: "Skip to main content",
    nav: {
      ariaLabel: "Main navigation",
      brandAria: "BAYBIMAI home",
      homeLabel: "HOME",
      courseLabel: "COURSE",
      newsLabel: "NEWS",
      careersLabel: "Careers",
      radarLabel: "HOTSPOT ｜ RADAR",
      dailyLabel: "Founder Daily",
    },
    hero: {
      eyebrow: "From courses to enterprise delivery",
      titleBefore: "Learn ",
      titleEm: "BIM",
      titleAfter: ",",
      titleLine2: "put it to real work.",
      subtitleLine1:
        "Hands-on courses for individuals, tailored training for teams.",
      subtitleLine2:
        "Need tighter project oversight? We also offer independent BIM audits.",
    },
    form: {
      nameLabel: "Name (required)",
      namePlaceholder: "Your name",
      emailLabel: "Email (required)",
      emailPlaceholder: "name@company.com",
      honeypotLabel: "Website",
      submit: "Submit",
      submitting: "Submitting…",
      successMessage: "Thanks, got it 😊",
      defaultError: "Couldn't submit right now — please try again shortly.",
    },
    offersSection: {
      eyebrow: "DISCOVER COURSES",
      heading:
        "Learn, train, audit, and stay informed — one clear path to real capability.",
      detailLabel: "Learn more",
    },
    offers: [
      {
        tag: "TO C · FLAGSHIP",
        title: "Revit Fast-Start Course",
        copy: "For complete beginners — get fluent in core Revit modeling and everyday workflows, fast. Learn on your own schedule, apply it immediately.",
        note: "$59 · one-time purchase",
        featured: true,
        detailHref: "/en/course",
        theme: "green",
      },
      {
        tag: "NEWS · FIELD NOTES",
        title: "BIM News & Deep Dives",
        copy: "Tracking the construction-tech shifts that actually change modeling, estimating, and project control. A parchment reading page with read-aloud support.",
        note: "Updated weekly · Listen mode available",
        featured: false,
        detailHref: "/en/news",
        theme: "paper",
      },
      {
        tag: "TO B · SPECIALIZED",
        title: "BIM Audit",
        copy: "An independent check of model quality, standards compliance, and delivery completeness — catching issues before they affect coordination or sign-off.",
        note: "For project milestones & pre-delivery review",
        featured: false,
        detailHref: "/en/audit",
        theme: "purple",
      },
      {
        tag: "TO B · ENTERPRISE",
        title: "Enterprise BIM Training",
        copy: "Curriculum built around your team's current tools, project types, and delivery goals — training that serves the work already underway.",
        note: "For design firms, contractors & owners",
        featured: false,
        detailHref: "/en/training",
        theme: "blue",
      },
    ],
    purchase: {
      cta: "Buy Now",
      loading: "Opening checkout…",
      error: "Checkout is unavailable right now — please try again shortly.",
    },
    footer: {
      brandAria: "BAYBIMAI home",
      tagline: "Turning BIM skills into real work.",
    },
  },
};

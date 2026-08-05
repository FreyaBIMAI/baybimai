export type NewsLang = "zh" | "en";

export const ARTICLE_SLUG = "construction-ai-agents-2026";

const sources = {
  procore:
    "https://www.procore.com/press/procore-introduces-digital-coworker-packages-expands-ai-agent-library-and-previews-skills-to-help-construction-teams-put-ai-to-work",
  trimbleTakeoff:
    "https://news.trimble.com/New-Trimble-AI-Takeoff-Capabilities-Cut-MEP-Estimating-Time-and-Increase-Accuracy",
  trimbleFinancials:
    "https://news.trimble.com/2026-07-20-Trimble-Launches-New-Financial-Management-System-for-Small-business-Contractors",
  autodesk:
    "https://adsknews.autodesk.com/en/news/autodesk-construction-cloud-is-now-autodesk-forma/",
  autodeskJuly:
    "https://www.autodesk.com/blogs/construction/july-autodesk-forma-construction-releases-built-for-whats-next/",
  procoreNotes:
    "https://investors.procore.com/news/news-details/2026/Procore-Technologies-Inc--Announces-Proposed-Private-Placement-of-750-0-Million-of-Convertible-Senior-Notes/default.aspx",
  trimbleWebinar:
    "https://www.trimble.com/en/events",
};

export const newsContent = {
  zh: {
    locale: "zh-CN",
    homePath: "/",
    newsPath: "/news",
    articlePath: `/news/${ARTICLE_SLUG}`,
    switchPath: "/en/news",
    switchArticlePath: `/en/news/${ARTICLE_SLUG}`,
    switchLabel: "EN",
    brandAria: "BAYBIMAI 首页",
    navAria: "新闻导航",
    navHome: "课程与服务",
    navNews: "新闻",
    navCareers: "湾区求职",
    careersPath: "/careers",
    navRadar: "全球 BIM 雷达",
    radarPath: "/radar",
    skip: "跳到主要内容",
    footer: "BIM、施工科技与职业能力的独立观察。",
    index: {
      eyebrow: "BAYBIMAI DAILY · 2026.08.05",
      titleBefore: "本周施工科技：",
      titleEm: "AI 开始进入真实流程",
      titleAfter: "与资本周期",
      intro:
        "不追逐泛泛的技术热词，只追踪真正改变模型、造价、项目控制与交付方式的产品变化。",
      membership: {
        label: "MEMBER BRIEFING",
        title: "每天，一份可执行的 BIM 情报。",
        body: "获取头条深度报告、三条关键信号和完整历史归档。按月或按年订阅，随时可取消。",
        price: "$5.9 / 月 · $59 / 年",
        cta: "查看订阅说明",
        href: "/news/subscribe",
      },
      featuredLabel: "本周 BIM 深度报告",
      featuredTitle: "从 Forma 70+ 项更新到 Procore 融资：施工 AI 进入落地周",
      featuredSummary:
        "Autodesk 把 AI 放进模型、RFI 与成本流程，Procore 为下一阶段扩张准备资本，Trimble 则把 AI Takeoff 推向估算团队的实际培训场景。",
      readArticle: "阅读全文",
      readTime: "约 9 分钟",
      signalTitle: "今日三个关键信号",
      signals: [
        {
          company: "PROCORE",
          date: "2026.08.03",
          title: "Procore 提出发行 7.5 亿美元可转换优先票据",
          copy: "这不是单一产品更新，但它说明施工软件的 AI 竞赛已经同时进入产品、基础设施投入与资本配置阶段。",
          href: sources.procoreNotes,
        },
        {
          company: "TRIMBLE",
          date: "2026.08.18 · UPCOMING",
          title: "Trimble 把电气 AI Takeoff 带进估算实操",
          copy: "即将举行的线上演示聚焦对话式 AI 与自动化如何兼顾投标速度和算量准确性，落点非常明确：更快赢得更有利润的工作。",
          href: sources.trimbleWebinar,
        },
        {
          company: "AUTODESK",
          date: "2026.07.22",
          title: "Autodesk Forma 一次发布 70+ 项施工更新",
          copy: "AI 房间识别、手机端 AI RFI、成本与时间自动设置，以及跨项目模板共享，开始把智能能力嵌入项目日常。",
          href: sources.autodeskJuly,
        },
      ],
      sourceLabel: "查看官方来源",
    },
    reader: {
      progressLabel: "文章阅读进度",
      listen: "朗读",
      loading: "正在生成所选声音…",
      pause: "暂停",
      resume: "继续",
      stop: "停止",
      speed: "语速",
      voice: "朗读声音",
      previewVoice: "试听",
      previewingVoice: "试听中…",
      voiceReady: "声音已选择，可以开始朗读",
      cloudVoice: "高质量云端",
      browserVoice: "浏览器朗读",
      fontSmaller: "字号－",
      fontLarger: "字号＋",
      dark: "深色阅读",
      light: "浅色阅读",
      idle: "可以开始朗读",
      playing: "正在朗读",
      paused: "朗读已暂停",
      stopped: "朗读已停止",
      complete: "朗读完成",
      unsupported: "语音朗读暂不可用",
      fallback: "云端朗读暂不可用，已切换到浏览器朗读",
      error: "所选声音暂不可用，请稍后再试",
      restored: "已恢复上次阅读位置",
    },
    article: {
      back: "返回新闻首页",
      category: "BIM 深度报告",
      date: "2026 年 8 月 5 日",
      readTime: "约 8 分钟阅读",
      title: "从 Forma 70+ 项更新到 Procore 融资：施工 AI 进入落地周",
      deck:
        "本周最重要的不是又出现一个聊天助手，而是 AI 同时进入模型定位、RFI、成本、估算培训与平台资本配置。施工科技正在从功能展示走向规模化执行。",
      intro:
        "截至 8 月 5 日，最近两周的官方动作给出了一个清晰信号：施工 AI 的竞争已经不只看模型会不会回答问题，而是看它能否进入高频工作流、被团队采用，并获得持续投入。",
      sections: [
        {
          number: "01",
          title: "Forma 的 70+ 项更新，把 AI 塞进每天要做的事",
          paragraphs: [
            "Autodesk 7 月施工版本一次列出 70 多项更新。最值得关注的是 AI 房间与区域识别、手机端 AI 快速创建 RFI，以及成本管理中依据成本与时间自动设置资源日期。",
            "这些功能没有要求项目团队离开原有流程。AI 直接出现在 Location、RFI 和 Cost Management 里，这比独立聊天窗口更容易形成真实使用频率。",
            "跨 Hub 共享项目模板同样关键。企业标准能否跨项目复制，决定 AI 和自动化究竟是一次性演示，还是组织能力。",
          ],
        },
        {
          number: "02",
          title: "Procore 的 7.5 亿美元融资动作，是资本层面的信号",
          paragraphs: [
            "8 月 3 日，Procore 宣布拟发行 7.5 亿美元可转换优先票据。官方文件属于资本市场动作，不等于这笔资金会全部投入 AI，但它发生在 Digital Coworker 与 20 个预构建代理发布之后。",
            "可以合理推断，头部施工 SaaS 的竞争正在变得更重：模型推理、数据治理、企业定制、销售与客户采用都需要持续资金。",
            "对从业者而言，这意味着 AI 功能不会停留在插件阶段。平台会更积极地把它们打包、定价并嵌入企业采购。",
          ],
        },
        {
          number: "03",
          title: "Trimble 把 AI Takeoff 从发布带到估算团队培训",
          paragraphs: [
            "Trimble 将在 8 月 18 日举行电气算量线上演示，主题直接指向对话式 AI、自动化、准确性与投标盈利。",
            "这说明产品发布后的下一步是用户教育：估算师要知道 AI 识别了什么、哪里需要复核，以及速度提升是否真正转化成更多有效投标。",
            "BIM 和造价人员最值得练习的能力，是建立一套可量化的复核流程：识别率、漏项、人工修订时间、报价偏差和中标率。",
          ],
        },
        {
          number: "04",
          title: "ACC 并入 Forma：平台争夺的是全生命周期上下文",
          paragraphs: [
            "Autodesk 在 3 月 24 日将 Autodesk Construction Cloud 正式纳入 Autodesk Forma。官方把 Forma 定义为面向建筑师、工程师、承包商与业主的端到端、云端、AI 原生平台，目标是连接规划、设计、施工和运营。",
            "对现有 ACC 用户来说，短期内最明显的是品牌与产品结构变化；更长期的意义，是设计意图、施工执行和运营数据被放进同一个平台方向。AI 如果要对项目做出可靠判断，就需要跨阶段的上下文，而不是只看到单个模型或一组孤立文档。",
            "这会继续推动 CDE、模型协调、造价、现场管理和资产数据之间的连接。未来的优势不只是会操作某一个软件，而是理解信息如何在项目全生命周期中被创建、验证、移交和复用。",
          ],
        },
        {
          number: "05",
          title: "对 BIM/VDC、造价与求职方向意味着什么",
          paragraphs: [
            "第一，建模速度仍然重要，但它不再足以形成长期差异。能定义标准、审查质量、设计数据结构并把业务规则落入工具的人，更难被替代。",
            "第二，造价与项目控制需要更靠近模型数据。AI Takeoff、Job Costing 和财务系统的连接，使“模型量—预算—实际成本—利润”成为更连续的分析路径。",
            "第三，企业培训应从软件按钮转向工作流能力。团队需要知道何时信任代理、如何复核结果、如何记录例外，以及怎样让标准在多个项目间保持一致。",
            "第四，求职者可以重点积累四类证据：可复用的 BIM 标准、模型审计案例、跨软件数据工作流，以及对项目成本或进度产生影响的量化成果。",
          ],
        },
      ],
      takeawayTitle: "BAYBIMAI 判断",
      takeaways: [
        "施工 AI 的竞争点正在从“能否回答”转向“能否按企业标准执行”。",
        "BIM 数据的价值要通过造价、进度、风险与运营结果来证明。",
        "BIM 管理者的新任务，是把组织经验变成可验证、可治理的数字流程。",
        "学习路径应从单软件熟练度升级为模型、数据、流程和商业结果的连接能力。",
      ],
      note:
        "本文基于截至 2026 年 8 月 5 日的官方信息撰写。对资本用途和行业影响的判断属于 BAYBIMAI 编辑分析，不代表相关公司的承诺或产品路线保证。",
      sourcesTitle: "官方资料",
      sources: [
        {
          label: "Autodesk — 2026 年 7 月 Forma 施工产品更新",
          href: sources.autodeskJuly,
        },
        {
          label: "Procore — 7.5 亿美元可转换优先票据公告",
          href: sources.procoreNotes,
        },
        {
          label: "Trimble — 2026 年 8 月 AI Takeoff 线上活动",
          href: sources.trimbleWebinar,
        },
        {
          label: "Procore — Digital Coworker、AI Agents 与 Skills",
          href: sources.procore,
        },
        {
          label: "Trimble — 新一代 MEP AI Takeoff",
          href: sources.trimbleTakeoff,
        },
        {
          label: "Trimble — Financials 与 Job Costing",
          href: sources.trimbleFinancials,
        },
        {
          label: "Autodesk — Construction Cloud 现已并入 Forma",
          href: sources.autodesk,
        },
      ],
    },
  },
  en: {
    locale: "en-US",
    homePath: "/en",
    newsPath: "/en/news",
    articlePath: "/en/news/weekly-bim-intelligence-001",
    switchPath: "/news",
    switchArticlePath: `/news/${ARTICLE_SLUG}`,
    switchLabel: "中文",
    brandAria: "BAYBIMAI home",
    navAria: "News navigation",
    navHome: "Courses & services",
    navNews: "News",
    navCareers: "Bay Area careers",
    careersPath: "/en/careers",
    navRadar: "Global BIM radar",
    radarPath: "/en/radar",
    skip: "Skip to main content",
    footer: "Independent notes on BIM, construction technology, and careers.",
    index: {
      eyebrow: "DAILY BIM INTELLIGENCE · JUL 30, 2026",
      titleBefore: "The renovation economy is changing",
      titleEm: "what BIM expertise is worth",
      titleAfter: "",
      intro:
        "No generic tech hype—only product shifts that change how models, estimating, project controls, and delivery actually work.",
      membership: {
        label: "MEMBER BRIEFING",
        title: "One actionable BIM intelligence brief, every day.",
        body: "Get the lead story, three key signals, and the full archive. Subscribe monthly or yearly and cancel any time.",
        price: "$5.9 / mo · $59 / yr",
        cta: "View membership",
        href: "/en/news/subscribe",
      },
      featuredLabel: "Weekly BIM Intelligence · #001",
      featuredTitle:
        "From China’s urban-renewal wave to Singapore’s CORENET X mandate",
      featuredSummary:
        "Five signals on existing-condition BIM, openBIM submissions, AI judgment, coordinate-system risk, and the move beyond pure modeling.",
      readArticle: "Read Issue #001",
      readTime: "8 min read",
      signalTitle: "Three signals today",
      signals: [
        {
          company: "PROCORE",
          date: "JUL 23, 2026",
          title: "Digital Coworker expands to 20 construction AI agents",
          copy: "Starter, Pro, and Enterprise packages bring search, RFIs, daily logs, scheduling, changes, and safety into one agent system.",
          href: sources.procore,
        },
        {
          company: "TRIMBLE",
          date: "JUN 30 — JUL 20, 2026",
          title:
            "AI Takeoff and construction financials form a more continuous data chain",
          copy: "MEP drawing recognition reduces setup work, while Financials connects budgets, actual cost, and project profitability.",
          href: sources.trimbleFinancials,
        },
        {
          company: "AUTODESK",
          date: "MAR 24, 2026",
          title: "Autodesk Construction Cloud officially becomes Forma",
          copy: "Design, construction, and operations now sit within an AI-native industry-cloud direction where data continuity is central.",
          href: sources.autodesk,
        },
      ],
      sourceLabel: "Open official source",
    },
    reader: {
      progressLabel: "Article reading progress",
      listen: "Listen",
      loading: "Preparing the selected voice…",
      pause: "Pause",
      resume: "Resume",
      stop: "Stop",
      speed: "Speed",
      voice: "Reading voice",
      previewVoice: "Preview",
      previewingVoice: "Previewing…",
      voiceReady: "Voice selected. Ready to read.",
      cloudVoice: "Studio voice",
      browserVoice: "Browser voice",
      fontSmaller: "Text −",
      fontLarger: "Text +",
      dark: "Dark reading",
      light: "Light reading",
      idle: "Ready to listen",
      playing: "Reading article aloud",
      paused: "Reading paused",
      stopped: "Reading stopped",
      complete: "Reading complete",
      unsupported: "Speech reading is temporarily unavailable",
      fallback: "Studio voice is unavailable. Switched to your browser voice.",
      error: "The selected voice is temporarily unavailable. Please try again.",
      restored: "Your previous reading position was restored",
    },
    article: {
      back: "Back to News",
      category: "BIM Deep Report",
      date: "July 27, 2026",
      readTime: "About 9 min",
      title:
        "Construction AI is no longer just answering questions. It is starting to execute company workflows.",
      deck:
        "Recent moves from Procore, Trimble, and Autodesk point to the same shift: AI is moving from chat interfaces into company standards, connected data, and daily execution.",
      intro:
        "For the past two years, the default image of AI in construction software was a chat box on the right side of a platform. By mid-2026, that image is changing. A new generation of products is moving beyond finding answers toward understanding company standards, executing multi-step workflows, and connecting models, takeoff, cost, and field records.",
      sections: [
        {
          number: "01",
          title: "From copilot to Digital Coworker",
          paragraphs: [
            "On July 23, Procore introduced three Digital Coworker packages. Starter includes five pre-built agents covering deep search, submittal review, RFIs, daily logs, and contract review. Pro expands access to 20 agents. Enterprise adds Agent Studio and deeper customization.",
            "The important signal is not simply the agent count. Safety, scheduling, change, bidding, and quality workflows are becoming executable tasks. AI is moving from a question-answering layer to a participant in the project workflow.",
            "Procore also includes Control Tower, which gives administrators visibility into usage by agent, project, and team member. Once AI enters real workflows, governance, permissions, and cost visibility become prerequisites for scale.",
          ],
        },
        {
          number: "02",
          title: "Company standards are becoming executable AI rules",
          paragraphs: [
            "Procore’s upcoming Skills capability acts like an organizational knowledge layer. Companies can use plain-language prompts or documents such as standard operating procedures and project standards to teach agents how work should be performed across projects.",
            "For BIM and VDC teams, this matters more than whether a general model knows Revit. Delivery quality depends on naming rules, model breakdown, LOD boundaries, clash closure criteria, RFI escalation, and review responsibility. Those rules have traditionally been scattered across BEPs, templates, checklists, and senior staff experience.",
            "BIM management roles therefore do not simply disappear. People who can translate tacit experience into clear standards, validate AI output, and design exception handling become essential to reliable agent systems.",
          ],
        },
        {
          number: "03",
          title: "Trimble connects AI takeoff to cost and business outcomes",
          paragraphs: [
            "On June 30, Trimble announced new MEP AI Takeoff capabilities that recognize objects in construction drawings, reduce repetitive setup, and automate parts of the recognition workflow. The immediate goal is to remove a bottleneck for estimating teams facing more bids without more headcount.",
            "On July 20, Trimble announced U.S. availability of Trimble Financials, a construction-specific financial management and job-costing system for small contractors. It tracks expenses by job, phase, and cost type and presents estimated versus actual cost, project status, and profitability in dashboards.",
            "Trimble says Financials connects with its estimating and performance-tracking solutions. The larger direction is clear: the value of AI takeoff is not only faster quantities, but whether those quantities continue into proposals, cost, progress, and margin decisions.",
          ],
        },
        {
          number: "04",
          title: "ACC joins Forma: platforms compete for lifecycle context",
          paragraphs: [
            "On March 24, Autodesk Construction Cloud became part of Autodesk Forma. Autodesk positions Forma as an end-to-end, cloud-based, AI-native platform for architects, engineers, contractors, and owners, connecting planning, design, construction, and operations.",
            "For existing ACC users, the immediate change is brand and product structure. The longer-term implication is that design intent, project execution, and operations data sit within one platform direction. Reliable AI decisions require cross-phase context, not only a single model or an isolated document set.",
            "This will keep pushing connections among common data environments, model coordination, estimating, field management, and asset data. The durable skill is not operating one product; it is understanding how information is created, verified, handed over, and reused across the project lifecycle.",
          ],
        },
        {
          number: "05",
          title: "What it means for BIM/VDC, cost, controls, and careers",
          paragraphs: [
            "Modeling speed remains useful, but it is no longer enough to create lasting differentiation. Defining standards, auditing quality, structuring data, and translating business rules into tools are harder to replace.",
            "Estimating and project controls need to move closer to model data. AI Takeoff, job costing, and financial systems make model quantities, budgets, actual costs, and margin a more continuous analytical path.",
            "Enterprise training should move from software buttons to workflow capability: when to trust an agent, how to verify output, how to document exceptions, and how to keep standards consistent across projects.",
            "Job seekers can build evidence in four areas: reusable BIM standards, model-audit cases, cross-platform data workflows, and quantified impact on project cost or schedule.",
          ],
        },
      ],
      takeawayTitle: "BAYBIMAI view",
      takeaways: [
        "Construction AI is shifting from answering questions to executing company standards.",
        "BIM data must prove value through cost, schedule, risk, and operational outcomes.",
        "The new task for BIM managers is turning organizational experience into verifiable, governable digital workflows.",
        "Learning paths should connect models, data, processes, and business outcomes—not stop at one software product.",
      ],
      note:
        "This report is based on official product information available through July 27, 2026. Industry implications are BAYBIMAI editorial analysis and do not represent product commitments or roadmap guarantees from the companies mentioned.",
      sourcesTitle: "Official sources",
      sources: [
        {
          label: "Procore — Digital Coworker, AI Agents, and Skills",
          href: sources.procore,
        },
        {
          label: "Trimble — New MEP AI Takeoff capabilities",
          href: sources.trimbleTakeoff,
        },
        {
          label: "Trimble — Financials and job costing",
          href: sources.trimbleFinancials,
        },
        {
          label: "Autodesk — Construction Cloud is now Forma",
          href: sources.autodesk,
        },
      ],
    },
  },
} as const;

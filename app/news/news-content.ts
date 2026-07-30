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
      eyebrow: "BAYBIMAI FIELD NOTES · 2026.07.27",
      titleBefore: "BIM 正在进入",
      titleEm: "可执行的 AI",
      titleAfter: "时代",
      intro:
        "不追逐泛泛的技术热词，只追踪真正改变模型、造价、项目控制与交付方式的产品变化。",
      featuredLabel: "本周 BIM 深度报告",
      featuredTitle: "施工 AI 不再只回答问题：它开始执行公司的流程",
      featuredSummary:
        "从 Procore Digital Coworker、Trimble AI Takeoff 到 Autodesk Forma，施工软件正在从“提供工具”转向“理解标准、执行流程、连接结果”。",
      readArticle: "阅读全文",
      readTime: "约 9 分钟",
      signalTitle: "本周三个关键信号",
      signals: [
        {
          company: "PROCORE",
          date: "2026.07.23",
          title: "Digital Coworker 扩展到 20 个施工 AI Agents",
          copy: "Starter、Pro、Enterprise 三档产品把搜索、RFI、日志、进度、变更和安全工作流带入同一套代理体系。",
          href: sources.procore,
        },
        {
          company: "TRIMBLE",
          date: "2026.06.30 — 07.20",
          title: "AI Takeoff 与施工财务开始形成连续数据链",
          copy: "MEP 图纸识别减少算量前置操作，Financials 则把预算、实际成本和项目盈利放进施工专用财务视图。",
          href: sources.trimbleFinancials,
        },
        {
          company: "AUTODESK",
          date: "2026.03.24",
          title: "Autodesk Construction Cloud 正式并入 Forma",
          copy: "设计、施工与运营被放进一个 AI 原生行业云方向，数据连续性正在成为平台竞争的核心。",
          href: sources.autodesk,
        },
      ],
      sourceLabel: "查看官方来源",
    },
    reader: {
      progressLabel: "文章阅读进度",
      listen: "朗读",
      pause: "暂停",
      resume: "继续",
      stop: "停止",
      speed: "语速",
      fontSmaller: "字号－",
      fontLarger: "字号＋",
      dark: "深色阅读",
      light: "浅色阅读",
      idle: "可以开始朗读",
      playing: "正在朗读",
      paused: "朗读已暂停",
      stopped: "朗读已停止",
      complete: "朗读完成",
      unsupported: "当前浏览器不支持语音朗读",
      restored: "已恢复上次阅读位置",
    },
    article: {
      back: "返回新闻首页",
      category: "BIM 深度报告",
      date: "2026 年 7 月 27 日",
      readTime: "约 9 分钟阅读",
      title: "施工 AI 不再只回答问题：它开始执行公司的流程",
      deck:
        "Procore、Trimble 与 Autodesk 最近的产品动作指向同一个变化：AI 正从聊天入口进入施工公司的标准、数据链与日常执行。",
      intro:
        "过去两年，施工软件谈 AI 时最常见的画面，是在平台右侧增加一个对话框。到了 2026 年中，这个画面正在变化。最新一批产品不再满足于“帮你找到答案”，而是试图理解公司的项目标准、执行多步骤工作流，并把模型、算量、成本和现场记录连接起来。",
      sections: [
        {
          number: "01",
          title: "从 Copilot 到 Digital Coworker",
          paragraphs: [
            "7 月 23 日，Procore 发布三档 Digital Coworker 产品包。Starter 提供 5 个预构建代理，覆盖深度搜索、送审资料审查、RFI、每日施工日志和合同审查；Pro 扩展到 20 个代理；Enterprise 则增加 Agent Studio 和更深入的企业定制能力。",
            "这组产品最值得注意的，不是代理数量，而是工作范围。安全、进度、变更、投标与质量等流程开始被拆成可执行任务。AI 的位置由“平台里的问答助手”变成“平台里的工作参与者”。",
            "Procore 同时提供 Control Tower，让管理员查看不同代理、项目和成员的使用情况。施工 AI 一旦真正进入业务流程，治理、权限和成本可见性就不再是附加项，而是能否规模化使用的前提。",
          ],
        },
        {
          number: "02",
          title: "公司的标准，开始变成 AI 的执行规则",
          paragraphs: [
            "Procore 预告的 Skills 更接近一个组织能力层。企业可以通过自然语言提示或公司的标准作业程序、项目标准等文件，把自己的做事方式交给 AI，使代理在不同项目上持续应用相同要求。",
            "对 BIM/VDC 团队来说，这比通用模型“懂不懂 Revit”更重要。真正决定交付质量的，往往是命名规则、模型拆分、LOD 边界、碰撞关闭条件、RFI 升级路径和审查责任。过去这些规则分散在 BEP、模板、检查表与资深员工经验里；现在平台开始尝试把它们变成可执行的数字规则。",
            "这也意味着 BIM 管理岗位不会简单消失。相反，能够把模糊经验转译成清晰标准、验证 AI 结果并设计例外处理的人，会成为代理系统能否可靠运行的关键。",
          ],
        },
        {
          number: "03",
          title: "Trimble 把 AI Takeoff 接向成本与经营结果",
          paragraphs: [
            "Trimble 在 6 月 30 日发布新的 MEP AI Takeoff 能力，通过施工图中的对象识别，减少算量前的重复设置并自动化部分识别工作。它解决的是估算团队最直接的瓶颈：在投标量增加时，如何减少人工描图与重复录入。",
            "7 月 20 日，Trimble 又宣布在美国提供 Trimble Financials。这套面向小型承包商的施工财务与 Job Costing 系统，可以按项目、阶段与成本类型追踪费用，并在仪表板中呈现估算与实际成本、项目状态和盈利情况。",
            "官方信息显示 Financials 可与 Trimble 的估算和绩效追踪方案连接。由此可以看出一个明确方向：AI Takeoff 的价值不只在于“算得更快”，而在于算量结果是否能够继续进入报价、成本、进度与利润判断。数据链越连续，BIM 与造价的边界就越薄。",
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
        "本文基于截至 2026 年 7 月 27 日的官方产品信息撰写。对行业影响的判断属于 BAYBIMAI 编辑分析，不代表相关公司的承诺或产品路线保证。",
      sourcesTitle: "官方资料",
      sources: [
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
      eyebrow: "WEEKLY BIM INTELLIGENCE · JUL 30, 2026",
      titleBefore: "The renovation economy is changing",
      titleEm: "what BIM expertise is worth",
      titleAfter: "",
      intro:
        "No generic tech hype—only product shifts that change how models, estimating, project controls, and delivery actually work.",
      featuredLabel: "Weekly BIM Intelligence · #001",
      featuredTitle:
        "From China’s urban-renewal wave to Singapore’s CORENET X mandate",
      featuredSummary:
        "Five signals on existing-condition BIM, openBIM submissions, AI judgment, coordinate-system risk, and the move beyond pure modeling.",
      readArticle: "Read Issue #001",
      readTime: "8 min read",
      signalTitle: "Three signals this week",
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
      pause: "Pause",
      resume: "Resume",
      stop: "Stop",
      speed: "Speed",
      fontSmaller: "Text −",
      fontLarger: "Text +",
      dark: "Dark reading",
      light: "Light reading",
      idle: "Ready to listen",
      playing: "Reading article aloud",
      paused: "Reading paused",
      stopped: "Reading stopped",
      complete: "Reading complete",
      unsupported: "Speech reading is not supported in this browser",
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

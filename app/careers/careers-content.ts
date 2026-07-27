export type CareersLang = "zh" | "en";

export type CompanyProfile = {
  id: string;
  name: string;
  icon: string;
  revenueUsd: number;
  marketCapUsd: number | null;
  revenue: string;
  valuation: string;
  revenuePeriod: string;
  type: string;
  location: string;
  summary: string;
  hrFocus: string;
  roles: string[];
  careersUrl: string;
  presenceUrl: string;
  revenueSource: string;
  marketSource?: string;
  visaSummary?: string;
  visaSource?: string;
};

type CompanyBase = Omit<
  CompanyProfile,
  | "type"
  | "location"
  | "summary"
  | "hrFocus"
  | "roles"
  | "revenue"
  | "valuation"
  | "revenuePeriod"
  | "visaSummary"
>;

const bases: CompanyBase[] = [
  {
    id: "turner",
    name: "Turner Construction",
    icon: "/company-logos/turner.png",
    revenueUsd: 29.2,
    marketCapUsd: null,
    careersUrl: "https://www.turnerconstruction.com/careers",
    presenceUrl:
      "https://www.turnerconstruction.com/locations/san-francisco-bay-area",
    revenueSource:
      "https://www.turnerconstruction.com/insights/turner-achieves-record-revenue-and-backlog-in-2025",
    visaSource: "https://www.myvisajobs.com/employer/turner-construction/",
  },
  {
    id: "bechtel",
    name: "Bechtel",
    icon: "/company-logos/bechtel.png",
    revenueUsd: 20.6,
    marketCapUsd: null,
    careersUrl: "https://jobs.bechtel.com/us/en",
    presenceUrl:
      "https://www.bechtel.com/press-releases/bechtel-awarded-contract-for-bart-silicon-valley-extension/",
    revenueSource: "https://www.bechtel.com/impact/financials/",
    visaSource: "https://www.myvisajobs.com/employer/bechtel-international/",
  },
  {
    id: "aecom",
    name: "AECOM",
    icon: "/company-logos/aecom.png",
    revenueUsd: 16.1,
    marketCapUsd: 8.69,
    careersUrl: "https://aecom.com/careers/",
    presenceUrl: "https://aecom.com/careers/",
    revenueSource: "https://investors.aecom.com/",
    marketSource: "https://companiesmarketcap.com/aecom/marketcap/",
    visaSource: "https://www.myvisajobs.com/employer/aecom/",
  },
  {
    id: "dpr",
    name: "DPR Construction",
    icon: "/company-logos/dpr.png",
    revenueUsd: 14.1,
    marketCapUsd: null,
    careersUrl: "https://www.dpr.com/company/careers/current-positions",
    presenceUrl: "https://www.dpr.com/company/careers/current-positions",
    revenueSource: "https://www.dpr.com/press-room",
    visaSource:
      "https://www.myvisajobs.com/employer/dpr-construction-a-general-partnership/",
  },
  {
    id: "wsp",
    name: "WSP",
    icon: "/company-logos/wsp.png",
    revenueUsd: 13.3,
    marketCapUsd: 15.37,
    careersUrl:
      "https://www.wsp.com/en-us/careers/job-opportunities?country=US",
    presenceUrl:
      "https://www.wsp.com/en-us/contact-us/offices/united-states/california/san-francisco",
    revenueSource:
      "https://www.wsp.com/en-ca/news/2026/wsp-releases-strong-q4-2025-results-and-issues-2026-financial-outlook",
    marketSource: "https://companiesmarketcap.com/wsp-global/marketcap/",
    visaSource: "https://h1bgrader.com/h1b-sponsors/wsp-usa-inc-p1kz9mmj0m",
  },
  {
    id: "jacobs",
    name: "Jacobs",
    icon: "/company-logos/jacobs.png",
    revenueUsd: 12.03,
    marketCapUsd: 15.89,
    careersUrl: "https://careers.jacobs.com/",
    presenceUrl: "https://careers.jacobs.com/",
    revenueSource:
      "https://www.jacobs.com/newsroom/press-release/jacobs-reports-strong-fiscal-fourth-quarter-and-fiscal-year-2025-earnings",
    marketSource:
      "https://www.macrotrends.net/stocks/charts/J/jacobs-solutions/market-cap",
    visaSource: "https://www.myvisajobs.com/employer/jacobs/",
  },
  {
    id: "stantec",
    name: "Stantec",
    icon: "/company-logos/stantec.png",
    revenueUsd: 6,
    marketCapUsd: 7.61,
    careersUrl: "https://stantec.jobs/",
    presenceUrl:
      "https://www.stantec.com/en/offices/united-states-locations/california-offices-filtered",
    revenueSource:
      "https://www.stantec.com/uk/news/2026/stantec-reports-record-2025-results-provides-2026-outlook",
    marketSource: "https://companiesmarketcap.com/stantec/marketcap/",
    visaSource:
      "https://www.myvisajobs.com/employer/stantec-consulting-services/",
  },
  {
    id: "arup",
    name: "Arup",
    icon: "/company-logos/arup.png",
    revenueUsd: 2.9,
    marketCapUsd: null,
    careersUrl: "https://jobs.arup.com/page/americas-region-3",
    presenceUrl: "https://jobs.arup.com/page/americas-region-3",
    visaSource: "https://www.myvisajobs.com/employer/arup/",
    revenueSource:
      "https://www.arup.com/globalassets/downloads/corporate-documents/financial-statements/arup-financial-statement-2025.pdf",
  },
];

const companyCopy: Record<
  CareersLang,
  Record<
    string,
    Pick<
      CompanyProfile,
      | "type"
      | "location"
      | "summary"
      | "hrFocus"
      | "roles"
      | "revenue"
      | "valuation"
      | "revenuePeriod"
      | "visaSummary"
    >
  >
> = {
  zh: {
    turner: {
      type: "总承包 · 施工管理",
      location: "Walnut Creek · 服务整个湾区",
      summary: "适合想把模型直接用于施工计划、协调、算量和现场交付的人。",
      hrFocus: "安全意识、项目责任感、跨专业协作，以及你如何把问题推进到关闭。",
      roles: ["VDC Engineer", "Project Engineer", "Preconstruction"],
      revenue: "$29.2B",
      valuation: "私营子公司 · 未单独公开",
      revenuePeriod: "2025 年集团营收",
      visaSummary:
        "有 H-1B 与 PERM 绿卡申请记录：2022–2024 财年提交约 164 份 H-1B LCA、15 份绿卡劳工证；2025 财年新增 3 份 PERM 申请，平均年薪约 $95,035。近年岗位数量有所下降，建议以官方招聘页当前岗位为准。",
    },
    bechtel: {
      type: "EPC · 大型基础设施",
      location: "San Jose 项目线索 · BART Silicon Valley",
      summary: "偏大型交通、能源和复杂工程，适合强调流程、交付纪律与系统思维。",
      hrFocus: "大型项目经验、结构化沟通、地点与项目调动意愿，以及严谨的执行记录。",
      roles: ["Digital Delivery", "BIM / Engineering Systems", "Project Controls"],
      revenue: "$20.6B",
      valuation: "私营公司 · 未公开",
      revenuePeriod: "2024 年 principal revenue",
      visaSummary:
        "多个关联主体（如 Bechtel Hydrocarbon Technology Solutions、Bechtel Oil Gas & Chemicals）分别提交 H-1B/绿卡申请，2022–2024 财年各自数量从个位数到约 53 份不等，规模相对温和。",
    },
    aecom: {
      type: "工程咨询 · 基础设施",
      location: "San Francisco / Oakland 招聘覆盖",
      summary: "多专业、公共基础设施和大型业主项目较多，重视数字交付与客户沟通。",
      hrFocus: "为什么选择该业务线、跨学科协作、客户影响，以及可量化的交付结果。",
      roles: ["BIM Specialist", "Digital Delivery", "Design Technology"],
      revenue: "$16.1B",
      valuation: "约 $8.69B",
      revenuePeriod: "FY2025 集团营收",
      visaSummary:
        "常年提交 H-1B LCA 与绿卡 PERM 申请，常见受资助岗位包括 Environmental Engineer、Software Developer；员工评价中提到公司绿卡政策相对合理。暂未找到最新精确数量，建议直接查证。",
    },
    dpr: {
      type: "技术型总承包 · VDC",
      location: "San Francisco · Santa Clara · Silicon Valley",
      summary: "湾区技术项目密度高，VDC 与施工业务结合紧，适合展示协调和现场成果。",
      hrFocus: "协作型领导、技术型项目经验、主动解决问题，以及 VDC 对成本工期的影响。",
      roles: ["VDC Engineer", "Project Engineer", "Reality Capture"],
      revenue: "$14.1B",
      valuation: "员工持有私营公司 · 未公开",
      revenuePeriod: "2025 年集团营收",
      visaSummary:
        "2021–2023 财年有 H-1B LCA 与绿卡劳工证申请记录（含核准、拒绝与撤回等状态）；员工评价提到团队协作好、绿卡赞助政策合理。",
    },
    wsp: {
      type: "工程咨询 · 建筑与交通",
      location: "San Francisco · San Jose",
      summary: "建筑、交通和基础设施岗位广，适合跨专业 BIM 与数字咨询背景。",
      hrFocus: "咨询沟通、专业深度、服务客户的方式，以及在矩阵团队中的协作能力。",
      roles: ["BIM Coordinator", "Digital Advisory", "Buildings Engineer"],
      revenue: "C$18.285B",
      valuation: "约 US$15.37B",
      revenuePeriod: "2025 年集团营收",
      visaSummary:
        "WSP USA Inc 2025 财年提交约 264 份 H-1B LCA；美国劳工部未将其列为 H-1B 依赖型雇主或存在恶意违规记录，同时提交绿卡 PERM 申请。",
    },
    jacobs: {
      type: "工程咨询 · 先进设施",
      location: "Bay Area 项目与岗位覆盖",
      summary: "先进制造、生命科学、数据中心和基础设施方向，重视系统化交付。",
      hrFocus: "任务导向、复杂系统经验、跨专业接口，以及你如何降低项目风险。",
      roles: ["BIM / CAD Lead", "Digital Delivery", "Advanced Facilities"],
      revenue: "$12.03B",
      valuation: "约 $15.89B",
      revenuePeriod: "FY2025 gross revenue",
      visaSummary:
        "2025 财年提交约 163 份 H-1B LCA，同时提交绿卡 PERM 申请；常见受资助岗位包括 Mechanical Engineer。",
    },
    stantec: {
      type: "设计与工程咨询",
      location: "San Francisco · San Jose · Walnut Creek",
      summary: "本地办公室网络密集，建筑、交通、水务和社区项目都有机会。",
      hrFocus: "客户关系、专业判断、社区影响，以及如何在标准化与项目需求间取舍。",
      roles: ["BIM Designer", "Digital Practice", "Project Coordinator"],
      revenue: "C$8.144B",
      valuation: "约 US$7.61B",
      revenuePeriod: "2025 年 gross revenue",
      visaSummary:
        "Stantec Consulting Services 2025 财年合计提交约 293 份 H-1B LCA 与绿卡 PERM 申请；注意 2021–2023 财年该主体一度没有新申请记录，赞助节奏并不稳定。",
    },
    arup: {
      type: "设计工程 · 技术顾问",
      location: "San Francisco",
      summary: "强调设计质量、技术深度和跨学科思考，适合有清晰作品逻辑的人。",
      hrFocus: "解决问题的方法、协作价值观、技术好奇心，以及为什么工作对社会有意义。",
      roles: ["BIM Coordinator", "Digital Consultant", "Building Services"],
      revenue: "£2.159B",
      valuation: "信托持有 · 无公开市值",
      revenuePeriod: "FY2025 集团营收",
      visaSummary:
        "多个 Arup 关联主体持续提交 H-1B 与绿卡 PERM 申请；员工评价不一，有人认为绿卡赞助政策合理，也有分部反馈移民支持一般，建议按具体办公室核实。",
    },
  },
  en: {
    turner: {
      type: "General contractor · CM",
      location: "Walnut Creek · Bay Area-wide",
      summary:
        "A strong fit for people who turn models into planning, coordination, takeoff, and field delivery.",
      hrFocus:
        "Safety, ownership, cross-trade collaboration, and how you drove an issue through closure.",
      roles: ["VDC Engineer", "Project Engineer", "Preconstruction"],
      revenue: "$29.2B",
      valuation: "Private subsidiary · not separately disclosed",
      revenuePeriod: "2025 group revenue",
      visaSummary:
        "Active H-1B and PERM sponsor: roughly 164 H-1B LCAs and 15 green-card labor certifications filed FY2022–2024; 3 new PERM filings in FY2025 at an average salary near $95,035. Filing volume has been trending down—verify current openings on the official careers page.",
    },
    bechtel: {
      type: "EPC · Major infrastructure",
      location: "San Jose project signal · BART Silicon Valley",
      summary:
        "Large transit, energy, and complex programs that reward process discipline and systems thinking.",
      hrFocus:
        "Megaproject experience, structured communication, mobility, and a rigorous delivery record.",
      roles: ["Digital Delivery", "BIM / Engineering Systems", "Project Controls"],
      revenue: "$20.6B",
      valuation: "Private · not disclosed",
      revenuePeriod: "2024 principal revenue",
      visaSummary:
        "Several Bechtel entities (e.g. Bechtel Hydrocarbon Technology Solutions, Bechtel Oil Gas & Chemicals) file H-1B/green-card petitions separately, each in the single digits to roughly 53 filings across FY2022–2024—modest but active sponsorship.",
    },
    aecom: {
      type: "Engineering consultancy · Infrastructure",
      location: "San Francisco / Oakland hiring footprint",
      summary:
        "Multidisciplinary public-infrastructure work with a strong digital-delivery and client focus.",
      hrFocus:
        "Why this business line, multidisciplinary teamwork, client impact, and measurable outcomes.",
      roles: ["BIM Specialist", "Digital Delivery", "Design Technology"],
      revenue: "$16.1B",
      valuation: "Approx. $8.69B",
      revenuePeriod: "FY2025 group revenue",
      visaSummary:
        "Regular H-1B LCA and green-card PERM filer; commonly sponsored roles include Environmental Engineer and Software Developer. Employee reports describe the green-card policy as reasonable. No precise recent count found—verify directly.",
    },
    dpr: {
      type: "Technical GC · VDC",
      location: "San Francisco · Santa Clara · Silicon Valley",
      summary:
        "Dense Bay Area technical work and mature VDC delivery—ideal for coordination and field-impact stories.",
      hrFocus:
        "Collaborative leadership, technical projects, initiative, and VDC impact on cost or schedule.",
      roles: ["VDC Engineer", "Project Engineer", "Reality Capture"],
      revenue: "$14.1B",
      valuation: "Employee-owned private company · not disclosed",
      revenuePeriod: "2025 group revenue",
      visaSummary:
        "H-1B LCA and green-card labor certification filings on record for FY2021–2023 (mix of certified, denied, and withdrawn). Employee reviews cite strong team collaboration and a reasonable green-card sponsorship policy.",
    },
    wsp: {
      type: "Engineering consultancy · Buildings & transit",
      location: "San Francisco · San Jose",
      summary:
        "A broad mix of buildings, transportation, and infrastructure roles for multidisciplinary BIM talent.",
      hrFocus:
        "Consulting communication, discipline depth, client service, and matrix-team collaboration.",
      roles: ["BIM Coordinator", "Digital Advisory", "Buildings Engineer"],
      revenue: "C$18.285B",
      valuation: "Approx. US$15.37B",
      revenuePeriod: "2025 group revenue",
      visaSummary:
        "WSP USA Inc filed about 264 H-1B LCAs in FY2025; not classified by DOL as H-1B dependent or a willful violator. Also files green-card PERM petitions.",
    },
    jacobs: {
      type: "Engineering consultancy · Advanced facilities",
      location: "Bay Area project and hiring footprint",
      summary:
        "Advanced manufacturing, life sciences, data centers, and infrastructure with systems-led delivery.",
      hrFocus:
        "Mission focus, complex systems, interface management, and how your work reduced project risk.",
      roles: ["BIM / CAD Lead", "Digital Delivery", "Advanced Facilities"],
      revenue: "$12.03B",
      valuation: "Approx. $15.89B",
      revenuePeriod: "FY2025 gross revenue",
      visaSummary:
        "Filed about 163 H-1B LCAs in FY2025 and also sponsors green-card PERM cases; Mechanical Engineer is a commonly sponsored title.",
    },
    stantec: {
      type: "Design & engineering consultancy",
      location: "San Francisco · San Jose · Walnut Creek",
      summary:
        "A dense local office network spanning buildings, transportation, water, and community work.",
      hrFocus:
        "Client relationships, professional judgment, community impact, and balancing standards with project needs.",
      roles: ["BIM Designer", "Digital Practice", "Project Coordinator"],
      revenue: "C$8.144B",
      valuation: "Approx. US$7.61B",
      revenuePeriod: "2025 gross revenue",
      visaSummary:
        "Stantec Consulting Services filed roughly 293 combined H-1B LCA and green-card PERM applications in FY2025 — though the same entity shows no new filings for FY2021–2023, so sponsorship activity has been uneven year to year.",
    },
    arup: {
      type: "Design engineering · Technical advisory",
      location: "San Francisco",
      summary:
        "A design-led, technically rigorous environment for candidates with a clear portfolio narrative.",
      hrFocus:
        "Problem-solving method, collaborative values, technical curiosity, and socially useful work.",
      roles: ["BIM Coordinator", "Digital Consultant", "Building Services"],
      revenue: "£2.159B",
      valuation: "Trust-owned · no public market cap",
      revenuePeriod: "FY2025 group revenue",
      visaSummary:
        "Multiple Arup entities file H-1B and green-card PERM petitions on an ongoing basis. Employee reports are mixed — some describe reasonable green-card support, others report weaker immigration support at specific offices, so verify by office.",
    },
  },
};

export const companiesByLang: Record<CareersLang, CompanyProfile[]> = {
  zh: bases.map((company) => ({
    ...company,
    ...companyCopy.zh[company.id],
  })),
  en: bases.map((company) => ({
    ...company,
    ...companyCopy.en[company.id],
  })),
};

export const careersContent = {
  zh: {
    locale: "zh-CN",
    switchPath: "/en/careers",
    switchLabel: "EN",
    hero: {
      eyebrow: "BAY AREA AEC CAREER ATLAS · 2026.07.27",
      titleBefore: "湾区 AEC 公司，",
      titleEm: "先看规模",
      titleAfter: "，再准备面试。",
      intro:
        "把湾区常见的总承包、工程咨询与设计工程公司放在同一张可比较的地图里，并把 HR 初筛、作品集和技术面试准备拆成可执行步骤。",
      stats: [
        ["8", "重点公司"],
        ["2", "规模排序口径"],
        ["7 天", "面试准备计划"],
      ],
    },
    ranking: {
      eyebrow: "COMPANY SIGNALS",
      title: "公司图标榜单",
      intro:
        "默认按最新公开集团年营收的美元近似值排序；切换到市值时，仅对上市公司排名。",
      sortLabel: "排序依据",
      revenueSort: "年营收",
      valuationSort: "上市公司市值",
      revenueMetric: "最新公开年营收",
      valuationMetric: "估值 / 市值",
      bayAreaSignal: "湾区线索",
      targetRoles: "建议搜索岗位",
      hrFocus: "HR 初筛重点",
      careersCta: "打开官方招聘",
      evidence: "数据与湾区依据",
      revenueSource: "营收来源",
      marketSource: "市值来源",
      presenceSource: "湾区依据",
      visaFocus: "H-1B / PERM 绿卡赞助情况",
      visaSourceLabel: "签证数据来源",
      privateRank: "未公开",
      asOf: "数据快照：2026 年 7 月 27 日",
    },
    prep: {
      eyebrow: "INTERVIEW PREP",
      title: "先分清面试的是施工方，还是设计咨询方",
      intro:
        "同样叫 BIM / VDC，雇主真正想听的证据不同。先按公司类型准备案例，再练通用 HR 回答。",
      tracks: [
        {
          number: "01",
          title: "总承包 / EPC",
          companyLine: "Turner · DPR · Bechtel",
          points: [
            "用一个协调问题讲清楚：发现 → 升级 → 决策 → 关闭。",
            "准备可量化结果：减少返工、碰撞关闭率、RFI 数量、工期或算量效率。",
            "能解释模型如何服务现场，而不只是展示 Revit 操作。",
            "准备安全、责任感、冲突沟通和快节奏项目的 STAR 故事。",
          ],
        },
        {
          number: "02",
          title: "设计 / 工程咨询",
          companyLine: "AECOM · WSP · Jacobs · Stantec · Arup",
          points: [
            "展示标准、模板、模型健康和跨专业接口管理。",
            "说明你如何把客户目标转成信息需求与交付规则。",
            "准备一段对非 BIM 同事解释复杂技术问题的案例。",
            "突出设计判断、专业深度、质量复核与多办公室协作。",
          ],
        },
      ],
      screenTitle: "HR 初筛：六个必须准备的回答",
      screenItems: [
        ["60 秒自我介绍", "现在做什么、最强证据、为什么转向这家公司。"],
        ["为什么是这家公司", "指出一个业务线、项目类型或工作方式，不说空泛的“平台大”。"],
        ["三个 STAR 故事", "协作、冲突、失败复盘各一个；每个控制在 90 秒。"],
        ["岗位与地点", "确认通勤、混合办公、出差和项目调动接受度。"],
        ["工作授权", "如实、简洁回答当前授权与未来 sponsorship 需求。"],
        ["薪资预期", "先确认岗位范围与总包结构，再给基于职位区间的合理范围。"],
      ],
      portfolioTitle: "BIM / VDC 作品集：每个项目只讲五件事",
      portfolioItems: [
        "项目规模、阶段、你的职责边界",
        "最难的问题与约束条件",
        "你设计的模型、标准或协调工作流",
        "你本人做出的关键判断",
        "结果：质量、成本、工期或风险变化",
      ],
      questionsTitle: "高频追问",
      questions: [
        "讲一个你发现模型质量问题，但项目团队最初不认同的案例。",
        "你如何定义碰撞可以关闭？谁有最终决定权？",
        "如果收到的模型无法按计划用于协调，你先做哪三步？",
        "你如何把 Revit / Navisworks / ACC 数据交给项目控制或现场团队？",
        "你做过最有价值的一次自动化是什么？如何验证没有产生新风险？",
        "当标准与项目实际冲突时，你如何决定例外？",
      ],
      planTitle: "7 天冲刺计划",
      days: [
        ["D-7", "选 3 家", "按业务类型、湾区地点与岗位关键词缩小范围。"],
        ["D-6", "拆 JD", "把每条要求映射到自己的一个证据。"],
        ["D-5", "改作品集", "每个项目压缩成问题—方法—结果。"],
        ["D-4", "练 HR", "录下 60 秒介绍和三个 STAR 故事。"],
        ["D-3", "练技术题", "模拟协调、审计、交付和异常处理。"],
        ["D-2", "研究团队", "看公司项目、办公室与招聘页，准备 4 个反问。"],
        ["D-1", "轻量复盘", "检查链接、设备、路线、简历版本和作品集权限。"],
      ],
    },
    methodology: {
      title: "排名口径与免责声明",
      paragraphs: [
        "“年营收”是公司最新公开的全球集团口径，不是湾区办公室产值。跨币种公司按公开数字换算成美元近似值用于排序，卡片保留原报告币种。",
        "“估值”对上市公司使用 2026 年 7 月市场市值近似快照；私营、员工持有或信托持有公司统一标为未公开，不使用未经公司确认的媒体估算。",
        "H-1B / PERM 绿卡赞助信息来自 MyVisaJobs、H1BGrader、H1BData.org 等公开劳工部（LCA / PERM）披露数据的整理网站，反映的是“提交过申请”，不代表个人一定能获批、拿到 offer 或实际入职；本页目前只核实了列表中已有官方数据来源的公司，其余公司请直接在这些网站或 USCIS H-1B Employer Data Hub 上按公司名查询。",
        "岗位数量、地点和招聘流程会变化。申请时只通过公司官方招聘页核对职位；本页不是雇主背书，也不保证获得面试或录用。",
      ],
    },
  },
  en: {
    locale: "en-US",
    switchPath: "/careers",
    switchLabel: "中文",
    hero: {
      eyebrow: "BAY AREA AEC CAREER ATLAS · 2026.07.27",
      titleBefore: "Bay Area AEC firms:",
      titleEm: "compare scale",
      titleAfter: ", then prepare to interview.",
      intro:
        "A comparable map of major contractors, engineering consultancies, and design-engineering firms—plus an actionable plan for the HR screen, portfolio, and technical interview.",
      stats: [
        ["8", "priority firms"],
        ["2", "scale views"],
        ["7 days", "to interview-ready"],
      ],
    },
    ranking: {
      eyebrow: "COMPANY SIGNALS",
      title: "Company icon ranking",
      intro:
        "The default view ranks latest reported group revenue by approximate USD value. Market-cap view ranks public companies only.",
      sortLabel: "Sort by",
      revenueSort: "Annual revenue",
      valuationSort: "Public market cap",
      revenueMetric: "Latest reported revenue",
      valuationMetric: "Valuation / market cap",
      bayAreaSignal: "Bay Area signal",
      targetRoles: "Search these roles",
      hrFocus: "HR screen focus",
      careersCta: "Open official careers",
      evidence: "Data and Bay Area evidence",
      revenueSource: "Revenue source",
      marketSource: "Market-cap source",
      presenceSource: "Bay Area evidence",
      visaFocus: "H-1B / PERM green card sponsorship",
      visaSourceLabel: "Visa data source",
      privateRank: "Not public",
      asOf: "Data snapshot: July 27, 2026",
    },
    prep: {
      eyebrow: "INTERVIEW PREP",
      title: "First decide whether you are interviewing with a builder or a design consultancy",
      intro:
        "BIM and VDC titles overlap, but the evidence employers want is different. Prepare by firm type, then rehearse the common HR screen.",
      tracks: [
        {
          number: "01",
          title: "General contractor / EPC",
          companyLine: "Turner · DPR · Bechtel",
          points: [
            "Tell one coordination story end to end: discover → escalate → decide → close.",
            "Bring measured outcomes: avoided rework, closure rate, RFIs, schedule, or takeoff efficiency.",
            "Explain how the model served the field—not only how you operated Revit.",
            "Prepare STAR stories on safety, ownership, conflict, and fast-paced delivery.",
          ],
        },
        {
          number: "02",
          title: "Design / engineering consultancy",
          companyLine: "AECOM · WSP · Jacobs · Stantec · Arup",
          points: [
            "Show standards, templates, model health, and interface management.",
            "Explain how client goals became information requirements and delivery rules.",
            "Prepare an example of explaining a technical issue to a non-BIM stakeholder.",
            "Emphasize design judgment, quality review, and multi-office collaboration.",
          ],
        },
      ],
      screenTitle: "HR screen: six answers to prepare",
      screenItems: [
        ["60-second introduction", "What you do now, your strongest proof, and why this move."],
        ["Why this firm", "Name a business line, project type, or way of working—not just its size."],
        ["Three STAR stories", "One each for teamwork, conflict, and a failure you learned from."],
        ["Role and location", "Be clear on commute, hybrid work, travel, and project mobility."],
        ["Work authorization", "Answer your current status and future sponsorship needs accurately."],
        ["Compensation", "Clarify scope and total package, then anchor to the posted role range."],
      ],
      portfolioTitle: "BIM / VDC portfolio: five things per project",
      portfolioItems: [
        "Project scale, phase, and your exact scope",
        "The hardest problem and constraints",
        "The model, standard, or coordination workflow you built",
        "The key judgment you personally made",
        "The result in quality, cost, schedule, or risk",
      ],
      questionsTitle: "Common technical follow-ups",
      questions: [
        "Tell me about a model-quality issue the team initially disagreed with.",
        "How do you define a clash as closed, and who has the final decision?",
        "A received model cannot support coordination on schedule. What are your first three steps?",
        "How do Revit, Navisworks, or ACC data reach project controls or field teams?",
        "What is your most valuable automation, and how did you validate that it introduced no new risk?",
        "How do you decide when project reality requires an exception to the standard?",
      ],
      planTitle: "7-day interview sprint",
      days: [
        ["D-7", "Choose three firms", "Narrow by firm type, Bay Area location, and role keywords."],
        ["D-6", "Map the JD", "Connect every requirement to one piece of evidence."],
        ["D-5", "Edit the portfolio", "Reduce each project to problem—method—result."],
        ["D-4", "Rehearse HR", "Record the 60-second intro and three STAR stories."],
        ["D-3", "Practice technical", "Simulate coordination, audit, delivery, and exception handling."],
        ["D-2", "Research the team", "Review projects, office, and careers pages; prepare four questions."],
        ["D-1", "Light review", "Check links, device, route, resume version, and portfolio access."],
      ],
    },
    methodology: {
      title: "Ranking method and disclaimer",
      paragraphs: [
        "Annual revenue is the latest reported global group figure, not Bay Area office output. Cross-currency values are converted to approximate USD for sorting; each card keeps the original reporting currency.",
        "Valuation uses an approximate July 2026 market-cap snapshot for listed firms. Private, employee-owned, and trust-owned firms are marked not public; unconfirmed media estimates are excluded.",
        "H-1B / PERM green-card sponsorship notes come from public Department of Labor (LCA / PERM) disclosure data as compiled by MyVisaJobs, H1BGrader, and H1BData.org. Filing a petition is not the same as an approval, an offer, or a hire. Only the firms listed here have a sourced note so far — for any other firm, search it directly on those sites or the USCIS H-1B Employer Data Hub.",
        "Openings, locations, and recruiting processes change. Verify every role on the official careers page. This guide is not an employer endorsement and cannot guarantee an interview or offer.",
      ],
    },
  },
} as const;

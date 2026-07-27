export type RadarLang = "zh" | "en";
export type RadarFilter = "all" | "bay" | "global" | "competition";

export type RadarEvent = {
  id: string;
  filter: Exclude<RadarFilter, "all">;
  secondaryFilter?: Exclude<RadarFilter, "all">;
  date: string;
  status: "confirmed" | "watch";
  location: string;
  organizer: string;
  title: string;
  summary: string;
  tags: string[];
  href: string;
};

type ResourceCard = {
  kicker: string;
  title: string;
  summary: string;
  note: string;
  href: string;
};

const links = {
  aiasfData:
    "https://www.aiasf.org/events/ai-ready-building-a-unified-data-foundation-for-aec-firms",
  aiasfRisk:
    "https://www.aiasf.org/events/ai-in-architectural-practice-adoption-responsibility-and-risk",
  aiasfFestival:
    "https://www.aiasf.org/events/2026-architecture--city-the-city-festival-",
  aecHackathon: "https://aechackathon.com/",
  autodeskUniversity:
    "https://www.autodesk.com/blogs/construction/register-now-for-autodesk-university-2026/",
  buildingSmartTokyo:
    "https://www.building-smart.or.jp/bsisummittokyo2026/",
  womenInBim: "https://womeninbim.org/conference/",
  openBimAwards: "https://awards.buildingsmart.org/about/JALwLwEP",
  sbb:
    "https://company.sbb.ch/de/bahnentwicklung/zukunft-bahn/bim/zeitplan-projekte.html",
  sweden:
    "https://www.boverket.se/sv/samhallsplanering/digitalisering/regeringsuppdrag-om-obruten-digital-samhallsbyggnadsprocess/",
  finland: "https://www.buildingsmart.fi/en_GB/rytv",
  finlandRequirements:
    "https://www.buildingsmart.fi/en_GB/rakennetun-ympariston-informaatiomallintamisen-vaatimukset-osa-a",
  buildingSmartStandards: "https://technical.buildingsmart.org/standards/",
  ukFramework: "https://www.ukbimframework.org/about/",
  nbims: "https://nibs.org/nbims/v4/",
  bimForumLod: "https://bimforum.org/lod/",
  aecBench: "https://arxiv.org/abs/2603.29199",
  bimEdit: "https://arxiv.org/abs/2606.20146",
  ifcBench: "https://arxiv.org/abs/2605.01698",
  idsBench: "https://arxiv.org/abs/2605.22079",
  rebecca:
    "https://womeninbim.org/conference/whats-happening/speakers/rebecca-de-cicco/",
  kimon:
    "https://nibs.org/?eventDisplay=past&post_type=tribe_organizer&tribe_organizer=kimon-onuma",
  keith: "https://www.bentley.com/company/executive-bios/",
  leon: "https://mybimapi.com/about/",
};

export const radarContent = {
  zh: {
    skip: "跳到主要内容",
    hero: {
      eyebrow: "GLOBAL BIM RADAR · 核对于 2026.07.27",
      titleBefore: "看见 BIM 的",
      titleEm: "下一站",
      intro:
        "从湾区活动到全球 openBIM 会议，从北欧项目进展到论文、规则与长期建设者路径。这里不是资讯堆砌，而是一张可行动的行业地图。",
      stats: [
        ["08", "活动与比赛入口"],
        ["03", "区域项目追踪"],
        ["12", "标准、论文与人物"],
      ],
      note:
        "日期均来自主办方官网。仅公布季节或尚未确认会期的项目，会明确标记为“持续关注”。",
    },
    anchors: [
      ["#events", "活动"],
      ["#regions", "区域进展"],
      ["#standards", "规则手册"],
      ["#research", "论文"],
      ["#people", "人物路径"],
    ],
    events: {
      eyebrow: "01 / EVENT SIGNALS",
      title: "湾区先行，连接全球",
      intro:
        "按地域与参赛机会筛选。每张卡片都直接链接官方主办方，不使用二手票务或聚合页。",
      filters: {
        all: "全部",
        bay: "湾区",
        global: "全球",
        competition: "比赛 / 评审",
      },
      confirmed: "日期已公布",
      watch: "持续关注",
      official: "查看官网",
      empty: "当前筛选下没有活动。",
      items: [
        {
          id: "aiasf-data",
          filter: "bay",
          date: "2026.08.18",
          status: "confirmed",
          location: "San Francisco · 线下",
          organizer: "AIASF",
          title: "AI-Ready：为 AEC 公司建立统一数据底座",
          summary:
            "围绕 Egnyte、Autodesk Forma 与企业数据整合，适合数字实践、BIM 管理与 IT 负责人。",
          tags: ["AI", "数据治理", "2 LUs 待批"],
          href: links.aiasfData,
        },
        {
          id: "aiasf-risk",
          filter: "bay",
          date: "2026.08.25",
          status: "confirmed",
          location: "San Francisco · 线下",
          organizer: "AIASF",
          title: "建筑实践中的 AI：采用、责任与风险",
          summary:
            "从实施、法律和保险三个角度讨论 AI 工作流、保密、QA/QC 与专业责任。",
          tags: ["AI 治理", "合同", "风险"],
          href: links.aiasfRisk,
        },
        {
          id: "aiasf-festival",
          filter: "bay",
          date: "2026.09.10—09.27",
          status: "confirmed",
          location: "San Francisco · 多场地",
          organizer: "AIASF",
          title: "第 23 届 Architecture + City Festival",
          summary:
            "以城市为现场的展览、讲座、导览和工作坊，是建立湾区设计行业连接的窗口。",
          tags: ["城市", "论坛", "Networking"],
          href: links.aiasfFestival,
        },
        {
          id: "aec-hackathon",
          filter: "bay",
          secondaryFilter: "competition",
          date: "2026 秋季 · 日期待定",
          status: "watch",
          location: "San Francisco",
          organizer: "AEC Hackathon",
          title: "AEC Hackathon 湾区站",
          summary:
            "建筑、工程、施工与技术人才组队做原型。官网已确认 2026 秋季湾区站，具体日期尚未公布。",
          tags: ["Hackathon", "原型", "开放创新"],
          href: links.aecHackathon,
        },
        {
          id: "autodesk-university",
          filter: "global",
          date: "2026.09.15—09.17",
          status: "confirmed",
          location: "Las Vegas + Digital",
          organizer: "Autodesk",
          title: "Autodesk University 2026",
          summary:
            "500+ 场学习内容、80+ 场施工专题，并提供免费数字通行证；适合软件技能、平台路线和职业网络。",
          tags: ["Revit", "Forma", "Digital pass"],
          href: links.autodeskUniversity,
        },
        {
          id: "building-smart-tokyo",
          filter: "global",
          date: "2026.10.06—10.08",
          status: "confirmed",
          location: "Tokyo · Haneda",
          organizer: "buildingSMART",
          title: "buildingSMART International Summit Tokyo",
          summary:
            "预计 600+ 人参与，覆盖标准、技术、工作坊与 openBIM 社群；主语言为英语并计划线上直播。",
          tags: ["IFC", "openBIM", "标准"],
          href: links.buildingSmartTokyo,
        },
        {
          id: "women-in-bim",
          filter: "global",
          date: "2026 系列 · 持续更新",
          status: "watch",
          location: "UK 起源 · 全球网络",
          organizer: "Women in BIM",
          title: "Women in BIM 全球会议与社群",
          summary:
            "由英国起步的全球数字建造社群。官方会议页持续更新区域会议、演讲人与报名意向。",
          tags: ["女性领导力", "Mentorship", "全球社群"],
          href: links.womenInBim,
        },
        {
          id: "openbim-awards",
          filter: "competition",
          date: "2026 项目征集",
          status: "watch",
          location: "Global",
          organizer: "buildingSMART",
          title: "openBIM Awards 2026",
          summary:
            "面向用 buildingSMART 标准解决互操作问题的项目。评审重视 openBIM 使用、创新性和结构清晰的证据。",
          tags: ["Awards", "IFC", "案例提交"],
          href: links.openBimAwards,
        },
      ] satisfies RadarEvent[],
    },
    regions: {
      eyebrow: "02 / REGIONAL PROGRESS",
      title: "项目进展，不只看发布会",
      intro:
        "追踪公共业主、监管机构与行业组织正在推进的真实工作，以时间线、制度和可交付成果为主。",
      official: "查看官方进展",
      cards: [
        {
          code: "CH",
          country: "瑞士 · SBB",
          title: "约 50 个 BIM 场址进入分阶段落地",
          summary:
            "SBB 的路线从 2025 规划、2027 施工、2029 交付延伸到 2031 数据化运维。2025 年 3 月地图显示约 36 个基础设施项目。",
          signal: "当前重点：从规划标准走向施工与资产数据连续性。",
          href: links.sbb,
        },
        {
          code: "SE",
          country: "瑞典 · Boverket",
          title: "连续数字化建设流程延伸至 2030",
          summary:
            "2026 年启动的政府任务覆盖数字规划、国家道路与铁路规范、档案和互操作，由多部门协作推进，2031 年完成总结。",
          signal: "当前重点：公共数据规范、互操作与安全治理。",
          href: links.sweden,
        },
        {
          code: "FI",
          country: "芬兰 · buildingSMART Finland",
          title: "RYTV 把分散要求变成机器可读框架",
          summary:
            "多年期计划统一建筑、基础设施与城市模型要求，并推进可更新、可自动质检的生命周期 BIM 指南。",
          signal: "当前重点：统一要求、bSDD 规则与业主采购指南。",
          href: links.finland,
        },
      ],
    },
    standards: {
      eyebrow: "03 / RULEBOOK SHELF",
      title: "从 IFC 到 BEP：先读对规则",
      intro:
        "按“数据交换—信息管理—项目要求—模型细度”建立阅读顺序。这里提供入口和用途判断，不替代正式标准文本。",
      official: "打开资料",
      cards: [
        {
          kicker: "OPEN STANDARD",
          title: "buildingSMART 技术标准",
          summary: "IFC、BCF、IDS、MVD 与 bSDD 的官方技术入口。",
          note: "先建立数据交换词汇",
          href: links.buildingSmartStandards,
        },
        {
          kicker: "ISO 19650",
          title: "UK IMI Framework",
          summary: "英国实施 ISO 19650 的统一信息管理框架与系列指南。",
          note: "适合信息经理与企业流程",
          href: links.ukFramework,
        },
        {
          kicker: "UNITED STATES",
          title: "NBIMS-US V4",
          summary: "覆盖业主项目要求、BEP、BIM Uses 与 COBie V3 的共识标准。",
          note: "适合美国项目与业主要求",
          href: links.nbims,
        },
        {
          kicker: "MODEL DETAIL",
          title: "BIMForum LOD Specification",
          summary: "用于明确模型元素在不同阶段的几何与信息期望。",
          note: "适合范围边界与交付检查",
          href: links.bimForumLod,
        },
        {
          kicker: "FINLAND",
          title: "RYTV Built Environment Requirements",
          summary: "把建筑、基础设施和城市模型要求纳入统一、可更新框架。",
          note: "关注机器可读与自动质检",
          href: links.finlandRequirements,
        },
      ] satisfies ResourceCard[],
    },
    research: {
      eyebrow: "04 / RESEARCH WATCH",
      title: "论文看能力边界，不追标题热度",
      intro:
        "以下均为 2026 年公开预印本，尚不等同于同行评审定论。重点看任务、数据集和失败率，再判断是否能进入工程流程。",
      preprint: "预印本",
      source: "查看论文",
      cards: [
        {
          date: "2026.03.31",
          title: "AEC-Bench",
          summary:
            "用图纸理解、跨图推理与项目协调任务评估 AEC 智能体，并公开数据集与评测代码。",
          takeaway: "看点：通用智能体在真实项目材料上的可复现能力。",
          href: links.aecBench,
        },
        {
          date: "2026.05.03",
          title: "ifc-bench v2 / Adaptive Exploration",
          summary:
            "1,027 个任务、37 个 IFC 模型，研究智能体如何在运行时探索异构 BIM 数据。",
          takeaway: "看点：不要假设所有 IFC 都有同一种数据组织。",
          href: links.ifcBench,
        },
        {
          date: "2026.05.21",
          title: "Ishigaki-IDS-Bench",
          summary:
            "166 个双语 BIM/IDS 专家样例，测试模型生成可处理、结构正确且内容匹配的 IDS XML。",
          takeaway: "看点：当前模型对标准化 XML 仍不稳定。",
          href: links.idsBench,
        },
        {
          date: "2026.06.18",
          title: "BIM-Edit",
          summary:
            "324 个 IFC 编辑任务覆盖几何、语义和拓扑；最佳模型平均分仅 49.5%。",
          takeaway: "看点：自然语言改模型离可靠工程自动化仍有明显距离。",
          href: links.bimEdit,
        },
      ],
    },
    people: {
      eyebrow: "05 / BUILDER PATHS",
      title: "不做名人榜，拆解长期路线",
      intro:
        "人物不是背书，也不按影响力排名。我们只提炼公开履历中的可学习路径：社区、开放标准、产品与长期基础设施。",
      profile: "查看官方履历",
      cards: [
        {
          initials: "RD",
          image: "/people/rebecca-de-cicco.webp",
          imageAlt: "Rebecca De Cicco 官方头像",
          name: "Rebecca De Cicco",
          role: "Women in BIM 创始人及全球主席",
          path: ["建筑实践", "BIM 与数字领导力", "全球社群与导师网络"],
          lesson: "路径判断：把职业影响力从项目交付扩展到人才与行业结构。",
          href: links.rebecca,
        },
        {
          initials: "KO",
          image: "/people/kimon-onuma.webp",
          imageAlt: "Kimon Onuma 官方头像",
          name: "Kimon Onuma",
          role: "ONUMA 创始人 · BIMStorm 创建者",
          path: ["建筑师 + 开发者", "云端 BIM 与开放数据", "跨机构原型协作"],
          lesson: "路径判断：几十年围绕数据连续性，而不是追逐单一软件。",
          href: links.kimon,
        },
        {
          initials: "KB",
          image: "/people/keith-bentley.webp",
          imageAlt: "Keith Bentley 官方头像",
          name: "Keith Bentley",
          role: "Bentley Systems 联合创始人",
          path: ["软件架构", "MicroStation", "基础设施数字平台"],
          lesson: "路径判断：从核心技术方向长期构建可扩展的行业产品。",
          href: links.keith,
        },
        {
          initials: "LvB",
          image: "/people/leon-van-berlo.webp",
          imageAlt: "Léon van Berlo 官方头像",
          name: "Léon van Berlo",
          role: "MyBimApi 联合创始人及 CEO · 前 buildingSMART 技术负责人",
          path: ["BIMserver 与研究", "开放标准协作", "技术路线治理"],
          lesson: "路径判断：标准工作既需要代码，也需要跨组织共识。",
          href: links.leon,
        },
      ],
    },
    awards: {
      eyebrow: "OPENBIM AWARDS / JURY LENS",
      title: "如果你要投稿，先按评委视角整理证据",
      intro:
        "buildingSMART 官方说明强调 openBIM、开放信息交换、标准的清晰与创新应用，以及简洁、结构化的证据。评委名单会随届次变化，以官网为准。",
      steps: [
        ["01", "问题", "先说清楚原来的互操作痛点与业务后果。"],
        ["02", "标准", "指出使用了 IFC、BCF、IDS、bSDD 或其他 bSI 服务的哪一部分。"],
        ["03", "交换", "用流程图和样例证明信息如何跨团队、软件和阶段流动。"],
        ["04", "结果", "给出质量、时间、成本、风险或运维价值的可核对结果。"],
      ],
      cta: "查看 2026 openBIM Awards",
    },
    note: {
      title: "编辑与更新说明",
      paragraphs: [
        "本页资料核对于 2026 年 7 月 27 日。活动可能改期、售罄或调整形式，请在报名和出行前再次查看主办方官网。",
        "“最新项目进展”仅收录可追溯到公共机构、行业组织、论文作者或主办方的资料。BAYBIMAI 的“看点”和“路径判断”属于编辑分析。",
      ],
      switchLabel: "Read in English",
      switchPath: "/en/radar",
    },
  },
  en: {
    skip: "Skip to main content",
    hero: {
      eyebrow: "GLOBAL BIM RADAR · VERIFIED 2026.07.27",
      titleBefore: "See where BIM",
      titleEm: "moves next",
      intro:
        "From Bay Area gatherings to global openBIM summits, Nordic delivery programs, papers, rulebooks, and the paths of long-term builders. A working industry map, not an undifferentiated feed.",
      stats: [
        ["08", "event and award gateways"],
        ["03", "regional programs tracked"],
        ["12", "standards, papers and people"],
      ],
      note:
        "Dates come from organizer websites. Listings with only a season or no confirmed date are explicitly marked “Watch.”",
    },
    anchors: [
      ["#events", "Events"],
      ["#regions", "Regional progress"],
      ["#standards", "Rulebooks"],
      ["#research", "Research"],
      ["#people", "Builder paths"],
    ],
    events: {
      eyebrow: "01 / EVENT SIGNALS",
      title: "Start in the Bay Area. Connect globally.",
      intro:
        "Filter by geography or submission opportunity. Every card points to the organizer, never a secondary ticket or aggregation page.",
      filters: {
        all: "All",
        bay: "Bay Area",
        global: "Global",
        competition: "Awards / competition",
      },
      confirmed: "Date confirmed",
      watch: "Watch",
      official: "Official page",
      empty: "No events match this filter.",
      items: [
        {
          id: "aiasf-data",
          filter: "bay",
          date: "AUG 18, 2026",
          status: "confirmed",
          location: "San Francisco · In person",
          organizer: "AIASF",
          title: "AI-Ready: A Unified Data Foundation for AEC Firms",
          summary:
            "Egnyte, Autodesk Forma, and enterprise data integration for digital-practice, BIM, and IT leaders.",
          tags: ["AI", "Data governance", "2 LUs pending"],
          href: links.aiasfData,
        },
        {
          id: "aiasf-risk",
          filter: "bay",
          date: "AUG 25, 2026",
          status: "confirmed",
          location: "San Francisco · In person",
          organizer: "AIASF",
          title: "AI in Practice: Adoption, Responsibility, and Risk",
          summary:
            "Implementation, legal, and insurance perspectives on confidentiality, QA/QC, contracts, and professional responsibility.",
          tags: ["AI governance", "Contracts", "Risk"],
          href: links.aiasfRisk,
        },
        {
          id: "aiasf-festival",
          filter: "bay",
          date: "SEP 10—27, 2026",
          status: "confirmed",
          location: "San Francisco · Multiple venues",
          organizer: "AIASF",
          title: "23rd Architecture + City Festival",
          summary:
            "Exhibitions, talks, tours, and workshops across the city—a broad gateway into the Bay Area design community.",
          tags: ["Cities", "Forum", "Networking"],
          href: links.aiasfFestival,
        },
        {
          id: "aec-hackathon",
          filter: "bay",
          secondaryFilter: "competition",
          date: "FALL 2026 · DATE TBD",
          status: "watch",
          location: "San Francisco",
          organizer: "AEC Hackathon",
          title: "AEC Hackathon San Francisco",
          summary:
            "Built-environment and technology teams prototype together. The organizer confirms Fall 2026; exact dates are not published yet.",
          tags: ["Hackathon", "Prototyping", "Open innovation"],
          href: links.aecHackathon,
        },
        {
          id: "autodesk-university",
          filter: "global",
          date: "SEP 15—17, 2026",
          status: "confirmed",
          location: "Las Vegas + Digital",
          organizer: "Autodesk",
          title: "Autodesk University 2026",
          summary:
            "500+ learning sessions, 80+ construction sessions, and a free digital pass for skills, platform roadmaps, and professional connections.",
          tags: ["Revit", "Forma", "Digital pass"],
          href: links.autodeskUniversity,
        },
        {
          id: "building-smart-tokyo",
          filter: "global",
          date: "OCT 06—08, 2026",
          status: "confirmed",
          location: "Tokyo · Haneda",
          organizer: "buildingSMART",
          title: "buildingSMART International Summit Tokyo",
          summary:
            "A projected 600+ participants across standards, technical sessions, workshops, and openBIM community work; streaming is planned.",
          tags: ["IFC", "openBIM", "Standards"],
          href: links.buildingSmartTokyo,
        },
        {
          id: "women-in-bim",
          filter: "global",
          date: "2026 SERIES · UPDATES PENDING",
          status: "watch",
          location: "UK-founded · Global network",
          organizer: "Women in BIM",
          title: "Women in BIM Conferences & Community",
          summary:
            "A UK-founded global digital-construction network. Its official conference hub carries regional events, speakers, and interest registration.",
          tags: ["Women leaders", "Mentorship", "Community"],
          href: links.womenInBim,
        },
        {
          id: "openbim-awards",
          filter: "competition",
          date: "2026 PROGRAM",
          status: "watch",
          location: "Global",
          organizer: "buildingSMART",
          title: "openBIM Awards 2026",
          summary:
            "For projects using buildingSMART standards to solve interoperability challenges. Jurors look for openBIM use, innovation, and structured evidence.",
          tags: ["Awards", "IFC", "Case submission"],
          href: links.openBimAwards,
        },
      ] satisfies RadarEvent[],
    },
    regions: {
      eyebrow: "02 / REGIONAL PROGRESS",
      title: "Track delivery, not launch-day theater",
      intro:
        "Public-owner, regulator, and industry-body work—organized around timelines, governance, and published outputs.",
      official: "Official progress",
      cards: [
        {
          code: "CH",
          country: "Switzerland · SBB",
          title: "About 50 BIM sites enter staged delivery",
          summary:
            "SBB moves from planning in 2025 to construction in 2027, commissioning in 2029, and data-led operations in 2031. Its March 2025 map showed about 36 infrastructure projects.",
          signal: "Current signal: planning standards are moving toward construction and asset-data continuity.",
          href: links.sbb,
        },
        {
          code: "SE",
          country: "Sweden · Boverket",
          title: "A seamless digital built-environment process through 2030",
          summary:
            "The 2026 government mandate spans digital planning, national road and rail specifications, archiving, and interoperability across public agencies.",
          signal: "Current signal: public data specifications, interoperability, and security governance.",
          href: links.sweden,
        },
        {
          code: "FI",
          country: "Finland · buildingSMART Finland",
          title: "RYTV turns fragmented requirements into machine-readable rules",
          summary:
            "The multi-year program aligns building, infrastructure, and city-model requirements around an updatable lifecycle BIM framework and automated QA.",
          signal: "Current signal: shared requirements, bSDD rules, and client procurement guidance.",
          href: links.finland,
        },
      ],
    },
    standards: {
      eyebrow: "03 / RULEBOOK SHELF",
      title: "From IFC to BEP: read the right rule first",
      intro:
        "A practical order—data exchange, information management, project requirements, then model detail. These are gateways and use notes, not substitutes for formal standards.",
      official: "Open resource",
      cards: [
        {
          kicker: "OPEN STANDARD",
          title: "buildingSMART Technical Standards",
          summary: "The official home for IFC, BCF, IDS, MVD, and bSDD.",
          note: "Build the exchange vocabulary first",
          href: links.buildingSmartStandards,
        },
        {
          kicker: "ISO 19650",
          title: "UK IMI Framework",
          summary:
            "The coordinated UK approach and guidance for ISO 19650 information management.",
          note: "For information managers and firm process",
          href: links.ukFramework,
        },
        {
          kicker: "UNITED STATES",
          title: "NBIMS-US V4",
          summary:
            "Consensus modules for owner requirements, BEP, BIM Uses, and COBie V3.",
          note: "For U.S. projects and owner requirements",
          href: links.nbims,
        },
        {
          kicker: "MODEL DETAIL",
          title: "BIMForum LOD Specification",
          summary:
            "Defines geometric and information expectations for model elements by stage.",
          note: "For scope boundaries and delivery checks",
          href: links.bimForumLod,
        },
        {
          kicker: "FINLAND",
          title: "RYTV Built Environment Requirements",
          summary:
            "A unified and updatable framework across buildings, infrastructure, and city models.",
          note: "Watch machine readability and automated QA",
          href: links.finlandRequirements,
        },
      ] satisfies ResourceCard[],
    },
    research: {
      eyebrow: "04 / RESEARCH WATCH",
      title: "Read for capability limits, not headline heat",
      intro:
        "All four are public 2026 preprints, not equivalent to settled peer-reviewed findings. Start with tasks, datasets, and failure rates before moving anything into production.",
      preprint: "Preprint",
      source: "Read paper",
      cards: [
        {
          date: "2026.03.31",
          title: "AEC-Bench",
          summary:
            "Evaluates agents on drawing understanding, cross-sheet reasoning, and project coordination with an open dataset and harness.",
          takeaway: "Watch: reproducible performance on real project artifacts.",
          href: links.aecBench,
        },
        {
          date: "2026.05.03",
          title: "ifc-bench v2 / Adaptive Exploration",
          summary:
            "1,027 tasks across 37 IFC models test agents that explore heterogeneous BIM data at runtime.",
          takeaway: "Watch: IFC files do not share one predictable data layout.",
          href: links.ifcBench,
        },
        {
          date: "2026.05.21",
          title: "Ishigaki-IDS-Bench",
          summary:
            "166 bilingual expert-authored BIM/IDS examples test processable, structured, content-aligned IDS XML.",
          takeaway: "Watch: current models remain unstable on standards-valid XML.",
          href: links.idsBench,
        },
        {
          date: "2026.06.18",
          title: "BIM-Edit",
          summary:
            "324 IFC editing tasks span geometry, semantics, and topology; the best average reported score is 49.5%.",
          takeaway: "Watch: natural-language model editing is not yet reliable automation.",
          href: links.bimEdit,
        },
      ],
    },
    people: {
      eyebrow: "05 / BUILDER PATHS",
      title: "No celebrity list. Study the long route.",
      intro:
        "These profiles are neither endorsements nor influence rankings. They isolate learnable patterns in public careers: community, open standards, product, and infrastructure.",
      profile: "Official profile",
      cards: [
        {
          initials: "RD",
          image: "/people/rebecca-de-cicco.webp",
          imageAlt: "Official portrait of Rebecca De Cicco",
          name: "Rebecca De Cicco",
          role: "Founder & Global Chair, Women in BIM",
          path: ["Architecture practice", "BIM and digital leadership", "Global community and mentoring"],
          lesson:
            "Path signal: extend delivery influence into talent and industry structure.",
          href: links.rebecca,
        },
        {
          initials: "KO",
          image: "/people/kimon-onuma.webp",
          imageAlt: "Official portrait of Kimon Onuma",
          name: "Kimon Onuma",
          role: "Founder, ONUMA · Creator, BIMStorm",
          path: ["Architect + developer", "Cloud BIM and open data", "Cross-organization prototyping"],
          lesson:
            "Path signal: decades around data continuity, not one software cycle.",
          href: links.kimon,
        },
        {
          initials: "KB",
          image: "/people/keith-bentley.webp",
          imageAlt: "Official portrait of Keith Bentley",
          name: "Keith Bentley",
          role: "Co-founder, Bentley Systems",
          path: ["Software architecture", "MicroStation", "Infrastructure platforms"],
          lesson:
            "Path signal: build scalable industry products from durable core technology.",
          href: links.keith,
        },
        {
          initials: "LvB",
          image: "/people/leon-van-berlo.webp",
          imageAlt: "Official portrait of Léon van Berlo",
          name: "Léon van Berlo",
          role: "Co-founder & CEO, MyBimApi · Former buildingSMART technical director",
          path: ["BIMserver and research", "Open-standard collaboration", "Technical road-map governance"],
          lesson:
            "Path signal: standards need both working code and cross-organization consensus.",
          href: links.leon,
        },
      ],
    },
    awards: {
      eyebrow: "OPENBIM AWARDS / JURY LENS",
      title: "Before submitting, organize evidence like a juror",
      intro:
        "buildingSMART emphasizes openBIM, open information exchange, clear and innovative use of its standards, and concise structured evidence. Jury rosters change; use the current official page.",
      steps: [
        ["01", "Problem", "State the interoperability problem and its business consequence."],
        ["02", "Standard", "Name the IFC, BCF, IDS, bSDD, or other bSI component actually used."],
        ["03", "Exchange", "Show how information moved across teams, tools, and project stages."],
        ["04", "Result", "Provide checkable quality, time, cost, risk, or operations outcomes."],
      ],
      cta: "Open the 2026 openBIM Awards",
    },
    note: {
      title: "Editorial and update note",
      paragraphs: [
        "Sources were checked on July 27, 2026. Events may change date, format, capacity, or availability; verify the organizer page before registration or travel.",
        "“Latest progress” is limited to material traceable to a public authority, industry body, paper author, or organizer. BAYBIMAI’s watch notes and path signals are editorial analysis.",
      ],
      switchLabel: "阅读中文版",
      switchPath: "/radar",
    },
  },
} as const;

import type { Lang } from "./dictionaries";

export type SyllabusLesson = {
  code: string;
  title: string;
  minutes: number;
};

export type SyllabusModule = {
  number: string;
  title: string;
  lessons: SyllabusLesson[];
};

export type SyllabusContent = {
  eyebrow: string;
  title: string;
  intro: string;
  backLabel: string;
  statsLessons: string;
  statsHours: string;
  statsAccess: string;
  modules: SyllabusModule[];
  deliveryHeading: string;
  deliveryBody: string;
  ctaHeading: string;
  ctaIntro: string;
  ctaNote: string;
};

// Durations are read directly from the source video files (ffprobe), then
// rounded to the nearest minute. Update this file if the lesson videos are
// re-cut or re-ordered.
export const revitFastStartSyllabus: Record<Lang, SyllabusContent> = {
  zh: {
    eyebrow: "COURSE SYLLABUS",
    title: "7 天 Revit 闪电入门课 · 完整大纲",
    intro:
      "61 讲正课 + 2 讲加餐，从零基础一路做到能独立完成一个项目的建模、协作与出图。每一讲都对应真实工作场景，不是功能说明书式的堆砌。",
    backLabel: "返回课程页",
    statsLessons: "61 讲正课 + 2 讲加餐",
    statsHours: "约 15.5 小时视频",
    statsAccess: "一次购买，永久访问",
    modules: [
      {
        number: "00",
        title: "开始之前",
        lessons: [
          { code: "FAQ", title: "BIMBOX 课程常见问题解答（必看）", minutes: 6 },
          { code: "00", title: "课程介绍", minutes: 12 },
        ],
      },
      {
        number: "01",
        title: "认识 Revit，动手做第一个项目",
        lessons: [
          { code: "01", title: "准备：Revit 的版本选择和安装问题", minutes: 16 },
          { code: "02", title: "和 Revit 这家伙认识一下", minutes: 14 },
          { code: "03", title: "必备的术语和概念", minutes: 6 },
          { code: "04", title: "啥都没学，先做个项目试试（上）", minutes: 28 },
          { code: "05", title: "啥都没学，先做个项目试试（中）", minutes: 21 },
          { code: "06", title: "啥都没学，先做个项目试试（下）", minutes: 17 },
        ],
      },
      {
        number: "02",
        title: "项目基础设置",
        lessons: [
          { code: "07", title: "怎样画标高？", minutes: 12 },
          { code: "08", title: "标高的样式修改", minutes: 12 },
          { code: "09", title: "轴网里的秘密？", minutes: 20 },
          { code: "10", title: "协作的准备：把模型和图纸导进来", minutes: 18 },
        ],
      },
      {
        number: "03",
        title: "墙体与幕墙",
        lessons: [
          { code: "11", title: "建立墙：基础知识", minutes: 17 },
          { code: "12", title: "建立墙：进阶知识", minutes: 10 },
          { code: "13", title: "墙的分层结构和连接方式", minutes: 9 },
          { code: "14", title: "墙的包络与纵向结构编辑", minutes: 14 },
          { code: "15", title: "幕墙与网格", minutes: 10 },
          { code: "16", title: "手动创建高级幕墙网格", minutes: 14 },
        ],
      },
      {
        number: "04",
        title: "门窗、楼板与屋顶",
        lessons: [
          { code: "17", title: "门窗：让我们进到族里面看看", minutes: 18 },
          { code: "18", title: "门窗：手动编辑的族怎么用", minutes: 9 },
          { code: "19", title: "楼板该怎么画？", minutes: 10 },
          { code: "20", title: "楼板的编辑和附件", minutes: 9 },
          { code: "21", title: "天花板：关于视图的重要知识点", minutes: 25 },
          { code: "22", title: "屋顶：带坡度的特殊族", minutes: 16 },
          { code: "23", title: "屋顶的进阶编辑", minutes: 13 },
        ],
      },
      {
        number: "05",
        title: "材质、楼梯与栏杆",
        lessons: [
          { code: "24", title: "一节课彻底搞懂材质", minutes: 22 },
          { code: "25", title: "坡道：初步认识组合嵌套", minutes: 16 },
          { code: "26", title: "楼梯：继续理解组合嵌套族的逻辑", minutes: 19 },
          { code: "27", title: "栏杆扶手：认识这个横七竖八的家伙", minutes: 15 },
          { code: "28", title: "深入搞定栏杆扶手的恼人问题", minutes: 10 },
          { code: "29", title: "玻璃嵌板围栏的画法", minutes: 12 },
          { code: "30", title: "楼梯上栏杆扶手小细节", minutes: 17 },
        ],
      },
      {
        number: "06",
        title: "视图控制与场地",
        lessons: [
          { code: "31", title: "灵活操纵视图显示", minutes: 18 },
          { code: "32", title: "龙生龙，凤生凤，这节课我们学打洞", minutes: 19 },
          { code: "33", title: "从外部导入地形文件", minutes: 9 },
          { code: "34", title: "手动创建地形的办法", minutes: 7 },
          { code: "35", title: "地形改造：学习动态模型阶段", minutes: 23 },
          { code: "36", title: "Revit 里的族，都去哪啦？", minutes: 10 },
        ],
      },
      {
        number: "07",
        title: "结构",
        lessons: [
          { code: "37", title: "结构：墙梁柱板四兄弟", minutes: 20 },
          { code: "38", title: "结构：桁架和支撑系统", minutes: 14 },
          { code: "39", title: "三种结构基础", minutes: 6 },
          { code: "40", title: "规规矩矩的梁柱钢筋", minutes: 16 },
          { code: "41", title: "板状钢筋和异形钢筋", minutes: 20 },
          { code: "42", title: "建筑与结构知识补遗", minutes: 12 },
          { code: "43", title: "组、部件、零件，傻傻分不清楚", minutes: 16 },
        ],
      },
      {
        number: "08",
        title: "机电（MEP）",
        lessons: [
          { code: "44", title: "机电设计：从默认样板讲起", minutes: 16 },
          { code: "45", title: "风管的建模方法", minutes: 18 },
          { code: "46", title: "机电翻模与正向设计的操作区别", minutes: 21 },
          { code: "47", title: "管道专业怎么画？", minutes: 17 },
          { code: "48", title: "建筑与机电的配合：房间和面积", minutes: 13 },
          { code: "49", title: "建筑与机电配合：空间的使用", minutes: 7 },
          { code: "50", title: "电气系统的高级创建方式", minutes: 12 },
          { code: "51", title: "电气：线管和桥架布置", minutes: 10 },
        ],
      },
      {
        number: "09",
        title: "过滤器、明细表与出图",
        lessons: [
          { code: "52", title: "强大的样式修改技巧：认识过滤器", minutes: 12 },
          { code: "53", title: "开开客串：4 种样式修改方法的优先级", minutes: 15 },
          { code: "54", title: "对电缆桥架使用过滤器的方法", minutes: 15 },
          { code: "55", title: "过滤器传递与全局参数", minutes: 11 },
          { code: "56", title: "数据应用：生成明细表", minutes: 12 },
          { code: "57", title: "明细表高级应用：批量修改模型参数", minutes: 13 },
          { code: "58", title: "出图基础：理解视图、标注和标记", minutes: 13 },
          { code: "59", title: "出图：理解详图和图纸", minutes: 14 },
        ],
      },
      {
        number: "10",
        title: "收尾与加餐",
        lessons: [
          { code: "60", title: "总结：给你三条精进的建议", minutes: 11 },
          { code: "加餐 01", title: "详解 Revit 的定位点和坐标系，新手一定要看", minutes: 30 },
          { code: "加餐 02", title: "答疑：为啥要把「参数」保存到族的外面去？", minutes: 11 },
        ],
      },
    ],
    deliveryHeading: "关于视频访问方式",
    deliveryBody:
      "课程视频正在整理上线到站内播放器。目前完成付款后，我们会在 1 个工作日内通过你填写的付款邮箱发送开通说明和访问方式，请留意收件箱（含垃圾邮件夹）。",
    ctaHeading: "准备好开始了吗？",
    ctaIntro: "一次购买，覆盖全部 61 讲正课与 2 讲加餐，永久访问、后续更新免费。",
    ctaNote: "支付由 Stripe 处理，支持主流信用卡。",
  },
  en: {
    eyebrow: "COURSE SYLLABUS",
    title: "7-Day Revit Fast-Start · Full Syllabus",
    intro:
      "61 core lessons plus 2 bonus deep-dives, taking you from zero to independently modeling, coordinating, and producing sheets for a real project. Every lesson is built around a real work situation, not a feature-by-feature manual.",
    backLabel: "Back to course page",
    statsLessons: "61 core lessons + 2 bonus",
    statsHours: "~15.5 hours of video",
    statsAccess: "One-time purchase, lifetime access",
    modules: [
      {
        number: "00",
        title: "Before You Start",
        lessons: [
          { code: "FAQ", title: "BIMBOX Course FAQ (Must Watch)", minutes: 6 },
          { code: "00", title: "Course Introduction", minutes: 12 },
        ],
      },
      {
        number: "01",
        title: "Meet Revit, Build Your First Project",
        lessons: [
          { code: "01", title: "Prep: Choosing and Installing a Revit Version", minutes: 16 },
          { code: "02", title: "Getting to Know Revit", minutes: 14 },
          { code: "03", title: "Essential Terms & Concepts", minutes: 6 },
          { code: "04", title: "Before Learning Anything, Try a Project (Part 1)", minutes: 28 },
          { code: "05", title: "Before Learning Anything, Try a Project (Part 2)", minutes: 21 },
          { code: "06", title: "Before Learning Anything, Try a Project (Part 3)", minutes: 17 },
        ],
      },
      {
        number: "02",
        title: "Project Foundations",
        lessons: [
          { code: "07", title: "How to Draw Levels", minutes: 12 },
          { code: "08", title: "Editing Level Styles", minutes: 12 },
          { code: "09", title: "The Secret Life of Grids", minutes: 20 },
          { code: "10", title: "Preparing to Collaborate: Linking Models & Drawings", minutes: 18 },
        ],
      },
      {
        number: "03",
        title: "Walls & Curtain Walls",
        lessons: [
          { code: "11", title: "Building Walls: The Basics", minutes: 17 },
          { code: "12", title: "Building Walls: Going Further", minutes: 10 },
          { code: "13", title: "Wall Layers & How They Join", minutes: 9 },
          { code: "14", title: "Wall Wrapping & Vertical Structure Editing", minutes: 14 },
          { code: "15", title: "Curtain Walls & Grids", minutes: 10 },
          { code: "16", title: "Manually Building Advanced Curtain Wall Grids", minutes: 14 },
        ],
      },
      {
        number: "04",
        title: "Doors, Windows, Floors & Roofs",
        lessons: [
          { code: "17", title: "Doors & Windows: Inside the Family", minutes: 18 },
          { code: "18", title: "Doors & Windows: Editing Hand-Built Families", minutes: 9 },
          { code: "19", title: "How to Draw Floors", minutes: 10 },
          { code: "20", title: "Editing Floors & Their Attachments", minutes: 9 },
          { code: "21", title: "Ceilings: A Key View Concept", minutes: 25 },
          { code: "22", title: "Roofs: Special Sloped Families", minutes: 16 },
          { code: "23", title: "Roofs: Advanced Editing", minutes: 13 },
        ],
      },
      {
        number: "05",
        title: "Materials, Stairs & Railings",
        lessons: [
          { code: "24", title: "Materials, Fully Explained in One Lesson", minutes: 22 },
          { code: "25", title: "Ramps: A First Look at Nested Components", minutes: 16 },
          { code: "26", title: "Stairs: Understanding Nested Family Logic", minutes: 19 },
          { code: "27", title: "Railings: Meet This Unruly Component", minutes: 15 },
          { code: "28", title: "Solving Railings' Most Annoying Problems", minutes: 10 },
          { code: "29", title: "Drawing Glass Panel Railings", minutes: 12 },
          { code: "30", title: "Small Details for Stair Railings", minutes: 17 },
        ],
      },
      {
        number: "06",
        title: "View Control & Site",
        lessons: [
          { code: "31", title: "Flexibly Controlling View Display", minutes: 18 },
          { code: "32", title: "Like Host, Like Family: Learning Openings", minutes: 19 },
          { code: "33", title: "Importing Terrain from External Files", minutes: 9 },
          { code: "34", title: "Manually Creating Terrain", minutes: 7 },
          { code: "35", title: "Terrain Editing: The Dynamic Modeling Stage", minutes: 23 },
          { code: "36", title: "Where Did the Families Go?", minutes: 10 },
        ],
      },
      {
        number: "07",
        title: "Structure",
        lessons: [
          { code: "37", title: "Structure: Walls, Beams, Columns & Slabs", minutes: 20 },
          { code: "38", title: "Structure: Trusses & Bracing", minutes: 14 },
          { code: "39", title: "Three Kinds of Structural Foundations", minutes: 6 },
          { code: "40", title: "Beam & Column Rebar, Done Properly", minutes: 16 },
          { code: "41", title: "Slab Rebar & Irregular Rebar", minutes: 20 },
          { code: "42", title: "Filling the Gaps Between Architecture & Structure", minutes: 12 },
          { code: "43", title: "Groups, Assemblies & Parts, Untangled", minutes: 16 },
        ],
      },
      {
        number: "08",
        title: "MEP",
        lessons: [
          { code: "44", title: "MEP Design: Starting from the Default Template", minutes: 16 },
          { code: "45", title: "Modeling Ductwork", minutes: 18 },
          { code: "46", title: "MEP Reverse-Modeling vs. Forward Design", minutes: 21 },
          { code: "47", title: "How to Draw Piping", minutes: 17 },
          { code: "48", title: "Architecture Meets MEP: Rooms & Areas", minutes: 13 },
          { code: "49", title: "Architecture Meets MEP: Using Spaces", minutes: 7 },
          { code: "50", title: "Advanced Electrical System Creation", minutes: 12 },
          { code: "51", title: "Electrical: Conduit & Cable Tray Layout", minutes: 10 },
        ],
      },
      {
        number: "09",
        title: "Filters, Schedules & Sheets",
        lessons: [
          { code: "52", title: "A Powerful Styling Trick: Meet Filters", minutes: 12 },
          { code: "53", title: "Guest Lesson: Priority of 4 Styling Methods", minutes: 15 },
          { code: "54", title: "Using Filters on Cable Trays", minutes: 15 },
          { code: "55", title: "Filter Propagation & Global Parameters", minutes: 11 },
          { code: "56", title: "Putting Data to Work: Generating Schedules", minutes: 12 },
          { code: "57", title: "Advanced Schedules: Batch-Editing Parameters", minutes: 13 },
          { code: "58", title: "Sheet Basics: Views, Dimensions & Tags", minutes: 13 },
          { code: "59", title: "Sheets: Understanding Details & Drawing Sheets", minutes: 14 },
        ],
      },
      {
        number: "10",
        title: "Wrap-Up & Bonus",
        lessons: [
          { code: "60", title: "Wrap-Up: Three Tips to Get Better", minutes: 11 },
          { code: "Bonus 01", title: "Revit Base Points & Coordinate Systems, Explained", minutes: 30 },
          { code: "Bonus 02", title: "Q&A: Why Keep Parameters Outside the Family?", minutes: 11 },
        ],
      },
    ],
    deliveryHeading: "How you get access",
    deliveryBody:
      "The in-browser course player is still being finished. After payment, we currently send access instructions to your payment email within one business day — please check your inbox (and spam folder).",
    ctaHeading: "Ready to start?",
    ctaIntro: "One purchase covers all 61 core lessons and 2 bonus lessons, with lifetime access and free future updates.",
    ctaNote: "Payments are processed by Stripe; major credit cards accepted.",
  },
};

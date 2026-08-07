/**
 * Founder Daily — Round 2 content ("Reading the Market")
 * ---------------------------------------------------------------
 * This is a NEW 28-day set, meant to run after a learner finishes the
 * Round 1 arc in `daily-content.ts` (Explain the company / Sell the value /
 * Understand funding / Lead and connect).
 *
 * Where Round 1 teaches timeless founder-communication fundamentals,
 * Round 2 teaches the next skill: talking fluently, in English, about a
 * fast-moving AI/BIM/construction-tech market — reading real announcements,
 * discussing AI capability honestly, positioning against competitors, and
 * leading a team through change. Content is grounded in real, dated 2026
 * industry events (Autodesk Forma, Procore Digital Coworker, Trimble AI
 * Takeoff, Kestrel Labs, enterprise AI-agent adoption data) rather than
 * generic AI hype — see the `sources` block at the bottom for citations.
 *
 * SCOPE NOTE: this file only adds content. It intentionally does NOT touch
 * `daily-content.ts`, `daily-page.tsx`, or `daily-reader.tsx` — wiring up
 * round-switching (when Round 2 unlocks after Round 1's `roundComplete`,
 * how `dailyCopy` week-name labels swap per round, progress-tracking across
 * two rounds) is a separate UI/engineering task, not a content task, and the
 * repo has unrelated in-progress changes on the current branch that this
 * file deliberately avoids touching.
 *
 * `week` reuses the 1|2|3|4 union from `DailyLesson` to mean "week 1-4 of
 * Round 2," not a continuation of Round 1's week numbers. `id` continues
 * the global sequence (29-56) so ids stay unique if both arrays are ever
 * merged into one list.
 */

import type { DailyLesson } from "./daily-content";

export const dailyLessonsRound2: DailyLesson[] = [
  // ---------------------------------------------------------------
  // Week 1 — Reading the Market
  // ---------------------------------------------------------------
  {
    id: 29,
    week: 1,
    category: "MARKET SIGNAL",
    title: "Tell a real shift from a relabeling",
    article: [
      "Not every industry announcement changes what a founder should do. In March 2026, Autodesk folded Construction Cloud into Forma and introduced an AI Assistant that could surface project data automatically. That was a structural shift: two products became one platform, and a manual task became an automated one. A rebrand with a new name and the same workflow underneath is not the same kind of event.",
      "Before repeating an announcement to your team or customers, ask what specifically changed: the workflow, the pricing, the buyer, or just the label. If you cannot answer that question, you are not ready to explain the announcement yet.",
    ],
    translationZh: [
      "不是每条行业公告都意味着创始人需要改变行动。2026年3月，Autodesk把Construction Cloud并入了Forma，并推出了能自动呈现项目数据的AI Assistant——这是一次结构性变化：两个产品合而为一，一个手动步骤变成了自动化步骤。而只是换个名字、底层流程不变的“改版”，性质完全不同。",
      "在向团队或客户转述一条公告之前，先问自己：具体改变了什么——工作流程、定价、购买者，还是只是名字？如果答不上来，说明你还没准备好解释这条公告。",
    ],
    takeawayEn: "Ask what specifically changed — workflow, price, or buyer — before treating an announcement as a real shift.",
    phrase: "What actually changed here is…",
    phraseZh: "这次真正发生变化的是……",
    sayIt: "What actually changed here is that Autodesk merged two separate products into one platform and made a manual step automatic.",
    promptZh: "挑一条最近的行业新闻，写清楚它到底改变了什么。",
    promptEn: "Pick one recent industry announcement and write exactly what it changed.",
  },
  {
    id: 30,
    week: 1,
    category: "SOURCING",
    title: "Cite a date and a number, not a mood",
    article: [
      "\"AI is changing construction\" tells a listener nothing they can check. \"In July 2026, Trimble shipped AI takeoff tools that cut pre-takeoff setup time by roughly sixty percent\" tells them something they can verify and remember. A specific source with a date carries more weight than an adjective.",
      "Keep a short list of dated facts you trust, each with its source. When a conversation turns to industry trends, reach for one of them instead of a general impression. Precision is what makes a founder sound informed rather than enthusiastic.",
    ],
    translationZh: [
      "“AI正在改变建筑行业”这种说法，听众没法核实，也记不住。而“2026年7月，Trimble发布的AI放样工具把放样前的准备时间缩短了约60%”——这是可以核实、也容易被记住的信息。带日期的具体来源，比一个形容词更有分量。",
      "平时准备一份自己信得过的、带日期和来源的事实清单。聊到行业趋势时，优先引用其中一条，而不是笼统的印象。精确，才会让创始人显得专业，而不只是热情。",
    ],
    takeawayEn: "Replace a general impression with one dated, sourced fact you can defend.",
    phrase: "According to [source], in [month/year]…",
    phraseZh: "根据[来源]，在[某年某月]……",
    sayIt: "According to Trimble's July 2026 announcement, AI takeoff cut pre-takeoff setup time by about sixty percent.",
    promptZh: "写一句带日期和来源的行业事实，替换掉一句模糊说法。",
    promptEn: "Replace one vague claim with a dated, sourced fact.",
  },
  {
    id: 31,
    week: 1,
    category: "NUMBERS",
    title: "Use one number responsibly",
    article: [
      "A single well-chosen statistic can anchor an argument; three stacked statistics usually confuse it. If construction AI adoption reached roughly thirty-seven percent in 2026 while the industry faces a shortfall of about half a million workers, pick the number that supports the point you are actually making, not every number you found.",
      "Say what the number does and does not prove. Adoption reaching thirty-seven percent shows momentum; it does not prove that AI closes the labor gap. Honest framing earns more trust than an inflated one.",
    ],
    translationZh: [
      "一个选得准的数据能撑起一个论点；三个堆在一起的数据通常只会让人困惑。如果建筑行业2026年AI采用率约为37%，同时行业面临约50万人的用工缺口，要选那个支撑你论点的数字，而不是把找到的数字全部塞进去。",
      "说清楚这个数字证明了什么、没有证明什么。采用率达到37%说明了势头，但不能证明AI已经解决了用工短缺。诚实的表述比夸大的表述更能赢得信任。",
    ],
    takeawayEn: "Choose one number that supports your specific point, and state plainly what it does not prove.",
    phrase: "The number that matters here is…, and it shows…",
    phraseZh: "这里真正重要的数字是……，它说明了……",
    sayIt: "The number that matters here is thirty-seven percent adoption, and it shows momentum, not a solved labor shortage.",
    promptZh: "选一个数据，写清楚它证明了什么、没有证明什么。",
    promptEn: "Choose one statistic and state what it proves and what it does not.",
  },
  {
    id: 32,
    week: 1,
    category: "SUMMARY",
    title: "Summarize a product update in two sentences",
    article: [
      "Executives and customers do not need every release note. They need to know what changed and why it matters to them. When Procore introduced three Digital Coworker packages in July 2026, the useful summary was not a list of twenty agents — it was one sentence about tiers and one about who each tier fits.",
      "Practice compressing any product update into two sentences: what changed, and who should care. If a third sentence feels necessary, the first two were probably not sharp enough yet.",
    ],
    translationZh: [
      "高管和客户不需要每一条更新日志，他们需要知道改变了什么、为什么和自己有关。2026年7月Procore推出三档Digital Coworker套餐时，真正有用的总结不是列出20个智能体，而是一句话讲清档位，一句话讲清哪类团队适合哪档。",
      "练习把任何产品更新压缩成两句话：改变了什么、谁该关心。如果觉得还需要第三句话，说明前两句写得还不够精准。",
    ],
    takeawayEn: "Compress any update into two sentences: what changed, and who should care.",
    phrase: "In short, [company] now offers…, which matters if…",
    phraseZh: "简单说，[公司]现在提供……，如果……这就很重要。",
    sayIt: "In short, Procore now offers three Digital Coworker tiers, which matters if your team is deciding how far to automate first.",
    promptZh: "用两句话总结一条最近的行业产品更新。",
    promptEn: "Summarize one recent product update in exactly two sentences.",
  },
  {
    id: 33,
    week: 1,
    category: "FRAMEWORK",
    title: "Sort news into signal and noise",
    article: [
      "Not every headline deserves a reaction. A simple filter helps: does this change what a customer will pay for, how they buy, or who they trust? If the answer to all three is no, the news is probably noise for your business, even if it is genuinely interesting.",
      "Apply the filter out loud in front of your team occasionally. It teaches everyone the same habit, and it keeps a fast-moving market from turning into a source of constant, unfocused anxiety.",
    ],
    translationZh: [
      "不是每条头条新闻都值得反应。一个简单的过滤器很有用：这件事是否改变了客户愿意为什么付费、怎样购买，或者信任谁？如果三个答案都是否，那这条新闻对你的生意大概率只是噪音——哪怕它本身确实很有意思。",
      "偶尔在团队面前公开使用这个过滤器。这会让大家养成同样的习惯，也能避免让一个快速变化的市场变成持续、无焦点的焦虑来源。",
    ],
    takeawayEn: "Filter news by whether it changes what customers pay for, how they buy, or who they trust.",
    phrase: "Does this change what customers pay for, how they buy, or who they trust?",
    phraseZh: "这件事是否改变了客户愿意付费的东西、购买方式，或者信任对象？",
    sayIt: "Does this change what customers pay for, how they buy, or who they trust? If not, we can watch it, not react to it.",
    promptZh: "用这个三问过滤器判断一条新闻是不是噪音。",
    promptEn: "Apply the three-question filter to one piece of recent news.",
  },
  {
    id: 34,
    week: 1,
    category: "OPINION",
    title: "Form a defensible opinion",
    article: [
      "Investors and customers do not just want a summary of the market; they want to know what you think will happen and why. Reports show that roughly eighty-eight percent of enterprise AI pilots never reach production. A founder with an opinion explains why — unclear ownership, weak data, or no measurable goal — instead of just repeating the statistic.",
      "An opinion is defensible when it names a mechanism, not just an outcome. Practice finishing the sentence \"this will happen because,\" not just \"this will happen.\"",
    ],
    translationZh: [
      "投资人和客户不只想要市场概况，他们想知道你认为接下来会发生什么、为什么。有报告显示，企业AI试点项目中大约88%从未真正投入生产。有判断力的创始人会解释原因——责任不清、数据薄弱，或者没有可衡量的目标——而不只是重复这个数字。",
      "一个站得住脚的观点，会说明背后的机制，而不只是结果。多练习把句子写完整：“这会发生，是因为……”，而不只是“这会发生”。",
    ],
    takeawayEn: "State an opinion with a mechanism behind it, not just a predicted outcome.",
    phrase: "My read is that…, because…",
    phraseZh: "我的判断是……，因为……",
    sayIt: "My read is that most pilots stall, because nobody owned the outcome after the demo ended.",
    promptZh: "对一个行业趋势写出你的判断和背后的原因。",
    promptEn: "State your opinion on one industry trend and the mechanism behind it.",
  },
  {
    id: 35,
    week: 1,
    category: "REVIEW",
    title: "Pressure-test your read of the market",
    article: [
      "Explain one real industry development to someone outside your company this week, in under ninety seconds, including what changed, one number, and your opinion. Ask what part they would repeat to someone else.",
      "If they repeat the number but not your opinion, your analysis needs sharper reasoning, not louder delivery. Market fluency is built one rehearsed explanation at a time, not by reading more headlines.",
    ],
    translationZh: [
      "本周找一个公司之外的人，在90秒内讲清一条真实的行业动态，包含改变了什么、一个数字、以及你的判断。问对方，他会把哪部分转述给别人。",
      "如果对方只记住了数字、没记住你的判断，说明你的分析还需要更扎实的推理，而不是更响亮的语气。市场敏感度是靠一次次演练建立起来的，不是靠多读几条头条。",
    ],
    takeawayEn: "Test your market read by asking what a listener would repeat afterward.",
    phrase: "Here's what changed, here's the number, and here's what I think it means.",
    phraseZh: "这是发生的变化，这是关键数字，这是我认为它意味着什么。",
    sayIt: "Here's what changed, here's the number, and here's what I think it means for teams like ours.",
    promptZh: "找人练习90秒讲清一条行业动态，记录对方复述了哪部分。",
    promptEn: "Explain one industry development in ninety seconds and record what the listener repeats back.",
  },

  // ---------------------------------------------------------------
  // Week 2 — Talking About AI Honestly
  // ---------------------------------------------------------------
  {
    id: 36,
    week: 2,
    category: "CAPABILITY",
    title: "Say what it actually does",
    article: [
      "\"AI-powered\" describes almost nothing. Trimble's AI Smart Assistant lets an estimator ask a question in plain language and get a number back from the model; that is a specific, checkable capability. Replace any vague AI label in your own pitch with one sentence describing the actual input and output.",
      "If you cannot describe the input and the output in one sentence, the feature may not be ready to promise to a customer yet, even if it is ready to demo.",
    ],
    translationZh: [
      "“AI驱动”这种说法几乎什么都没说清楚。Trimble的AI Smart Assistant让估算人员可以用自然语言提问，直接从模型里得到一个数字——这是具体的、可核实的能力。把你自己介绍里模糊的“AI功能”，换成一句描述真实输入和输出的话。",
      "如果你没法用一句话说清楚输入是什么、输出是什么，那这个功能可能还没准备好向客户承诺，即使它已经可以拿来演示。",
    ],
    takeawayEn: "Replace any AI label with one sentence describing the actual input and output.",
    phrase: "It takes [input] and returns [output].",
    phraseZh: "它接收[输入]，返回[输出]。",
    sayIt: "It takes a plain-language question about the estimate and returns the specific number behind it.",
    promptZh: "把你产品里的“AI功能”改写成一句输入到输出的具体描述。",
    promptEn: "Rewrite one AI feature in your product as a single input-to-output sentence.",
  },
  {
    id: 37,
    week: 2,
    category: "LIMITS",
    title: "Name the limit before they find it",
    article: [
      "Every AI capability has a boundary — a document type it misreads, a scenario it has not seen, a case that still needs a human. Naming that boundary before a customer discovers it themselves builds more trust than a confident silence does.",
      "A short, honest limit stated early usually costs less credibility than an unstated one discovered later. Practice one sentence that names a real limitation and what happens when the system reaches it.",
    ],
    translationZh: [
      "任何AI能力都有边界——会读错的某种文件、没见过的场景、仍然需要人来处理的情况。在客户自己发现之前主动说出这个边界，比自信地保持沉默更能建立信任。",
      "提前坦诚说出一个简短的局限，通常比事后被发现的隐瞒代价更小。练习用一句话说清一个真实局限，以及系统遇到它时会怎么处理。",
    ],
    takeawayEn: "State one real limitation and what happens when the system reaches it, before the customer finds it.",
    phrase: "It does not yet handle…; when that happens, it…",
    phraseZh: "它目前还处理不了……；遇到这种情况时，它会……",
    sayIt: "It does not yet handle handwritten markups well; when that happens, it flags the sheet for manual review.",
    promptZh: "写出你产品的一个真实局限，以及遇到时会怎么处理。",
    promptEn: "Name one real limitation of your product and what happens when it's reached.",
  },
  {
    id: 38,
    week: 2,
    category: "HUMAN ROLE",
    title: "Explain where a person still decides",
    article: [
      "Procore's Digital Coworker packages automate drafting and searching, but the announcement is careful to describe agents doing tasks, not making final calls. Explaining exactly where a human still signs off is not a weakness in an AI pitch — it is usually the detail that makes a buyer comfortable enough to say yes.",
      "Name the specific decision a person still owns, not just \"human oversight\" in the abstract. \"A senior reviewer approves any change over one page\" is concrete; \"we keep humans in the loop\" is not.",
    ],
    translationZh: [
      "Procore的Digital Coworker套餐能自动起草和搜索，但官方说明很谨慎地把智能体描述为“执行任务”，而不是“做最终决定”。清楚说明人在哪个环节仍然要签字确认，这在AI产品的介绍里不是弱点，反而通常是让买家安心点头的关键细节。",
      "说清楚具体是哪个决定仍然由人来做，而不是笼统地说“人工把关”。“任何超过一页的改动都由资深审核员批准”是具体的；“我们保留人工环节”不是。",
    ],
    takeawayEn: "Name the specific decision a person still owns, not just abstract human oversight.",
    phrase: "The system drafts it; a person still decides…",
    phraseZh: "系统负责生成草案；最终由人来决定……",
    sayIt: "The system drafts the audit findings; a senior reviewer still decides which ones go into the final report.",
    promptZh: "写清楚你的产品里，具体是哪个决定仍然由人来做。",
    promptEn: "Name the specific decision in your product that a human still makes.",
  },
  {
    id: 39,
    week: 2,
    category: "TRUST",
    title: "Answer the accuracy question directly",
    article: [
      "\"How accurate is it?\" is one of the most common questions an AI product faces, and a vague answer damages trust faster than an imperfect one. State what you measure, the current number, and how it is trending, even if the number is not perfect yet.",
      "If you do not yet measure accuracy formally, say that directly and explain what you check instead. An honest \"we don't have that number yet, here's what we do check\" outperforms a confident guess.",
    ],
    translationZh: [
      "“你们的准确率是多少”是AI产品最常被问到的问题之一，一个含糊的回答比一个不完美的数字更快摧毁信任。说清楚你衡量的是什么、目前的数字是多少、趋势如何——即使这个数字还不够完美。",
      "如果你还没有正式衡量准确率，就直接说清楚，并说明你目前用什么方式来把关。诚实地说“我们还没有这个数字，但我们会检查这些”，比自信地瞎猜更有说服力。",
    ],
    takeawayEn: "Answer accuracy questions with what you measure and the current number, even if imperfect.",
    phrase: "We measure accuracy by…; right now that number is…",
    phraseZh: "我们通过……来衡量准确率；目前这个数字是……",
    sayIt: "We measure accuracy by comparing flagged issues to what a senior reviewer confirms; right now that agreement rate is around ninety percent.",
    promptZh: "写出你会怎样回答“你们的AI准确率是多少”这个问题。",
    promptEn: "Draft your answer to the question: how accurate is your AI?",
  },
  {
    id: 40,
    week: 2,
    category: "COMPARISON",
    title: "Compare without disparaging",
    article: [
      "Comparing your product to the manual process it replaces is safer and often more persuasive than comparing it to a named competitor. Describe the old way, the new way, and the specific difference — time, error rate, or cost — without needing to criticize anyone by name.",
      "If a customer brings up a specific competitor, respond to the comparison they raised honestly, but avoid introducing negative comparisons yourself. Confidence sounds different from criticism.",
    ],
    translationZh: [
      "把你的产品和它所取代的手动流程做对比，比拿一个具体对手来比较更安全，往往也更有说服力。描述过去的做法、现在的做法，以及具体的差异——时间、错误率或成本——不需要点名批评任何人。",
      "如果客户主动提起某个具体对手，可以诚实回应他们提出的对比，但不要主动引入负面比较。自信和批评，听起来是不一样的。",
    ],
    takeawayEn: "Compare your product to the manual process it replaces, not to a named competitor, unless asked directly.",
    phrase: "The old way was…; the difference now is…",
    phraseZh: "过去的做法是……；现在的区别是……",
    sayIt: "The old way was a manual line-by-line review; the difference now is that the first pass happens in minutes, not days.",
    promptZh: "用“过去的做法/现在的区别”写一段产品对比，不点名任何对手。",
    promptEn: "Write a comparison using before/now language without naming a competitor.",
  },
  {
    id: 41,
    week: 2,
    category: "DEMO OF CHANGE",
    title: "Show one before and after that is real",
    article: [
      "Trimble's own announcement led with concrete before-and-after numbers: pre-takeoff setup time cut by roughly sixty percent, pricing research cut by roughly eighty percent. A demo built around one real before-and-after moment is more convincing than a tour of every feature in the product.",
      "Choose the single comparison that matters most to the person in front of you, and let the rest of the product stay in the background for this conversation.",
    ],
    translationZh: [
      "Trimble自己的公告就是用具体的“以前/现在”数字开场的：放样前准备时间缩短约60%，报价调研时间缩短约80%。围绕一个真实的“以前/现在”时刻设计的演示，比逐一游览所有功能更有说服力。",
      "选出对眼前这个人最重要的那一个对比，这次谈话里让产品其他部分先退居次要位置。",
    ],
    takeawayEn: "Build a demo around one real before-and-after number, not a full feature tour.",
    phrase: "Before, this took…; now it takes…",
    phraseZh: "以前这需要……；现在只需要……",
    sayIt: "Before, pre-takeoff setup took most of a morning; now it takes a few minutes.",
    promptZh: "选出一个最有说服力的“以前/现在”对比，写成一句话。",
    promptEn: "Write your single strongest before-and-after comparison in one sentence.",
  },
  {
    id: 42,
    week: 2,
    category: "REVIEW",
    title: "Rehearse the hardest AI question",
    article: [
      "Ask a colleague to challenge you with the toughest question a skeptical customer might ask about your AI — accuracy, job impact, or failure mode. Answer it out loud, using a real number and a named limitation, not a reassurance.",
      "Notice which parts of your answer felt rehearsed and which felt improvised. The improvised parts are usually where your honest position is still unclear to you, and that is exactly what to fix before the next real conversation.",
    ],
    translationZh: [
      "请同事挑战你一个最难回答的问题——关于准确率、对岗位的影响，或者失败场景，模拟一个持怀疑态度的客户。大声说出你的回答，使用一个真实数字和一个明确的局限，而不是空泛的安慰。",
      "留意自己的回答里哪部分说得熟练、哪部分是临场发挥的。临场发挥的部分，往往正是你自己立场还不清晰的地方——这正是下一次真实对话前需要打磨的地方。",
    ],
    takeawayEn: "Rehearse your hardest AI question out loud with a real number and a named limitation.",
    phrase: "That's a fair question. Here's exactly what's true today.",
    phraseZh: "这是个合理的问题。这是今天真实的情况。",
    sayIt: "That's a fair question. Here's exactly what's true today: it catches most formatting errors, and a person still checks anything flagged as high-risk.",
    promptZh: "让同事挑战你一个最难回答的AI问题，写下你的完整回答。",
    promptEn: "Have a colleague ask your hardest AI question and write your full answer.",
  },

  // ---------------------------------------------------------------
  // Week 3 — Positioning Against Competitors
  // ---------------------------------------------------------------
  {
    id: 43,
    week: 3,
    category: "LANDSCAPE",
    title: "Name the category honestly",
    article: [
      "A buyer trying to place your company needs one honest sentence about the category you compete in — project management, estimating, compliance, or something narrower. Kestrel Labs, for example, is easy to place: it checks Revit models against local building code during design, a specific slice of a much larger BIM landscape.",
      "If you cannot name your category in one sentence, a buyer will guess, and the guess is often wrong. Choose the sentence yourself instead of leaving it to assumption.",
    ],
    translationZh: [
      "一个想要理解你公司的买家，需要一句诚实的话来定位你所在的品类——项目管理、造价估算、合规审查，或者更细分的方向。比如Kestrel Labs就很容易定位：它在设计阶段用Revit模型对照当地建筑规范做检查，是整个BIM版图里非常具体的一小块。",
      "如果你没法用一句话说清自己的品类，买家就会自己猜——而猜测常常是错的。与其交给别人假设，不如自己主动说清楚。",
    ],
    takeawayEn: "State your category in one honest sentence before a buyer guesses it for you.",
    phrase: "We sit in the [category] category, specifically…",
    phraseZh: "我们属于[某个品类]，具体做的是……",
    sayIt: "We sit in the AEC training category, specifically turning BIM knowledge into job-ready skill.",
    promptZh: "用一句话说清楚你的公司属于哪个具体品类。",
    promptEn: "State the specific category your company competes in, in one sentence.",
  },
  {
    id: 44,
    week: 3,
    category: "DIFFERENTIATION",
    title: "Say the one thing only you do",
    article: [
      "A long list of differentiators usually means none of them is sharp enough. Pick the single claim that is both true and hard for a larger competitor to copy quickly, and lead with that one, even if it means leaving other real advantages unsaid for now.",
      "Test the claim by imagining a much bigger company saying the same sentence. If it still sounds true and specific to you, it is a real differentiator. If it sounds generic enough for anyone to say, keep looking.",
    ],
    translationZh: [
      "一长串差异化优势，通常说明没有一条足够锋利。挑出那个既真实、又让大公司很难快速复制的说法，用它打头阵——哪怕这意味着暂时不提其他真实存在的优势。",
      "用这个方法测试你的说法：想象一个大得多的公司说出同一句话。如果听起来依然真实、具体，那就是真正的差异化；如果听起来谁都能说，那就再想想。",
    ],
    takeawayEn: "Lead with the one differentiator a bigger competitor cannot say convincingly, and leave the rest unsaid for now.",
    phrase: "The one thing we do that others don't is…",
    phraseZh: "我们做的、别人做不到的一件事是……",
    sayIt: "The one thing we do that others don't is turn a real BIM workflow into a graded, job-ready exercise, not a video to watch.",
    promptZh: "写出一个大公司说出来会显得不真实的差异化优势。",
    promptEn: "Write one differentiator a much larger competitor could not credibly claim.",
  },
  {
    id: 45,
    week: 3,
    category: "COMPETITOR RESPECT",
    title: "Acknowledge without weakening",
    article: [
      "Refusing to name a well-known competitor at all can look evasive. Acknowledge them briefly and factually, then move immediately to your specific difference. \"Yes, they cover more of the workflow; we go deeper on this one part\" respects the customer's knowledge without surrendering the conversation.",
      "Avoid adjectives when describing a competitor — no \"outdated,\" no \"bloated.\" Facts about scope and focus carry more credibility than opinions about quality.",
    ],
    translationZh: [
      "完全回避不提一个知名对手，反而会显得躲闪。简短、如实地承认对方，然后立刻转向你的具体差异。“没错，他们覆盖的流程更广；我们在这一部分做得更深”——这既尊重了客户已有的了解，也没有让出谈话的主动权。",
      "描述对手时避免使用形容词——不说“过时”，不说“臃肿”。关于覆盖范围和聚焦点的事实，比关于质量的主观评价更有说服力。",
    ],
    takeawayEn: "Acknowledge a named competitor factually, then pivot immediately to your specific difference.",
    phrase: "Yes, they do [X]; where we focus is…",
    phraseZh: "没错，他们确实做[X]；我们专注的地方是……",
    sayIt: "Yes, Procore covers the full project workflow; where we focus is turning that same workflow into training your junior staff can actually complete.",
    promptZh: "写一句“承认对手+转向自身优势”的回应。",
    promptEn: "Write one sentence that acknowledges a competitor, then pivots to your strength.",
  },
  {
    id: 46,
    week: 3,
    category: "PARTNERSHIP",
    title: "Explain why an integration matters",
    article: [
      "When Forma connected its Bid tool directly to Cost Management, the value was not the integration itself — it was that a winning bid could become a contract in one click, removing a manual handoff. Explain any partnership or integration you rely on the same way: name the handoff it removes.",
      "A partnership mentioned without a concrete workflow benefit sounds like a logo on a slide. Naming the specific step it removes turns it into a real reason to care.",
    ],
    translationZh: [
      "当Forma把Bid工具直接连接到Cost Management时，价值并不在于“集成”这件事本身，而在于中标的投标可以一键变成合同，省去了一次手动交接。用同样的方式解释你依赖的任何合作或集成：说清楚它省去了哪个交接环节。",
      "只提合作、不说清具体流程好处，听起来就像PPT上的一个logo。说清楚它具体省去了哪一步，才会让人真正在意。",
    ],
    takeawayEn: "Explain a partnership by naming the specific manual handoff it removes.",
    phrase: "This integration removes the step where…",
    phraseZh: "这个集成省去了原本需要……的这一步。",
    sayIt: "This integration removes the step where someone re-types model data into a separate spreadsheet.",
    promptZh: "写出一个合作/集成具体省去了哪个手动步骤。",
    promptEn: "Name the specific manual step one of your integrations or partnerships removes.",
  },
  {
    id: 47,
    week: 3,
    category: "PRICING PRESSURE",
    title: "Respond when a bigger player undercuts",
    article: [
      "A larger competitor bundling a similar feature into an existing package can feel threatening. Respond by returning to the specific outcome you deliver, not by matching their price immediately. \"Free\" and \"as good\" are different claims, and buyers often notice the difference over time.",
      "If price pressure is real and sustained, consider adjusting scope or packaging rather than only the number — what you remove or add can matter more than what you discount.",
    ],
    translationZh: [
      "一个更大的对手把类似功能打包进现有套餐，会让人感到威胁。回应的方式是回到你交付的具体结果，而不是立刻跟着降价。“免费”和“一样好”是两个不同的说法，买家往往会在使用一段时间后察觉到差别。",
      "如果价格压力是真实且持续的，可以考虑调整范围或打包方式，而不只是调整数字——你增减了什么，往往比你打了多少折更重要。",
    ],
    takeawayEn: "Respond to price pressure with your specific outcome first, and adjust scope before defaulting to a discount.",
    phrase: "Our price reflects…, which their bundled version does not include.",
    phraseZh: "我们的价格对应的是……，而对方打包的版本并不包含这些。",
    sayIt: "Our price reflects a graded, job-ready outcome, which a bundled free feature does not include.",
    promptZh: "写出面对大公司降价竞争时，你会怎么回应而不是直接跟价。",
    promptEn: "Draft your response to a larger competitor undercutting your price, without immediately matching it.",
  },
  {
    id: 48,
    week: 3,
    category: "PLATFORM RISK",
    title: "Answer 'what if they build this' calmly",
    article: [
      "Investors and customers both ask some version of \"what happens when the big platform builds this feature themselves.\" A calm answer names what the platform is actually incentivized to prioritize, and why your narrower focus is not their next move for now.",
      "If the honest answer is that platform risk is real, say so, and explain how you plan to move — deeper specialization, a relationship advantage, or speed. Denial is less convincing than a real plan.",
    ],
    translationZh: [
      "投资人和客户都会问某个版本的“如果大平台自己做了这个功能怎么办”。冷静的回答会说清楚这个平台真正的优先级激励是什么，以及为什么你聚焦的这个细分方向暂时不是他们的下一步。",
      "如果诚实的答案是这种平台风险确实存在，那就直接承认，并说明你的应对计划——更深的专业化、关系优势，或者速度优势。否认远不如一个真实的计划有说服力。",
    ],
    takeawayEn: "Answer platform risk with what the platform is actually incentivized to build next, not denial.",
    phrase: "That's a fair concern. Here's why this isn't their next priority, and here's our plan either way.",
    phraseZh: "这是个合理的顾虑。这不是他们接下来的重点，原因是……；不管怎样我们的应对计划是……",
    sayIt: "That's a fair concern. A platform serving every trade isn't likely to build graded, job-ready training as its next priority, and we're building deeper into that gap either way.",
    promptZh: "写出你会怎么回答“平台自己做了怎么办”这个问题。",
    promptEn: "Draft your calm answer to: what happens if the platform builds this themselves?",
  },
  {
    id: 49,
    week: 3,
    category: "REVIEW",
    title: "Write the one-paragraph competitive answer",
    article: [
      "Combine this week's practice into a single paragraph: your category, your one differentiator, a respectful acknowledgment of a named competitor, and your answer to platform risk. Say it out loud until it takes under a minute.",
      "This paragraph will be asked for again — by an investor, a skeptical customer, or a new hire trying to understand the company. Having it ready removes the pressure to improvise it well every time.",
    ],
    translationZh: [
      "把这一周练习的内容合并成一段话：你的品类、你唯一的差异化优势、对某个知名对手不失分寸的承认，以及你对平台风险的回应。大声练习，直到能在一分钟内说完。",
      "这段话以后还会被反复问到——投资人会问，持怀疑态度的客户会问，想了解公司的新同事也会问。提前准备好，就不用每次都临场发挥、指望运气。",
    ],
    takeawayEn: "Combine category, differentiator, competitor acknowledgment, and platform-risk answer into one rehearsed minute.",
    phrase: "Here's how we think about where we fit.",
    phraseZh: "这是我们对自身定位的理解。",
    sayIt: "Here's how we think about where we fit: focused, job-ready BIM training, distinct from the broader platforms, and built deeper into that gap every quarter.",
    promptZh: "把本周内容合并成一段一分钟以内的竞争定位陈述。",
    promptEn: "Combine this week's practice into one rehearsed, under-one-minute competitive positioning paragraph.",
  },

  // ---------------------------------------------------------------
  // Week 4 — Leading Through Fast Change
  // ---------------------------------------------------------------
  {
    id: 50,
    week: 4,
    category: "ROADMAP",
    title: "Share a roadmap without overpromising",
    article: [
      "In a market moving as fast as AI-driven construction tools, a roadmap that promises a specific date for an ambitious feature often ages badly. Share direction and sequence with confidence, and be more careful with exact dates on anything still being validated.",
      "\"Next, we're solving X\" is a commitment about priority. \"This will ship in six weeks\" is a commitment about time. Know which one you are actually making, and only make the second when you are confident in it.",
    ],
    translationZh: [
      "在AI驱动的施工工具这样快速变化的市场里，为一个雄心勃勃的功能承诺具体日期，常常会显得很尴尬。方向和顺序可以自信地分享，但对还在验证中的内容，具体日期要更谨慎。",
      "“接下来我们要解决X”是一个关于优先级的承诺；“这会在六周内上线”是一个关于时间的承诺。清楚自己做的是哪一种，只有在真正有把握时才做第二种承诺。",
    ],
    takeawayEn: "Commit to direction and sequence confidently; commit to exact dates only when you are truly confident.",
    phrase: "Next, we're focused on…; timing depends on…",
    phraseZh: "接下来我们专注于……；具体时间取决于……",
    sayIt: "Next, we're focused on expanding the graded exercises; timing depends on how the current pilot cohort performs.",
    promptZh: "写出一句区分“方向承诺”和“时间承诺”的路线图表达。",
    promptEn: "Write one roadmap sentence that separates a direction commitment from a time commitment.",
  },
  {
    id: 51,
    week: 4,
    category: "PREDICTION",
    title: "State a prediction with a confidence level",
    article: [
      "With roughly eighty-eight percent of enterprise AI pilots reportedly never reaching production, a founder's predictions about the category carry real weight. State a specific prediction, and attach an honest confidence level instead of stating it as certain fact.",
      "\"I'm fairly confident that…\" or \"this is a guess, but…\" are not weaknesses. They let a listener calibrate how much to act on what you just said, which makes you more useful to talk to, not less credible.",
    ],
    translationZh: [
      "既然企业AI试点项目中大约88%据报道从未真正投入生产，创始人对这个赛道的判断就很有分量。给出一个具体预测，并附上诚实的把握程度，而不是把它说成板上钉钉的事实。",
      "“我相当有把握……”或者“这是个猜测，但是……”并不是示弱。它们能让听者知道该在多大程度上采纳你刚说的话，这会让你更有用，而不是更没有说服力。",
    ],
    takeawayEn: "Attach an honest confidence level to any prediction instead of stating it as certain.",
    phrase: "I'm [confidence level] that…, based on…",
    phraseZh: "我有[某种把握程度]认为……，依据是……",
    sayIt: "I'm fairly confident that most AI pilots stall from unclear ownership, based on what we've seen across a dozen teams.",
    promptZh: "写一个行业预测句，附上你的把握程度和依据。",
    promptEn: "Write one industry prediction with a stated confidence level and reasoning.",
  },
  {
    id: 52,
    week: 4,
    category: "TEAM CHANGE",
    title: "Tell the team why the plan changed",
    article: [
      "When a labor shortfall near half a million workers reshapes what customers urgently need, a team deserves a clear explanation, not just a new list of priorities. Name what changed externally, why it changes the plan, and what stays the same.",
      "People tolerate a changed plan far better than an unexplained one. A short, honest explanation prevents the quiet assumption that the previous plan simply failed.",
    ],
    translationZh: [
      "当接近50万人的用工缺口重塑了客户最迫切的需求时，团队值得一个清楚的解释，而不只是一份新的优先级清单。说清楚外部发生了什么变化、为什么这个变化会影响计划，以及哪些部分保持不变。",
      "比起没有解释的计划变动，人们更能接受说明清楚原因的变动。一段简短、诚实的解释，能避免大家私下猜测：是不是原来的计划失败了。",
    ],
    takeawayEn: "Explain what changed externally and why it changes the plan, not just announce the new plan.",
    phrase: "Here's what changed outside, and here's why our plan follows it.",
    phraseZh: "这是外部发生的变化，这是我们的计划为什么要跟着调整。",
    sayIt: "Here's what changed outside: the labor shortfall is accelerating, and here's why our plan now prioritizes onboarding speed over feature breadth.",
    promptZh: "写一段向团队解释计划变化原因的话，先说外部变化，再说计划调整。",
    promptEn: "Draft a team message explaining an external change before announcing the resulting plan change.",
  },
  {
    id: 53,
    week: 4,
    category: "HIRING FOR AI ERA",
    title: "Hire for judgment, not tool fluency",
    article: [
      "Knowing how to prompt a specific AI tool is a skill that ages quickly as tools change monthly. Hire instead for the underlying judgment — knowing when an AI output is wrong, knowing which decisions still need a person, knowing how to verify a claim.",
      "In an interview, ask a candidate to find the error in a flawed AI-generated example rather than asking what tools they have used. The answer reveals judgment, which transfers across every future tool.",
    ],
    translationZh: [
      "知道怎么用某个特定AI工具写提示词，这种技能随着工具每个月都在变化而很快过时。应该招募的是底层判断力——知道AI的输出什么时候是错的、知道哪些决定仍然需要人来做、知道怎么核实一个说法。",
      "面试时，让候选人在一个有缺陷的AI生成示例里找出错误，而不是问他们用过哪些工具。这个答案能揭示判断力，而判断力可以迁移到未来的任何工具上。",
    ],
    takeawayEn: "Interview for the judgment to catch a wrong AI output, not familiarity with a specific current tool.",
    phrase: "We're less interested in which tools you've used, more in…",
    phraseZh: "我们不太在意你用过哪些工具，更在意……",
    sayIt: "We're less interested in which tools you've used, more in whether you can spot what an AI got wrong.",
    promptZh: "写一个面试问题，用来考察候选人对AI输出的判断力，而不是工具熟练度。",
    promptEn: "Write one interview question that tests judgment about AI output rather than tool familiarity.",
  },
  {
    id: 54,
    week: 4,
    category: "MISTAKES",
    title: "Report a mistake before it's discovered",
    article: [
      "An AI feature will eventually produce a wrong or embarrassing result. Reporting it to the affected customer before they find it themselves — with what happened, the impact, and the fix — usually preserves more trust than staying quiet and hoping it goes unnoticed.",
      "Speed matters more than polish here. A short, honest message sent quickly beats a carefully worded one sent late, after the customer has already found the problem on their own.",
    ],
    translationZh: [
      "AI功能迟早会产生一个错误或尴尬的结果。在受影响的客户自己发现之前主动告知——说清楚发生了什么、影响是什么、怎么修复——通常比保持沉默、指望没人注意到更能保住信任。",
      "这种时候速度比措辞更重要。一条简短、诚实、发得快的消息，胜过一条客户已经自己发现问题后才姗姗来迟的精心措辞。",
    ],
    takeawayEn: "Report a mistake to the affected customer before they discover it, with what happened, the impact, and the fix.",
    phrase: "We found an issue before you did. Here's what happened and what we're doing about it.",
    phraseZh: "我们在你发现之前先发现了一个问题。这是发生的情况，也是我们的处理方式。",
    sayIt: "We found an issue before you did: a review batch was flagged incorrectly, and here's the fix we're shipping today.",
    promptZh: "写一封主动报告问题的客户邮件，包含事情经过、影响和修复方案。",
    promptEn: "Draft a proactive mistake-disclosure message including what happened, the impact, and the fix.",
  },
  {
    id: 55,
    week: 4,
    category: "INDUSTRY VOICE",
    title: "Take a position without overreaching",
    article: [
      "Sharing a public opinion about where the industry is heading builds recognition, but an overreaching claim — \"every company will be automated within a year\" — invites easy criticism. A grounded claim, tied to one real observation, holds up better and travels further.",
      "State the observation, the conclusion you draw from it, and the boundary of what you are not claiming. That last part — the boundary — is what separates a credible industry voice from noise.",
    ],
    translationZh: [
      "公开分享你对行业走向的看法能建立影响力，但过度断言——比如“一年内所有公司都会被自动化”——很容易招来轻易的反驳。一个基于真实观察、有节制的判断，反而更站得住脚、传播得更远。",
      "说清楚你的观察、由此得出的结论，以及你不主张的边界。最后这一部分——边界——正是把可信的行业声音和纯粹的噪音区分开的关键。",
    ],
    takeawayEn: "Ground a public claim in one real observation, and state clearly what you are not claiming.",
    phrase: "What I'm seeing is…; I'm not saying…, but I do think…",
    phraseZh: "我观察到的是……；我并不是说……，但我确实认为……",
    sayIt: "What I'm seeing is that pilots without a named owner rarely ship; I'm not saying AI adoption is slowing, but I do think ownership is the real bottleneck.",
    promptZh: "写一段你可以公开发表的行业观点，包含观察、结论和边界。",
    promptEn: "Draft a public industry opinion with an observation, a conclusion, and a stated boundary.",
  },
  {
    id: 56,
    week: 4,
    category: "CLOSING PITCH",
    title: "Tell the founder story, updated",
    article: [
      "Round one asked you to connect insight, evidence, and ambition. Now update that story with what you have learned about the market itself — what you correctly predicted, what surprised you, and how the company's plan changed in response. A founder story that evolves with real evidence is more convincing than one that never changes.",
      "End by naming the specific future you believe is coming, based on everything you have practiced saying honestly this round, and the role you are asking the listener to play in it.",
    ],
    translationZh: [
      "第一轮训练要求你把洞察、证据和野心连接起来。现在，用你对市场本身的新理解来更新这个故事——你准确预测了什么、什么让你意外、公司的计划因此发生了怎样的调整。一个会随真实证据演化的创始人故事，比一个永远不变的故事更有说服力。",
      "结尾时，基于这一轮你练习诚实表达的一切，说出你相信正在到来的具体未来，以及你希望听众在其中扮演的角色。",
    ],
    takeawayEn: "Update your founder story with what you predicted correctly, what surprised you, and how the plan changed.",
    phrase: "What we got right was…; what surprised us was…; here's where that leads next.",
    phraseZh: "我们判断准确的是……；让我们意外的是……；这会带我们走向……",
    sayIt: "What we got right was that ownership, not tooling, decides whether AI adoption sticks; what surprised us was how fast customers wanted proof of that judgment, not just a demo.",
    promptZh: "录一段60秒更新版创始人故事：判断对了什么、意外发生了什么、下一步是什么。",
    promptEn: "Record a 60-second updated founder story: what you got right, what surprised you, and what's next.",
  },
];

/**
 * Suggested copy for Round 2 (not wired into `dailyCopy` — see scope note
 * above). Kept here so the strings exist in one place when someone builds
 * the round-switching UI.
 */
export const round2Meta = {
  zh: {
    roundLabel: "第二轮 · 读懂市场",
    eyebrow: "FOUNDER DAILY · ROUND 2",
    title: "每天 6 分钟，\n把行业判断力变成英语表达力。",
    intro:
      "第一轮练的是讲清公司；这一轮练的是在一个AI每月都在变化的行业里，用英语准确、诚实地谈判断、谈能力边界、谈竞争。",
    weekNames: ["读懂市场", "诚实谈AI", "竞争定位", "带队穿越变化"],
  },
  en: {
    roundLabel: "Round 2 · Reading the Market",
    eyebrow: "FOUNDER DAILY · ROUND 2",
    title: "Six minutes a day.\nTurn market judgment into spoken English.",
    intro:
      "Round 1 built the company pitch. Round 2 builds the fluency to talk — accurately and honestly — about a market that changes every month: what's real, what AI can and can't do, and where you stand against competitors.",
    weekNames: ["Reading the Market", "Talking About AI Honestly", "Positioning Against Competitors", "Leading Through Fast Change"],
  },
} as const;

/**
 * Sources used to ground this round's content in real, dated 2026 events
 * (facts only — no text reproduced from these articles).
 */
export const sources = {
  autodeskForma:
    "https://www.autodesk.com/blogs/construction/autodesk-forma-march-2026-construction-releases-built-for-whats-next/",
  autodeskFormaMay:
    "https://www.autodesk.com/blogs/construction/may-autodesk-forma-construction-releases-built-for-whats-next/",
  autodeskConstructionCloudMerge:
    "https://bimcafe.in/blog/autodesk-construction-cloud-joins-autodesk-forma-2026/",
  procoreDigitalCoworker:
    "https://www.procore.com/press/procore-introduces-digital-coworker-packages-expands-ai-agent-library-and-previews-skills-to-help-construction-teams-put-ai-to-work",
  trimbleAiTakeoff:
    "https://aecmag.com/ai/trimble-adds-ai-driven-takeoff-and-estimating-tools-for-mep-contractors/",
  kestrelLabs:
    "https://newmarketpitch.com/blogs/news/industrial-ai-funding-analysis",
  enterpriseAiAgentAdoption:
    "https://www.digitalapplied.com/blog/ai-agent-adoption-2026-enterprise-data-points",
  constructionAiAdoption:
    "https://www.agentpmt.com/articles/construction-ai-adoption-hits-37-as-worker-shortage-grows",
} as const;

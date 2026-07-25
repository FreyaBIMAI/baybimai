import ContactForm from "./contact-form";
import PurchaseButton from "./purchase-button";

const floatingTerms = [
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
];

const offers = [
  {
    tag: "TO C · 主线",
    title: "Revit 闪电入门课",
    copy: "面向零基础学习者，快速掌握 Revit 基础建模与常用工作流程。随时学习，学完就能上手。",
    note: "$59 · 一次性购买",
    featured: true,
  },
  {
    tag: "TO B · 企业",
    title: "企业 BIM 培训",
    copy: "围绕团队现状、项目类型和交付目标定制课程，让培训直接服务于正在发生的项目。",
    note: "适合设计院、施工与业主团队",
    featured: false,
  },
  {
    tag: "TO B · 专项",
    title: "BIM 审计",
    copy: "独立检查模型质量、标准执行与交付完整性，提前识别影响协同和验收的问题。",
    note: "适合项目节点与交付前审查",
    featured: false,
  },
];

export default function Home() {
  return (
    <main>
      <nav className="nav" aria-label="主导航">
        <a className="brand" href="#top" aria-label="BAYBIMAI 首页">
          BAY<span>BIM</span>AI
        </a>
        <p>BIM LEARNING &amp; ENTERPRISE SERVICES</p>
      </nav>

      <section className="hero" id="top">
        <div className="star-field" aria-hidden="true">
          {floatingTerms.map((term, index) => (
            <span className={`float-term term-${index + 1}`} key={term}>
              {term}
            </span>
          ))}
        </div>

        <div className="hero-copy">
          <div className="eyebrow">
            <span />
            从课程到企业落地
          </div>
          <h1>
            把 <em>BIM</em> 学到
            <br />
            真正能用。
          </h1>
          <p className="subtitle">
            面向个人的实战课程包，面向企业的定制培训。
            <br />
            需要更严格的项目把关，我们也提供独立 BIM 审计。
          </p>
          <ContactForm />
        </div>

        <div className="bim-graphic" aria-hidden="true">
          <div className="plane plane-a" />
          <div className="plane plane-b" />
          <div className="axis axis-x" />
          <div className="axis axis-y" />
          <div className="node node-a" />
          <div className="node node-b" />
          <div className="node node-c" />
          <span>BIM</span>
        </div>
      </section>

      <section className="offers" id="courses" aria-labelledby="offers-title">
        <div className="offers-heading">
          <p>THREE WAYS TO WORK WITH US</p>
          <h2 id="offers-title">学习、培训、审计，一条清晰的能力路径。</h2>
        </div>

        <div className="cards">
          {offers.map((offer, index) => (
            <article
              className={`card ${offer.featured ? "featured" : ""}`}
              key={offer.title}
            >
              <div className="card-top">
                <span className="card-index">0{index + 1}</span>
                <span className="card-tag">{offer.tag}</span>
              </div>
              <h3>{offer.title}</h3>
              <p>{offer.copy}</p>
              <div className="card-footer">
                <div className="card-note">{offer.note}</div>
                {offer.featured ? <PurchaseButton /> : null}
              </div>
            </article>
          ))}
        </div>
      </section>

      <footer>
        <a className="brand" href="#top">
          BAY<span>BIM</span>AI
        </a>
        <p>让 BIM 能力真正进入工作。</p>
        <p>© {new Date().getFullYear()} BAYBIMAI.ORG</p>
      </footer>
    </main>
  );
}

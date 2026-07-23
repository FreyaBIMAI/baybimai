const capabilities = [
  {
    number: "01",
    title: "AI Products",
    copy: "从清晰的问题出发，设计真正进入工作流的智能产品，而不是停留在演示阶段。",
  },
  {
    number: "02",
    title: "Agent Systems",
    copy: "把模型、工具与业务知识编排成可靠、可评估、可持续迭代的智能代理系统。",
  },
  {
    number: "03",
    title: "Applied Research",
    copy: "用快速原型与严格验证，把新技术转化成组织能理解、采用并放大的能力。",
  },
];

const principles = [
  ["Useful", "价值先于炫技"],
  ["Human", "增强人的判断"],
  ["Rigorous", "用结果验证想法"],
];

function Arrow() {
  return <span aria-hidden="true">↗</span>;
}

export default function Home() {
  return (
    <main>
      <nav className="nav" aria-label="主导航">
        <a className="brand" href="#top" aria-label="BAYBIMAI 首页">
          BAYBIM<span>AI</span>
        </a>
        <div className="nav-links">
          <a href="#work">我们做什么</a>
          <a href="#approach">方法</a>
          <a className="nav-cta" href="mailto:hello@baybimai.org">
            开始合作 <Arrow />
          </a>
        </div>
      </nav>

      <section className="hero" id="top">
        <div className="eyebrow">
          <span className="status-dot" />
          AI PRODUCT &amp; RESEARCH STUDIO
        </div>
        <h1>
          让想法
          <br />
          <em>向前发生。</em>
        </h1>
        <div className="hero-bottom">
          <p>
            BAYBIMAI 与有远见的团队一起，把人工智能变成清晰、可靠、真正有用的产品。
          </p>
          <a className="circle-link" href="#work" aria-label="了解我们的能力">
            <span>探索</span>
            <Arrow />
          </a>
        </div>
        <div className="orbital" aria-hidden="true">
          <div className="orbit orbit-one" />
          <div className="orbit orbit-two" />
          <div className="orbit orbit-three" />
          <div className="core">B</div>
        </div>
      </section>

      <section className="manifesto" id="approach">
        <p className="section-label">OUR POINT OF VIEW</p>
        <div className="manifesto-grid">
          <h2>
            智能不该只是
            <br />
            更多输出。
          </h2>
          <div>
            <p className="lead">
              它应该带来更好的决策、更轻的工作方式，以及原本不可能实现的新体验。
            </p>
            <p className="subcopy">
              我们连接产品思维、AI 工程和设计，从第一天就围绕真实价值构建。
            </p>
          </div>
        </div>
      </section>

      <section className="work" id="work">
        <div className="section-heading">
          <p className="section-label">WHAT WE BUILD</p>
          <p>从机会识别，到可工作的第一版，再到规模化落地。</p>
        </div>
        <div className="capability-list">
          {capabilities.map((item) => (
            <article className="capability" key={item.number}>
              <span className="cap-number">{item.number}</span>
              <h3>{item.title}</h3>
              <p>{item.copy}</p>
              <Arrow />
            </article>
          ))}
        </div>
      </section>

      <section className="principles">
        <p className="section-label">HOW WE THINK</p>
        <div className="principle-grid">
          {principles.map(([title, copy]) => (
            <div className="principle" key={title}>
              <span>{title}</span>
              <p>{copy}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="contact">
        <p className="section-label">LET&apos;S BUILD WHAT&apos;S NEXT</p>
        <h2>
          有一个值得
          <br />
          实现的想法？
        </h2>
        <a href="mailto:hello@baybimai.org">
          hello@baybimai.org <Arrow />
        </a>
      </section>

      <footer>
        <a className="brand" href="#top">
          BAYBIM<span>AI</span>
        </a>
        <p>BUILDING AI THAT MOVES IDEAS FORWARD.</p>
        <p>© {new Date().getFullYear()} BAYBIMAI.ORG</p>
      </footer>
    </main>
  );
}

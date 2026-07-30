import type { Metadata } from "next";
import NewsShell from "./news-shell";
import ReadingTools from "./reading-tools";
import styles from "./news.module.css";

export const WEEKLY_SLUG = "weekly-bim-intelligence-001";

const sections = [
  {
    number: "01",
    label: "INDUSTRY",
    title: "China’s $2.1T urban-renewal signal",
    paragraphs: [
      "China has released its first national urban-renewal plan for the 2026–2030 period. The direction is structural: less dependence on outward expansion and more investment in making existing cities safer, more resilient, and more productive.",
      "The plan covers aging neighborhoods and unsafe housing, underground gas, water, drainage and heating networks, old industrial districts, public services, and the digital modernization of urban infrastructure. The often-cited RMB 15 trillion—about US$2.1 trillion—is an industry estimate, not a government budget commitment.",
      "For BIM teams, this changes the center of gravity. Existing-condition surveys, scan-to-BIM, phased renovation models, underground-utility information, digital twins, and asset-information management become more valuable when the project begins with imperfect buildings and fragmented records—not a clean greenfield model.",
    ],
  },
  {
    number: "02",
    label: "INTERNATIONAL BIM",
    title: "Singapore CORENET X: the mandate is narrower—and more urgent",
    paragraphs: [
      "Singapore updated the CORENET X implementation schedule in July 2026. From October 1, 2026, Gateway Process submissions become mandatory for new projects with gross floor area of at least 5,000 m². Projects below that threshold remain voluntary for now. The earlier plan to require all new projects regardless of size has been revised.",
      "The professional opportunity is still clear. CORENET X moves regulatory review toward coordinated, model-based submissions and IFC+SG information requirements. Teams need reliable classification, properties, model federation, validation, and issue ownership—not only geometrically correct authoring.",
      "A useful consulting offer is therefore not “IFC export.” It is submission readiness: information-requirement mapping, preflight checks, cross-discipline QA/QC, export troubleshooting, and evidence that the submitted model is consistent with the design intent.",
    ],
  },
  {
    number: "03",
    label: "AI",
    title: "Average is the new baseline",
    paragraphs: [
      "AI can now produce competent summaries, draft workflows, scripts, and documentation in minutes. That raises the floor of professional output, but it does not remove the need for judgment.",
      "In AEC, the hard questions are contextual: Which tolerance is acceptable? Which object owns the data? Is a clash buildable? What must survive handover? When should an automated check block a submission? These decisions require domain knowledge, project experience, and accountability.",
      "The durable advantage is the ability to frame the problem, supply trustworthy context, test the output, and connect it to cost, schedule, risk, compliance, or operations.",
    ],
  },
  {
    number: "04",
    label: "TECHNICAL",
    title: "One BIM mistake you cannot afford: coordinate systems",
    paragraphs: [
      "A coordinate error can contaminate every downstream deliverable: federated models, clash tests, point clouds, civil references, quantity workflows, IFC files, and field layout.",
      "Before coordination begins, verify the survey reference, internal origin, Project Base Point, Survey Point, shared-coordinate acquisition or publishing method, True North, units, and the transformation used by every linked model.",
      "Then test the exchange—not only the authoring file. Export a small IFC, federate it with a known reference, confirm elevation and rotation, and record the approved coordinate procedure in the BIM Execution Plan. A screenshot of aligned control points is cheap insurance.",
    ],
  },
  {
    number: "05",
    label: "CAREER",
    title: "Why pure modeling is becoming a commodity",
    paragraphs: [
      "Revit production remains necessary, but a service described only as modeling is easy to compare by hourly rate. The higher-value layer is deciding what should be modeled, how information should move, how quality is proven, and how the model changes a project outcome.",
      "Instead of selling “Revit modeling,” package the result: existing-condition digitization, BIM standards and governance, automated QA, model-to-cost workflows, digital delivery, AI-assisted review, or asset-data handover.",
      "For a portfolio, show the decision and the outcome. A strong case study explains the project constraint, the information workflow, the checks you designed, the defects you caught, and the measurable time, cost, or risk impact.",
    ],
  },
];

export const weeklyMetadata: Metadata = {
  title: "Weekly BIM Intelligence #001 | BAYBIMAI",
  description:
    "China urban renewal, Singapore CORENET X, AI’s new baseline, coordinate-system risk, and the shift from BIM modeling to higher-value digital delivery.",
  alternates: {
    canonical: `/en/news/${WEEKLY_SLUG}`,
  },
  openGraph: {
    type: "article",
    publishedTime: "2026-07-30",
    title: "Weekly BIM Intelligence #001",
    description:
      "Five signals shaping BIM, openBIM, AI for AEC, technical delivery, and careers.",
  },
};

export default function WeeklyBimIntelligence001() {
  return (
    <NewsShell lang="en" article>
      <main id="news-main" tabIndex={-1}>
        <ReadingTools lang="en">
          <article id="article-body" className={styles.article}>
            <header className={styles.articleHeader}>
              <a className={styles.backLink} href="/en/news">
                <span aria-hidden="true">←</span>
                Back to News
              </a>
              <div className={styles.articleMeta}>
                <span>WEEKLY BIM INTELLIGENCE · #001</span>
                <time dateTime="2026-07-30">July 30, 2026</time>
                <span>8 min read</span>
              </div>
              <h1>
                The renovation economy is changing what BIM expertise is worth
              </h1>
              <p className={styles.articleDeck}>
                Five signals across urban renewal, openBIM regulation, AI,
                technical delivery, and the BIM career market.
              </p>
            </header>

            <div className={styles.articleBody}>
              <p className={styles.articleLead}>
                This week’s central idea: as software output becomes cheaper,
                reliable project judgment becomes more valuable. The strongest
                BIM professionals will connect models to standards, existing
                assets, regulatory data, and measurable business outcomes.
              </p>

              {sections.map((section) => (
                <section
                  className={styles.articleSection}
                  key={section.number}
                  aria-labelledby={`weekly-section-${section.number}`}
                >
                  <div className={styles.sectionNumber}>{section.number}</div>
                  <div>
                    <p className={styles.weeklyLabel}>{section.label}</p>
                    <h2 id={`weekly-section-${section.number}`}>
                      {section.title}
                    </h2>
                    {section.paragraphs.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                </section>
              ))}

              <aside className={styles.takeaway}>
                <p className={styles.takeawayLabel}>BAYBIM INSIGHT</p>
                <p className={styles.insightStatement}>
                  Every technology eventually becomes cheaper. The scarce
                  resource is not software proficiency—it is the ability to
                  combine engineering knowledge, AI, international standards,
                  and business understanding into real project outcomes.
                </p>
              </aside>

              <p className={styles.editorialNote}>
                Reporting reflects information available on July 30, 2026.
                Market-size estimates and BAYBIMAI interpretations are clearly
                distinguished from official policy commitments.
              </p>

              <section
                className={styles.sourceSection}
                aria-labelledby="weekly-sources"
              >
                <h2 id="weekly-sources">Sources & further reading</h2>
                <ol>
                  <li>
                    <a
                      href="https://english.www.gov.cn/policies/latestreleases/202605/29/content_WS6a18db36c6d00ca5f9a0b500.html"
                      target="_blank"
                      rel="noreferrer"
                    >
                      State Council of China — 2026–2030 Urban Renewal Plan
                      <span aria-hidden="true">↗</span>
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://english.scio.gov.cn/pressroom/2026-06/09/content_118539611.html"
                      target="_blank"
                      rel="noreferrer"
                    >
                      State Council Information Office — policy briefing
                      <span aria-hidden="true">↗</span>
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://info.corenet.gov.sg/docs/default-source/bca-circulars/circular-for-updates-to-corenet-x-implementation-plan.pdf"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Singapore CORENET X — July 2026 implementation update
                      <span aria-hidden="true">↗</span>
                    </a>
                  </li>
                </ol>
              </section>
            </div>
          </article>
        </ReadingTools>
      </main>
    </NewsShell>
  );
}

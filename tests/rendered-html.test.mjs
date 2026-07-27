import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);

async function source(pathname) {
  return readFile(new URL(pathname, root), "utf8");
}

test("ships Chinese and English news routes", async () => {
  await Promise.all([
    access(new URL("app/news/page.tsx", root)),
    access(new URL("app/news/construction-ai-agents-2026/page.tsx", root)),
    access(new URL("app/en/news/page.tsx", root)),
    access(
      new URL("app/en/news/construction-ai-agents-2026/page.tsx", root),
    ),
  ]);

  const [chrome, dictionaries] = await Promise.all([
    source("app/site-chrome.tsx"),
    source("app/dictionaries.ts"),
  ]);
  assert.match(chrome, /\/news/);
  assert.match(chrome, /\/en\/news/);
  assert.match(dictionaries, /newsLabel: "新闻"/);
  assert.match(dictionaries, /newsLabel: "News"/);
});

test("includes verified report content and official sources", async () => {
  const content = await source("app/news/news-content.ts");

  assert.match(content, /施工 AI 不再只回答问题/);
  assert.match(content, /Construction AI is no longer/);
  assert.match(content, /procore\.com\/press/);
  assert.match(content, /news\.trimble\.com/);
  assert.match(content, /adsknews\.autodesk\.com/);
  assert.match(content, /2026 年 7 月 27 日/);
});

test("includes accessible reading controls and local preferences", async () => {
  const [tools, styles] = await Promise.all([
    source("app/news/reading-tools.tsx"),
    source("app/news/news.module.css"),
  ]);

  assert.match(tools, /speechSynthesis/);
  assert.match(tools, /aria-valuenow/);
  assert.match(tools, /aria-live="polite"/);
  assert.match(tools, /localStorage/);
  assert.match(tools, /\[0\.8, 1, 1\.2, 1\.5\]/);
  assert.match(styles, /min-height:\s*44px/);
  assert.match(styles, /prefers-reduced-motion:\s*reduce/);
  assert.match(styles, /\.darkMode/);
});

test("ships bilingual Bay Area AEC careers routes in the primary navigation", async () => {
  await Promise.all([
    access(new URL("app/careers/page.tsx", root)),
    access(new URL("app/en/careers/page.tsx", root)),
  ]);

  const [chrome, dictionaries, newsShell] = await Promise.all([
    source("app/site-chrome.tsx"),
    source("app/dictionaries.ts"),
    source("app/news/news-shell.tsx"),
  ]);

  assert.match(chrome, /\/careers/);
  assert.match(chrome, /\/en\/careers/);
  assert.match(dictionaries, /careersLabel: "湾区求职"/);
  assert.match(dictionaries, /careersLabel: "Bay Area Careers"/);
  assert.match(newsShell, /content\.careersPath/);
});

test("careers ranking distinguishes public market cap from private valuation", async () => {
  const [content, ranking] = await Promise.all([
    source("app/careers/careers-content.ts"),
    source("app/careers/company-ranking.tsx"),
  ]);

  assert.match(content, /Turner Construction/);
  assert.match(content, /DPR Construction/);
  assert.match(content, /公开集团年营收/);
  assert.match(content, /Private · not disclosed/);
  assert.match(content, /companiesmarketcap\.com/);
  assert.match(content, /turnerconstruction\.com\/careers/);
  assert.match(ranking, /aria-pressed/);
  assert.match(ranking, /marketCapUsd === null/);
  assert.match(ranking, /Open official careers|copy\.careersCta/);
});

test("careers page includes accessible controls and interview preparation resources", async () => {
  const [page, styles] = await Promise.all([
    source("app/careers/careers-page.tsx"),
    source("app/careers/careers.module.css"),
  ]);

  assert.match(page, /company-ranking-title/);
  assert.match(page, /content\.prep\.screenItems/);
  assert.match(page, /content\.prep\.portfolioItems/);
  assert.match(page, /content\.prep\.days/);
  assert.match(styles, /min-height:\s*44px/);
  assert.match(styles, /@media \(max-width:\s*440px\)/);
  assert.match(styles, /prefers-reduced-motion:\s*reduce/);
});

test("ships bilingual Global BIM Radar routes in primary and news navigation", async () => {
  await Promise.all([
    access(new URL("app/radar/page.tsx", root)),
    access(new URL("app/en/radar/page.tsx", root)),
  ]);

  const [chrome, dictionaries, newsShell] = await Promise.all([
    source("app/site-chrome.tsx"),
    source("app/dictionaries.ts"),
    source("app/news/news-shell.tsx"),
  ]);

  assert.match(chrome, /\/radar/);
  assert.match(chrome, /\/en\/radar/);
  assert.match(dictionaries, /radarLabel: "全球BIM雷达"/);
  assert.match(dictionaries, /radarLabel: "Global BIM Radar"/);
  assert.match(newsShell, /content\.radarPath/);
});

test("radar uses official sources and distinguishes confirmed dates from watch items", async () => {
  const [content, filter] = await Promise.all([
    source("app/radar/radar-content.ts"),
    source("app/radar/event-filter.tsx"),
  ]);

  assert.match(content, /aechackathon\.com/);
  assert.match(content, /building-smart\.or\.jp\/bsisummittokyo2026/);
  assert.match(content, /technical\.buildingsmart\.org\/standards/);
  assert.match(content, /company\.sbb\.ch/);
  assert.match(content, /boverket\.se/);
  assert.match(content, /buildingsmart\.fi/);
  assert.match(content, /arxiv\.org\/abs\/2606\.20146/);
  assert.match(content, /2026 年 7 月 27 日/);
  assert.match(filter, /aria-pressed/);
  assert.match(filter, /data-status/);
});

test("radar includes events, standards, papers, builder paths, and accessible responsive rules", async () => {
  const [page, content, styles] = await Promise.all([
    source("app/radar/radar-page.tsx"),
    source("app/radar/radar-content.ts"),
    source("app/radar/radar.module.css"),
  ]);

  assert.match(page, /id="events"/);
  assert.match(page, /id="regions"/);
  assert.match(page, /id="standards"/);
  assert.match(page, /id="research"/);
  assert.match(page, /id="people"/);
  assert.match(page, /from "next\/image"/);
  assert.match(page, /card\.imageAlt/);
  assert.match(page, /loading="lazy"/);
  assert.match(page, /unoptimized/);
  assert.match(page, /content\.awards\.steps/);
  assert.match(content, /\/people\/rebecca-de-cicco\.webp/);
  assert.match(content, /\/people\/kimon-onuma\.webp/);
  assert.match(content, /\/people\/keith-bentley\.webp/);
  assert.match(content, /\/people\/leon-van-berlo\.webp/);
  assert.match(styles, /\.personPortrait/);
  assert.match(styles, /filter:\s*grayscale\(1\)/);
  assert.match(styles, /min-height:\s*44px/);
  assert.match(styles, /@media \(max-width:\s*430px\)/);
  assert.match(styles, /prefers-reduced-motion:\s*reduce/);
});

test("radar ships optimized local portraits for all builder profiles", async () => {
  await Promise.all([
    access(new URL("public/people/rebecca-de-cicco.webp", root)),
    access(new URL("public/people/kimon-onuma.webp", root)),
    access(new URL("public/people/keith-bentley.webp", root)),
    access(new URL("public/people/leon-van-berlo.webp", root)),
  ]);
});

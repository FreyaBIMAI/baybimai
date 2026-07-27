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

  const [home, dictionaries] = await Promise.all([
    source("app/home-view.tsx"),
    source("app/dictionaries.ts"),
  ]);
  assert.match(home, /\/news/);
  assert.match(home, /\/en\/news/);
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

"use client";

import { createContext, useContext } from "react";

// Shared between the reading-tools playback engine (provider) and article
// bodies (consumer) so a page can highlight the word currently being read
// without the engine needing to know anything about that page's markup.
export type ReadingCursorValue = {
  active: boolean;
  charIndex: number;
};

const defaultValue: ReadingCursorValue = { active: false, charIndex: 0 };

export const ReadingCursorContext = createContext<ReadingCursorValue>(defaultValue);

export function useReadingCursor() {
  return useContext(ReadingCursorContext);
}

export type WordToken = {
  segmentKey: string;
  text: string;
  start: number;
  end: number;
};

// Chinese (and other CJK) text carries no spaces between words, so a plain
// \S+ split would treat an entire unbroken paragraph as a single "word" —
// technically not wrong, but it defeats a read-along cursor, which needs to
// visibly advance through the sentence. Each CJK character becomes its own
// token instead; runs of everything else (Latin words, numbers, punctuation
// attached to them) stay grouped, matching normal English word-by-word
// highlighting.
const CJK_CHAR = "\\u4e00-\\u9fff\\u3400-\\u4dbf\\uf900-\\ufaff";
const TOKEN_PATTERN = new RegExp(`[${CJK_CHAR}]|[^\\s${CJK_CHAR}]+`, "g");

// Tokenizes a segment's text into words (or, for CJK runs, characters) with
// offsets relative to the full spoken string (`baseOffset` is that
// segment's start within it), so the playback engine's approximate
// charIndex can be mapped to a token.
export function tokenizeSegment(
  segmentKey: string,
  text: string,
  baseOffset: number,
): WordToken[] {
  const tokens: WordToken[] = [];
  const pattern = new RegExp(TOKEN_PATTERN);
  let match: RegExpExecArray | null;
  while ((match = pattern.exec(text)) !== null) {
    const start = baseOffset + match.index;
    tokens.push({ segmentKey, text: match[0], start, end: start + match[0].length });
  }
  return tokens;
}

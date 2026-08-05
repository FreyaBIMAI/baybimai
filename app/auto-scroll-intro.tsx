"use client";

import { useEffect } from "react";

const SCROLL_TARGET_ID = "courses";
const INITIAL_DELAY_MS = 700;
const DURATION_MS = 3200;
const INTERRUPT_EVENTS = ["wheel", "touchstart", "pointerdown", "keydown"] as const;

function easeInOutCubic(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2;
}

// Slowly auto-scrolls a fresh homepage landing down to the offers section,
// so the entrance reveal animations play as it goes. Never fights the
// visitor: any scroll/touch/key input cancels it immediately, and it never
// runs for reduced-motion, a deep link, or a page already scrolled.
export default function AutoScrollIntro() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.scrollY > 40 || window.location.hash) return;

    let stopped = false;
    let rafId = 0;
    let timerId = 0;

    const stop = () => {
      if (stopped) return;
      stopped = true;
      window.clearTimeout(timerId);
      cancelAnimationFrame(rafId);
      for (const eventName of INTERRUPT_EVENTS) {
        window.removeEventListener(eventName, stop);
      }
    };

    for (const eventName of INTERRUPT_EVENTS) {
      window.addEventListener(eventName, stop, { passive: true });
    }

    timerId = window.setTimeout(() => {
      if (stopped) return;
      const target = document.getElementById(SCROLL_TARGET_ID);
      const nav = document.querySelector(".nav");
      if (!target) {
        stop();
        return;
      }
      const navHeight = nav instanceof HTMLElement ? nav.getBoundingClientRect().height : 0;
      const startY = window.scrollY;
      const endY = Math.max(0, target.getBoundingClientRect().top + startY - navHeight - 12);
      if (endY <= startY + 4) {
        stop();
        return;
      }

      const startTime = performance.now();
      const step = (now: number) => {
        if (stopped) return;
        const progress = Math.min(1, (now - startTime) / DURATION_MS);
        window.scrollTo(0, startY + (endY - startY) * easeInOutCubic(progress));
        if (progress < 1) {
          rafId = requestAnimationFrame(step);
        } else {
          stop();
        }
      };
      rafId = requestAnimationFrame(step);
    }, INITIAL_DELAY_MS);

    return stop;
  }, []);

  return null;
}

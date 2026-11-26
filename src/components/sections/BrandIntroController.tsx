"use client";

import { useEffect } from "react";

const STORAGE_KEY = "bz-intro";
const TOTAL_MS = 2850; // keep in sync with intro-exit delay + duration in globals.css

/** Ends the intro when its curtain finishes, on skip, or by a safety timeout. */
export function BrandIntroController() {
  useEffect(() => {
    const html = document.documentElement;
    if (!html.classList.contains("intro")) return;

    try {
      sessionStorage.setItem(STORAGE_KEY, "1");
    } catch {
      /* storage unavailable (private mode) — intro may replay, harmless */
    }

    const overlay = document.getElementById("brand-intro");
    let done = false;

    const finish = () => {
      if (done) return;
      done = true;
      html.classList.remove("intro");
      cleanup();
    };

    const onAnimEnd = (e: AnimationEvent) => {
      if (e.target === overlay && e.animationName === "intro-exit") finish();
    };
    const onKey = (e: KeyboardEvent) => {
      // Any key skips; let Tab move focus into the page naturally.
      if (e.key !== "Tab") e.preventDefault();
      finish();
    };

    overlay?.addEventListener("animationend", onAnimEnd);
    overlay?.addEventListener("click", finish);
    window.addEventListener("keydown", onKey);
    window.addEventListener("wheel", finish, { passive: true });
    window.addEventListener("touchmove", finish, { passive: true });
    // Safety net in case animationend never fires (backgrounded tab, etc.).
    const timer = window.setTimeout(finish, TOTAL_MS + 600);

    function cleanup() {
      overlay?.removeEventListener("animationend", onAnimEnd);
      overlay?.removeEventListener("click", finish);
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("wheel", finish);
      window.removeEventListener("touchmove", finish);
      window.clearTimeout(timer);
    }

    return () => {
      // Navigating away mid-intro: make sure the page is never left locked.
      finish();
    };
  }, []);

  return null;
}

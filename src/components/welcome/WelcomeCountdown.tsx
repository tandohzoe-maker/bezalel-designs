"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { WELCOME_SECONDS, welcomeQuotes } from "@/config/quotes";
import { Contours } from "@/components/ui/Contours";
import { Monogram } from "@/components/ui/Wordmark";
import { cn } from "@/lib/cn";

const STORAGE_KEY = "bz-intro";
const PER_QUOTE = WELCOME_SECONDS / welcomeQuotes.length; // seconds each quote shows

/**
 * Welcome countdown shown on the first page of each visit: 15 seconds of
 * rotating design quotes, ending on the studio's own. Visitors can skip.
 *
 * Shown only when the pre-paint head script added `html.intro` (JavaScript on,
 * first page this session). CSS also removes it after the countdown, so it can
 * never trap a visitor if scripts fail.
 */
export function WelcomeCountdown() {
  const [active, setActive] = useState(false);
  const [left, setLeft] = useState(WELCOME_SECONDS);
  const [leaving, setLeaving] = useState(false);
  const skipRef = useRef<HTMLButtonElement>(null);
  const finished = useRef(false);

  const finish = useCallback(() => {
    if (finished.current) return;
    finished.current = true;
    setLeaving(true);
    window.setTimeout(() => {
      document.documentElement.classList.remove("intro");
      setActive(false);
    }, 700);
  }, []);

  useEffect(() => {
    const html = document.documentElement;
    if (!html.classList.contains("intro")) return;
    setActive(true);
    try {
      sessionStorage.setItem(STORAGE_KEY, "1");
    } catch {
      /* private mode: may show again next page — harmless */
    }
    // Timed from when the page started opening (performance time origin), so the
    // number matches the CSS ring and the total wait is 15 s, not 15 s + load.
    const tick = () => Math.max(0, WELCOME_SECONDS - performance.now() / 1000);
    setLeft(tick());
    const id = window.setInterval(() => {
      const remaining = tick();
      setLeft(remaining);
      if (remaining <= 0) {
        window.clearInterval(id);
        finish();
      }
    }, 100);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") finish();
    };
    window.addEventListener("keydown", onKey);
    requestAnimationFrame(() => skipRef.current?.focus({ preventScroll: true }));
    return () => {
      window.clearInterval(id);
      window.removeEventListener("keydown", onKey);
      html.classList.remove("intro");
    };
  }, [finish]);

  const elapsed = WELCOME_SECONDS - left;
  const index = Math.min(welcomeQuotes.length - 1, Math.floor(elapsed / PER_QUOTE));
  const quote = welcomeQuotes[index];
  const shown = Math.ceil(left);

  if (finished.current && !active) return null;

  return (
    <div
      id="welcome"
      role="dialog"
      aria-modal="true"
      aria-labelledby="welcome-quote"
      data-active={active || undefined}
      className={cn(
        "welcome-overlay fixed inset-0 z-[90] flex-col bg-[#07040c] text-white transition-opacity duration-700",
        leaving && "pointer-events-none opacity-0",
      )}
    >
      <Contours className="absolute inset-0 -z-0 h-full w-full text-purple-bright/[0.09]" />
      <div aria-hidden className="absolute top-1/2 left-1/2 size-[70vmin] -translate-1/2 rounded-full bg-purple/25 blur-[120px]" />

      {/* Top: brand */}
      <div className="relative flex items-center justify-between px-5 pt-6 sm:px-10 sm:pt-8">
        <span className="inline-flex items-center gap-2.5">
          <Monogram />
          <span className="text-[1.05rem] font-extrabold tracking-[0.08em] uppercase">Bezalel</span>
          <span className="rounded-full bg-purple-bright/15 px-1.5 py-0.5 text-[0.6rem] font-semibold tracking-[0.12em] text-purple-bright uppercase ring-1 ring-purple-bright/30">
            Live
          </span>
        </span>
        <button
          ref={skipRef}
          type="button"
          onClick={finish}
          className="rounded-full border border-white/15 bg-white/[0.06] px-5 py-2.5 text-sm font-medium hover:bg-white/[0.14]"
        >
          Skip <span aria-hidden>→</span>
        </button>
      </div>

      {/* Centre: quote */}
      <div className="relative flex flex-1 items-center justify-center px-6">
        <figure key={index} className="welcome-quote max-w-4xl text-center">
          <blockquote>
            <p
              id="welcome-quote"
              className={cn(
                "text-[clamp(1.9rem,1.2rem+3.2vw,4.25rem)] leading-[1.08] font-medium tracking-[-0.045em]",
                quote.own && "text-white",
              )}
            >
              {quote.own ? (
                <>
                  Design is <mark className="mark-purple">expressive</mark>. Let us help you express yours.
                </>
              ) : (
                <>&ldquo;{quote.text}&rdquo;</>
              )}
            </p>
          </blockquote>
          <figcaption className="mt-8 font-mono text-[0.85rem] text-white/70">
            — {quote.author}
            {quote.role ? <span className="text-white/45"> · {quote.role}</span> : null}
          </figcaption>
        </figure>
      </div>

      {/* Bottom: countdown */}
      <div className="relative flex flex-col items-center gap-4 pb-10 sm:pb-14">
        <div className="relative size-20">
          <svg viewBox="0 0 80 80" className="size-full -rotate-90" aria-hidden>
            <circle cx="40" cy="40" r="36" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="3" />
            <circle
              cx="40"
              cy="40"
              r="36"
              fill="none"
              stroke="var(--color-purple-bright)"
              strokeWidth="3"
              strokeLinecap="round"
              pathLength={100}
              strokeDasharray="100"
              className="welcome-ring"
              style={{ animationDuration: `${WELCOME_SECONDS}s` }}
            />
          </svg>
          <span className="absolute inset-0 flex items-center justify-center text-2xl font-semibold tabular-nums" aria-hidden>
            {shown}
          </span>
        </div>
        <p className="font-mono text-[0.75rem] text-white/60" aria-live="off">
          Preparing your experience…
        </p>
        <span className="sr-only">Welcome. The site opens in {WELCOME_SECONDS} seconds, or press Skip.</span>
        <ol aria-hidden className="flex gap-1.5">
          {welcomeQuotes.map((_, i) => (
            <li key={i} className={cn("h-1 rounded-full transition-all duration-500", i === index ? "w-6 bg-purple-bright" : "w-1.5 bg-white/25")} />
          ))}
        </ol>
      </div>
    </div>
  );
}

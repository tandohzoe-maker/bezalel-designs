"use client";

import { useEffect, useRef } from "react";

/**
 * Words sharpen from soft grey to white as the heading scrolls through the
 * viewport. Pass plain text, or an array mixing text and highlighted words.
 * Without JavaScript or with reduced motion, the text is simply solid.
 */
export type ScrubPart = string | { mark: string };

export function ScrubText({
  parts,
  as: Tag = "h2",
  className,
  id,
}: {
  parts: ScrubPart[];
  as?: "h1" | "h2" | "h3" | "p";
  className?: string;
  id?: string;
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const words = Array.from(el.querySelectorAll<HTMLElement>(".scrub-word"));
    let frame = 0;

    const update = () => {
      frame = 0;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // 0 when the heading's top reaches 85% of the viewport, 1 at 35%.
      const progress = Math.min(1, Math.max(0, (vh * 0.85 - r.top) / (vh * 0.5)));
      const n = words.length;
      words.forEach((w, i) => {
        const p = Math.min(1, Math.max(0, progress * (n + 2) - i));
        w.style.setProperty("--p", p.toFixed(3));
      });
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  let key = 0;
  return (
    <Tag ref={ref as never} id={id} data-scrub className={className}>
      {parts.map((part) => {
        if (typeof part === "string") {
          return part.split(/(\s+)/).map((w) =>
            /^\s+$/.test(w) || w === "" ? (
              w
            ) : (
              <span key={key++} className="scrub-word">
                {w}
              </span>
            ),
          );
        }
        return (
          <mark key={key++} className="mark-purple">
            {part.mark}
          </mark>
        );
      })}
    </Tag>
  );
}

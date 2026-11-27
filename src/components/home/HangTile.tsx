"use client";

import { useRef, useState } from "react";
import { cn } from "@/lib/cn";

const DOUBLE_TAP_MS = 320;

/**
 * One hanging tile in the hero. It sways gently on its string; double-click
 * (or double-tap) gives it a big swing that settles down while the tile flips.
 * Decorative: the whole hanging layer is hidden from assistive tech.
 */
export function HangTile({
  left,
  leftMobile,
  string,
  a,
  t,
  d,
  sizeClass,
  showOnMobile,
  children,
}: {
  left: string;
  leftMobile?: string;
  string: number;
  a: string;
  t: string;
  d: string;
  sizeClass: string;
  showOnMobile: boolean;
  children: React.ReactNode;
}) {
  const [boost, setBoost] = useState(0); // incremented to restart the animation
  const last = useRef<{ t: number; x: number; y: number } | null>(null);

  const onPointerUp = (e: React.PointerEvent) => {
    const now = performance.now();
    const prev = last.current;
    if (prev && now - prev.t < DOUBLE_TAP_MS && Math.hypot(e.clientX - prev.x, e.clientY - prev.y) < 40) {
      last.current = null;
      setBoost((n) => n + 1);
    } else {
      last.current = { t: now, x: e.clientX, y: e.clientY };
    }
  };

  return (
    <div
      data-hang-tile
      data-boost={boost || undefined}
      className={cn(
        "absolute top-0 left-[var(--lm)] -translate-x-1/2 [--o:76px] [--s:0.6] sm:[--o:84px] sm:[--s:0.85] lg:left-[var(--l)] lg:[--o:0px] lg:[--s:1]",
        showOnMobile ? "" : "hidden lg:block",
      )}
      style={{ "--l": left, "--lm": leftMobile ?? left } as React.CSSProperties}
    >
      <div className="hang flex flex-col items-center" style={{ "--a": a, "--t": t, "--d": d } as React.CSSProperties}>
        {/* key restarts the boost animation on every double-tap */}
        <div key={boost} className={cn("flex flex-col items-center", boost > 0 && "hang-boost")}>
          <span className="block w-px bg-white/35" style={{ height: `calc(var(--o, 0px) + ${string}px * var(--s, 1))` }} />
          <span className="-mb-1.5 block size-3 rounded-full border border-white/50 bg-transparent" />
          <div
            onPointerUp={onPointerUp}
            className={cn(
              "pointer-events-auto cursor-grab touch-manipulation overflow-hidden rounded-[28%] shadow-[0_24px_50px_-12px_rgba(0,0,0,0.85)] ring-1 ring-white/10 select-none active:cursor-grabbing",
              sizeClass,
              boost > 0 && "tile-flip",
            )}
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { Contours } from "@/components/ui/Contours";

/**
 * Founder portrait with depth.
 *
 * Layers sit at different depths inside a 3D scene (preserve-3d): glow and
 * contours at the back, the cut-out portrait in the middle (rising out of the
 * top of the frame), floating chips in front. The scene tilts towards the
 * pointer on devices with a mouse, floats gently on touch screens, and stays
 * still for visitors who prefer reduced motion.
 *
 * Double-tap / double-click (or the "Wink" button) swaps to a winking version
 * of the portrait for a moment.
 */
const DOUBLE_TAP_MS = 320;
const WINK_MS = 1100;

export function Founder3D({
  src,
  winkSrc,
  alt,
  width,
  height,
  chips,
}: {
  src: string;
  winkSrc?: string;
  alt: string;
  width: number;
  height: number;
  chips: { label: string; tone?: "light" | "purple" | "dark" }[];
}) {
  const sceneRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [winking, setWinking] = useState(false);
  const winkTimer = useRef<number | null>(null);
  const lastTap = useRef<{ t: number; x: number; y: number } | null>(null);

  const wink = useCallback(() => {
    if (!winkSrc) return;
    setWinking(true);
    if (winkTimer.current) window.clearTimeout(winkTimer.current);
    winkTimer.current = window.setTimeout(() => setWinking(false), WINK_MS);
  }, [winkSrc]);

  useEffect(
    () => () => {
      if (winkTimer.current) window.clearTimeout(winkTimer.current);
    },
    [],
  );

  // Double-tap / double-click detection that works the same for mouse and touch.
  const onPointerUp = (e: React.PointerEvent) => {
    const now = performance.now();
    const prev = lastTap.current;
    if (
      prev &&
      now - prev.t < DOUBLE_TAP_MS &&
      Math.hypot(e.clientX - prev.x, e.clientY - prev.y) < 40
    ) {
      lastTap.current = null;
      wink();
    } else {
      lastTap.current = { t: now, x: e.clientX, y: e.clientY };
    }
  };

  useEffect(() => {
    const scene = sceneRef.current;
    const card = cardRef.current;
    if (!scene || !card) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
      card.classList.add("founder-float");
      return;
    }

    let tx = 0,
      ty = 0,
      cx = 0,
      cy = 0,
      frame = 0;
    const MAX = 11; // degrees

    const tick = () => {
      cx += (tx - cx) * 0.12;
      cy += (ty - cy) * 0.12;
      card.style.setProperty("--rx", `${(-cy * MAX).toFixed(2)}deg`);
      card.style.setProperty("--ry", `${(cx * MAX).toFixed(2)}deg`);
      card.style.setProperty("--gx", `${((cx + 1) * 50).toFixed(1)}%`);
      card.style.setProperty("--gy", `${((cy + 1) * 50).toFixed(1)}%`);
      frame =
        Math.abs(tx - cx) + Math.abs(ty - cy) > 0.001
          ? requestAnimationFrame(tick)
          : 0;
    };
    const kick = () => {
      if (!frame) frame = requestAnimationFrame(tick);
    };
    const onMove = (e: PointerEvent) => {
      const r = scene.getBoundingClientRect();
      tx = Math.max(-1, Math.min(1, ((e.clientX - r.left) / r.width) * 2 - 1));
      ty = Math.max(-1, Math.min(1, ((e.clientY - r.top) / r.height) * 2 - 1));
      kick();
    };
    const onLeave = () => {
      tx = 0;
      ty = 0;
      kick();
    };
    scene.addEventListener("pointermove", onMove);
    scene.addEventListener("pointerleave", onLeave);
    return () => {
      scene.removeEventListener("pointermove", onMove);
      scene.removeEventListener("pointerleave", onLeave);
      cancelAnimationFrame(frame);
    };
  }, []);

  // Phones: chips sit at shoulder level so they never cover the face.
  // Larger screens: spread around the portrait.
  const chipPos = [
    "bottom-[27%] left-2 sm:bottom-auto sm:top-[18%] sm:-left-6 [--z:110px]",
    "bottom-[19%] right-2 sm:bottom-auto sm:top-[44%] sm:-right-6 [--z:140px]",
    "bottom-[10%] left-2 sm:bottom-[16%] sm:-left-5 [--z:90px]",
    "bottom-[3%] right-3 sm:bottom-[6%] sm:right-4 [--z:120px]",
  ];
  const chipTone = {
    light: "bg-white text-ink",
    purple: "bg-purple-bright text-ink",
    dark: "border border-white/15 bg-[#141416]/90 text-white backdrop-blur",
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div
        ref={sceneRef}
        data-founder-3d
        data-winking={winking || undefined}
        onPointerUp={winkSrc ? onPointerUp : undefined}
        className="relative w-full touch-manipulation pt-[14%] select-none [perspective:1300px]"
      >
        <div
          ref={cardRef}
          className="founder-card relative aspect-[4/5] w-full [transform-style:preserve-3d] [transform:rotateX(var(--rx,0deg))_rotateY(var(--ry,0deg))]"
        >
          {/* Back: frame, glow, contours */}
          <div className="absolute inset-0 overflow-hidden rounded-[1.75rem] bg-gradient-to-b from-[#1d0d3a] via-[#150a2b] to-[#0b0614] ring-1 ring-white/10 lg:rounded-[2rem]">
            <Contours className="absolute inset-0 h-full w-full text-purple-bright/15" />
            <div
              aria-hidden
              className="absolute top-[18%] left-1/2 size-[70%] -translate-x-1/2 rounded-full bg-purple/45 blur-[70px]"
            />
            <div
              aria-hidden
              className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/50 to-transparent"
            />
          </div>

          {/* Ring behind the head */}
          <div
            aria-hidden
            className="absolute top-[6%] left-1/2 aspect-square w-[62%] rounded-full border border-purple-bright/40 [transform:translate3d(-50%,0,30px)]"
          />

          {/* Portrait: wider than the frame so the shoulders crop at the sides, and
            tall enough that the head rises above the top edge. */}
          <div className="absolute inset-0 [transform:translateZ(60px)] [clip-path:inset(-30%_0_0_0_round_0_0_1.75rem_1.75rem)] lg:[clip-path:inset(-30%_0_0_0_round_0_0_2rem_2rem)]">
            <div className="absolute bottom-0 left-1/2 w-[128%] -translate-x-1/2">
              <div className={winking ? "founder-wink-pop" : undefined}>
                <Image
                  src={src}
                  alt={alt}
                  width={width}
                  height={height}
                  priority
                  sizes="(min-width: 1024px) 52vw, 118vw"
                  className="h-auto w-full drop-shadow-[0_30px_40px_rgba(0,0,0,0.55)]"
                />
                {winkSrc ? (
                  <Image
                    src={winkSrc}
                    alt=""
                    aria-hidden
                    width={width}
                    height={height}
                    sizes="(min-width: 1024px) 52vw, 118vw"
                    loading="eager"
                    className={`absolute inset-0 h-auto w-full transition-opacity duration-75 ${winking ? "opacity-100" : "opacity-0"}`}
                  />
                ) : null}
              </div>
            </div>
          </div>

          {/* Front: floating chips */}
          {chips.slice(0, 4).map((c, i) => (
            <span
              key={c.label}
              aria-hidden
              className={`absolute rounded-full px-4 py-2 text-sm font-medium whitespace-nowrap shadow-[0_18px_40px_-12px_rgba(0,0,0,0.7)] [transform:translateZ(var(--z))] ${chipPos[i]} ${chipTone[c.tone ?? "dark"]}`}
            >
              {c.label}
            </span>
          ))}

          {/* Wink speech chip */}
          {winkSrc ? (
            <span
              aria-hidden
              className={`absolute top-[4%] right-[6%] rounded-full bg-purple-bright px-4 py-2 text-sm font-semibold whitespace-nowrap text-ink shadow-[0_18px_40px_-12px_rgba(0,0,0,0.7)] transition-[opacity,scale] duration-300 ease-[var(--ease-spring)] [transform:translateZ(170px)] ${winking ? "scale-100 opacity-100" : "scale-50 opacity-0"}`}
            >
              😉 Let&rsquo;s create!
            </span>
          ) : null}

          {/* Light sheen that follows the pointer */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-[1.75rem] opacity-70 mix-blend-soft-light [background:radial-gradient(circle_at_var(--gx,50%)_var(--gy,30%),rgba(255,255,255,0.35),transparent_55%)] [transform:translateZ(150px)] lg:rounded-[2rem]"
          />
        </div>
      </div>
      {winkSrc ? (
        <div className="flex items-center gap-3">
          <p className="font-mono text-[0.75rem] text-mute">
            Double-tap the portrait
          </p>
          <button
            type="button"
            onClick={wink}
            className="h-10 rounded-full bg-purple-bright px-5 text-sm font-medium text-ink hover:bg-purple-soft"
          >
            Wink 😉
          </button>
        </div>
      ) : null}
      <p className="sr-only" aria-live="polite">
        {winking ? "The founder winks." : ""}
      </p>
    </div>
  );
}

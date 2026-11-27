"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import type { AvatarAction } from "@/components/about/AvatarScene";
import { Contours } from "@/components/ui/Contours";
import { cn } from "@/lib/cn";

// three.js only loads on this page, in the browser.
const AvatarScene = dynamic(() => import("@/components/about/AvatarScene"), { ssr: false });

const DOUBLE_CLICK_MS = 280;

function webglAvailable() {
  try {
    const c = document.createElement("canvas");
    return Boolean(c.getContext("webgl2") || c.getContext("webgl"));
  } catch {
    return false;
  }
}

/**
 * Interactive 3D founder avatar.
 * Click (or tap) → jump and spin. Double-click (or double-tap) → wave.
 * Buttons below offer the same actions to keyboard and assistive-tech users.
 * Falls back to the founder photo where WebGL is unavailable.
 */
export function FounderAvatar({ photo, name }: { photo: string; name: string }) {
  const stageRef = useRef<HTMLDivElement>(null);
  const actionRef = useRef<AvatarAction>(null);
  const pointer = useRef({ x: 0, y: 0 });
  const clickTimer = useRef<number | null>(null);
  const [support, setSupport] = useState<"unknown" | "yes" | "no">("unknown");
  const [ready, setReady] = useState(false);
  const [active, setActive] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [status, setStatus] = useState("");

  useEffect(() => {
    setSupport(webglAvailable() ? "yes" : "no");
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  // Render only while on screen.
  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setActive(e.isIntersecting), { rootMargin: "100px" });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Head follows the pointer anywhere on the page, relative to the stage.
  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      const el = stageRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const x = ((e.clientX - (r.left + r.width / 2)) / (window.innerWidth / 2)) * 1.2;
      const y = ((e.clientY - (r.top + r.height * 0.3)) / (window.innerHeight / 2)) * 1.2;
      pointer.current = { x: Math.max(-1, Math.min(1, x)), y: Math.max(-1, Math.min(1, y)) };
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  const play = useCallback((type: "jump" | "wave") => {
    if (actionRef.current?.type === type) return; // let the current move finish
    actionRef.current = { type, start: -1 };
    // Record actions on the stage (used by automated tests; harmless otherwise).
    const el = stageRef.current;
    if (el) el.dataset.actions = `${el.dataset.actions ?? ""} ${type}`.trim();
    setStatus(type === "jump" ? "The avatar jumps and spins." : "The avatar waves hello.");
  }, []);

  // One click → jump; two quick clicks → wave (never both).
  const onStageClick = () => {
    if (clickTimer.current) {
      window.clearTimeout(clickTimer.current);
      clickTimer.current = null;
      play("wave");
      return;
    }
    clickTimer.current = window.setTimeout(() => {
      clickTimer.current = null;
      play("jump");
    }, DOUBLE_CLICK_MS);
  };

  useEffect(() => () => {
    if (clickTimer.current) window.clearTimeout(clickTimer.current);
  }, []);

  return (
    <div className="flex flex-col items-center gap-4">
      <div
        ref={stageRef}
        data-avatar-stage
        data-ready={ready || undefined}
        onClick={support === "yes" ? onStageClick : undefined}
        className={cn(
          "relative isolate aspect-[4/5] w-full touch-manipulation overflow-hidden rounded-[1.75rem] bg-gradient-to-b from-[#1d0d3a] via-[#150a2b] to-[#0b0614] ring-1 ring-white/10 select-none lg:rounded-[2rem]",
          support === "yes" && "cursor-pointer",
        )}
      >
        <Contours className="absolute inset-0 -z-10 h-full w-full text-purple-bright/15" />
        <div aria-hidden className="absolute top-[12%] left-1/2 -z-10 size-[75%] -translate-x-1/2 rounded-full bg-purple/40 blur-[80px]" />

        {support === "yes" ? (
          <>
            <div className={cn("absolute inset-0 transition-opacity duration-700", ready ? "opacity-100" : "opacity-0")}>
              <AvatarScene
                actionRef={actionRef}
                pointer={pointer}
                reduced={reduced}
                active={active}
                onReady={() => setReady(true)}
              />
            </div>
            {!ready ? (
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="size-8 animate-spin rounded-full border-2 border-white/15 border-t-purple-bright" aria-hidden />
                <span className="sr-only">Loading 3D avatar</span>
              </div>
            ) : null}
            <p className="pointer-events-none absolute inset-x-0 top-5 text-center font-mono text-[0.75rem] text-white/60">
              Click to jump · Double-click to wave
            </p>
          </>
        ) : null}

        {support === "no" ? (
          <Image
            src={photo}
            alt={`${name}, founder of Bezalel Designs`}
            fill
            sizes="(min-width: 1024px) 40vw, 92vw"
            className="object-contain object-bottom pt-10"
          />
        ) : null}
      </div>

      {support === "yes" ? (
        <div role="group" aria-label="Avatar actions" className="flex gap-2">
          <button
            type="button"
            onClick={() => play("jump")}
            className="h-10 rounded-full border border-white/10 bg-white/[0.06] px-5 text-sm font-medium hover:bg-white/[0.12]"
          >
            Jump
          </button>
          <button
            type="button"
            onClick={() => play("wave")}
            className="h-10 rounded-full bg-purple-bright px-5 text-sm font-medium text-ink hover:bg-purple-soft"
          >
            Wave 👋
          </button>
        </div>
      ) : null}
      <p className="sr-only" aria-live="polite">
        {status}
      </p>
    </div>
  );
}

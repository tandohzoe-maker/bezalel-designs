"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { categoryBySlug, groupTitles, type PortfolioProject } from "@/config/portfolio";
import { ProjectArtwork } from "@/components/portfolio/ProjectArtwork";
import { ArrowRightIcon, CloseIcon } from "@/components/icons";
import { buttonClasses } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

/**
 * Large view of a project. Modal dialog: focus is trapped inside, Escape
 * closes, ←/→ (and swipe) move between projects, focus returns to the tile
 * that opened it, and the page behind does not scroll.
 */
export function Lightbox({
  projects,
  index,
  onClose,
  onNavigate,
}: {
  projects: PortfolioProject[];
  index: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
}) {
  const project = projects[index];
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const count = projects.length;
  const prev = () => onNavigate((index - 1 + count) % count);
  const next = () => onNavigate((index + 1) % count);

  // Keep latest handlers for the key listener without re-binding it.
  const handlers = useRef({ prev, next, onClose });
  handlers.current = { prev, next, onClose };

  useEffect(() => {
    const returnTo = document.activeElement as HTMLElement | null;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") return handlers.current.onClose();
      if (e.key === "ArrowLeft") return handlers.current.prev();
      if (e.key === "ArrowRight") return handlers.current.next();
      if (e.key === "Tab" && dialogRef.current) {
        const items = Array.from(
          dialogRef.current.querySelectorAll<HTMLElement>("a[href], button:not([disabled])"),
        );
        if (!items.length) return;
        const first = items[0];
        const last = items[items.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      returnTo?.focus?.();
    };
  }, []);

  // Swipe left/right on touch screens.
  const touchX = useRef<number | null>(null);

  if (!project) return null;
  const category = categoryBySlug(project.category);

  return (
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby="lightbox-title"
      className="fixed inset-0 z-[80] flex flex-col bg-ink p-2 text-white sm:p-3"
      onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touchX.current === null || count < 2) return;
        const dx = e.changedTouches[0].clientX - touchX.current;
        if (Math.abs(dx) > 50) (dx < 0 ? next : prev)();
        touchX.current = null;
      }}
    >
      {/* Top bar */}
      <div className="flex h-14 shrink-0 items-center justify-between px-3 sm:h-16 sm:px-5">
        <p className="font-mono text-[0.8rem] tabular-nums text-mute" aria-live="polite">
          {String(index + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
        </p>
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          className="flex h-10 items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 text-sm font-medium text-white/85 hover:bg-white/[0.12] hover:text-white"
        >
          Close <CloseIcon className="size-4" />
        </button>
      </div>

      <div className="grid min-h-0 flex-1 gap-2 overflow-y-auto sm:gap-3 lg:grid-cols-12">
        {/* Artwork */}
        <div className="relative flex items-center justify-center rounded-[1.75rem] bg-card p-4 sm:p-8 lg:col-span-8 lg:rounded-[2rem] lg:p-12">
          <div key={project.slug} className="w-full max-w-4xl animate-[reveal-rise_0.6s_var(--ease-atelier)_both] overflow-hidden rounded-[1.25rem]">
            <ProjectArtwork project={project} size="large" priority />
          </div>
        </div>

        {/* Details */}
        <div className="flex flex-col justify-between gap-10 rounded-[1.75rem] bg-card p-6 sm:p-8 lg:col-span-4 lg:rounded-[2rem] lg:p-10">
          <div>
            <p className="eyebrow">{category ? `${groupTitles[category.group]} · ${category.title}` : null}</p>
            <h2 id="lightbox-title" className="mt-4 text-h2s">
              {project.title}
            </h2>
            {project.client && project.client !== project.title ? (
              <p className="mt-3 text-sm text-mute">{project.client}</p>
            ) : null}
            <p className="mt-6 leading-relaxed text-white/80">{project.description}</p>
          </div>

          <div className="flex flex-col gap-6">
            <Link
              href={`/start-a-project?service=${category?.service ?? "custom-projects"}`}
              className={buttonClasses({ size: "lg", className: "w-full" })}
            >
              <span>Start a similar project</span>
              <ArrowRightIcon className="size-4" />
            </Link>
            {count > 1 ? (
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={prev}
                  className="flex h-11 flex-1 items-center justify-center gap-2 rounded-full border border-white/10 text-sm font-medium text-white/80 hover:bg-white/[0.06] hover:text-white"
                >
                  <ArrowRightIcon className="size-4 rotate-180" /> Previous
                </button>
                <button
                  type="button"
                  onClick={next}
                  className={cn("flex h-11 flex-1 items-center justify-center gap-2 rounded-full border border-white/10 text-sm font-medium text-white/80 hover:bg-white/[0.06] hover:text-white")}
                >
                  Next <ArrowRightIcon className="size-4" />
                </button>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}

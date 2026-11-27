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
      className="fixed inset-0 z-[80] flex flex-col bg-ink text-white"
      onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touchX.current === null || count < 2) return;
        const dx = e.changedTouches[0].clientX - touchX.current;
        if (Math.abs(dx) > 50) (dx < 0 ? next : prev)();
        touchX.current = null;
      }}
    >
      {/* Top bar */}
      <div className="flex h-16 shrink-0 items-center justify-between border-b border-line-dark px-5 sm:h-20 sm:px-8 lg:px-12">
        <p className="label tabular-nums text-stone-light" aria-live="polite">
          {String(index + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
        </p>
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          className="label -mr-2 flex h-11 items-center gap-3 px-2 text-white/80 hover:text-white"
        >
          Close <CloseIcon className="size-5" />
        </button>
      </div>

      <div className="grid min-h-0 flex-1 overflow-y-auto lg:grid-cols-12">
        {/* Artwork */}
        <div className="relative flex items-center justify-center p-5 sm:p-8 lg:col-span-8 lg:p-12">
          <div key={project.slug} className="w-full max-w-4xl animate-[reveal-rise_0.6s_var(--ease-atelier)_both]">
            <ProjectArtwork project={project} size="large" priority />
          </div>
        </div>

        {/* Details */}
        <div className="flex flex-col justify-between gap-10 border-t border-line-dark p-5 sm:p-8 lg:col-span-4 lg:border-t-0 lg:border-l lg:p-12">
          <div>
            <p className="label text-stone-light">
              {category ? `${groupTitles[category.group]} · ${category.title}` : null}
            </p>
            <h2 id="lightbox-title" className="mt-6 font-display text-d3">
              {project.title}
            </h2>
            {project.client && project.client !== project.title ? (
              <p className="mt-3 text-sm text-stone-light">{project.client}</p>
            ) : null}
            <p className="mt-8 leading-relaxed text-white/80">{project.description}</p>
          </div>

          <div className="flex flex-col gap-6">
            <Link
              href={`/start-a-project?service=${category?.service ?? "custom-projects"}`}
              className={buttonClasses({ className: "w-full" })}
            >
              <span>Start a similar project</span>
              <ArrowRightIcon className="size-4" />
            </Link>
            {count > 1 ? (
              <div className="flex border-t border-line-dark pt-6">
                <button
                  type="button"
                  onClick={prev}
                  className="label flex h-11 flex-1 items-center gap-3 text-white/70 hover:text-white"
                >
                  <ArrowRightIcon className="size-4 rotate-180" /> Previous
                </button>
                <button
                  type="button"
                  onClick={next}
                  className={cn("label flex h-11 flex-1 items-center justify-end gap-3 text-white/70 hover:text-white")}
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

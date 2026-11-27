"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  categoryBySlug,
  groupTitles,
  portfolioCategories,
  type PortfolioGroup,
  type PortfolioProject,
} from "@/config/portfolio";
import { ProjectArtwork } from "@/components/portfolio/ProjectArtwork";
import { Lightbox } from "@/components/portfolio/Lightbox";
import { cn } from "@/lib/cn";

type Filter = { group: PortfolioGroup | "all"; category: string | null };

/** Reflect the current filter / open project in the URL so views can be shared. */
function writeUrl(filter: Filter, project: string | null) {
  const params = new URLSearchParams();
  if (filter.category) params.set("category", filter.category);
  else if (filter.group !== "all") params.set("group", filter.group);
  if (project) params.set("project", project);
  const qs = params.toString();
  window.history.replaceState(null, "", qs ? `?${qs}` : window.location.pathname);
}

export function PortfolioGallery({ projects }: { projects: PortfolioProject[] }) {
  const [filter, setFilter] = useState<Filter>({ group: "all", category: null });
  const [openSlug, setOpenSlug] = useState<string | null>(null);

  // Counts drive which filters exist: no filter ever leads to an empty grid.
  const counts = useMemo(() => {
    const byCategory = new Map<string, number>();
    const byGroup: Record<PortfolioGroup, number> = { graphic: 0, motion: 0 };
    for (const p of projects) {
      byCategory.set(p.category, (byCategory.get(p.category) ?? 0) + 1);
      const g = categoryBySlug(p.category)?.group;
      if (g) byGroup[g] += 1;
    }
    return { byCategory, byGroup };
  }, [projects]);

  // Restore state from a shared link (?group= / ?category= / ?project=).
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const category = params.get("category");
    const group = params.get("group");
    const project = params.get("project");
    const cat = category ? categoryBySlug(category) : undefined;
    if (cat && counts.byCategory.get(cat.slug)) setFilter({ group: cat.group, category: cat.slug });
    else if ((group === "graphic" || group === "motion") && counts.byGroup[group]) setFilter({ group, category: null });
    if (project && projects.some((p) => p.slug === project)) setOpenSlug(project);
  }, [counts, projects]);

  const visible = useMemo(
    () =>
      projects.filter((p) => {
        if (filter.category) return p.category === filter.category;
        if (filter.group === "all") return true;
        return categoryBySlug(p.category)?.group === filter.group;
      }),
    [projects, filter],
  );

  const subcategories = portfolioCategories.filter(
    (c) => (filter.group === "all" || c.group === filter.group) && counts.byCategory.get(c.slug),
  );

  const choose = (next: Filter) => {
    setFilter(next);
    writeUrl(next, null);
  };

  const openIndex = openSlug ? visible.findIndex((p) => p.slug === openSlug) : -1;
  const open = useCallback(
    (slug: string | null) => {
      setOpenSlug(slug);
      writeUrl(filter, slug);
    },
    [filter],
  );

  const groups = (["graphic", "motion"] as const).filter((g) => counts.byGroup[g] > 0);

  return (
    <>
      {/* Filters */}
      <div className="flex flex-col gap-5 border-b border-line-dark pb-8">
        <div role="group" aria-label="Filter by discipline" className="flex flex-wrap gap-x-8 gap-y-3">
          <FilterButton
            active={filter.group === "all" && !filter.category}
            onClick={() => choose({ group: "all", category: null })}
            count={projects.length}
            size="lg"
          >
            All work
          </FilterButton>
          {groups.map((g) => (
            <FilterButton
              key={g}
              active={filter.group === g && !filter.category}
              onClick={() => choose({ group: g, category: null })}
              count={counts.byGroup[g]}
              size="lg"
            >
              {groupTitles[g]}
            </FilterButton>
          ))}
        </div>
        {subcategories.length > 0 ? (
          <div role="group" aria-label="Filter by category" className="flex flex-wrap gap-2">
            {subcategories.map((c) => (
              <FilterButton
                key={c.slug}
                active={filter.category === c.slug}
                onClick={() =>
                  choose(filter.category === c.slug ? { group: c.group, category: null } : { group: c.group, category: c.slug })
                }
                count={counts.byCategory.get(c.slug) ?? 0}
              >
                {c.title}
              </FilterButton>
            ))}
          </div>
        ) : null}
      </div>

      <p className="sr-only" aria-live="polite">
        Showing {visible.length} {visible.length === 1 ? "project" : "projects"}
      </p>

      {/* Editorial masonry: each piece keeps its true proportions and is placed in
          the shortest column. One layout per breakpoint, rendered on the server and
          switched with CSS, so nothing shifts on load. Hidden layouts are
          display:none (not focusable, not announced, lazy images not fetched). */}
      {([1, 2, 3] as const).map((cols) => (
        <div
          key={cols}
          className={cn(
            "mt-10 gap-5 lg:mt-14 lg:gap-6",
            cols === 1 && "flex sm:hidden",
            cols === 2 && "hidden sm:flex lg:hidden",
            cols === 3 && "hidden lg:flex",
          )}
        >
          {distribute(visible, cols).map((column, ci) => (
            <ul key={ci} className="flex min-w-0 flex-1 flex-col gap-5 lg:gap-6">
              {column.map(({ project: p, index: i }) => (
                <li key={p.slug}>
                  <Tile project={p} priority={i < 3} onOpen={() => open(p.slug)} />
                </li>
              ))}
            </ul>
          ))}
        </div>
      ))}

      {openIndex >= 0 ? (
        <Lightbox
          projects={visible}
          index={openIndex}
          onClose={() => open(null)}
          onNavigate={(i) => open(visible[i].slug)}
        />
      ) : null}
    </>
  );
}

/** Relative height of a tile for a given width of 1 (caption included). */
function tileHeight(p: PortfolioProject) {
  const art = p.presentation === "framed" ? 1.25 : p.cover.height / p.cover.width;
  return art + 0.18;
}

/** Shortest-column masonry; ties go left so reading order stays natural. */
function distribute(items: PortfolioProject[], cols: number) {
  const columns: { project: PortfolioProject; index: number }[][] = Array.from({ length: cols }, () => []);
  const heights = new Array(cols).fill(0);
  items.forEach((project, index) => {
    let target = 0;
    for (let c = 1; c < cols; c++) if (heights[c] < heights[target] - 0.001) target = c;
    columns[target].push({ project, index });
    heights[target] += tileHeight(project);
  });
  return columns;
}

function Tile({ project: p, priority, onOpen }: { project: PortfolioProject; priority: boolean; onOpen: () => void }) {
  const cat = categoryBySlug(p.category);
  return (
    <button
      type="button"
      onClick={onOpen}
      data-project={p.slug}
      className="group block w-full text-left"
      aria-label={`View ${p.title}${cat ? `, ${cat.title}` : ""}`}
    >
      <div className="relative overflow-hidden outline outline-1 -outline-offset-1 outline-white/8">
        <div className="transition-transform duration-700 ease-[var(--ease-atelier)] group-hover:scale-[1.03] group-focus-visible:scale-[1.03]">
          <ProjectArtwork project={p} priority={priority} />
        </div>
        <span className="label absolute right-4 bottom-4 bg-ink/85 px-3 py-2 text-white opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-visible:opacity-100">
          View
        </span>
      </div>
      <div className="mt-4 flex items-baseline justify-between gap-4">
        <span className="font-display text-xl transition-colors group-hover:text-amethyst-light">{p.title}</span>
        <span className="label shrink-0 text-stone">{cat?.title}</span>
      </div>
    </button>
  );
}

function FilterButton({
  active,
  onClick,
  count,
  size = "sm",
  children,
}: {
  active: boolean;
  onClick: () => void;
  count: number;
  size?: "sm" | "lg";
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={cn(
        "transition-colors duration-300",
        size === "lg"
          ? cn("font-display text-[1.6rem] sm:text-3xl", active ? "text-white italic" : "text-white/60 hover:text-white/90")
          : cn(
              "label border px-4 py-2.5",
              active
                ? "border-amethyst-light bg-amethyst-light/10 text-white"
                : "border-line-dark text-stone-light hover:border-white/40 hover:text-white",
            ),
      )}
    >
      {children}
      <sup className={cn("ml-1.5 font-sans tabular-nums", size === "lg" ? "text-xs not-italic" : "text-[0.6rem]")}>
        {count}
      </sup>
    </button>
  );
}

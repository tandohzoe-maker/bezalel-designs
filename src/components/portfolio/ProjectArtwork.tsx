import Image from "next/image";
import type { PortfolioProject } from "@/config/portfolio";
import { cn } from "@/lib/cn";

export const surfaceClass: Record<NonNullable<PortfolioProject["surface"]>, string> = {
  ink: "bg-[#0d0d0f]",
  graphite: "bg-card-2",
  bone: "bg-bone",
  white: "bg-white",
};

/**
 * Renders a project's cover. Framed work (logos) is centred on its panel and
 * never enlarged beyond its native resolution; full work fills the frame at
 * its own proportions.
 */
export function ProjectArtwork({
  project,
  size = "tile",
  priority,
  className,
  image,
}: {
  project: PortfolioProject;
  size?: "tile" | "large";
  priority?: boolean;
  className?: string;
  /** Show a specific view instead of the cover (e.g. the back of a shirt). */
  image?: PortfolioProject["cover"];
}) {
  const cover = image ?? project.cover;

  if (project.presentation === "full") {
    return (
      <Image
        src={cover.src}
        alt={cover.alt}
        width={cover.width}
        height={cover.height}
        priority={priority}
        sizes={size === "large" ? "(min-width: 1024px) 60vw, 100vw" : "(min-width: 1024px) 30vw, (min-width: 640px) 50vw, 100vw"}
        className={cn("h-auto w-full", className)}
      />
    );
  }

  const landscape = cover.width > cover.height * 1.4;
  const scale = size === "large" ? 1 : 0.78; // logos look best a little under native size in tiles
  return (
    <div
      className={cn(
        "flex items-center justify-center",
        project.surfaceColor ? undefined : surfaceClass[project.surface ?? "graphite"],
        size === "tile" ? "aspect-[4/5] p-[14%]" : "h-full min-h-[50vh] w-full p-10 sm:p-16",
        className,
      )}
      style={project.surfaceColor ? { backgroundColor: project.surfaceColor } : undefined}
    >
      <Image
        src={cover.src}
        alt={cover.alt}
        width={cover.width}
        height={cover.height}
        priority={priority}
        sizes={`${Math.round(cover.width * scale)}px`}
        style={{ maxWidth: `min(${landscape ? "100%" : "78%"}, ${Math.round(cover.width * scale)}px)` }}
        className="h-auto max-h-full w-full object-contain"
      />
    </div>
  );
}

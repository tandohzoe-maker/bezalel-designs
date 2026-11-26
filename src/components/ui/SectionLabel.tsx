import { cn } from "@/lib/cn";

/**
 * The numbered editorial marker used across the site, e.g. "01 — Selected Work".
 * It is the recurring structural device of the brand.
 */
export function SectionLabel({
  index,
  children,
  className,
  as: Tag = "p",
}: {
  index?: string;
  children: React.ReactNode;
  className?: string;
  as?: "p" | "span" | "h2" | "h3";
}) {
  return (
    <Tag className={cn("label flex items-center gap-3 text-current/60", className)}>
      {index ? (
        <>
          <span className="tabular-nums">{index}</span>
          <span aria-hidden className="h-px w-8 bg-current/40" />
        </>
      ) : null}
      <span>{children}</span>
    </Tag>
  );
}

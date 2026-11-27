import { cn } from "@/lib/cn";

/** Small monospace eyebrow above a heading, with an optional "New"-style badge. */
export function Eyebrow({
  children,
  badge,
  className,
  as: Tag = "p",
}: {
  children: React.ReactNode;
  badge?: string;
  className?: string;
  as?: "p" | "span" | "h2" | "h3";
}) {
  return (
    <Tag className={cn("eyebrow flex items-center gap-2.5", className)}>
      {badge ? (
        <span className="rounded-full bg-purple-bright px-2 py-0.5 font-sans text-[0.7rem] font-semibold text-ink">
          {badge}
        </span>
      ) : null}
      <span>{children}</span>
    </Tag>
  );
}

/** @deprecated kept as an alias while pages migrate to <Eyebrow>. */
export const SectionLabel = ({
  children,
  className,
  as,
}: {
  index?: string;
  children: React.ReactNode;
  className?: string;
  as?: "p" | "span" | "h2" | "h3";
}) => (
  <Eyebrow className={className} as={as}>
    {children}
  </Eyebrow>
);

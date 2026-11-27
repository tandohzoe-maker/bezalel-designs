import { cn } from "@/lib/cn";

/** Monogram used in the header pill and hero tiles: a "B" on a purple tile. */
export function Monogram({ className }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "inline-flex size-6 shrink-0 items-center justify-center rounded-[28%] bg-purple-bright text-[0.8rem] leading-none font-extrabold text-ink",
        className,
      )}
    >
      B
    </span>
  );
}

/**
 * Typographic wordmark. If a logo file is supplied later it can replace the
 * contents of this one component and update everywhere.
 */
export function Wordmark({ className, size = "md" }: { className?: string; size?: "sm" | "md" | "lg" }) {
  const main = { sm: "text-[0.95rem]", md: "text-[1.05rem]", lg: "text-[1.6rem]" }[size];
  return (
    <span className={cn("inline-flex items-center gap-2.5 leading-none", className)}>
      <Monogram className={size === "lg" ? "size-9 text-base" : undefined} />
      <span className={cn("font-extrabold tracking-[0.08em] uppercase", main)}>Bezalel</span>
      <span
        className={cn(
          "inline-flex items-center gap-1 rounded-full bg-purple-bright/15 font-semibold tracking-[0.12em] text-purple-bright uppercase ring-1 ring-purple-bright/30",
          size === "lg" ? "px-2.5 py-1 text-xs" : "px-1.5 py-0.5 text-[0.6rem]",
        )}
      >
        <span aria-hidden className="size-1.5 animate-pulse rounded-full bg-purple-bright" />
        Live
      </span>
    </span>
  );
}

/** The subtle gold brand signature. */
export function Signature({ className }: { className?: string }) {
  return (
    <span className={cn("sig label inline-flex items-center gap-3 font-medium text-gilt", className)}>
      <span aria-hidden className="sig-line h-px w-6 origin-left bg-gilt/60" />
      <span className="sig-text">The Bezalel</span>
    </span>
  );
}

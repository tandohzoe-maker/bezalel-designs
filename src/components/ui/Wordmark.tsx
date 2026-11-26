import { cn } from "@/lib/cn";

/**
 * Typographic wordmark. If a logo file is supplied later it can replace the
 * text inside this one component and propagate everywhere.
 */
export function Wordmark({ className, size = "md" }: { className?: string; size?: "sm" | "md" | "lg" }) {
  const main = { sm: "text-[1.05rem]", md: "text-[1.3rem]", lg: "text-[2rem]" }[size];
  const sub = { sm: "text-[0.5rem]", md: "text-[0.56rem]", lg: "text-[0.75rem]" }[size];
  return (
    <span className={cn("inline-flex flex-col items-start leading-none", className)}>
      <span className={cn("font-display tracking-[0.22em] uppercase", main)}>Bezalel</span>
      <span className={cn("mt-1 font-sans font-medium tracking-[0.62em] uppercase opacity-70", sub)}>Designs</span>
    </span>
  );
}

/** The subtle gold brand signature. */
export function Signature({ className }: { className?: string }) {
  return (
    <span className={cn("sig inline-flex items-center gap-3 label text-gilt", className)}>
      <span aria-hidden className="sig-line h-px w-6 origin-left bg-gilt/60" />
      <span className="sig-text">The Bezalel</span>
    </span>
  );
}

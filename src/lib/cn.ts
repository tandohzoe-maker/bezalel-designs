import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

/**
 * Class merging that understands the custom design tokens, so a className
 * passed into a component reliably overrides the component's defaults
 * (e.g. `hidden` over `inline-flex`, `h-11` over `h-13`).
 */
const twMerge = extendTailwindMerge({
  extend: {
    theme: {
      text: ["hero", "h2", "h2s", "h3", "lead"],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

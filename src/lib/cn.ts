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
      text: ["d1", "d2", "d3", "d4", "lead", "label"],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

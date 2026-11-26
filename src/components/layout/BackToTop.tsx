"use client";

import { ArrowUpIcon } from "@/components/icons";

export function BackToTop() {
  return (
    <button
      type="button"
      onClick={() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
        document.getElementById("main")?.focus({ preventScroll: true });
      }}
      className="inline-flex items-center gap-2 hover:text-white"
    >
      Back to top <ArrowUpIcon className="size-3.5" />
    </button>
  );
}

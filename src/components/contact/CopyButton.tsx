"use client";

import { useState } from "react";

/** Copies text to the clipboard, with a visible and announced confirmation. */
export function CopyButton({ value, label }: { value: string; label: string }) {
  const [state, setState] = useState<"idle" | "copied" | "failed">("idle");

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setState("copied");
    } catch {
      setState("failed");
    }
    window.setTimeout(() => setState("idle"), 2200);
  };

  return (
    <>
      <button
        type="button"
        onClick={copy}
        className="relative z-10 h-9 rounded-full border border-white/10 bg-white/[0.06] px-4 text-sm font-medium text-white transition-colors hover:bg-white/[0.12]"
      >
        {state === "copied" ? "Copied ✓" : state === "failed" ? "Copy failed" : `Copy ${label}`}
      </button>
      <span className="sr-only" aria-live="polite">
        {state === "copied" ? `${label} copied to clipboard` : state === "failed" ? "Could not copy" : ""}
      </span>
    </>
  );
}

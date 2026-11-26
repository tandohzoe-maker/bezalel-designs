"use client";

import { MotionConfig } from "motion/react";

/** Client-side providers. All animation respects the OS "reduce motion" setting. */
export function Providers({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}

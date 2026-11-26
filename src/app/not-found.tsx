import type { Metadata } from "next";
import { SiteShell } from "@/components/layout/SiteShell";
import { NotFoundContent } from "@/components/sections/NotFoundContent";

export const metadata: Metadata = { title: "Page not found", robots: { index: false } };

export default function NotFound() {
  return (
    <SiteShell>
      <NotFoundContent />
    </SiteShell>
  );
}

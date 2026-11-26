import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";

export const metadata: Metadata = {
  title: "Pricing",
  description: "Service prices, packages and custom quotations from Bezalel Designs, in Ghana Cedis (GH₵).",
  alternates: { canonical: "/pricing" },
};

export default function PricingPage() {
  return (
    <PageHero
      index="04"
      eyebrow="Pricing & packages"
      title={
        <>
          Clear pricing, <em>considered</em> work.
        </>
      }
      lead="Every creative project is different. Where a fixed price doesn't fit, we'll prepare a customised quotation."
    />
  );
}

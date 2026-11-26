import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "Selected graphic design, branding, church and ministry graphics, event promotion and video work by Bezalel Designs.",
  alternates: { canonical: "/portfolio" },
};

export default function PortfolioPage() {
  return (
    <PageHero
      index="02"
      eyebrow="Selected work"
      title={
        <>
          The work <em>speaks</em>.
        </>
      }
      lead="Graphic design, brand identity and motion — each piece made with intention."
    />
  );
}

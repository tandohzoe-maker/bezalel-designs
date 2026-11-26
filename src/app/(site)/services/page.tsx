import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Graphic design, flyers and posters, logo and brand identity, social media, church and ministry graphics, event branding, video editing and merchandise design.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <PageHero
      index="03"
      eyebrow="What we do"
      title={
        <>
          Design with <em>purpose</em>.
        </>
      }
      lead="Nine disciplines, one standard: every piece is intentional, considered and made to communicate."
    />
  );
}

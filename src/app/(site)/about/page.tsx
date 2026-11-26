import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";

export const metadata: Metadata = {
  title: "About",
  description:
    "Bezalel Designs is built on the conviction that creativity is more than making things look beautiful — it is about giving ideas their visual expression.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <PageHero
      index="01"
      eyebrow="About the studio"
      title={
        <>
          Excellence lives <em>in the details</em>.
        </>
      }
      lead="We don't just create designs. We help ideas find their visual expression."
    />
  );
}

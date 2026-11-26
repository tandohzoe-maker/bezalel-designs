import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact Bezalel Designs by WhatsApp, email or social media.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <PageHero
      index="06"
      eyebrow="Contact"
      title={
        <>
          Say <em>hello</em>.
        </>
      }
      lead="The quickest way to reach us is WhatsApp. For detailed briefs, use the project enquiry form."
    />
  );
}

import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";

export const metadata: Metadata = {
  title: "Privacy",
  description: "How Bezalel Designs collects, uses and protects the information you share with us.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return <PageHero index="—" eyebrow="Privacy notice" title="Your information, handled with care." />;
}

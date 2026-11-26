import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";

export const metadata: Metadata = {
  title: "Start a Project",
  description: "Tell us about your project. Bezalel Designs will review your brief and respond with next steps.",
  alternates: { canonical: "/start-a-project" },
};

export default function StartAProjectPage() {
  return (
    <PageHero
      index="05"
      eyebrow="Project enquiry"
      title={
        <>
          Let&rsquo;s create <em>something</em>.
        </>
      }
      lead="Share your idea, your audience and your timeline. We'll take it from there."
    />
  );
}

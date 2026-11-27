import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { PortfolioGallery } from "@/components/portfolio/PortfolioGallery";
import { projects } from "@/config/portfolio";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "Selected logo design, branding, flyers, church and ministry graphics and video work by Bezalel Designs.",
  alternates: { canonical: "/portfolio" },
};

export default function PortfolioPage() {
  return (
    <>
      <PageHero
        eyebrow="Selected work"
        title="The work speaks."
        lead="Logos, flyers, ministry graphics, merchandise and motion, each piece made with intention."
      />
      <section aria-label="Portfolio" className="py-14 lg:py-20">
        <Container>
          <PortfolioGallery projects={projects} />
          <div className="mt-16 flex flex-col items-center gap-5 rounded-[1.75rem] bg-card px-6 py-12 text-center lg:mt-24 lg:rounded-[2rem]">
            <p className="max-w-md text-lead text-white/80">
              More work is being added. Have a project in mind? Let&rsquo;s make it the next piece here.
            </p>
            <ButtonLink href="/start-a-project">Start a Project</ButtonLink>
          </div>
        </Container>
      </section>
    </>
  );
}

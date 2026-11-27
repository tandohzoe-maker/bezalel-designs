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
        index="02"
        eyebrow="Selected work"
        title={
          <>
            The work <em>speaks</em>.
          </>
        }
        lead="Logos, flyers, ministry graphics, merchandise and motion, each piece made with intention."
      />
      <section aria-label="Portfolio" className="bg-ink py-14 lg:py-20">
        <Container>
          <PortfolioGallery projects={projects} />
          <div className="mt-20 flex flex-col items-start gap-6 border-t border-line-dark pt-12 sm:flex-row sm:items-center sm:justify-between lg:mt-28">
            <p className="max-w-md text-stone-light">
              More work is being added. Have a project in mind? Let&rsquo;s make it the next piece here.
            </p>
            <ButtonLink href="/start-a-project">Start a Project</ButtonLink>
          </div>
        </Container>
      </section>
    </>
  );
}

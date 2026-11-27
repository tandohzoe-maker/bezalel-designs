import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/ui/Reveal";
import { Signature } from "@/components/ui/Wordmark";
import { siteConfig } from "@/config/site";
import { serviceCategories } from "@/config/services";
import { BrandIntro } from "@/components/sections/BrandIntro";
import { StudioIntro } from "@/components/home/StudioIntro";
import { ServicesIndex } from "@/components/home/ServicesIndex";
import { WhyBezalel } from "@/components/home/WhyBezalel";
import { TrackRecord } from "@/components/home/TrackRecord";
import { SelectedWork } from "@/components/home/SelectedWork";
import { projects } from "@/config/portfolio";
import { clients, trackRecord } from "@/config/about";

export default function HomePage() {
  return (
    <>
      <BrandIntro />

      <section className="grain relative flex min-h-[100svh] items-end bg-ink pt-32 pb-16 lg:pb-24">
        <Container>
          <Reveal trigger="load">
            <SectionLabel index="00" className="text-stone-light">
              {siteConfig.tagline}
            </SectionLabel>
          </Reveal>
          <Reveal trigger="load" delay={0.1}>
            <h1 className="mt-8 max-w-[14ch] font-display text-d1">
              Ideas deserve <em className="text-amethyst-light">beautiful</em> execution.
            </h1>
          </Reveal>
          <div className="mt-12 grid gap-10 lg:grid-cols-12 lg:items-end">
            <Reveal trigger="load" delay={0.2} className="lg:col-span-5">
              <p className="text-lead text-stone-light">
                Welcome to Bezalel Designs, where creativity meets purpose. We transform ideas, concepts and visions
                into compelling visual experiences.
              </p>
            </Reveal>
            <Reveal trigger="load" delay={0.3} className="flex flex-col gap-4 sm:flex-row lg:col-span-7 lg:justify-end">
              <ButtonLink href="/portfolio">Explore Our Work</ButtonLink>
              <ButtonLink href="/start-a-project" variant="outline">
                Start a Project
              </ButtonLink>
            </Reveal>
          </div>
          <Reveal trigger="load" delay={0.5}>
            <Signature className="mt-16 lg:mt-24" />
          </Reveal>
        </Container>
      </section>

      <StudioIntro />
      <SelectedWork projects={projects.filter((p) => p.featured).slice(0, 8)} />
      <TrackRecord stats={trackRecord} clients={clients} />
      <ServicesIndex services={serviceCategories} />
      <WhyBezalel />
    </>
  );
}

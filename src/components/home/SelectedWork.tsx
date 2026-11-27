import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { ProjectArtwork } from "@/components/portfolio/ProjectArtwork";
import { categoryBySlug, type PortfolioProject } from "@/config/portfolio";

/** 02 — Selected work: featured projects, each opening in the portfolio lightbox. */
export function SelectedWork({ projects }: { projects: PortfolioProject[] }) {
  if (projects.length === 0) return null;

  return (
    <section aria-labelledby="work-heading" className="grain relative bg-ink py-24 sm:py-32 lg:py-44">
      <Container>
        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <Reveal>
              <SectionLabel index="02" className="text-stone-light">
                Selected work
              </SectionLabel>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 id="work-heading" className="mt-10 font-display text-d2">
                The work <em className="text-amethyst-light">speaks</em>.
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <ButtonLink href="/portfolio" variant="outline">
              Explore all work
            </ButtonLink>
          </Reveal>
        </div>

        <ul className="mt-14 grid grid-cols-2 gap-4 sm:gap-5 lg:mt-20 lg:grid-cols-4 lg:gap-6">
          {projects.map((p, i) => {
            const cat = categoryBySlug(p.category);
            return (
              <Reveal as="li" key={p.slug} delay={i * 0.08}>
                <Link href={`/portfolio?project=${p.slug}`} className="group block">
                  <div className="overflow-hidden outline outline-1 -outline-offset-1 outline-white/8">
                    <div className="transition-transform duration-700 ease-[var(--ease-atelier)] group-hover:scale-[1.04]">
                      <ProjectArtwork project={p} />
                    </div>
                  </div>
                  <p className="mt-4 font-display text-lg transition-colors group-hover:text-amethyst-light sm:text-xl">
                    {p.title}
                  </p>
                  <p className="label mt-1 text-stone">{cat?.title}</p>
                </Link>
              </Reveal>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}

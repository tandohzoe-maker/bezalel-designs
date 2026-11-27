import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/ui/Reveal";
import { ScrubText } from "@/components/ui/ScrubText";
import { ButtonLink } from "@/components/ui/Button";
import { ProjectArtwork } from "@/components/portfolio/ProjectArtwork";
import { categoryBySlug, type PortfolioProject } from "@/config/portfolio";

/** Browser-window showcase of featured work, with sticky copy alongside. */
export function SelectedWork({ projects }: { projects: PortfolioProject[] }) {
  if (projects.length === 0) return null;

  return (
    <section aria-labelledby="work-heading" className="py-16 sm:py-24 lg:py-32">
      <Container className="grid gap-12 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-40">
            <Eyebrow>Selected work</Eyebrow>
            <ScrubText
              id="work-heading"
              className="mt-5 text-h2s"
              parts={["Every logo made to be recognised and remembered."]}
            />
            <ButtonLink href="/portfolio" variant="ghost" className="mt-8">
              Explore all work
            </ButtonLink>
          </div>
        </div>

        <Reveal className="lg:col-span-8">
          <div className="overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#0a0a0b] p-2 shadow-[0_40px_120px_-40px_rgba(139,61,255,0.35)] lg:rounded-[2rem]">
            {/* Browser bar */}
            <div className="flex items-center gap-2 px-3 py-2.5 font-mono text-[0.72rem] text-mute">
              <svg viewBox="0 0 24 24" aria-hidden className="size-3.5" fill="none" stroke="currentColor" strokeWidth="1.6">
                <rect x="5" y="10" width="14" height="10" rx="2" />
                <path d="M8 10V7a4 4 0 0 1 8 0v3" />
              </svg>
              bezalel-designs.vercel.app/portfolio
            </div>
            <ul className="grid grid-cols-2 gap-2 lg:grid-cols-3">
              {projects.map((p) => {
                const cat = categoryBySlug(p.category);
                return (
                  <li key={p.slug}>
                    <Link
                      href={`/portfolio?project=${p.slug}`}
                      className="group relative block overflow-hidden rounded-[1.25rem]"
                    >
                      <div className="transition-transform duration-700 ease-[var(--ease-atelier)] group-hover:scale-[1.04]">
                        <ProjectArtwork project={p} />
                      </div>
                      <div className="pointer-events-none absolute inset-x-2 bottom-2 flex items-center justify-between gap-2 rounded-full bg-ink/80 px-4 py-2 backdrop-blur sm:inset-x-3 sm:bottom-3">
                        <span className="truncate text-sm font-medium">{p.title}</span>
                        <span className="hidden shrink-0 font-mono text-[0.7rem] text-mute sm:inline">{cat?.title}</span>
                      </div>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

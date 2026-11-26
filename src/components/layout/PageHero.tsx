import { Container } from "@/components/ui/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/ui/Reveal";

/** The opening band for interior pages: numbered label, display title, lead. */
export function PageHero({
  index,
  eyebrow,
  title,
  lead,
  children,
}: {
  index: string;
  eyebrow: string;
  title: React.ReactNode;
  lead?: React.ReactNode;
  children?: React.ReactNode;
}) {
  return (
    <section className="grain relative border-b border-line-dark bg-ink pt-36 pb-16 sm:pt-44 lg:pt-52 lg:pb-24">
      <Container>
        <Reveal trigger="load">
          <SectionLabel index={index} className="text-stone-light">
            {eyebrow}
          </SectionLabel>
        </Reveal>
        <div className="mt-8 grid gap-10 lg:grid-cols-12 lg:items-end">
          <Reveal trigger="load" delay={0.08} className="lg:col-span-8">
            <h1 className="font-display text-d1">{title}</h1>
          </Reveal>
          {lead ? (
            <Reveal trigger="load" delay={0.16} className="lg:col-span-4">
              <p className="text-lead text-stone-light">{lead}</p>
            </Reveal>
          ) : null}
        </div>
        {children}
      </Container>
    </section>
  );
}

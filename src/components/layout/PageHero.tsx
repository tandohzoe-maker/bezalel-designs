import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/ui/Reveal";
import { Contours } from "@/components/ui/Contours";

/** Opening card for interior pages: rounded black panel, contours, centred copy. */
export function PageHero({
  eyebrow,
  title,
  lead,
  children,
}: {
  index?: string;
  eyebrow: string;
  title: React.ReactNode;
  lead?: React.ReactNode;
  children?: React.ReactNode;
}) {
  return (
    <section className="relative isolate overflow-hidden rounded-b-[2rem] bg-[#09060f] pt-40 pb-20 text-center sm:pt-48 lg:rounded-b-[2.75rem] lg:pt-56 lg:pb-28">
      <Contours className="absolute inset-0 -z-10 h-full w-full text-purple-bright/[0.1]" />
      <div aria-hidden className="absolute -top-1/2 left-1/2 -z-10 h-full w-[80%] -translate-x-1/2 rounded-full bg-purple/20 blur-[130px]" />
      <Container>
        <Reveal trigger="load">
          <Eyebrow className="justify-center">{eyebrow}</Eyebrow>
        </Reveal>
        <Reveal trigger="load" delay={0.08}>
          <h1 className="mx-auto mt-6 max-w-[16ch] text-[clamp(2.75rem,1.4rem+5.2vw,6.25rem)] leading-[0.98] tracking-[-0.05em]">
            {title}
          </h1>
        </Reveal>
        {lead ? (
          <Reveal trigger="load" delay={0.16}>
            <p className="mx-auto mt-7 max-w-xl text-lead text-white/70">{lead}</p>
          </Reveal>
        ) : null}
        {children}
      </Container>
    </section>
  );
}

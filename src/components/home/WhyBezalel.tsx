import { Container } from "@/components/ui/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";

const principles = [
  {
    title: "Intentional by design",
    text: "Nothing is decorative for its own sake. Every colour, typeface and layout choice serves your message.",
  },
  {
    title: "Excellence in every detail",
    text: "Alignment, spacing, contrast, finish. We refine the small things until nothing feels accidental.",
  },
  {
    title: "You're part of the process",
    text: "Clear communication from brief to final files, with room for your feedback at every stage.",
  },
  {
    title: "Ready wherever it goes",
    text: "Files prepared properly for print, social media and screen, in the formats you actually need.",
  },
];

const process = [
  { step: "Brief", text: "We listen: your goal, your audience, your timeline." },
  { step: "Concept", text: "We explore directions and present a considered first design." },
  { step: "Refine", text: "We revise together until every detail is right." },
  { step: "Deliver", text: "You receive final, ready-to-use files for every format." },
];

/** 05 — Why Bezalel: principles and process, on the light reading surface. */
export function WhyBezalel() {
  return (
    <section aria-labelledby="why-heading" className="surface-light py-24 sm:py-32 lg:py-44">
      <Container>
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Reveal>
              <SectionLabel index="05" className="text-stone-dark">
                Why Bezalel
              </SectionLabel>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 id="why-heading" className="mt-10 font-display text-d2">
                Every detail <em className="text-amethyst-dark">matters</em>.
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.1} className="lg:col-span-4 lg:col-start-9">
            <p className="leading-relaxed text-stone-dark">
              Good design is rarely about one big idea. It&rsquo;s about hundreds of small decisions made well. That is
              where we spend our time.
            </p>
          </Reveal>
        </div>

        <ul className="mt-16 grid sm:grid-cols-2 sm:gap-x-10 lg:mt-24 lg:grid-cols-4 lg:gap-x-0">
          {principles.map((p, i) => (
            <Reveal
              as="li"
              key={p.title}
              delay={i * 0.08}
              className="border-t border-line-light pt-8 pb-10 lg:pt-10 lg:pb-14 lg:pr-8 lg:[&:not(:first-child)]:border-l lg:[&:not(:first-child)]:pl-8"
            >
              <p className="label tabular-nums text-amethyst-dark">{String(i + 1).padStart(2, "0")}</p>
              <h3 className="mt-8 font-display text-[1.75rem] leading-tight">{p.title}</h3>
              <p className="mt-4 text-sm leading-relaxed text-stone-dark">{p.text}</p>
            </Reveal>
          ))}
        </ul>

        {/* How we work */}
        <div className="mt-24 lg:mt-36">
          <Reveal>
            <h3 className="label text-stone-dark">How we work</h3>
          </Reveal>
          <ol className="mt-10 grid gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {process.map((p, i) => (
              <Reveal as="li" key={p.step} delay={i * 0.08} className="relative border-t border-ink/80 pt-6 pr-8">
                <span aria-hidden className="absolute -top-[3px] left-0 size-[5px] bg-ink" />
                <p className="label tabular-nums text-stone-dark">Step {String(i + 1).padStart(2, "0")}</p>
                <p className="mt-4 font-display text-d4">{p.step}</p>
                <p className="mt-3 max-w-[16rem] text-sm leading-relaxed text-stone-dark">{p.text}</p>
              </Reveal>
            ))}
          </ol>
          <Reveal className="mt-16 flex flex-col gap-4 sm:flex-row lg:mt-20">
            <ButtonLink href="/start-a-project" tone="light">
              Start a Project
            </ButtonLink>
            <ButtonLink href="/pricing" tone="light" variant="outline">
              See pricing
            </ButtonLink>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

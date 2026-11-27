import { Container } from "@/components/ui/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";

const disciplines = [
  {
    title: "Graphic Design",
    text: "Flyers, posters, church and ministry graphics, social media and print, composed with clarity.",
  },
  {
    title: "Brand Identity",
    text: "Logos and visual systems that give a business, ministry or event a face people remember.",
  },
  {
    title: "Video & Motion",
    text: "Promotional videos, event highlights and motion graphics that carry an idea further.",
  },
];

/** 01 — The Studio: who Bezalel Designs is, on the light reading surface. */
export function StudioIntro() {
  return (
    <section aria-labelledby="studio-heading" className="surface-light py-24 sm:py-32 lg:py-44">
      <Container>
        <Reveal>
          <SectionLabel index="01" className="text-stone-dark">
            The Studio
          </SectionLabel>
        </Reveal>

        <Reveal delay={0.05}>
          <h2 id="studio-heading" className="mt-10 max-w-[18ch] font-display text-d2 lg:mt-14">
            Creativity is more than making things look <em className="text-amethyst-dark">beautiful</em>.
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-10 lg:mt-20 lg:grid-cols-12">
          <Reveal className="lg:col-span-5 lg:col-start-6">
            <p className="text-lead text-ink/85">
              It is about communicating ideas, giving expression to visions and translating concepts into meaningful
              visual experiences.
            </p>
          </Reveal>
          <Reveal delay={0.1} className="flex flex-col gap-8 lg:col-span-5 lg:col-start-6">
            <p className="leading-relaxed text-stone-dark">
              At Bezalel Designs, every project begins with understanding what you want to say and who needs to hear it.
              From there, each colour, typeface and composition is chosen with intention, because excellence lives in
              the details.
            </p>
            <ButtonLink href="/about" tone="light" variant="text">
              Read our story
            </ButtonLink>
          </Reveal>
        </div>

        <ul className="mt-20 grid border-t border-line-light sm:grid-cols-3 lg:mt-28">
          {disciplines.map((d, i) => (
            <Reveal
              as="li"
              key={d.title}
              delay={i * 0.08}
              className="border-b border-line-light py-8 sm:border-b-0 sm:py-10 sm:pr-8 sm:[&:not(:first-child)]:border-l sm:[&:not(:first-child)]:pl-8"
            >
              <p className="label tabular-nums text-stone-dark">{String(i + 1).padStart(2, "0")}</p>
              <h3 className="mt-6 font-display text-d4">{d.title}</h3>
              <p className="mt-4 max-w-xs text-sm leading-relaxed text-stone-dark">{d.text}</p>
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  );
}

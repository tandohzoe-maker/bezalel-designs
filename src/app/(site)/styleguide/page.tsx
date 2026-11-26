import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { ButtonLink, Button } from "@/components/ui/Button";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Signature, Wordmark } from "@/components/ui/Wordmark";
import { PageHero } from "@/components/layout/PageHero";

/* Internal design-system reference. Not linked, not indexed. */
export const metadata: Metadata = {
  title: "Style Guide",
  robots: { index: false, follow: false },
};

const palette = [
  { name: "Ink", hex: "#0B0B0C", cls: "bg-ink", role: "Primary background — the gallery wall" },
  { name: "Graphite", hex: "#17171A", cls: "bg-graphite", role: "Raised surfaces, lightbox" },
  { name: "Bone", hex: "#F4F1EA", cls: "bg-bone", role: "Reading surfaces", dark: true },
  { name: "White", hex: "#FFFFFF", cls: "bg-white", role: "Text on dark", dark: true },
  { name: "Stone", hex: "#8C8A86", cls: "bg-stone", role: "Secondary text, labels" },
  { name: "Amethyst", hex: "#7A5CCB", cls: "bg-amethyst", role: "Accent — links, focus, active" },
  { name: "Gilt", hex: "#B9975B", cls: "bg-gilt", role: "Signature only" },
];

const type = [
  { label: "Display 1", cls: "text-d1", sample: "Every detail." },
  { label: "Display 2", cls: "text-d2", sample: "Beautiful execution." },
  { label: "Display 3", cls: "text-d3", sample: "Creativity meets purpose." },
  { label: "Display 4", cls: "text-d4", sample: "Ideas find their visual expression." },
];

export default function StyleGuidePage() {
  return (
    <>
      <PageHero
        index="SG"
        eyebrow="Design system"
        title={
          <>
            The <em>Atelier</em>.
          </>
        }
        lead="Dark gallery for the work, quiet light pages for reading. Hairlines instead of boxes. Accents used sparingly."
      />

      {/* Colour */}
      <section className="border-b border-line-dark py-20 lg:py-28">
        <Container>
          <SectionLabel index="01" className="text-stone-light">
            Colour
          </SectionLabel>
          <ul className="mt-10 grid grid-cols-2 gap-px bg-line-dark sm:grid-cols-4 lg:grid-cols-7">
            {palette.map((c) => (
              <li key={c.name} className="bg-ink">
                <div className={`${c.cls} aspect-[4/5] outline outline-1 -outline-offset-1 outline-white/10`} />
                <div className="p-4">
                  <p className="font-display text-xl">{c.name}</p>
                  <p className="label mt-1 text-stone-light">{c.hex}</p>
                  <p className="mt-3 text-xs leading-relaxed text-stone-light">{c.role}</p>
                </div>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Type */}
      <section className="border-b border-line-dark py-20 lg:py-28">
        <Container>
          <SectionLabel index="02" className="text-stone-light">
            Typography — Bodoni Moda / Inter Tight
          </SectionLabel>
          <div className="mt-10 divide-y divide-line-dark border-y border-line-dark">
            {type.map((t) => (
              <div key={t.label} className="grid gap-4 py-8 lg:grid-cols-12 lg:items-baseline">
                <p className="label text-stone lg:col-span-2">{t.label}</p>
                <p className={`font-display ${t.cls} lg:col-span-10`}>
                  {t.sample.split(" ").slice(0, -1).join(" ")} <em>{t.sample.split(" ").slice(-1)}</em>
                </p>
              </div>
            ))}
            <div className="grid gap-4 py-8 lg:grid-cols-12">
              <p className="label text-stone lg:col-span-2">Lead / Body</p>
              <div className="max-w-2xl space-y-4 lg:col-span-10">
                <p className="text-lead text-white/90">
                  Bezalel Designs is built on the conviction that creativity is more than making things look beautiful.
                </p>
                <p className="leading-relaxed text-stone-light">
                  It is about communicating ideas, giving expression to visions and translating concepts into meaningful
                  visual experiences. Body text sits at 16px with a generous 1.65 line height and a measure of roughly
                  65 characters.
                </p>
              </div>
            </div>
            <div className="grid gap-4 py-8 lg:grid-cols-12">
              <p className="label text-stone lg:col-span-2">Labels</p>
              <div className="flex flex-col gap-4 lg:col-span-10">
                <SectionLabel index="01">Graphic Design</SectionLabel>
                <SectionLabel>Event Posters</SectionLabel>
                <Signature />
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Components on dark */}
      <section className="border-b border-line-dark py-20 lg:py-28">
        <Container>
          <SectionLabel index="03" className="text-stone-light">
            Actions — on ink
          </SectionLabel>
          <div className="mt-10 flex flex-wrap items-center gap-6">
            <ButtonLink href="/portfolio">Explore Our Work</ButtonLink>
            <ButtonLink href="/start-a-project" variant="outline">
              Start a Project
            </ButtonLink>
            <ButtonLink href="/services" variant="text">
              View services
            </ButtonLink>
            <Button disabled>Disabled</Button>
          </div>
          <div className="mt-14 flex flex-wrap items-end gap-x-12 gap-y-8">
            <Wordmark size="lg" />
            <Wordmark />
            <Wordmark size="sm" />
          </div>
        </Container>
      </section>

      {/* Components on light */}
      <section className="surface-light py-20 lg:py-28">
        <Container>
          <SectionLabel index="04" className="text-stone-dark">
            Reading surface — on bone
          </SectionLabel>
          <div className="mt-10 grid gap-12 lg:grid-cols-12">
            <h2 className="font-display text-d3 lg:col-span-6">
              Every project deserves <em className="text-amethyst-dark">thought</em>.
            </h2>
            <div className="space-y-6 lg:col-span-5 lg:col-start-8">
              <p className="leading-relaxed text-stone-dark">
                Light sections carry long-form reading: the About story, pricing tables and the enquiry form. The same
                hairline system applies, inverted.
              </p>
              <div className="flex flex-wrap gap-4">
                <ButtonLink href="/pricing" tone="light">
                  Request this service
                </ButtonLink>
                <ButtonLink href="/contact" tone="light" variant="outline">
                  Contact
                </ButtonLink>
              </div>
              <ButtonLink href="/about" tone="light" variant="text">
                Read our story
              </ButtonLink>
            </div>
          </div>

          <div className="mt-16 border-t border-line-light">
            {[
              ["Logo design", "From GH₵ —", "Price set in admin"],
              ["Event poster", "From GH₵ —", "Price set in admin"],
              ["Brand identity", "Custom quote", "Every creative project is different."],
            ].map(([a, b, c]) => (
              <div key={a} className="grid grid-cols-2 gap-4 border-b border-line-light py-6 sm:grid-cols-12">
                <p className="font-display text-2xl sm:col-span-5">{a}</p>
                <p className="text-right text-sm text-stone-dark sm:order-last sm:col-span-3">{c}</p>
                <p className="label col-span-2 sm:col-span-4">{b}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}

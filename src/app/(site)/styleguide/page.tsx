import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Button, ButtonLink } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/SectionLabel";
import { Monogram, Signature, Wordmark } from "@/components/ui/Wordmark";
import { PageHero } from "@/components/layout/PageHero";

/* Internal design-system reference. Not linked, not indexed. */
export const metadata: Metadata = {
  title: "Style Guide",
  robots: { index: false, follow: false },
};

const palette = [
  { name: "Ink", hex: "#050505", cls: "bg-ink", role: "Page background" },
  { name: "Card", hex: "#131315", cls: "bg-card", role: "Rounded cards" },
  { name: "Deep purple", hex: "#1A0D33", cls: "bg-[#1a0d33]", role: "Tinted feature cards" },
  { name: "Purple", hex: "#8B3DFF", cls: "bg-purple", role: "Highlight marks, glows" },
  { name: "Lilac", hex: "#B98CFF", cls: "bg-purple-bright", role: "Buttons, accent text" },
  { name: "Mute", hex: "#A3A3AC", cls: "bg-mute", role: "Secondary text" },
  { name: "White", hex: "#FFFFFF", cls: "bg-white", role: "Primary text" },
  { name: "Gilt", hex: "#C9A96E", cls: "bg-gilt", role: "Signature only" },
];

const type = [
  { label: "Hero", cls: "text-hero", sample: "Every detail." },
  { label: "H2", cls: "text-h2", sample: "Beautiful execution." },
  { label: "H2 small", cls: "text-h2s", sample: "Creativity meets purpose." },
  { label: "H3", cls: "text-h3", sample: "Ideas find their visual expression." },
];

export default function StyleGuidePage() {
  return (
    <>
      <PageHero eyebrow="Design system" title="Black and purple." lead="Rounded cards, pill buttons, tight geometric type, mono labels." />

      <section className="py-16 lg:py-24">
        <Container className="flex flex-col gap-4">
          <div className="rounded-[2rem] bg-card p-7 lg:p-10">
            <Eyebrow>Colour</Eyebrow>
            <ul className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-8">
              {palette.map((c) => (
                <li key={c.name}>
                  <div className={`${c.cls} aspect-square rounded-[1.25rem] ring-1 ring-white/10`} />
                  <p className="mt-3 font-medium">{c.name}</p>
                  <p className="font-mono text-xs text-mute">{c.hex}</p>
                  <p className="mt-1 text-xs text-mute">{c.role}</p>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-[2rem] bg-card p-7 lg:p-10">
            <Eyebrow>Typography · Manrope / IBM Plex Mono</Eyebrow>
            <div className="mt-6 divide-y divide-white/10">
              {type.map((t) => (
                <div key={t.label} className="grid gap-3 py-6 lg:grid-cols-12 lg:items-baseline">
                  <p className="eyebrow lg:col-span-2">{t.label}</p>
                  <p className={`${t.cls} lg:col-span-10`}>{t.sample}</p>
                </div>
              ))}
              <div className="grid gap-3 py-6 lg:grid-cols-12">
                <p className="eyebrow lg:col-span-2">Lead / body</p>
                <div className="max-w-2xl space-y-3 lg:col-span-10">
                  <p className="text-lead">Bezalel Designs is built on the conviction that creativity is more than making things look beautiful.</p>
                  <p className="leading-relaxed text-mute">Body text sits at 16px with a 1.65 line height and a comfortable measure.</p>
                </div>
              </div>
              <div className="grid gap-3 py-6 lg:grid-cols-12">
                <p className="eyebrow lg:col-span-2">Marks</p>
                <p className="text-h2s lg:col-span-10">
                  Ideas become <mark className="mark-purple">logos</mark> and <mark className="mark-purple">videos</mark>.
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-[2rem] bg-card p-7 lg:p-10">
            <Eyebrow badge="New">Actions</Eyebrow>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <ButtonLink href="/portfolio">Explore Our Work</ButtonLink>
              <ButtonLink href="/start-a-project" variant="light">
                Start a Project
              </ButtonLink>
              <ButtonLink href="/services" variant="ghost">
                Learn more
              </ButtonLink>
              <ButtonLink href="/pricing" variant="link">
                View pricing
              </ButtonLink>
              <Button disabled>Disabled</Button>
            </div>
            <div className="mt-10 flex flex-wrap items-center gap-8">
              <Wordmark size="lg" />
              <Wordmark />
              <Monogram className="size-12 text-xl" />
              <Signature />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}

import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

/** "Why Bezalel": four feature cards, each with a small illustrative visual. */
const cards = [
  {
    title: "Intentional",
    text: "Every colour, typeface and layout serves your message.",
    tone: "dark",
    visual: (
      <div className="flex gap-2">
        {["#050505", "#8b3dff", "#b98cff", "#f4f1ea"].map((c) => (
          <span key={c} className="size-10 rounded-full ring-1 ring-white/15" style={{ background: c }} />
        ))}
      </div>
    ),
  },
  {
    title: "Detailed",
    text: "Alignment, spacing and finish refined until nothing feels accidental.",
    tone: "light",
    visual: (
      <div className="w-full max-w-[12rem] rounded-2xl bg-ink/70 p-4 ring-1 ring-white/10">
        <div className="flex items-center justify-between font-mono text-[0.65rem] text-mute">
          <span>Kerning</span>
          <span>-12</span>
        </div>
        <div className="mt-3 h-1.5 rounded-full bg-white/10">
          <div className="h-full w-[72%] rounded-full bg-purple-bright" />
        </div>
        <p className="mt-3 text-[0.7rem] text-mute">Refining final details…</p>
      </div>
    ),
  },
  {
    title: "Collaborative",
    text: "Brief, concept, refine, deliver, with your feedback at every step.",
    tone: "dark",
    visual: (
      <ol className="flex w-full max-w-[13rem] items-center justify-between">
        {["Brief", "Concept", "Refine", "Deliver"].map((s, i) => (
          <li key={s} className="flex flex-col items-center gap-2">
            <span className={cn("size-2.5 rounded-full", i < 3 ? "bg-purple-bright" : "bg-white/25")} />
            <span className="font-mono text-[0.6rem] text-mute">{s}</span>
          </li>
        ))}
      </ol>
    ),
  },
  {
    title: "Ready to use",
    text: "Final files for print, social media and screen, in the formats you need.",
    tone: "light",
    visual: (
      <ul className="flex max-w-[13rem] flex-wrap justify-center gap-1.5">
        {["Print", "Instagram", "WhatsApp", "Web", "Banner"].map((f, i) => (
          <li
            key={f}
            className={cn(
              "rounded-full px-3 py-1 text-[0.72rem] font-medium",
              i === 0 ? "bg-white text-ink" : "bg-white/10 text-white/80",
            )}
          >
            {f}
          </li>
        ))}
      </ul>
    ),
  },
];

export function Details() {
  return (
    <section aria-labelledby="details-heading" className="py-24 sm:py-32 lg:py-40">
      <Container>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <Reveal>
              <Eyebrow>Why Bezalel</Eyebrow>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 id="details-heading" className="mt-4 text-h2s">
                Every detail matters.
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <ButtonLink href="/about" variant="ghost" size="sm">
              Our approach
            </ButtonLink>
          </Reveal>
        </div>

        <ul className="mt-12 grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4">
          {cards.map((c, i) => (
            <Reveal as="li" key={c.title} delay={i * 0.06}>
              <div
                className={cn(
                  "flex aspect-[4/5] items-center justify-center rounded-[1.75rem] p-6 lg:rounded-[2rem]",
                  c.tone === "dark" ? "bg-[#1a0d33]" : "bg-card",
                )}
              >
                {c.visual}
              </div>
              <h3 className="mt-5 text-xl font-medium tracking-[-0.03em]">{c.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-mute">{c.text}</p>
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  );
}

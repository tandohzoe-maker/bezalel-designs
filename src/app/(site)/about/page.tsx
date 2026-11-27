import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/layout/PageHero";
import { Container } from "@/components/ui/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { Signature } from "@/components/ui/Wordmark";
import { founder, pillars } from "@/config/about";

export const metadata: Metadata = {
  title: "About",
  description:
    "Bezalel Designs is built on the conviction that creativity is more than making things look beautiful. It is about giving ideas their visual expression.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  const hasFounder = Boolean(founder.name && founder.bio.length);

  return (
    <>
      <PageHero
        index="01"
        eyebrow="About the studio"
        title={
          <>
            Excellence lives <em>in the details</em>.
          </>
        }
        lead="We don't just create designs. We help ideas find their visual expression."
      />

      {/* 01 — Who we are */}
      <section aria-labelledby="who-heading" className="surface-light py-24 sm:py-32 lg:py-44">
        <Container className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Reveal>
              <SectionLabel index="01" as="h2" className="text-stone-dark">
                <span id="who-heading">Who we are</span>
              </SectionLabel>
            </Reveal>
          </div>
          <div className="lg:col-span-8">
            <Reveal>
              <p className="font-display text-d3">
                Bezalel Designs is built on the conviction that creativity is more than making things look beautiful.
              </p>
            </Reveal>
            <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:mt-16">
              <Reveal>
                <p className="leading-relaxed text-stone-dark">
                  It is about communicating ideas, giving expression to visions and translating concepts into
                  meaningful visual experiences.
                </p>
              </Reveal>
              <Reveal delay={0.08}>
                <p className="leading-relaxed text-stone-dark">
                  We believe that excellence lives in the details. Every project deserves thought, intentionality and a
                  commitment to quality.
                </p>
              </Reveal>
            </div>
            <Reveal className="mt-16 border-t border-line-light pt-10 lg:mt-24">
              <p className="font-display text-d4 italic">
                At Bezalel Designs, we don&rsquo;t just create designs.{" "}
                <span className="text-amethyst-dark">We help ideas find their visual expression.</span>
              </p>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* 02 — The name */}
      <section aria-labelledby="name-heading" className="grain relative bg-ink py-24 sm:py-32 lg:py-44">
        <Container className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Reveal>
              <SectionLabel index="02" as="h2" className="text-stone-light">
                <span id="name-heading">The name</span>
              </SectionLabel>
            </Reveal>
          </div>
          <div className="lg:col-span-8">
            <Reveal>
              <figure>
                <blockquote className="font-display text-[clamp(1.75rem,1.2rem+1.9vw,3rem)] leading-[1.14]">
                  <p>
                    &ldquo;And I have filled him with the spirit of God, in wisdom, and in understanding, and in
                    knowledge, and in <em className="text-gilt-light">all manner of workmanship</em>.&rdquo;
                  </p>
                </blockquote>
                <figcaption className="label mt-8 text-stone-light">Exodus 31:3 · King James Version</figcaption>
              </figure>
            </Reveal>
            <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:mt-20">
              <Reveal>
                <p className="leading-relaxed text-stone-light">
                  Bezalel was the craftsman entrusted with making the tabernacle: a master of gold, silver, stone and
                  wood, chosen for his skill and his care for every detail.
                </p>
              </Reveal>
              <Reveal delay={0.08}>
                <p className="leading-relaxed text-stone-light">
                  We carry his name as a standard to live up to: work that is skilful, purposeful and made with
                  excellence, whether it is a single flyer or an entire brand.
                </p>
              </Reveal>
            </div>
          </div>
        </Container>
      </section>

      {/* 03 — Philosophy, approach, commitment */}
      <section aria-labelledby="pillars-heading" className="surface-light py-24 sm:py-32 lg:py-44">
        <Container>
          <Reveal>
            <SectionLabel index="03" className="text-stone-dark">
              What we stand for
            </SectionLabel>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 id="pillars-heading" className="mt-10 max-w-[16ch] font-display text-d2">
              Thoughtful, intentional, <em className="text-amethyst-dark">excellent</em>.
            </h2>
          </Reveal>
          <ol className="mt-16 border-t border-line-light lg:mt-24">
            {pillars.map((p, i) => (
              <Reveal
                as="li"
                key={p.title}
                className="grid gap-4 border-b border-line-light py-10 lg:grid-cols-12 lg:items-baseline lg:py-14"
              >
                <p className="label tabular-nums text-stone-dark lg:col-span-1">{String(i + 1).padStart(2, "0")}</p>
                <h3 className="font-display text-d4 lg:col-span-4">{p.title}</h3>
                <p className="max-w-2xl leading-relaxed text-stone-dark lg:col-span-6 lg:col-start-7">{p.text}</p>
              </Reveal>
            ))}
          </ol>
        </Container>
      </section>

      {/* 04 — Founder */}
      {hasFounder ? (
        <section aria-labelledby="founder-heading" className="grain relative bg-ink py-24 sm:py-32 lg:py-44">
          <Container className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <Reveal>
                <SectionLabel index="04" className="text-stone-light">
                  The founder
                </SectionLabel>
              </Reveal>
              {founder.photo ? (
                <Reveal className="mt-10">
                  {/* Cut-out portrait: sits on the floor of a graphite frame with a hairline. */}
                  <div className="relative aspect-[4/5] max-w-md overflow-hidden bg-graphite outline outline-1 -outline-offset-1 outline-white/8">
                    <span aria-hidden className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-amethyst/15 to-transparent" />
                    <Image
                      src={founder.photo}
                      alt={`${founder.name}, founder of Bezalel Designs`}
                      fill
                      sizes="(min-width: 1024px) 34vw, 90vw"
                      className="object-contain object-bottom pt-8"
                    />
                  </div>
                </Reveal>
              ) : null}
              <Reveal delay={0.05}>
                <h2 id="founder-heading" className="mt-10 font-display text-d3">
                  {founder.name}
                </h2>
                <p className="label mt-5 text-gilt">{founder.role}</p>
              </Reveal>
              {founder.tools.length ? (
                <Reveal delay={0.1} className="mt-12 border-t border-line-dark pt-6">
                  <h3 className="label text-stone-light">Design tools</h3>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {founder.tools.map((t) => (
                      <li key={t} className="border border-line-dark px-3 py-1.5 text-sm text-white/85">
                        {t}
                      </li>
                    ))}
                  </ul>
                </Reveal>
              ) : null}
            </div>

            <div className="lg:col-span-6 lg:col-start-7 lg:pt-20">
              {founder.kicker ? (
                <Reveal>
                  <p className="label text-amethyst-light">{founder.kicker}</p>
                </Reveal>
              ) : null}
              <div className="mt-8 space-y-6">
                {founder.bio.map((para, i) => (
                  <Reveal key={i} delay={0.05 * i}>
                    <p className={i === 0 ? "text-lead text-white/90" : "leading-relaxed text-stone-light"}>{para}</p>
                  </Reveal>
                ))}
              </div>
              {founder.closing ? (
                <Reveal className="mt-12 border-t border-line-dark pt-10">
                  <p className="font-display text-d4 italic">{founder.closing}</p>
                  <Signature className="mt-8" />
                </Reveal>
              ) : null}
            </div>
          </Container>
        </section>
      ) : null}

      {/* Closing nudge */}
      <section className="surface-light border-t border-line-light py-20 lg:py-28">
        <Container className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <Reveal>
            <p className="font-display text-d3">
              See the <em className="text-amethyst-dark">work</em>.
            </p>
          </Reveal>
          <Reveal className="flex flex-col gap-4 sm:flex-row">
            <ButtonLink href="/portfolio" tone="light">
              Explore Our Work
            </ButtonLink>
            <ButtonLink href="/services" tone="light" variant="outline">
              Our services
            </ButtonLink>
          </Reveal>
        </Container>
      </section>
    </>
  );
}

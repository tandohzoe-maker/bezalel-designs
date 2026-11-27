import type { Metadata } from "next";
import { Founder3D } from "@/components/about/Founder3D";
import { PageHero } from "@/components/layout/PageHero";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/ui/Reveal";
import { ScrubText } from "@/components/ui/ScrubText";
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
        eyebrow="About the studio"
        title="Excellence lives in the details."
        lead="We don't just create designs. We help ideas find their visual expression."
      />

      {/* Who we are */}
      <section aria-labelledby="who-heading" className="py-24 sm:py-32 lg:py-40">
        <Container>
          <Eyebrow className="justify-center">Who we are</Eyebrow>
          <ScrubText
            id="who-heading"
            className="mx-auto mt-6 max-w-[24ch] text-center text-h2 leading-[1.2] sm:leading-[1.12]"
            parts={[
              "Bezalel Designs is built on the conviction that creativity is ",
              { mark: "more" },
              " than making things look beautiful.",
            ]}
          />
          <div className="mt-16 grid gap-3 sm:gap-4 lg:mt-20 lg:grid-cols-3">
            <Reveal className="rounded-[1.75rem] bg-card p-7 lg:rounded-[2rem] lg:p-9">
              <p className="text-lead text-white/85">
                It is about communicating ideas, giving expression to visions and translating concepts into meaningful
                visual experiences.
              </p>
            </Reveal>
            <Reveal delay={0.06} className="rounded-[1.75rem] bg-card p-7 lg:rounded-[2rem] lg:p-9">
              <p className="text-lead text-white/85">
                We believe that excellence lives in the details. Every project deserves thought, intentionality and a
                commitment to quality.
              </p>
            </Reveal>
            <Reveal delay={0.12} className="rounded-[1.75rem] bg-purple-bright p-7 text-ink lg:rounded-[2rem] lg:p-9">
              <p className="text-lead font-medium">
                At Bezalel Designs, we don&rsquo;t just create designs. We help ideas find their visual expression.
              </p>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* The name */}
      <section aria-labelledby="name-heading" className="py-10 sm:py-16">
        <Container>
          <Reveal className="relative isolate overflow-hidden rounded-[1.75rem] bg-[#1a0d33] px-6 py-14 sm:px-12 lg:rounded-[2.5rem] lg:px-20 lg:py-24">
            <div aria-hidden className="absolute -right-1/4 -bottom-1/2 -z-10 h-full w-3/4 rounded-full bg-purple/30 blur-[120px]" />
            <h2 id="name-heading" className="eyebrow">
              The name
            </h2>
            <figure className="mt-8">
              <blockquote className="max-w-[28ch] text-h2s">
                <p>
                  &ldquo;And I have filled him with the spirit of God, in wisdom, and in understanding, and in knowledge,
                  and in <span className="text-purple-bright">all manner of workmanship</span>.&rdquo;
                </p>
              </blockquote>
              <figcaption className="mt-6 font-mono text-[0.8rem] text-white/60">Exodus 31:3 · King James Version</figcaption>
            </figure>
            <div className="mt-12 grid gap-6 text-white/75 sm:grid-cols-2 lg:max-w-4xl">
              <p className="leading-relaxed">
                Bezalel was the craftsman entrusted with making the tabernacle: a master of gold, silver, stone and wood,
                chosen for his skill and his care for every detail.
              </p>
              <p className="leading-relaxed">
                We carry his name as a standard to live up to: work that is skilful, purposeful and made with
                excellence, whether it is a single flyer or an entire brand.
              </p>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* What we stand for */}
      <section aria-labelledby="pillars-heading" className="py-24 sm:py-32">
        <Container>
          <Reveal>
            <Eyebrow>What we stand for</Eyebrow>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 id="pillars-heading" className="mt-4 max-w-[18ch] text-h2s">
              Thoughtful, intentional, excellent.
            </h2>
          </Reveal>
          <ol className="mt-12 grid gap-3 sm:gap-4 lg:grid-cols-3">
            {pillars.map((p, i) => (
              <Reveal
                as="li"
                key={p.title}
                delay={i * 0.06}
                className="flex flex-col rounded-[1.75rem] bg-card p-7 lg:rounded-[2rem] lg:p-9"
              >
                <span className="flex size-10 items-center justify-center rounded-full bg-white/10 font-mono text-sm">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-10 text-h3">{p.title}</h3>
                <p className="mt-4 leading-relaxed text-mute">{p.text}</p>
              </Reveal>
            ))}
          </ol>
        </Container>
      </section>

      {/* Founder */}
      {hasFounder ? (
        <section aria-labelledby="founder-heading" className="overflow-x-clip py-10 sm:py-16">
          <Container>
            <div className="grid gap-10 sm:gap-12 lg:grid-cols-12 lg:items-center lg:gap-4">
              {founder.photo ? (
                <Reveal className="px-3 sm:px-6 lg:col-span-5 lg:px-2">
                  <Founder3D
                    src={founder.photo}
                    winkSrc={founder.photoWink}
                    width={founder.photoWidth}
                    height={founder.photoHeight}
                    alt={`Illustrated portrait of ${founder.name}, founder of Bezalel Designs`}
                    chips={[
                      { label: founder.tools[0] ?? "Adobe Photoshop", tone: "dark" },
                      { label: "400+ designs", tone: "purple" },
                      { label: founder.tools[1] ?? "Canva", tone: "dark" },
                      { label: "Since 2019", tone: "light" },
                    ]}
                  />
                </Reveal>
              ) : null}
              <Reveal
                delay={0.06}
                className={
                  founder.photo
                    ? "flex flex-col rounded-[1.75rem] bg-card p-7 sm:p-10 lg:col-span-7 lg:rounded-[2rem] lg:p-12"
                    : "flex flex-col rounded-[1.75rem] bg-card p-7 sm:p-10 lg:col-span-12 lg:rounded-[2rem] lg:p-12"
                }
              >
                <Eyebrow>The founder</Eyebrow>
                <h2 id="founder-heading" className="mt-4 text-h2s">
                  {founder.name}
                </h2>
                <p className="mt-3 text-sm font-medium text-purple-bright">{founder.role}</p>
                {founder.kicker ? <p className="mt-8 font-mono text-[0.8rem] text-mute">{founder.kicker}</p> : null}
                <div className="mt-4 space-y-5">
                  {founder.bio.map((para, i) => (
                    <p key={i} className={i === 0 ? "text-lead text-white/90" : "leading-relaxed text-mute"}>
                      {para}
                    </p>
                  ))}
                </div>
                {founder.tools.length ? (
                  <div className="mt-8">
                    <h3 className="eyebrow">Design tools</h3>
                    <ul className="mt-3 flex flex-wrap gap-2">
                      {founder.tools.map((t) => (
                        <li key={t} className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 text-sm">
                          {t}
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}
                {founder.closing ? (
                  <div className="mt-auto pt-10">
                    <p className="text-h3 text-white">{founder.closing}</p>
                    <Signature className="mt-6" />
                  </div>
                ) : null}
              </Reveal>
            </div>
          </Container>
        </section>
      ) : null}

      <section className="py-16">
        <Container className="flex flex-col items-center gap-6 text-center">
          <p className="text-h2s">See the work.</p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/portfolio">Explore Our Work</ButtonLink>
            <ButtonLink href="/services" variant="ghost">
              Our services
            </ButtonLink>
          </div>
        </Container>
      </section>
    </>
  );
}

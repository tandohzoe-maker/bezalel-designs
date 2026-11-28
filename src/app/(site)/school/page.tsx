import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/ui/Reveal";
import { ScrubText } from "@/components/ui/ScrubText";
import { ButtonLink } from "@/components/ui/Button";
import { Signature } from "@/components/ui/Wordmark";
import { contactDetails, socialLinks } from "@/config/site";
import { whatsAppLink } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Bezalel Design School — Coming soon",
  description:
    "Bezalel Design School is coming soon: training the next generation of designers — to mentor, teach and help them express their designs in different spaces.",
  alternates: { canonical: "/school" },
};

const pillars = [
  {
    n: "01",
    title: "Train",
    text: "Practical, hands-on design training that builds real skill: from the fundamentals of layout, colour and typography to work that is ready for clients.",
  },
  {
    n: "02",
    title: "Mentor",
    text: "Guidance from a working designer: feedback on your work, direction for your growth and honest advice on building a creative career.",
  },
  {
    n: "03",
    title: "Teach",
    text: "Clear teaching that explains not just how to design, but why: the thinking behind every intentional, excellent piece of work.",
  },
  {
    n: "04",
    title: "Express",
    text: "Space for students to express their designs in different spaces: print, apparel, brands, social media, events and beyond.",
  },
];

export default function SchoolPage() {
  const wa = whatsAppLink(
    contactDetails.whatsapp,
    "Hello Bezalel Designs, please add me to the Bezalel Design School waitlist. My name is ",
  );

  return (
    <>
      <PageHero
        eyebrow="Bezalel Design School"
        title="Training the next generation of designers."
        lead="We mentor, teach and help new designers express their work in different spaces."
      >
        <p className="mt-8 inline-flex items-center gap-2 rounded-full bg-purple-bright px-4 py-2 text-sm font-semibold text-ink">
          <span aria-hidden className="size-2 animate-pulse rounded-full bg-ink" />
          Coming soon
        </p>
      </PageHero>

      <section aria-labelledby="school-why" className="py-24 sm:py-32">
        <Container>
          <Eyebrow className="justify-center">Why a school</Eyebrow>
          <ScrubText
            id="school-why"
            className="mx-auto mt-6 max-w-[22ch] text-center text-h2 leading-[1.2] sm:leading-[1.12]"
            parts={["Every great designer needed someone to ", { mark: "show them the way" }, "."]}
          />
          <Reveal>
            <p className="mx-auto mt-8 max-w-2xl text-center text-lead text-white/80">
              Bezalel Design School exists to pass on what we have learned: the craft, the discipline and the
              conviction that excellence lives in the details.
            </p>
          </Reveal>

          <ol className="mt-16 grid gap-3 sm:grid-cols-2 sm:gap-4 lg:mt-20 lg:grid-cols-4">
            {pillars.map((p, i) => (
              <Reveal
                as="li"
                key={p.title}
                delay={i * 0.06}
                className={
                  i === 0
                    ? "flex flex-col rounded-[1.75rem] bg-purple-bright p-7 text-ink lg:rounded-[2rem]"
                    : "flex flex-col rounded-[1.75rem] bg-card p-7 lg:rounded-[2rem]"
                }
              >
                <span
                  className={
                    i === 0
                      ? "flex size-10 items-center justify-center rounded-full bg-ink/10 font-mono text-sm"
                      : "flex size-10 items-center justify-center rounded-full bg-white/10 font-mono text-sm"
                  }
                >
                  {p.n}
                </span>
                <h3 className="mt-10 text-h3">{p.title}</h3>
                <p className={i === 0 ? "mt-3 leading-relaxed text-ink/80" : "mt-3 leading-relaxed text-mute"}>
                  {p.text}
                </p>
              </Reveal>
            ))}
          </ol>
        </Container>
      </section>

      <section aria-labelledby="school-waitlist" className="pb-10 lg:pb-16">
        <Container>
          <Reveal className="relative isolate overflow-hidden rounded-[1.75rem] bg-[#1a0d33] px-6 py-14 text-center sm:px-12 lg:rounded-[2.5rem] lg:py-20">
            <div aria-hidden className="absolute -bottom-1/2 left-1/2 -z-10 h-full w-3/4 -translate-x-1/2 rounded-full bg-purple/30 blur-[120px]" />
            <Eyebrow className="justify-center">Be the first to know</Eyebrow>
            <h2 id="school-waitlist" className="mx-auto mt-4 max-w-[20ch] text-h2s">
              Join the waitlist.
            </h2>
            <p className="mx-auto mt-5 max-w-lg text-white/80">
              Classes, dates and fees will be announced soon. Join the waitlist and we&rsquo;ll let you know first.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              {wa ? (
                <ButtonLink href={wa} external size="lg">
                  Join on WhatsApp
                </ButtonLink>
              ) : null}
              {/^https:\/\//.test(socialLinks.instagram) ? (
                <ButtonLink href={socialLinks.instagram} external variant="ghost" size="lg">
                  Follow for updates
                </ButtonLink>
              ) : null}
            </div>
            <Signature className="mt-10" />
          </Reveal>
        </Container>
      </section>
    </>
  );
}

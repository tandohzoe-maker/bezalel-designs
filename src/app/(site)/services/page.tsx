import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { serviceCategories } from "@/config/services";
import { cedis, startingPrice } from "@/config/pricing";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Graphic design, flyers and posters, logo and brand identity, brand consultation, social media, church and ministry graphics, event branding, videography and merchandise design.",
  alternates: { canonical: "/services" },
};

/* Starting prices come from src/config/pricing.ts; quote-only services say so. */
export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="What we do"
        title="Design with purpose."
        lead={`${serviceCategories.length} disciplines, one standard: every piece is intentional, considered and made to communicate.`}
      />
      <section aria-label="All services" className="py-16 lg:py-24">
        <Container>
          <ol className="grid gap-3 sm:gap-4 lg:grid-cols-2">
            {serviceCategories.map((s, i) => (
              <Reveal
                as="li"
                key={s.slug}
                id={s.slug}
                delay={(i % 2) * 0.06}
                className="flex scroll-mt-28 flex-col rounded-[1.75rem] bg-card p-7 target:ring-2 target:ring-purple-bright sm:p-9 lg:rounded-[2rem]"
              >
                <div className="flex items-center justify-between gap-4">
                  <span className="flex size-10 items-center justify-center rounded-full bg-white/10 font-mono text-sm">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {(() => {
                    const from = startingPrice(s.slug);
                    return from ? (
                      <Link
                        href="/pricing"
                        className="relative z-10 rounded-full bg-purple-bright/15 px-3.5 py-1.5 text-sm font-medium text-purple-bright ring-1 ring-purple-bright/30 hover:bg-purple-bright/25"
                      >
                        From {cedis(from)}
                      </Link>
                    ) : (
                      <span className="rounded-full border border-white/10 px-3.5 py-1.5 text-sm text-mute">Custom quote</span>
                    );
                  })()}
                </div>
                <h2 className="mt-8 text-h3">{s.title}</h2>
                <p className="mt-3 max-w-md leading-relaxed text-mute">{s.summary}</p>
                <div className="mt-8">
                  <ButtonLink href={`/start-a-project?service=${s.slug}`} variant="ghost" size="sm">
                    Enquire about this
                  </ButtonLink>
                </div>
              </Reveal>
            ))}
          </ol>
        </Container>
      </section>
    </>
  );
}

import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { serviceCategories } from "@/config/services";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Graphic design, flyers and posters, logo and brand identity, social media, church and ministry graphics, event branding, video editing and merchandise design.",
  alternates: { canonical: "/services" },
};

/* Phase 4 adds portfolio examples and starting prices to each service. */
export default function ServicesPage() {
  return (
    <>
      <PageHero
        index="03"
        eyebrow="What we do"
        title={
          <>
            Design with <em>purpose</em>.
          </>
        }
        lead="Nine disciplines, one standard: every piece is intentional, considered and made to communicate."
      />
      <section aria-label="All services" className="surface-light py-20 lg:py-32">
        <Container>
          <ol className="border-t border-line-light">
            {serviceCategories.map((s, i) => (
              <li key={s.slug} id={s.slug} className="scroll-mt-28 border-b border-line-light">
                <Reveal className="grid gap-6 py-12 lg:grid-cols-12 lg:items-baseline lg:py-16">
                  <p className="label tabular-nums text-stone-dark lg:col-span-1">{String(i + 1).padStart(2, "0")}</p>
                  <h2 className="font-display text-d3 lg:col-span-6">{s.title}</h2>
                  <div className="flex flex-col items-start gap-6 lg:col-span-4 lg:col-start-9">
                    <p className="leading-relaxed text-stone-dark">{s.summary}</p>
                    <ButtonLink href={`/start-a-project?service=${s.slug}`} tone="light" variant="outline">
                      Enquire about this
                    </ButtonLink>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </Container>
      </section>
    </>
  );
}

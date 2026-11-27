import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { ArrowUpRightIcon } from "@/components/icons";
import type { ServiceCategory } from "@/config/services";

/** 04 — Services: an editorial index of every service, each linking to its detail. */
export function ServicesIndex({ services }: { services: ServiceCategory[] }) {
  return (
    <section aria-labelledby="services-heading" className="grain relative bg-ink py-24 sm:py-32 lg:py-44">
      <Container className="grid gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-32">
            <Reveal>
              <SectionLabel index="04" className="text-stone-light">
                Services
              </SectionLabel>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 id="services-heading" className="mt-10 font-display text-d2">
                What we <em className="text-amethyst-light">create</em>.
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-8 max-w-sm leading-relaxed text-stone-light">
                Ten disciplines, one standard. Whatever the format, the work is intentional, considered and made to
                communicate.
              </p>
              <div className="mt-10 flex flex-col items-start gap-6">
                <ButtonLink href="/services" variant="outline">
                  All services
                </ButtonLink>
                <ButtonLink href="/pricing" variant="text">
                  View pricing
                </ButtonLink>
              </div>
            </Reveal>
          </div>
        </div>

        <ol className="border-t border-line-dark lg:col-span-8">
          {services.map((s, i) => (
            <Reveal as="li" key={s.slug} className="border-b border-line-dark">
              <Link
                href={`/services#${s.slug}`}
                className="group relative grid grid-cols-[2.5rem_1fr_auto] items-baseline gap-x-4 gap-y-3 py-7 sm:grid-cols-[3.5rem_1fr_auto] sm:py-9"
              >
                {/* Amethyst rule that sweeps in on hover */}
                <span
                  aria-hidden
                  className="absolute -top-px left-0 h-px w-0 bg-amethyst-light transition-[width] duration-700 ease-[var(--ease-atelier)] group-hover:w-full group-focus-visible:w-full"
                />
                <span className="label tabular-nums text-stone">{String(i + 1).padStart(2, "0")}</span>
                <span className="font-display text-[1.6rem] leading-tight transition-transform duration-500 ease-[var(--ease-atelier)] group-hover:translate-x-2 sm:text-d4">
                  {s.title}
                </span>
                <ArrowUpRightIcon className="size-5 self-center text-stone transition-[color,transform] duration-500 ease-[var(--ease-atelier)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white" />
                <span className="col-start-2 col-end-4 max-w-xl text-sm leading-relaxed text-stone-light transition-transform duration-500 ease-[var(--ease-atelier)] group-hover:translate-x-2">
                  {s.summary}
                </span>
              </Link>
            </Reveal>
          ))}
        </ol>
      </Container>
    </section>
  );
}

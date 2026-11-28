import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { ArrowRightIcon } from "@/components/icons";
import type { ServiceCategory } from "@/config/services";

/** Services as two list cards, centred heading above. */
export function ServicesShowcase({ services }: { services: ServiceCategory[] }) {
  const half = Math.ceil(services.length / 2);
  const groups = [
    { title: "Design & identity", items: services.slice(0, half) },
    { title: "Production & more", items: services.slice(half) },
  ];

  return (
    <section aria-labelledby="services-heading" className="py-24 sm:py-32 lg:py-40">
      <Container>
        <div className="text-center">
          <Reveal>
            <Eyebrow badge={String(services.length)} className="justify-center">
              Services
            </Eyebrow>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 id="services-heading" className="mx-auto mt-5 max-w-[18ch] text-h2">
              Design for every way you show up.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <ButtonLink href="/services" variant="ghost" className="mt-8">
              All services
            </ButtonLink>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-3 sm:gap-4 lg:mt-20 lg:grid-cols-2">
          {groups.map((g, gi) => (
            <Reveal key={g.title} delay={gi * 0.08} className="rounded-[1.75rem] bg-card p-3 sm:p-4 lg:rounded-[2rem]">
              <h3 className="px-4 pt-3 pb-4 text-h3">{g.title}</h3>
              <ul className="rounded-[1.25rem] bg-ink/60 p-2">
                {g.items.map((s) => (
                  <li key={s.slug}>
                    <Link
                      href={s.slug === "bezalel-prints" ? "/prints" : `/services#${s.slug}`}
                      className="group flex items-center justify-between gap-6 rounded-2xl px-4 py-4 transition-colors hover:bg-white/[0.06]"
                    >
                      <span>
                        <span className="block text-[1.05rem] font-medium tracking-[-0.02em]">{s.title}</span>
                        <span className="mt-1 line-clamp-1 block text-sm text-mute">{s.summary}</span>
                      </span>
                      <ArrowRightIcon className="size-4 shrink-0 text-mute transition-[color,transform] group-hover:translate-x-0.5 group-hover:text-purple-bright" />
                    </Link>
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

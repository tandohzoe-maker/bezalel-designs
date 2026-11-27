import { Container } from "@/components/ui/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/ui/Reveal";

/** 03 — Track record: verified numbers and the brands the studio has worked with. */
export function TrackRecord({
  stats,
  clients,
}: {
  stats: { value: string; label: string }[];
  clients: string[];
}) {
  return (
    <section aria-labelledby="record-heading" className="surface-light py-24 sm:py-32 lg:py-44">
      <Container>
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Reveal>
              <SectionLabel index="03" className="text-stone-dark">
                Track record
              </SectionLabel>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 id="record-heading" className="mt-10 max-w-[16ch] font-display text-d2">
                Trusted by brands, ministries and <em className="text-amethyst-dark">organisations</em>.
              </h2>
            </Reveal>
          </div>
        </div>

        <dl className="mt-16 grid border-t border-line-light sm:grid-cols-3 lg:mt-24">
          {stats.map((s, i) => (
            <Reveal
              key={s.label}
              delay={i * 0.08}
              className="flex flex-col-reverse gap-4 border-b border-line-light py-8 sm:border-b-0 sm:py-12 sm:[&:not(:first-child)]:border-l sm:[&:not(:first-child)]:border-line-light sm:[&:not(:first-child)]:pl-8"
            >
              <dt className="label text-stone-dark">{s.label}</dt>
              <dd className="font-display text-[clamp(3.5rem,2rem+5vw,7rem)] leading-none tabular-nums">{s.value}</dd>
            </Reveal>
          ))}
        </dl>

        <div className="mt-20 border-t border-line-light pt-10 lg:mt-28 lg:grid lg:grid-cols-12 lg:gap-10">
          <Reveal className="lg:col-span-3">
            <h3 className="label text-stone-dark">Brands we&rsquo;ve worked with</h3>
          </Reveal>
          <Reveal delay={0.05} className="mt-8 lg:col-span-9 lg:mt-0">
            <ul className="flex flex-wrap items-baseline gap-x-5 gap-y-3 font-display text-[clamp(1.5rem,1.1rem+1.4vw,2.5rem)] leading-snug">
              {clients.map((c, i) => (
                <li key={c} className="flex items-baseline gap-5">
                  <span className="text-ink/90">{c}</span>
                  {i < clients.length - 1 ? (
                    <span aria-hidden className="text-gilt">
                      ·
                    </span>
                  ) : null}
                </li>
              ))}
              <li className="text-stone-dark italic">and many more.</li>
            </ul>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

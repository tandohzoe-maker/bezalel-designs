import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/ui/Reveal";

/** Verified numbers and the brands the studio has worked with. */
export function TrackRecord({
  stats,
  clients,
}: {
  stats: { value: string; label: string }[];
  clients: string[];
}) {
  return (
    <section aria-labelledby="record-heading" className="py-16 sm:py-24">
      <Container>
        <Reveal className="rounded-[1.75rem] bg-card p-6 sm:p-10 lg:rounded-[2rem] lg:p-14">
          <Eyebrow>Track record</Eyebrow>
          <h2 id="record-heading" className="mt-4 max-w-[20ch] text-h2s">
            Trusted by brands, ministries and organisations.
          </h2>

          <dl className="mt-12 grid gap-3 sm:grid-cols-3">
            {stats.map((s) => (
              <div key={s.label} className="flex flex-col-reverse gap-2 rounded-[1.25rem] bg-ink/60 p-6">
                <dt className="font-mono text-[0.8rem] text-mute">{s.label}</dt>
                <dd className="text-[clamp(3rem,2rem+3.5vw,4.75rem)] leading-none font-semibold tracking-[-0.06em] tabular-nums">
                  {s.value}
                </dd>
              </div>
            ))}
          </dl>

          <h3 className="eyebrow mt-12">Brands we&rsquo;ve worked with</h3>
          <ul className="mt-4 flex flex-wrap gap-2">
            {clients.map((c) => (
              <li key={c} className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-[0.95rem] text-white/85">
                {c}
              </li>
            ))}
            <li className="px-2 py-2 text-[0.95rem] text-mute">and many more.</li>
          </ul>
        </Reveal>
      </Container>
    </section>
  );
}

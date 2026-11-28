import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { Contours } from "@/components/ui/Contours";

/** Homepage teaser for the upcoming Bezalel Design School. */
export function SchoolTeaser() {
  return (
    <section aria-labelledby="school-teaser" className="py-10 sm:py-16">
      <Container>
        <Reveal className="relative isolate grid gap-8 overflow-hidden rounded-[1.75rem] bg-[#1a0d33] p-7 sm:p-10 lg:grid-cols-12 lg:items-center lg:rounded-[2.5rem] lg:p-14">
          <Contours className="absolute inset-0 -z-10 h-full w-full text-purple-bright/[0.08]" />
          <div className="lg:col-span-8">
            <p className="inline-flex items-center gap-2 rounded-full bg-purple-bright px-3 py-1 text-xs font-semibold text-ink">
              <span aria-hidden className="size-1.5 animate-pulse rounded-full bg-ink" />
              Coming soon
            </p>
            <h2 id="school-teaser" className="mt-5 text-h2s">
              Bezalel Design School
            </h2>
            <p className="mt-4 max-w-xl text-lead text-white/80">
              Training the next generation of designers: to mentor, teach and help them express their designs in
              different spaces.
            </p>
          </div>
          <div className="lg:col-span-4 lg:justify-self-end">
            <ButtonLink href="/school" size="lg">
              Learn more
            </ButtonLink>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

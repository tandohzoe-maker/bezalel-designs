import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { ScrubText } from "@/components/ui/ScrubText";
import { ArrowUpRightIcon } from "@/components/icons";
import { cn } from "@/lib/cn";

const cardBase =
  "group relative flex h-full min-h-[15rem] flex-col overflow-hidden rounded-[1.75rem] p-6 transition-[transform,background-color] duration-500 ease-[var(--ease-atelier)] hover:-translate-y-1 sm:min-h-[17rem] sm:p-7 lg:rounded-[2rem]";

function CardTitle({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("flex items-start justify-between gap-4", className)}>
      <h3 className="text-h3">{children}</h3>
      <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-white/10 transition-colors group-hover:bg-white group-hover:text-ink">
        <ArrowUpRightIcon className="size-4" />
      </span>
    </div>
  );
}

/** Statement headline + bento grid: the studio at a glance. */
export function Bento({ clients }: { clients: string[] }) {
  return (
    <section aria-labelledby="statement-heading" className="py-24 sm:py-32 lg:py-40">
      <Container>
        <ScrubText
          id="statement-heading"
          className="mx-auto max-w-[22ch] text-center text-h2 leading-[1.2] sm:leading-[1.12]"
          parts={[
            "One studio where ideas become ",
            { mark: "logos" },
            ", ",
            { mark: "flyers" },
            ", ",
            { mark: "brands" },
            " and ",
            { mark: "videos" },
            ".",
          ]}
        />

        <ul className="mt-16 grid gap-3 sm:grid-cols-2 sm:gap-4 lg:mt-24 lg:grid-cols-3">
          {/* Portfolio */}
          <Reveal as="li">
            <Link href="/portfolio" className={cn(cardBase, "bg-card hover:bg-card-2")}>
              <CardTitle>Portfolio</CardTitle>
              <div className="relative mt-6 flex flex-1 items-center justify-center rounded-[1.25rem] bg-ink/60 p-8">
                <Image
                  src="/portfolio/logos/glow-with-og.png"
                  alt="Glow With OG logo"
                  width={278}
                  height={388}
                  sizes="140px"
                  className="h-auto max-h-36 w-auto transition-transform duration-700 ease-[var(--ease-atelier)] group-hover:scale-105"
                />
              </div>
            </Link>
          </Reveal>

          {/* Services list */}
          <Reveal as="li" delay={0.06}>
            <Link href="/services" className={cn(cardBase, "bg-card hover:bg-card-2")}>
              <CardTitle>Services</CardTitle>
              <ul className="mt-6 divide-y divide-white/10 text-[0.95rem]">
                {["Logo & Brand Identity", "Flyer & Poster Design", "Church & Ministry Graphics", "Videography & Editing"].map(
                  (s) => (
                    <li key={s} className="flex items-center justify-between py-3">
                      <span className="text-white/85">{s}</span>
                      <span aria-hidden className="size-1.5 rounded-full bg-purple-bright" />
                    </li>
                  ),
                )}
              </ul>
            </Link>
          </Reveal>

          {/* Track record */}
          <Reveal as="li" delay={0.12}>
            <Link href="/about" className={cn(cardBase, "bg-purple-bright text-ink hover:bg-purple-soft")}>
              <div className="flex items-start justify-between gap-4">
                <h3 className="text-h3">Since 2019</h3>
                <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-ink/10 transition-colors group-hover:bg-ink group-hover:text-white">
                  <ArrowUpRightIcon className="size-4" />
                </span>
              </div>
              <div className="mt-auto pt-10">
                <p className="text-[clamp(3.5rem,2.5rem+4vw,5.5rem)] leading-none font-semibold tracking-[-0.06em]">400+</p>
                <p className="mt-3 inline-flex rounded-full border border-ink/25 px-3 py-1 text-sm font-medium">
                  flyer &amp; product designs
                </p>
              </div>
            </Link>
          </Reveal>

          {/* Brand identity */}
          <Reveal as="li">
            <Link href="/portfolio?category=branding-logo" className={cn(cardBase, "bg-card hover:bg-card-2")}>
              <CardTitle>Brand identity</CardTitle>
              <div className="mt-6 grid flex-1 grid-cols-2 gap-2">
                <div className="flex items-center justify-center rounded-[1rem] bg-ink/60 p-5">
                  <Image src="/portfolio/logos/pulchra.png" alt="Pulchra logo" width={306} height={352} sizes="100px" className="h-auto max-h-24 w-auto" />
                </div>
                <div className="flex items-center justify-center rounded-[1rem] bg-bone p-4">
                  <Image src="/portfolio/logos/code-clear.png" alt="Code Clear logo" width={348} height={256} sizes="110px" className="h-auto max-h-20 w-auto" />
                </div>
              </div>
            </Link>
          </Reveal>

          {/* Clients */}
          <Reveal as="li" delay={0.06}>
            <Link href="/about" className={cn(cardBase, "bg-card hover:bg-card-2")}>
              <CardTitle>Trusted by</CardTitle>
              <ul className="mt-6 flex flex-wrap gap-2">
                {clients.slice(0, 7).map((c) => (
                  <li key={c} className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-sm text-white/80">
                    {c}
                  </li>
                ))}
                <li className="rounded-full px-1 py-1.5 text-sm text-mute">+ more</li>
              </ul>
            </Link>
          </Reveal>

          {/* Start a project */}
          <Reveal as="li" delay={0.12}>
            <Link href="/start-a-project" className={cn(cardBase, "bg-[#1a0d33] hover:bg-[#21103f]")}>
              <CardTitle>Start a project</CardTitle>
              <div className="mt-auto pt-10">
                <p className="max-w-[18ch] text-lead text-white/80">
                  Share your idea, audience and timeline. We&rsquo;ll take it from there.
                </p>
                <span className="mt-5 inline-flex h-11 items-center rounded-full bg-purple-bright px-5 text-sm font-medium text-ink">
                  Let&rsquo;s create something
                </span>
              </div>
            </Link>
          </Reveal>
        </ul>
      </Container>
    </section>
  );
}

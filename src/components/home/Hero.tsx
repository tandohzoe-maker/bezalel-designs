import Image from "next/image";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Contours } from "@/components/ui/Contours";
import { Monogram, Signature } from "@/components/ui/Wordmark";
import { cn } from "@/lib/cn";

type Hanger = {
  left: string; // horizontal position of the string (md and up)
  lm?: string; // horizontal position on phones
  string: number; // string length in px (desktop)
  a: string; // swing amplitude
  t: string; // swing duration
  d: string; // delay
  size: string; // tile size classes
  tile: React.ReactNode;
  className?: string;
  mobile?: boolean;
};

function LogoTile({ src, w, h, bg, alt }: { src: string; w: number; h: number; bg: string; alt: string }) {
  return (
    <div className={cn("flex size-full items-center justify-center p-[18%]", bg)}>
      <Image src={src} alt={alt} width={w} height={h} sizes="120px" className="h-auto max-h-full w-auto max-w-full" />
    </div>
  );
}

const hangers: Hanger[] = [
  {
    left: "31%",
    lm: "15%",
    string: 70,
    a: "5deg",
    t: "5.2s",
    d: "-1.3s",
    size: "size-[5.5rem] sm:size-[7.25rem]",
    mobile: true,
    tile: (
      <LogoTile
        src="/portfolio/logos/glow-with-og.png"
        w={278}
        h={388}
        bg="bg-[#1b1b1e]"
        alt=""
      />
    ),
  },
  {
    left: "42%",
    lm: "38%",
    string: 150,
    a: "3.5deg",
    t: "6.1s",
    d: "-3s",
    size: "w-[6rem] h-[6.5rem] sm:w-[7.5rem] sm:h-[8rem]",
    mobile: true,
    tile: (
      <div className="flex size-full flex-col justify-between bg-white p-3 text-ink sm:p-4">
        <span className="font-mono text-[0.6rem] tracking-wide text-ink/60 uppercase sm:text-[0.65rem]">Designs</span>
        <span className="text-[1.6rem] leading-none font-semibold tracking-[-0.05em] sm:text-[2rem]">400+</span>
        <span className="inline-flex w-fit items-center gap-1 rounded-full bg-purple px-2 py-0.5 text-[0.6rem] font-semibold text-white sm:text-[0.65rem]">
          Since 2019
        </span>
      </div>
    ),
  },
  {
    left: "51%",
    lm: "61%",
    string: 40,
    a: "6deg",
    t: "4.6s",
    d: "-0.4s",
    size: "size-[4.5rem] sm:size-[6rem]",
    mobile: true,
    tile: (
      <div className="flex size-full items-center justify-center bg-purple-bright">
        <Monogram className="size-[55%] rounded-none bg-transparent text-[2.2rem] sm:text-[3rem]" />
      </div>
    ),
  },
  {
    left: "60%",
    lm: "85%",
    string: 120,
    a: "4deg",
    t: "5.6s",
    d: "-2.2s",
    size: "size-[5.5rem] sm:size-[7.5rem]",
    mobile: true,
    tile: (
      <LogoTile
        src="/portfolio/logos/pulchra.png"
        w={306}
        h={352}
        bg="bg-[#0d0d0f]"
        alt=""
      />
    ),
  },
  {
    left: "71%",
    string: 60,
    a: "5deg",
    t: "6.4s",
    d: "-4.1s",
    size: "size-[6.75rem]",
    tile: (
      <LogoTile
        src="/portfolio/logos/code-clear.png"
        w={348}
        h={256}
        bg="bg-bone"
        alt=""
      />
    ),
  },
];

/** Homepage hero: black rounded card, contour lines, logos swaying on strings. */
export function Hero() {
  return (
    <section className="relative">
      <div className="relative isolate flex min-h-[100svh] flex-col overflow-hidden rounded-b-[2rem] bg-[#09060f] lg:rounded-b-[2.75rem]">
        <Contours className="absolute inset-0 -z-10 h-full w-full text-purple-bright/[0.11]" />
        <div aria-hidden className="absolute -top-1/3 left-1/2 -z-10 h-[80%] w-[90%] -translate-x-1/2 rounded-full bg-purple/20 blur-[140px]" />
        <div aria-hidden className="absolute inset-x-0 bottom-0 -z-10 h-1/2 bg-gradient-to-t from-black/60 to-transparent" />

        {/* Hanging tiles (decorative) */}
        <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-[22rem] sm:h-[25rem]">
          {hangers.map((h, i) => (
            <div
              key={i}
              className={cn(
                "absolute top-0 left-[var(--lm)] -translate-x-1/2 [--o:76px] [--s:0.6] sm:[--o:84px] sm:[--s:0.85] md:left-[var(--l)] md:[--o:0px] md:[--s:1]",
                h.mobile ? "" : "hidden md:block",
              )}
              style={{ "--l": h.left, "--lm": h.lm ?? h.left } as React.CSSProperties}
            >
              <div
                className="hang flex flex-col items-center"
                style={{ "--a": h.a, "--t": h.t, "--d": h.d } as React.CSSProperties}
              >
                <span className="block w-px bg-white/35" style={{ height: `calc(var(--o, 0px) + ${h.string}px * var(--s, 1))` }} />
                <span className="-mb-1.5 block size-3 rounded-full border border-white/50 bg-transparent" />
                <div
                  className={cn(
                    "overflow-hidden rounded-[28%] shadow-[0_24px_50px_-12px_rgba(0,0,0,0.85)] ring-1 ring-white/10",
                    h.size,
                  )}
                >
                  {h.tile}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Copy */}
        <div className="relative mx-auto flex w-full max-w-[1440px] flex-1 flex-col items-center justify-end px-5 pt-[24rem] pb-16 text-center sm:px-8 sm:pt-[27rem] sm:pb-20 lg:pb-24">
          <Reveal trigger="load" delay={0.05}>
            <h1 className="mx-auto max-w-[18ch] text-hero">Ideas deserve beautiful execution.</h1>
          </Reveal>
          <Reveal trigger="load" delay={0.15}>
            <p className="mx-auto mt-6 max-w-xl text-lead text-white/70">
              Welcome to Bezalel Designs, where creativity meets purpose. We transform ideas, concepts and visions into
              compelling visual experiences.
            </p>
          </Reveal>
          <Reveal trigger="load" delay={0.25} className="mt-10 flex flex-col items-center gap-3 sm:flex-row">
            <ButtonLink href="/portfolio" size="lg">
              Explore Our Work
            </ButtonLink>
            <ButtonLink href="/start-a-project" variant="ghost" size="lg">
              Start a Project
            </ButtonLink>
          </Reveal>
          <Reveal trigger="load" delay={0.45} className="mt-12">
            <Signature />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

import Image from "next/image";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Contours } from "@/components/ui/Contours";
import { Monogram, Signature } from "@/components/ui/Wordmark";
import { cn } from "@/lib/cn";
import { HangTile } from "@/components/home/HangTile";

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

function LogoTile({
  src,
  w,
  h,
  bg,
  alt,
  style,
}: {
  src: string;
  w: number;
  h: number;
  bg: string;
  alt: string;
  style?: React.CSSProperties;
}) {
  return (
    <div className={cn("flex size-full items-center justify-center p-[16%]", bg)} style={style}>
      <Image src={src} alt={alt} width={w} height={h} sizes="120px" draggable={false} className="pointer-events-none h-auto max-h-full w-auto max-w-full" />
    </div>
  );
}

const logo = (src: string, w: number, h: number, bg: string, style?: React.CSSProperties) => (
  <LogoTile src={src} w={w} h={h} bg={bg} alt="" style={style} />
);

/**
 * Desktop (lg+): seven tiles across the top. Phones/tablets: four tiles
 * (mobile: true) at their `lm` positions.
 */
const hangers: Hanger[] = [
  {
    left: "22%",
    string: 80,
    a: "5deg",
    t: "5.2s",
    d: "-1.3s",
    size: "size-[6.75rem]",
    tile: logo("/portfolio/logos/glow-with-og.png", 278, 388, "bg-[#1b1b1e]"),
  },
  {
    left: "31%",
    lm: "15%",
    string: 150,
    a: "4deg",
    t: "5.8s",
    d: "-2.4s",
    size: "size-[5.5rem] sm:size-[7.25rem]",
    mobile: true,
    tile: logo("/portfolio/logos/threads-and-co.png", 743, 441, "", { backgroundColor: "#640000" }),
  },
  {
    left: "40.5%",
    lm: "38%",
    string: 100,
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
    left: "50%",
    lm: "61%",
    string: 85,
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
    left: "59.5%",
    string: 130,
    a: "4deg",
    t: "5.6s",
    d: "-2.2s",
    size: "size-[7rem]",
    tile: logo("/portfolio/logos/pulchra.png", 306, 352, "bg-[#0d0d0f]"),
  },
  {
    left: "69%",
    lm: "85%",
    string: 95,
    a: "5deg",
    t: "6.4s",
    d: "-4.1s",
    size: "size-[5.5rem] sm:size-[7rem]",
    mobile: true,
    tile: logo("/portfolio/logos/atarah.png", 519, 283, "", { backgroundColor: "#590100" }),
  },
  {
    left: "78%",
    string: 90,
    a: "5deg",
    t: "5.9s",
    d: "-1.7s",
    size: "size-[6.25rem]",
    tile: logo("/portfolio/logos/code-clear.png", 348, 256, "bg-bone"),
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
        <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 z-10 h-[22rem] sm:h-[25rem]">
          {hangers.map((h, i) => (
            <HangTile
              key={i}
              left={h.left}
              leftMobile={h.lm}
              string={h.string}
              a={h.a}
              t={h.t}
              d={h.d}
              sizeClass={h.size}
              showOnMobile={Boolean(h.mobile)}
            >
              {h.tile}
            </HangTile>
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
          <Reveal trigger="load" delay={0.45} className="mt-12 flex flex-col items-center gap-3">
            <Signature />
            <p className="font-mono text-[0.72rem] text-white/55">✦ Double-tap a hanging logo</p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

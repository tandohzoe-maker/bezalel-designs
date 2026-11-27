import { BrandIntroController } from "@/components/sections/BrandIntroController";

const LETTERS = "BEZALEL".split("");

/**
 * The homepage brand introduction.
 *
 * Rendered on the server but hidden (display:none) unless the pre-paint head
 * script has added `html.intro` — i.e. first homepage visit this session,
 * JavaScript on, and no reduced-motion preference. The whole sequence is CSS,
 * so it starts on first paint; the controller only handles skip and cleanup.
 *
 * Decorative: hidden from assistive tech (the hero's <h1> carries the content).
 */
export function BrandIntro() {
  return (
    <>
      <div
        id="brand-intro"
        aria-hidden="true"
        className="intro-overlay fixed inset-0 z-[70] cursor-pointer items-center justify-center bg-ink text-white"
      >
        <div className="intro-inner flex flex-col items-center px-6">
          <p className="flex overflow-hidden pb-[0.08em] text-[clamp(2.75rem,11vw,9rem)] leading-none font-extrabold tracking-[-0.02em] uppercase">
            {LETTERS.map((l, i) => (
              <span
                key={i}
                // Spacing between letters only — no trailing space, so the word
                // centres exactly over the gold rule.
                className={`intro-letter inline-block ${i < LETTERS.length - 1 ? "mr-[0.06em]" : ""}`}
                style={{ "--i": i } as React.CSSProperties}
              >
                {l}
              </span>
            ))}
          </p>
          <span className="intro-rule mt-5 block h-px w-full origin-center bg-purple-bright sm:mt-7" />
          <p className="intro-designs mt-5 pl-[0.62em] font-mono text-[clamp(0.65rem,1.4vw,0.95rem)] font-medium uppercase sm:mt-7">
            Designs
          </p>
          <p className="intro-sig label mt-10 text-gilt sm:mt-14">The Bezalel</p>
        </div>
      </div>
      <BrandIntroController />
    </>
  );
}

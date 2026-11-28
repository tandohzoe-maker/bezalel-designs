import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/ui/Reveal";
import { ArrowUpRightIcon, WhatsAppIcon } from "@/components/icons";
import { PrintQuote } from "@/components/prints/PrintQuote";
import { printsConfig, printsNumberFor } from "@/config/site";
import { formatPhoneForDisplay, whatsAppLink } from "@/lib/whatsapp";
import { cn } from "@/lib/cn";

export const metadata: Metadata = {
  title: "Bezalel Prints",
  description:
    "Bezalel Prints: shirt printing, banners, cards and frames. Prices depend on quantity — request a quote on WhatsApp.",
  alternates: { canonical: "/prints" },
};

function ProductIcon({ slug }: { slug: string }) {
  const common = { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.5, className: "size-7", "aria-hidden": true } as const;
  switch (slug) {
    case "shirts":
      return (
        <svg {...common}>
          <path d="M8 3 3 6l2 4 2-1v12h10V9l2 1 2-4-5-3a3 3 0 0 1-8 0Z" strokeLinejoin="round" />
        </svg>
      );
    case "banners":
      return (
        <svg {...common}>
          <rect x="6" y="3" width="12" height="15" rx="1" />
          <path d="M12 18v3M8 21h8M9 8h6M9 11h4" />
        </svg>
      );
    case "cards":
      return (
        <svg {...common}>
          <rect x="3" y="6" width="18" height="12" rx="2" />
          <path d="M7 10h6M7 13h4" />
        </svg>
      );
    default:
      return (
        <svg {...common}>
          <rect x="4" y="4" width="16" height="16" rx="1" />
          <rect x="7.5" y="7.5" width="9" height="9" />
        </svg>
      );
  }
}

export default function PrintsPage() {
  const printsLine = formatPhoneForDisplay(printsConfig.printsWhatsapp);
  const framesLine = formatPhoneForDisplay(printsConfig.framesWhatsapp);

  return (
    <>
      <PageHero
        eyebrow="Bezalel Prints"
        title="Printed with the same care."
        lead="Shirts, banners, cards and frames — designed and produced by Bezalel Designs."
      >
        <p className="mt-8 inline-flex rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-sm">
          Prices depend on quantity — get a quote on WhatsApp
        </p>
      </PageHero>

      {/* Products */}
      <section aria-labelledby="products-heading" className="py-16 lg:py-24">
        <Container>
          <h2 id="products-heading" className="sr-only">
            What we print
          </h2>
          <ul className="grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4">
            {printsConfig.products.map((p, i) => {
              const href = whatsAppLink(
                printsNumberFor(p),
                `Hello Bezalel Prints, I'd like a quote for ${p.title.toLowerCase()}. Quantity: `,
              );
              const frames = p.line === "frames";
              return (
                <Reveal as="li" key={p.slug} id={p.slug} delay={i * 0.06} className="scroll-mt-28">
                  <div
                    className={cn(
                      "group relative flex h-full flex-col rounded-[1.75rem] p-6 transition-[transform,background-color] duration-500 hover:-translate-y-1 sm:p-7 lg:rounded-[2rem]",
                      frames ? "bg-[#1a0d33] hover:bg-[#21103f]" : "bg-card hover:bg-card-2",
                    )}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <ProductIcon slug={p.slug} />
                      <span aria-hidden className="flex size-9 items-center justify-center rounded-full bg-white/10 transition-colors group-hover:bg-white group-hover:text-ink">
                        <ArrowUpRightIcon className="size-4" />
                      </span>
                    </div>
                    <h3 className="mt-10 text-h3">
                      {href ? (
                        <a
                          href={href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="after:absolute after:inset-0 after:rounded-[inherit] after:content-['']"
                        >
                          {p.title}
                          <span className="sr-only"> — get a quote on WhatsApp (opens in a new tab)</span>
                        </a>
                      ) : (
                        p.title
                      )}
                    </h3>
                    <p className="mt-3 leading-relaxed text-mute">{p.text}</p>
                    <ul className="mt-5 flex flex-wrap gap-1.5">
                      {p.examples.map((e) => (
                        <li key={e} className="rounded-full border border-white/10 px-3 py-1 text-xs text-white/80">
                          {e}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-auto pt-8">
                      <p className="font-mono text-[0.75rem] text-mute">Priced by quantity</p>
                      <p className="mt-1 flex items-center gap-2 text-sm font-medium">
                        <WhatsAppIcon className="size-4 text-[#25D366]" />
                        {formatPhoneForDisplay(printsNumberFor(p))}
                      </p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </ul>
        </Container>
      </section>

      {/* Quote */}
      <section aria-labelledby="print-quote-heading" className="pb-10 lg:pb-16">
        <Container>
          <div className="grid gap-3 sm:gap-4 lg:grid-cols-12">
            <Reveal className="rounded-[1.75rem] bg-card p-7 sm:p-10 lg:col-span-5 lg:rounded-[2rem]">
              <Eyebrow>Get a quote</Eyebrow>
              <h2 id="print-quote-heading" className="mt-4 text-h2s">
                Tell us what and how many.
              </h2>
              <p className="mt-5 leading-relaxed text-mute">
                Printing prices depend on the quantity and the specification, so every order is quoted. Choose a product,
                enter the quantity and WhatsApp opens with your request ready to send.
              </p>
              <dl className="mt-8 space-y-3 text-sm">
                <div className="flex flex-wrap justify-between gap-2 rounded-2xl bg-ink/60 px-4 py-3">
                  <dt className="text-mute">Shirts, banners &amp; cards</dt>
                  <dd className="font-medium">{printsLine}</dd>
                </div>
                <div className="flex flex-wrap justify-between gap-2 rounded-2xl bg-ink/60 px-4 py-3">
                  <dt className="text-mute">Frames</dt>
                  <dd className="font-medium">{framesLine}</dd>
                </div>
              </dl>
            </Reveal>
            <Reveal delay={0.06} className="rounded-[1.75rem] bg-card p-7 sm:p-10 lg:col-span-7 lg:rounded-[2rem]">
              <PrintQuote />
            </Reveal>
          </div>
        </Container>
      </section>
    </>
  );
}

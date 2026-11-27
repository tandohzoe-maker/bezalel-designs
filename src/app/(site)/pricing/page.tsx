import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/layout/PageHero";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/ui/Reveal";
import { ScrubText } from "@/components/ui/ScrubText";
import { ButtonLink, buttonClasses } from "@/components/ui/Button";
import { Signature } from "@/components/ui/Wordmark";
import {
  brandStatement,
  customQuoteMessage,
  priceList,
  pricingIntro,
  terms,
  type PriceItem,
} from "@/config/pricing";
import { serviceCategories } from "@/config/services";
import { contactDetails } from "@/config/site";
import { whatsAppLink } from "@/lib/whatsapp";
import { cn } from "@/lib/cn";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Prices in Ghana Cedis for brand consultation (GH₵200), logo & brand identity (GH₵400), e-flyers (from GH₵120), video editing (GH₵200), videography (GH₵500) and website design (GH₵3,000).",
  alternates: { canonical: "/pricing" },
};

function Check({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" aria-hidden className={cn("mt-0.5 size-4 shrink-0", className)} fill="currentColor">
      <path d="M10 1.7a8.3 8.3 0 1 0 0 16.6 8.3 8.3 0 0 0 0-16.6Zm3.9 6.2-4.6 4.7a.7.7 0 0 1-1 0l-2.3-2.3a.7.7 0 1 1 1-1l1.8 1.8 4.1-4.2a.7.7 0 0 1 1 1Z" />
    </svg>
  );
}

function PriceCard({ item, wide }: { item: PriceItem; wide?: boolean }) {
  const light = item.featured; // bright purple card, dark text
  const muted = light ? "text-ink/70" : "text-mute";
  const href = `/start-a-project?service=${item.service}&package=${item.slug}`;

  return (
    <div
      id={item.slug}
      className={cn(
        "flex h-full scroll-mt-28 flex-col rounded-[1.75rem] p-7 sm:p-8 lg:rounded-[2rem]",
        light ? "bg-purple-bright text-ink" : wide ? "bg-[#1a0d33]" : "bg-card",
        wide && "lg:grid lg:grid-cols-12 lg:gap-10 lg:p-12",
      )}
    >
      <div className={cn(wide && "lg:col-span-5")}>
        <div className="flex items-start justify-between gap-4">
          <h3 className="text-[1.35rem] font-medium tracking-[-0.03em]">{item.title}</h3>
          {light ? (
            <span className="shrink-0 rounded-full bg-ink px-2.5 py-1 text-[0.7rem] font-semibold text-purple-bright">
              Brand package
            </span>
          ) : null}
        </div>
        <p className={cn("mt-1 font-mono text-[0.8rem]", muted)}>{item.unit}</p>
        <p className="mt-8 flex items-start gap-1 leading-none">
          <span className="mt-2 text-xl font-medium">GH₵</span>
          <span className="text-[clamp(3rem,2.4rem+2.4vw,4.25rem)] font-semibold tracking-[-0.05em] tabular-nums">
            {item.price.toLocaleString("en-GH")}
          </span>
        </p>
        <p className={cn("mt-6 leading-relaxed", light ? "text-ink/80" : "text-white/80")}>{item.summary}</p>
        {wide ? (
          <Link href={href} className={buttonClasses({ size: "lg", className: "mt-8 hidden w-full lg:inline-flex" })}>
            Request this service
          </Link>
        ) : null}
      </div>

      <div className={cn("mt-8 flex flex-1 flex-col", wide && "lg:col-span-7 lg:mt-0")}>
        <p className={cn("text-sm font-medium", light ? "text-ink" : "text-white")}>What&rsquo;s included</p>
        <ul className={cn("mt-3 divide-y", light ? "divide-ink/15" : "divide-white/10", wide && "lg:grid lg:grid-cols-2 lg:gap-x-8 lg:divide-y-0")}>
          {item.includes.map((line) => (
            <li key={line} className={cn("flex gap-2.5 py-2.5 text-[0.95rem]", wide && "lg:border-b lg:border-white/10")}>
              <Check className={light ? "text-ink" : "text-purple-bright"} />
              <span>{line}</span>
            </li>
          ))}
        </ul>

        {item.extra || item.note || item.notIncluded ? (
          <div className={cn("mt-5 space-y-2 text-sm leading-relaxed", muted)}>
            {item.extra ? <p className={light ? "font-medium text-ink" : "font-medium text-white/90"}>{item.extra}</p> : null}
            {item.notIncluded ? (
              <p>
                <span className={light ? "font-medium text-ink" : "font-medium text-white/90"}>Not included: </span>
                {item.notIncluded}
              </p>
            ) : null}
            {item.note ? (
              <p>
                <span className={light ? "font-medium text-ink" : "font-medium text-white/90"}>Note: </span>
                {item.note}
              </p>
            ) : null}
          </div>
        ) : null}

        <div className="mt-auto pt-8">
          <Link
            href={href}
            className={cn(
              buttonClasses({ variant: light ? "light" : "ghost", className: "w-full" }),
              light && "bg-ink text-white hover:bg-ink/85",
              wide && "lg:hidden",
            )}
          >
            Request this service
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function PricingPage() {
  const [main, website] = [priceList.filter((p) => p.slug !== "website"), priceList.find((p) => p.slug === "website")];
  const pricedServices = new Set(priceList.map((p) => p.service));
  const quoteOnly = serviceCategories.filter((s) => !pricedServices.has(s.slug));
  const wa = whatsAppLink(contactDetails.whatsapp, "Hello Bezalel Designs, I'd like a quotation for a project.");

  return (
    <>
      <PageHero eyebrow="Pricing" title="Clear pricing, considered work." lead={pricingIntro.lead}>
        <p className="mt-8 inline-flex rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 font-mono text-[0.75rem] text-white/80">
          {pricingIntro.kicker}
        </p>
      </PageHero>

      {/* Price list */}
      <section aria-labelledby="prices-heading" className="py-16 lg:py-24">
        <Container>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <Eyebrow>All prices in Ghana Cedis</Eyebrow>
              <h2 id="prices-heading" className="mt-4 text-h2s">
                Services &amp; prices
              </h2>
            </div>
            <p className="max-w-sm text-sm text-mute">
              A 70% deposit starts your project. See the terms below.
            </p>
          </div>

          <ul className="mt-10 grid gap-3 sm:gap-4 md:grid-cols-2 xl:grid-cols-3">
            {main.map((item, i) => (
              <Reveal as="li" key={item.slug} delay={(i % 3) * 0.06}>
                <PriceCard item={item} />
              </Reveal>
            ))}
            {website ? (
              <Reveal as="li" className="md:col-span-2 xl:col-span-3">
                <PriceCard item={website} wide />
              </Reveal>
            ) : null}
          </ul>
        </Container>
      </section>

      {/* Custom quotations */}
      <section aria-labelledby="quote-heading" className="pb-16 lg:pb-24">
        <Container>
          <Reveal className="grid gap-8 rounded-[1.75rem] bg-card p-7 sm:p-10 lg:grid-cols-12 lg:rounded-[2rem] lg:p-12">
            <div className="lg:col-span-6">
              <Eyebrow>Custom projects</Eyebrow>
              <h2 id="quote-heading" className="mt-4 text-h2s">
                Need something else?
              </h2>
              <p className="mt-5 text-lead text-white/80">{customQuoteMessage}</p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <ButtonLink href="/start-a-project?service=custom-projects">Request a quotation</ButtonLink>
                {wa ? (
                  <ButtonLink href={wa} external variant="ghost">
                    Ask on WhatsApp
                  </ButtonLink>
                ) : null}
              </div>
            </div>
            <div className="lg:col-span-5 lg:col-start-8">
              <p className="text-sm font-medium">Quoted per project</p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {quoteOnly.map((s) => (
                  <li key={s.slug}>
                    <Link
                      href={`/start-a-project?service=${s.slug}`}
                      className="inline-flex rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-white/85 transition-colors hover:border-purple-bright/50 hover:text-white"
                    >
                      {s.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Terms */}
      <section aria-labelledby="terms-heading" className="pb-16 lg:pb-24">
        <Container>
          <Reveal>
            <Eyebrow>Business terms &amp; conditions</Eyebrow>
            <h2 id="terms-heading" className="mt-4 max-w-[22ch] text-h2s">
              How we work together.
            </h2>
            <p className="mt-4 max-w-xl text-mute">
              To ensure a smooth working relationship, the following apply to all projects.
            </p>
          </Reveal>
          <dl className="mt-10 grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
            {terms.map((t, i) => (
              <Reveal key={t.title} delay={(i % 3) * 0.05} className="rounded-[1.5rem] bg-card p-6 sm:p-7">
                <dt className="flex items-center gap-3 font-medium">
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-white/10 font-mono text-xs">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {t.title}
                </dt>
                <dd className="mt-3 text-[0.95rem] leading-relaxed text-mute">{t.text}</dd>
              </Reveal>
            ))}
          </dl>
        </Container>
      </section>

      {/* Brand statement */}
      <section aria-labelledby="statement-heading-pricing" className="pb-10 lg:pb-16">
        <Container className="text-center">
          <Eyebrow className="justify-center">Bezalel Designs</Eyebrow>
          <ScrubText
            id="statement-heading-pricing"
            className="mx-auto mt-6 max-w-[18ch] text-h2 leading-[1.12]"
            parts={[{ mark: "Ideas." }, " ", { mark: "Identity." }, " ", { mark: "Impact." }]}
          />
          <Reveal>
            <p className="mx-auto mt-8 max-w-2xl text-lead text-white/80">{brandStatement.body}</p>
            <p className="mt-6 font-medium text-purple-bright">{brandStatement.closing}</p>
            <Signature className="mt-8" />
          </Reveal>
        </Container>
      </section>
    </>
  );
}

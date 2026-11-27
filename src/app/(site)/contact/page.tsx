import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/layout/PageHero";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/ui/Reveal";
import { ArrowUpRightIcon, InstagramIcon, MailIcon, TelegramIcon, WhatsAppIcon } from "@/components/icons";
import { QuickMessage } from "@/components/contact/QuickMessage";
import { CopyButton } from "@/components/contact/CopyButton";
import { contactDetails, socialLinks } from "@/config/site";
import { formatPhoneForDisplay, telLink, whatsAppLink } from "@/lib/whatsapp";
import { cn } from "@/lib/cn";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact Bezalel Designs on WhatsApp, by phone, by email or on Instagram.",
  alternates: { canonical: "/contact" },
};

const card =
  "group relative flex min-h-[13rem] flex-col rounded-[1.75rem] p-6 transition-[transform,background-color] duration-500 ease-[var(--ease-atelier)] hover:-translate-y-1 sm:p-7 lg:rounded-[2rem]";

/** Makes the whole card clickable while keeping inner buttons usable. */
const stretched = "after:absolute after:inset-0 after:rounded-[inherit] after:content-['']";

function Arrow({ dark }: { dark?: boolean }) {
  return (
    <span
      aria-hidden
      className={cn(
        "flex size-9 shrink-0 items-center justify-center rounded-full transition-colors",
        dark ? "bg-ink/10 group-hover:bg-ink group-hover:text-white" : "bg-white/10 group-hover:bg-white group-hover:text-ink",
      )}
    >
      <ArrowUpRightIcon className="size-4" />
    </span>
  );
}

/** "@handle" from a profile URL, e.g. instagram.com/thebezal.el → @thebezal.el */
function handleFrom(url: string, host: RegExp, fallback: string) {
  const m = url.match(new RegExp(`${host.source}\\/([^/?#]+)`, "i"));
  return m ? `@${m[1]}` : fallback;
}

export default function ContactPage() {
  const c = contactDetails;
  const wa = whatsAppLink(c.whatsapp, "Hello Bezalel Designs, I'd like to talk about a project.");
  const phone = formatPhoneForDisplay(c.phone);
  const tel = telLink(c.phone);
  const ig = socialLinks.instagram;
  const tg = socialLinks.telegram;

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Say hello."
        lead="The quickest way to reach us is WhatsApp. For detailed briefs, use the project enquiry form."
      >
        {contactDetails.responseTime ? (
          <p className="mt-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-sm">
            <span aria-hidden className="size-2 rounded-full bg-success" />
            {contactDetails.responseTime}
          </p>
        ) : null}
      </PageHero>

      <section aria-labelledby="ways-heading" className="py-16 lg:py-24">
        <Container>
          <h2 id="ways-heading" className="sr-only">
            Ways to reach Bezalel Designs
          </h2>
          <ul className="grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
            {wa ? (
              <Reveal as="li" className="sm:col-span-2 lg:col-span-1 lg:row-span-2">
                <div className={cn(card, "h-full bg-purple-bright text-ink hover:bg-purple-soft")}>
                  <div className="flex items-start justify-between gap-4">
                    <WhatsAppIcon className="size-8" />
                    <Arrow dark />
                  </div>
                  <div className="mt-auto pt-12">
                    <p className="font-mono text-[0.8rem] text-ink/70">Fastest way to reach us</p>
                    <h3 className="mt-2 text-h3">
                      <a href={wa} target="_blank" rel="noopener noreferrer" className={stretched}>
                        Chat on WhatsApp<span className="sr-only"> (opens in a new tab)</span>
                      </a>
                    </h3>
                    {phone ? <p className="mt-2 text-lead font-medium">{phone}</p> : null}
                    {c.responseTime ? <p className="mt-1 text-sm text-ink/70">{c.responseTime}</p> : null}
                  </div>
                </div>
              </Reveal>
            ) : null}

            {phone && tel ? (
              <Reveal as="li" delay={0.06}>
                <div className={cn(card, "bg-card hover:bg-card-2")}>
                  <div className="flex items-start justify-between gap-4">
                    <svg viewBox="0 0 24 24" aria-hidden className="size-7" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2" />
                    </svg>
                    <Arrow />
                  </div>
                  <div className="mt-auto pt-10">
                    <p className="font-mono text-[0.8rem] text-mute">Call</p>
                    <h3 className="mt-2 text-h3">
                      <a href={tel} className={stretched}>
                        {phone}
                      </a>
                    </h3>
                  </div>
                </div>
              </Reveal>
            ) : null}

            {c.email ? (
              <Reveal as="li" delay={0.12}>
                <div className={cn(card, "bg-card hover:bg-card-2")}>
                  <div className="flex items-start justify-between gap-4">
                    <MailIcon className="size-7" />
                    <CopyButton value={c.email} label="email" />
                  </div>
                  <div className="mt-auto pt-10">
                    <p className="font-mono text-[0.8rem] text-mute">Email</p>
                    <h3 className="mt-2 text-[clamp(1.15rem,0.95rem+0.8vw,1.6rem)] font-medium tracking-[-0.03em] break-all">
                      <a href={`mailto:${c.email}?subject=${encodeURIComponent("Project enquiry")}`} className={stretched}>
                        {c.email}
                      </a>
                    </h3>
                  </div>
                </div>
              </Reveal>
            ) : null}

            {/^https:\/\//.test(ig) ? (
              <Reveal as="li">
                <div className={cn(card, "bg-card hover:bg-card-2")}>
                  <div className="flex items-start justify-between gap-4">
                    <InstagramIcon className="size-7" />
                    <Arrow />
                  </div>
                  <div className="mt-auto pt-10">
                    <p className="font-mono text-[0.8rem] text-mute">See new work first</p>
                    <h3 className="mt-2 text-h3">
                      <a href={ig} target="_blank" rel="noopener noreferrer" className={stretched}>
                        {handleFrom(ig, /instagram\.com/, "Instagram")}
                        <span className="sr-only"> on Instagram (opens in a new tab)</span>
                      </a>
                    </h3>
                  </div>
                </div>
              </Reveal>
            ) : null}

            {/^https:\/\//.test(tg) ? (
              <Reveal as="li" delay={0.06}>
                <div className={cn(card, "bg-card hover:bg-card-2")}>
                  <div className="flex items-start justify-between gap-4">
                    <TelegramIcon className="size-7" />
                    <Arrow />
                  </div>
                  <div className="mt-auto pt-10">
                    <p className="font-mono text-[0.8rem] text-mute">Message us on Telegram</p>
                    <h3 className="mt-2 text-h3">
                      <a href={tg} target="_blank" rel="noopener noreferrer" className={stretched}>
                        {handleFrom(tg, /t\.me/, "Telegram")}
                        <span className="sr-only"> on Telegram (opens in a new tab)</span>
                      </a>
                    </h3>
                  </div>
                </div>
              </Reveal>
            ) : null}

            <Reveal as="li" delay={0.06} className="sm:col-span-2 lg:col-span-3">
              <div className={cn(card, "min-h-[10rem] bg-[#1a0d33] hover:bg-[#21103f]")}>
                <div className="flex items-start justify-between gap-4">
                  <span className="rounded-full bg-white/10 px-3 py-1 font-mono text-[0.75rem]">Detailed brief</span>
                  <Arrow />
                </div>
                <div className="mt-auto pt-10">
                  <p className="text-sm text-white/70">Budget, timeline, references and files</p>
                  <h3 className="mt-2 text-h3">
                    <Link href="/start-a-project" className={stretched}>
                      Start a Project
                    </Link>
                  </h3>
                </div>
              </div>
            </Reveal>
          </ul>
        </Container>
      </section>

      <section aria-labelledby="quick-heading" className="pb-10 lg:pb-16">
        <Container>
          <div className="grid gap-3 sm:gap-4 lg:grid-cols-12">
            <Reveal className="rounded-[1.75rem] bg-card p-7 sm:p-10 lg:col-span-5 lg:rounded-[2rem]">
              <Eyebrow>Quick message</Eyebrow>
              <h2 id="quick-heading" className="mt-4 text-h2s">
                Write it here, send it your way.
              </h2>
              <p className="mt-5 leading-relaxed text-mute">
                Type a short note and choose WhatsApp or email. Your app opens with the message ready, so you can send
                it from your own account and we can reply to you directly.
              </p>
            </Reveal>
            <Reveal delay={0.06} className="rounded-[1.75rem] bg-card p-7 sm:p-10 lg:col-span-7 lg:rounded-[2rem]">
              <QuickMessage whatsapp={c.whatsapp} email={c.email} />
            </Reveal>
          </div>
        </Container>
      </section>
    </>
  );
}

import Link from "next/link";
import { mainNav, primaryCta, siteConfig, type ContactDetails, type SocialLinks as Links } from "@/config/site";
import { serviceCategories } from "@/config/services";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { Signature, Wordmark } from "@/components/ui/Wordmark";
import { SocialLinks, activeSocials } from "@/components/layout/SocialLinks";
import { formatPhoneForDisplay, telLink, whatsAppLink } from "@/lib/whatsapp";
import { BackToTop } from "@/components/layout/BackToTop";
import { Reveal } from "@/components/ui/Reveal";
import { Contours } from "@/components/ui/Contours";

export function Footer({ contact, social }: { contact: ContactDetails; social: Links }) {
  const wa = whatsAppLink(contact.whatsapp, "Hello Bezalel Designs, I'd like to talk about a project.");
  const phone = formatPhoneForDisplay(contact.phone);
  const tel = telLink(contact.phone);
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-ink pt-10 text-white lg:pt-16">
      {/* Closing call to action */}
      <Container>
        <Reveal className="relative isolate overflow-hidden rounded-[2rem] bg-card px-6 py-20 text-center sm:px-12 lg:rounded-[2.5rem] lg:py-28">
          <Contours className="absolute inset-0 -z-10 h-full w-full text-purple-bright/[0.09]" />
          <div
            aria-hidden
            className="absolute inset-x-0 -bottom-1/2 -z-10 mx-auto h-[120%] w-[80%] rounded-full bg-purple/25 blur-[120px]"
          />
          <h2 className="mx-auto max-w-[16ch] text-h2">
            Your next idea deserves <span className="text-purple-bright">beautiful execution.</span>
          </h2>
          <p className="mx-auto mt-5 max-w-md text-lead text-mute">
            Tell us what you&rsquo;re creating. We&rsquo;ll take it from brief to final files.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <ButtonLink href={primaryCta.href} size="lg">
              {primaryCta.label}
            </ButtonLink>
            {wa ? (
              <ButtonLink href={wa} external variant="ghost" size="lg">
                Chat on WhatsApp
              </ButtonLink>
            ) : null}
          </div>
        </Reveal>
      </Container>

      {/* Columns */}
      <Container className="pt-20 pb-10 lg:pt-28">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-12">
          <div className="flex flex-col gap-5 lg:col-span-4">
            <Wordmark />
            <p className="max-w-xs text-sm leading-relaxed text-mute">{siteConfig.tagline}</p>
            {activeSocials(social).length ? <SocialLinks links={social} /> : null}
          </div>

          <nav aria-label="Footer" className="lg:col-span-2">
            <p className="eyebrow mb-4">Studio</p>
            <ul className="flex flex-col gap-2.5 text-[0.95rem]">
              {mainNav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-white/85 transition-colors hover:text-purple-bright">
                    {item.label}
                    {item.badge ? <span className="ml-2 text-xs text-purple-bright">{item.badge}</span> : null}
                  </Link>
                </li>
              ))}
              <li>
                <Link href={primaryCta.href} className="text-white/85 transition-colors hover:text-purple-bright">
                  {primaryCta.label}
                </Link>
              </li>
            </ul>
          </nav>

          <div className="lg:col-span-3">
            <p className="eyebrow mb-4">Services</p>
            <ul className="flex flex-col gap-2.5 text-[0.95rem]">
              {serviceCategories.map((s) => (
                <li key={s.slug}>
                  <Link href={s.slug === "bezalel-prints" ? "/prints" : `/services#${s.slug}`} className="text-white/85 transition-colors hover:text-purple-bright">
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <p className="eyebrow mb-4">Contact</p>
            <ul className="flex flex-col gap-2.5 text-[0.95rem]">
              {contact.email ? (
                <li>
                  <a href={`mailto:${contact.email}`} className="break-all text-white/85 hover:text-purple-bright">
                    {contact.email}
                  </a>
                </li>
              ) : null}
              {phone && tel ? (
                <li>
                  <a href={tel} className="text-white/85 hover:text-purple-bright">
                    {phone}
                  </a>
                </li>
              ) : null}
              {wa ? (
                <li>
                  <a href={wa} target="_blank" rel="noopener noreferrer" className="text-white/85 hover:text-purple-bright">
                    Chat on WhatsApp<span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </li>
              ) : null}
              {contact.location ? <li className="text-white/85">{contact.location}</li> : null}
              <li>
                <Link href="/contact" className="text-white/85 underline decoration-white/25 underline-offset-4 hover:text-purple-bright">
                  All contact options
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </Container>

      {/* Giant wordmark with a purple echo */}
      <div aria-hidden="true" className="relative mx-auto max-w-[1440px] overflow-hidden px-3 sm:px-6 lg:px-10">
        <div className="relative pb-[3%] font-extrabold leading-[0.8] tracking-[-0.045em] whitespace-nowrap select-none text-[clamp(3rem,15.5vw,14rem)]">
          <span className="absolute top-[0.07em] left-[0.045em] text-purple/45">BEZALEL LIVE</span>
          <span className="absolute top-[0.035em] left-[0.022em] text-purple">BEZALEL LIVE</span>
          <span className="relative text-white">
            BEZALEL <span className="text-purple-bright">LIVE</span>
          </span>
        </div>
      </div>

      <Container className="flex flex-col gap-5 border-t border-line py-7 text-[0.8rem] text-mute sm:flex-row sm:items-center sm:justify-between">
        <p className="font-mono">
          © {year} {siteConfig.name} · {siteConfig.siteName}
        </p>
        <div className="flex flex-wrap items-center gap-x-7 gap-y-3">
          <Reveal as="span">
            <Signature />
          </Reveal>
          <Link href="/privacy" className="hover:text-white">
            Privacy
          </Link>
          <BackToTop />
        </div>
      </Container>
    </footer>
  );
}

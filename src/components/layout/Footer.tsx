import Link from "next/link";
import { mainNav, primaryCta, siteConfig, type ContactDetails, type SocialLinks as Links } from "@/config/site";
import { serviceCategories } from "@/config/services";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { Signature, Wordmark } from "@/components/ui/Wordmark";
import { SocialLinks } from "@/components/layout/SocialLinks";
import { formatPhoneForDisplay, whatsAppLink } from "@/lib/whatsapp";
import { BackToTop } from "@/components/layout/BackToTop";
import { Reveal } from "@/components/ui/Reveal";

export function Footer({ contact, social }: { contact: ContactDetails; social: Links }) {
  const wa = whatsAppLink(contact.whatsapp, "Hello Bezalel Designs, I'd like to talk about a project.");
  const phone = formatPhoneForDisplay(contact.whatsapp);
  const year = new Date().getFullYear();

  return (
    <footer className="grain relative overflow-hidden border-t border-line-dark bg-ink text-white">
      {/* Closing statement */}
      <Container className="pt-24 pb-16 lg:pt-36 lg:pb-24">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <h2 className="font-display text-d2 lg:col-span-8">
            Let&rsquo;s create
            <br />
            something <em className="text-amethyst-light">remarkable</em>.
          </h2>
          <div className="flex flex-col gap-4 sm:flex-row lg:col-span-4 lg:justify-end">
            <ButtonLink href={primaryCta.href}>{primaryCta.label}</ButtonLink>
            {wa ? (
              <ButtonLink href={wa} external variant="outline">
                WhatsApp
              </ButtonLink>
            ) : null}
          </div>
        </div>
      </Container>

      <Container className="border-t border-line-dark py-14 lg:py-20">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-12">
          <div className="flex flex-col gap-6 lg:col-span-4">
            <Wordmark size="lg" />
            <p className="max-w-xs text-sm leading-relaxed text-stone-light">{siteConfig.tagline}</p>
            <SocialLinks links={social} />
          </div>

          <nav aria-label="Footer" className="lg:col-span-2">
            <p className="label mb-5 text-stone">Studio</p>
            <ul className="flex flex-col gap-3 text-sm">
              {mainNav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-white/80 transition-colors hover:text-white">
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href={primaryCta.href} className="text-white/80 transition-colors hover:text-white">
                  {primaryCta.label}
                </Link>
              </li>
            </ul>
          </nav>

          <div className="lg:col-span-3">
            <p className="label mb-5 text-stone">Services</p>
            <ul className="flex flex-col gap-3 text-sm">
              {serviceCategories.map((s) => (
                <li key={s.slug}>
                  <Link href={`/services#${s.slug}`} className="text-white/80 transition-colors hover:text-white">
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <p className="label mb-5 text-stone">Contact</p>
            <ul className="flex flex-col gap-3 text-sm">
              {contact.email ? (
                <li>
                  <a href={`mailto:${contact.email}`} className="break-all text-white/80 hover:text-white">
                    {contact.email}
                  </a>
                </li>
              ) : null}
              {wa && phone ? (
                <li>
                  <a href={wa} target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-white">
                    {phone} <span className="text-stone">· WhatsApp</span>
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </li>
              ) : null}
              {contact.location ? <li className="text-white/80">{contact.location}</li> : null}
              <li>
                <Link href="/contact" className="text-white/80 underline decoration-white/25 underline-offset-4 hover:text-white">
                  All contact options
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </Container>

      <Container className="flex flex-col gap-6 border-t border-line-dark py-8 text-xs text-stone sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {year} {siteConfig.name}. All rights reserved.
        </p>
        <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
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

import { Providers } from "@/components/layout/Providers";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { RevealObserver } from "@/components/layout/RevealObserver";
import { contactDetails, socialLinks } from "@/config/site";

/** Public-site chrome: skip link, header, footer, floating WhatsApp. */
export function SiteShell({ children }: { children: React.ReactNode }) {
  // Phase 1: these will be loaded from the `site_settings` table.
  const contact = contactDetails;
  const social = socialLinks;

  return (
    <Providers>
      <a
        href="#main"
        className="label fixed top-3 left-3 z-[60] -translate-y-20 bg-bone px-4 py-3 text-ink transition-transform focus:translate-y-0"
      >
        Skip to content
      </a>
      <Header contact={contact} />
      <main id="main" tabIndex={-1} className="outline-none">
        {children}
      </main>
      <Footer contact={contact} social={social} />
      <WhatsAppButton number={contact.whatsapp} />
      <RevealObserver />
    </Providers>
  );
}

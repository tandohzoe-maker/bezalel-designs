import { WhatsAppIcon } from "@/components/icons";
import { whatsAppLink } from "@/lib/whatsapp";

/**
 * Floating WhatsApp contact, present on every public page.
 * Renders nothing until a valid WhatsApp number is configured.
 */
export function WhatsAppButton({ number }: { number: string }) {
  const href = whatsAppLink(number, "Hello Bezalel Designs, I'd like to talk about a project.");
  if (!href) return null;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      data-testid="whatsapp-float"
      className="group fixed right-4 bottom-4 z-40 flex h-14 items-center gap-3 border border-white/10 bg-graphite/95 pr-5 pl-4 text-white shadow-[0_12px_40px_-12px_rgba(0,0,0,0.6)] backdrop-blur transition-colors duration-300 hover:border-white/30 sm:right-6 sm:bottom-6"
    >
      <WhatsAppIcon className="size-5 text-[#25D366]" />
      <span className="label hidden sm:inline">Chat with us</span>
      <span className="sr-only sm:hidden">Chat with Bezalel Designs on WhatsApp</span>
      <span className="sr-only"> (opens WhatsApp in a new tab)</span>
    </a>
  );
}

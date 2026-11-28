"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { mainNav, primaryCta, type ContactDetails } from "@/config/site";
import { Wordmark } from "@/components/ui/Wordmark";
import { buttonClasses } from "@/components/ui/Button";
import { cn } from "@/lib/cn";
import { whatsAppLink } from "@/lib/whatsapp";

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

const pill = "rounded-full border border-white/10 bg-[#141416]/90 backdrop-blur-xl";

/**
 * Floating pill header.
 * Desktop: links sit inside the logo pill at the top of the page and fold
 * into a "⋮" menu once the page scrolls. Mobile: logo + "⋮" + CTA pill.
 * The menu is a disclosure panel: Escape or a click outside closes it.
 */
export function Header({ contact }: { contact: ContactDetails }) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    const toggle = toggleRef.current;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggle?.focus();
      }
    };
    const onDown = (e: PointerEvent) => {
      const t = e.target as Node;
      if (!panelRef.current?.contains(t) && !toggle?.contains(t)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onDown);
    requestAnimationFrame(() => panelRef.current?.querySelector<HTMLElement>("a")?.focus());
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onDown);
    };
  }, [open]);

  const wa = whatsAppLink(contact.whatsapp, "Hello Bezalel Designs, I'd like to talk about a project.");
  const showInline = !scrolled; // desktop only (see lg: classes)

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50">
      <div className="mx-auto flex max-w-[1440px] items-start justify-between gap-3 px-3 pt-3 sm:px-6 sm:pt-4 lg:px-10">
        {/* Left pill: logo, links (desktop, top of page), menu toggle */}
        <div className="pointer-events-auto relative">
          <div className={cn(pill, "flex h-14 items-center gap-1 pr-2 pl-4")}>
            <Link href="/" className="mr-2 flex h-10 items-center">
              <Wordmark />
            </Link>

            <nav
              aria-label="Main"
              className={cn(
                "hidden overflow-hidden transition-[max-width,opacity] duration-500 ease-[var(--ease-atelier)] lg:block",
                showInline ? "max-w-[640px] opacity-100" : "pointer-events-none max-w-0 opacity-0",
              )}
              aria-hidden={!showInline || undefined}
            >
              <ul className="flex items-center">
                {mainNav.map((item) => {
                  const active = isActive(pathname, item.href);
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        tabIndex={showInline ? undefined : -1}
                        aria-current={active ? "page" : undefined}
                        className={cn(
                          "block rounded-full px-3.5 py-2 text-[0.95rem] whitespace-nowrap transition-colors",
                          active ? "bg-white/10 text-white" : "text-white/75 hover:text-white",
                        )}
                      >
                        {item.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>

            <button
              ref={toggleRef}
              type="button"
              aria-expanded={open}
              aria-controls="site-menu"
              onClick={() => setOpen((v) => !v)}
              className={cn(
                "flex size-10 items-center justify-center rounded-full text-white/80 transition-colors hover:bg-white/10 hover:text-white",
                showInline && "lg:hidden",
              )}
            >
              <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
              <svg viewBox="0 0 24 24" aria-hidden="true" className="size-5" fill="currentColor">
                {open ? (
                  <path d="M6.4 5 5 6.4 10.6 12 5 17.6 6.4 19l5.6-5.6 5.6 5.6 1.4-1.4-5.6-5.6L19 6.4 17.6 5 12 10.6z" />
                ) : (
                  <>
                    <circle cx="12" cy="5" r="1.8" />
                    <circle cx="12" cy="12" r="1.8" />
                    <circle cx="12" cy="19" r="1.8" />
                  </>
                )}
              </svg>
            </button>
          </div>

          {/* Menu panel */}
          <div
            id="site-menu"
            ref={panelRef}
            hidden={!open}
            className="absolute top-[calc(100%+0.5rem)] left-0 w-[min(22rem,calc(100vw-1.5rem))] origin-top-left rounded-[1.75rem] border border-white/10 bg-[#141416]/95 p-3 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8)] backdrop-blur-xl"
          >
            <nav aria-label="Menu">
              <ul>
                {mainNav.map((item) => {
                  const active = isActive(pathname, item.href);
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        aria-current={active ? "page" : undefined}
                        onClick={() => setOpen(false)}
                        className={cn(
                          "flex items-center justify-between rounded-2xl px-4 py-3 text-[1.35rem] font-medium tracking-[-0.03em] transition-colors",
                          active ? "bg-white/10 text-white" : "text-white/80 hover:bg-white/5 hover:text-white",
                        )}
                      >
                        {item.label}
                        {active ? <span className="size-1.5 rounded-full bg-purple-bright" aria-hidden /> : null}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
            <div className="mt-2 flex flex-col gap-2 border-t border-white/10 px-1 pt-3">
              <Link href={primaryCta.href} onClick={() => setOpen(false)} className={buttonClasses({ className: "w-full" })}>
                {primaryCta.label}
              </Link>
              {wa ? (
                <a
                  href={wa}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={buttonClasses({ variant: "ghost", className: "w-full" })}
                >
                  Chat on WhatsApp<span className="sr-only"> (opens in a new tab)</span>
                </a>
              ) : null}
            </div>
          </div>
        </div>

        {/* Right pill: WhatsApp + CTA */}
        <div className={cn(pill, "pointer-events-auto flex h-14 items-center gap-1 p-2")}>
          {wa ? (
            <a
              href={wa}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden rounded-full px-4 py-2 text-[0.95rem] text-white/80 transition-colors hover:text-white sm:block lg:hidden xl:block"
            >
              WhatsApp<span className="sr-only"> (opens in a new tab)</span>
            </a>
          ) : null}
          <Link href={primaryCta.href} className={buttonClasses({ variant: "light", size: "sm", className: "h-10 px-5" })}>
            <span className="sm:hidden">Start</span>
            <span className="hidden sm:inline">{primaryCta.label}</span>
          </Link>
        </div>
      </div>
    </header>
  );
}

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { mainNav, primaryCta, type ContactDetails } from "@/config/site";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { Wordmark } from "@/components/ui/Wordmark";
import { cn } from "@/lib/cn";
import { whatsAppLink } from "@/lib/whatsapp";

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Header({ contact }: { contact: ContactDetails }) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  // Solid header once the page has scrolled.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the menu whenever the route changes.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Menu open: lock scroll, trap focus, close on Escape, restore focus on close.
  useEffect(() => {
    if (!open) return;
    const toggle = toggleRef.current;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // DOM order: the toggle sits before the panel, so it is the first stop.
    const focusables = () =>
      ((toggle ? [toggle] : []) as HTMLElement[]).concat(
        Array.from(panelRef.current?.querySelectorAll<HTMLElement>("a[href], button:not([disabled])") ?? []),
      );

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        return;
      }
      if (e.key !== "Tab") return;
      const items = focusables();
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKey);
    requestAnimationFrame(() => focusables()[1]?.focus());

    return () => {
      document.body.style.overflow = prevOverflow;
      document.removeEventListener("keydown", onKey);
      toggle?.focus();
    };
  }, [open]);

  // Close if resized up to desktop while open.
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const onChange = () => mq.matches && setOpen(false);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const wa = whatsAppLink(contact.whatsapp, "Hello Bezalel Designs, I'd like to talk about a project.");

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-500 ease-[var(--ease-atelier)]",
        scrolled || open
          ? "border-b border-line-dark bg-ink/90 backdrop-blur-md"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <Container className="flex h-18 items-center justify-between gap-6 lg:h-20">
        <Link href="/" aria-label="Bezalel Designs — home" className="relative z-10 -my-2 py-2 text-white">
          <Wordmark />
        </Link>

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-9">
            {mainNav.map((item) => {
              const active = isActive(pathname, item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "label relative py-2 transition-colors duration-300",
                      active ? "text-white" : "text-stone-light hover:text-white",
                    )}
                  >
                    {item.label}
                    <span
                      aria-hidden
                      className={cn(
                        "absolute -bottom-0.5 left-0 h-px bg-amethyst-light transition-[width] duration-500 ease-[var(--ease-atelier)]",
                        active ? "w-full" : "w-0",
                      )}
                    />
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-4">
          <ButtonLink
            href={primaryCta.href}
            variant="outline"
            arrow={false}
            className="hidden h-11 px-5 sm:inline-flex"
          >
            {primaryCta.label}
          </ButtonLink>

          <button
            ref={toggleRef}
            type="button"
            className="relative z-10 -mr-2 flex size-11 items-center justify-center lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
            <span aria-hidden className="relative block h-3 w-7">
              <span
                className={cn(
                  "absolute left-0 h-px w-full bg-white transition-transform duration-500 ease-[var(--ease-atelier)]",
                  open ? "top-1.5 rotate-45" : "top-0",
                )}
              />
              <span
                className={cn(
                  "absolute left-0 h-px bg-white transition-all duration-500 ease-[var(--ease-atelier)]",
                  open ? "top-1.5 w-full -rotate-45" : "top-3 w-4",
                )}
              />
            </span>
          </button>
        </div>
      </Container>

      <AnimatePresence>
        {open ? (
          <motion.div
            id="mobile-menu"
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            className="fixed inset-0 top-18 flex h-[calc(100dvh-4.5rem)] flex-col overflow-y-auto bg-ink lg:hidden"
            initial={reduce ? { opacity: 1 } : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <Container className="flex flex-1 flex-col justify-between py-10">
              <nav aria-label="Mobile">
                <ul className="flex flex-col">
                  {mainNav.map((item, i) => {
                    const active = isActive(pathname, item.href);
                    return (
                      <motion.li
                        key={item.href}
                        className="hairline-b"
                        initial={reduce ? false : { opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.05 + i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                      >
                        <Link
                          href={item.href}
                          aria-current={active ? "page" : undefined}
                          className="flex items-baseline gap-5 py-4"
                        >
                          <span className="label w-6 text-stone tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                          <span
                            className={cn(
                              "font-display text-[2.4rem] leading-none sm:text-5xl",
                              active ? "text-white italic" : "text-white/80",
                            )}
                          >
                            {item.label}
                          </span>
                        </Link>
                      </motion.li>
                    );
                  })}
                </ul>
              </nav>

              <div className="mt-10 flex flex-col gap-6">
                <ButtonLink href={primaryCta.href} className="w-full">
                  {primaryCta.label}
                </ButtonLink>
                <div className="flex flex-col gap-2 text-sm text-stone-light">
                  {contact.email ? (
                    <a href={`mailto:${contact.email}`} className="hover:text-white">
                      {contact.email}
                    </a>
                  ) : null}
                  {wa ? (
                    <a href={wa} target="_blank" rel="noopener noreferrer" className="hover:text-white">
                      Chat on WhatsApp<span className="sr-only"> (opens in a new tab)</span>
                    </a>
                  ) : null}
                </div>
              </div>
            </Container>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}

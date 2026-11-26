/**
 * Static brand configuration.
 *
 * Contact details and social links are read from environment variables for now.
 * In Phase 1 they move into the `site_settings` table so they can be edited from
 * the admin dashboard; these values then act only as fallbacks.
 *
 * Any value left empty is simply not rendered — no dead links.
 */

export const siteConfig = {
  name: "Bezalel Designs",
  shortName: "Bezalel",
  tagline: "Creativity. Excellence. Every Detail Matters.",
  signature: "THE BEZALEL",
  description:
    "Bezalel Designs is a creative design studio in Ghana crafting graphic design, brand identities, church and ministry graphics, event branding and promotional video — where every detail matters.",
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/$/, ""),
  locale: "en_GH",
} as const;

export type ContactDetails = {
  whatsapp: string;
  email: string;
  location: string;
};

export type SocialLinks = {
  instagram: string;
  facebook: string;
  tiktok: string;
  linkedin: string;
};

export const contactDetails: ContactDetails = {
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "",
  email: process.env.NEXT_PUBLIC_BUSINESS_EMAIL ?? "",
  location: process.env.NEXT_PUBLIC_BUSINESS_LOCATION ?? "",
};

export const socialLinks: SocialLinks = {
  instagram: process.env.NEXT_PUBLIC_INSTAGRAM_URL ?? "",
  facebook: process.env.NEXT_PUBLIC_FACEBOOK_URL ?? "",
  tiktok: process.env.NEXT_PUBLIC_TIKTOK_URL ?? "",
  linkedin: process.env.NEXT_PUBLIC_LINKEDIN_URL ?? "",
};

export type NavItem = { label: string; href: string };

export const mainNav: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Services", href: "/services" },
  { label: "Pricing", href: "/pricing" },
  { label: "Contact", href: "/contact" },
];

export const primaryCta: NavItem = { label: "Start a Project", href: "/start-a-project" };

/**
 * The nine service categories. This list is the seed for the `services` table
 * (Phase 1); after that, services are managed from the admin dashboard.
 */
export const serviceCategories = [
  { slug: "graphic-design", title: "Graphic Design" },
  { slug: "flyer-poster-design", title: "Flyer & Poster Design" },
  { slug: "logo-brand-identity", title: "Logo & Brand Identity" },
  { slug: "social-media-design", title: "Social Media Design" },
  { slug: "church-ministry-graphics", title: "Church & Ministry Graphics" },
  { slug: "event-branding", title: "Event Branding & Promotional Materials" },
  { slug: "video-editing", title: "Video Editing & Promotional Videos" },
  { slug: "merchandise-clothing", title: "Merchandise & Clothing Design" },
  { slug: "custom-projects", title: "Custom Creative Projects" },
] as const;

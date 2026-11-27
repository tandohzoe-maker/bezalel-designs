/**
 * The nine service categories and their draft summaries.
 * This list seeds the `services` table in Phase 1; after that, services are
 * managed from the admin dashboard and this file is only a fallback.
 */
export type ServiceCategory = {
  slug: string;
  title: string;
  summary: string;
};

export const serviceCategories: ServiceCategory[] = [
  {
    slug: "graphic-design",
    title: "Graphic Design",
    summary: "Considered visual design for print and screen, built around a clear message.",
  },
  {
    slug: "flyer-poster-design",
    title: "Flyer & Poster Design",
    summary: "Promotional flyers and event posters that stop the scroll and fill the room.",
  },
  {
    slug: "logo-brand-identity",
    title: "Logo & Brand Identity",
    summary: "Logos and identity systems that give your business a recognisable, lasting face.",
  },
  {
    slug: "social-media-design",
    title: "Social Media Design",
    summary: "Cohesive post, story and campaign graphics that keep your feed unmistakably yours.",
  },
  {
    slug: "church-ministry-graphics",
    title: "Church & Ministry Graphics",
    summary: "Sermon series, service announcements and ministry visuals designed with reverence and clarity.",
  },
  {
    slug: "event-branding",
    title: "Event Branding & Promotional Materials",
    summary: "Complete visual identities for events, from the first announcement to the stage banner.",
  },
  {
    slug: "video-editing",
    title: "Video Editing & Promotional Videos",
    summary: "Promotional edits, event highlights and motion graphics that tell your story in motion.",
  },
  {
    slug: "merchandise-clothing",
    title: "Merchandise & Clothing Design",
    summary: "Apparel and merchandise artwork, prepared properly for print and production.",
  },
  {
    slug: "custom-projects",
    title: "Custom Creative Projects",
    summary: "Something different in mind? We shape bespoke creative work around your idea.",
  },
];

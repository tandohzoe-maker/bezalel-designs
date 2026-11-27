/**
 * Service categories and their summaries: the nine from the website brief plus
 * Brand Consultation and Website Design, with wording aligned to the studio's
 * portfolio and price list.
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
    summary: "Visually compelling graphics for print and screen, built around a clear message.",
  },
  {
    slug: "flyer-poster-design",
    title: "Flyer & Poster Design",
    summary:
      "Event, corporate, product and campaign flyers. The first field of design we fell in love with, with 400+ designs since 2019.",
  },
  {
    slug: "logo-brand-identity",
    title: "Logo & Brand Identity",
    summary: "Unique logos and identity systems that give a brand a distinctive, recognisable face.",
  },
  {
    slug: "brand-consultation",
    title: "Brand Consultation",
    summary:
      "Helping individuals and businesses develop their visual identity and communicate their brand message effectively.",
  },
  {
    slug: "social-media-design",
    title: "Social Media Design",
    summary: "Cohesive post, story and campaign graphics that keep your feed unmistakably yours.",
  },
  {
    slug: "church-ministry-graphics",
    title: "Church & Ministry Graphics",
    summary: "Church and ministry flyers, programmes and announcements, designed with reverence and clarity.",
  },
  {
    slug: "event-branding",
    title: "Event Branding & Promotional Materials",
    summary: "Complete visual identities for events, from the first announcement to the stage banner.",
  },
  {
    slug: "video-editing",
    title: "Videography & Video Editing",
    summary:
      "Creating and editing engaging visual content that tells stories, captures moments and connects with audiences.",
  },
  {
    slug: "website-design",
    title: "Website Design & Development",
    summary:
      "A professional digital presence that communicates your brand, showcases your services and turns visitors into clients.",
  },
  {
    slug: "merchandise-clothing",
    title: "Merchandise Design & Print",
    summary:
      "Custom T-shirts, Christian-themed and statement apparel, and brand merchandise, designed and prepared for print.",
  },
  {
    slug: "custom-projects",
    title: "Custom Creative Projects",
    summary: "Something different in mind? We shape bespoke creative work around your idea.",
  },
];

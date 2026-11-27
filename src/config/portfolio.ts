/**
 * Portfolio content.
 *
 * Every entry here is the studio's real work. To add a project: put the file
 * in /public/portfolio/<folder>/ and add an entry below. In Phase 1 this list
 * moves to the `projects` table and uploads move to Supabase Storage, managed
 * from the admin dashboard; the shape stays the same.
 */

export type PortfolioGroup = "graphic" | "motion";

export type PortfolioCategory = {
  slug: string;
  title: string;
  group: PortfolioGroup;
  /** The service an enquiry from this kind of work should pre-select. */
  service: string;
};

export const portfolioCategories: PortfolioCategory[] = [
  // Graphic design
  { slug: "flyers-promotional", title: "Flyers & Promotional", group: "graphic", service: "flyer-poster-design" },
  { slug: "event-posters", title: "Event Posters", group: "graphic", service: "flyer-poster-design" },
  { slug: "church-ministry", title: "Church & Ministry", group: "graphic", service: "church-ministry-graphics" },
  { slug: "branding-logo", title: "Branding & Logo Design", group: "graphic", service: "logo-brand-identity" },
  { slug: "business-adverts", title: "Business Advertisements", group: "graphic", service: "graphic-design" },
  { slug: "social-media", title: "Social Media", group: "graphic", service: "social-media-design" },
  { slug: "merchandise", title: "Clothing & Merchandise", group: "graphic", service: "merchandise-clothing" },
  { slug: "banners", title: "Banners & Promotional Materials", group: "graphic", service: "event-branding" },
  // Video & motion
  { slug: "promotional-videos", title: "Promotional Videos", group: "motion", service: "video-editing" },
  { slug: "event-highlights", title: "Event Highlights", group: "motion", service: "video-editing" },
  { slug: "brand-videos", title: "Brand Videos", group: "motion", service: "video-editing" },
  { slug: "social-video", title: "Social Media Video", group: "motion", service: "video-editing" },
  { slug: "motion-graphics", title: "Motion Graphics", group: "motion", service: "video-editing" },
  { slug: "visual-storytelling", title: "Visual Storytelling", group: "motion", service: "video-editing" },
];

export const groupTitles: Record<PortfolioGroup, string> = {
  graphic: "Graphic Design",
  motion: "Video & Motion",
};

export type PortfolioImage = {
  src: string;
  width: number;
  height: number;
  alt: string;
};

export type PortfolioProject = {
  slug: string;
  title: string;
  client?: string;
  category: string; // PortfolioCategory.slug
  description: string;
  cover: PortfolioImage;
  /**
   * "framed": artwork centred on a coloured panel (logos, marks).
   * "full": the image fills the tile at its own proportions (flyers, posters).
   */
  presentation: "framed" | "full";
  /** Panel colour for framed work; pick one the artwork reads well on. */
  surface?: "ink" | "graphite" | "bone" | "white";
  /** Optional video (Phase 3): preview loop + full playback in the lightbox. */
  video?: { src: string; poster?: string };
  featured?: boolean;
  year?: number;
};

export const projects: PortfolioProject[] = [
  {
    slug: "glow-with-og",
    title: "Glow With OG",
    client: "Glow With OG",
    category: "branding-logo",
    description: "Logo design for Glow With OG: a botanical profile mark with sparkle details above a clean wordmark.",
    cover: {
      src: "/portfolio/logos/glow-with-og.png",
      width: 278,
      height: 388,
      alt: "Glow With OG logo: a woman's profile framed by leaves and sparkles, above the words Glow With OG",
    },
    presentation: "framed",
    surface: "graphite",
    featured: true,
  },
  {
    slug: "pulchra",
    title: "Pulchra",
    client: "Pulchra",
    category: "branding-logo",
    description: "Logo design for Pulchra: a faceted gem crowning a serif P monogram, finished with an elegant wordmark.",
    cover: {
      src: "/portfolio/logos/pulchra.png",
      width: 306,
      height: 352,
      alt: "Pulchra logo: a diamond shape above a serif letter P, with the word Pulchra beneath",
    },
    presentation: "framed",
    surface: "ink",
    featured: true,
  },
  {
    slug: "nissie-creatives",
    title: "Nissie Creatives",
    client: "Nissie Creatives",
    category: "branding-logo",
    description:
      "Logo design for Nissie Creatives: a single continuous line joining a cross, a gift bow and a heart.",
    cover: {
      src: "/portfolio/logos/nissie-creatives.png",
      width: 522,
      height: 229,
      alt: "Nissie Creatives logo: a hand-drawn line connecting a cross, a ribbon bow and a heart, above the words Nissie creatives",
    },
    presentation: "framed",
    surface: "graphite",
    featured: true,
  },
  {
    slug: "code-clear",
    title: "Code Clear",
    client: "Code Clear: The Medical Game",
    category: "branding-logo",
    description:
      "Logo design for Code Clear, The Medical Game: a stethoscope drawn into the letterforms of the name.",
    cover: {
      src: "/portfolio/logos/code-clear.png",
      width: 348,
      height: 256,
      alt: "Code Clear logo: a stethoscope forming the letters of Code Clear, with the tagline The Medical Game",
    },
    presentation: "framed",
    surface: "bone",
    featured: true,
  },
];

export function categoryBySlug(slug: string) {
  return portfolioCategories.find((c) => c.slug === slug);
}

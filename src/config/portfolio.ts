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
  /** Exact panel colour (e.g. the client's brand colour); overrides `surface`. */
  surfaceColor?: string;
  /** Extra views (front/back, colourways), switchable in the lightbox. The
   *  first view should be the cover. */
  views?: { label: string; image: PortfolioImage }[];
  /** Optional video (Phase 3): preview loop + full playback in the lightbox. */
  video?: { src: string; poster?: string };
  featured?: boolean;
  year?: number;
};

export const projects: PortfolioProject[] = [
  {
    slug: "atarah",
    title: "Atarah",
    client: "Atarah",
    category: "branding-logo",
    description:
      "Logo design for Atarah, “clothed in splendor”: a framed A monogram dated 20 | 26 above a flowing lowercase wordmark.",
    cover: {
      src: "/portfolio/logos/atarah.png",
      width: 519,
      height: 283,
      alt: "Atarah logo: a square A monogram between the numbers 20 and 26, above the word atarah and the tagline clothed in splendor",
    },
    presentation: "framed",
    surfaceColor: "#590100",
    featured: true,
  },
  {
    slug: "threads-and-co",
    title: "Threads & Co.",
    client: "Threads & Co.",
    category: "branding-logo",
    description:
      "Logo design for Threads & Co., “where yarn meets elegance”: a line-drawn ball of yarn whose thread leads into a high-contrast serif wordmark and script ampersand.",
    cover: {
      src: "/portfolio/logos/threads-and-co.png",
      width: 743,
      height: 441,
      alt: "Threads and Co. logo: a ball of yarn above the tagline where yarn meets elegance, with THREADS in serif capitals and & Co. in script",
    },
    presentation: "framed",
    surfaceColor: "#640000",
    featured: true,
  },
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
  // Zoe Life apparel — from the Zoe Life shirt catalogue
  {
    slug: "zoelife-grace-takashi-time",
    title: "Grace Takashi Time",
    client: "Zoe Life",
    category: "merchandise",
    description: "T-shirt design: GRACE TAKASHI TIME set in gothic and bold display type, with 2 Corinthians 12:9 and Ecclesiastes 3:1.",
    cover: { src: "/portfolio/zoelife/grace-takashi-time.jpg", width: 1080, height: 1350, alt: "White T-shirt printed with GRACE TAKASHI TIME in red and white lettering" },
    presentation: "full",
  },
  {
    slug: "zoelife-jesus-keeps-helping-me",
    title: "Jesus Keeps Helping Me",
    client: "Zoe Life",
    category: "merchandise",
    description: "T-shirt design: JESUS KEEPS HELPING ME in tall condensed type over Philippians 2:13, in two colourways.",
    cover: { src: "/portfolio/zoelife/jesus-keeps-helping-me-cream.jpg", width: 1080, height: 1350, alt: "Cream T-shirt printed with JESUS KEEPS HELPING ME and Philippians 2:13 in brown" },
    presentation: "full",
    views: [
      { label: "Cream", image: { src: "/portfolio/zoelife/jesus-keeps-helping-me-cream.jpg", width: 1080, height: 1350, alt: "Cream T-shirt printed with JESUS KEEPS HELPING ME and Philippians 2:13 in brown" } },
      { label: "Black", image: { src: "/portfolio/zoelife/jesus-keeps-helping-me-black.jpg", width: 1080, height: 1350, alt: "Black T-shirt printed with JESUS KEEPS HELPING ME and Philippians 2:13 in white" } },
    ],
  },
  {
    slug: "zoelife-holy-ghost-kid",
    title: "Holy Ghost Kid",
    client: "Zoe Life",
    category: "merchandise",
    description: "T-shirt design: a Holy Ghost Kid chest mark, and on the back “Winning is my way and my identity, I am an evidence of grace” with race-flag details.",
    cover: { src: "/portfolio/zoelife/holy-ghost-kid-back.jpg", width: 1080, height: 1350, alt: "Back of a white T-shirt: WINNING IS MY WAY AND MY IDENTITY, I AM AN EVIDENCE OF GRACE with chequered flags" },
    presentation: "full",
    views: [
      { label: "Back", image: { src: "/portfolio/zoelife/holy-ghost-kid-back.jpg", width: 1080, height: 1350, alt: "Back of a white T-shirt: WINNING IS MY WAY AND MY IDENTITY, I AM AN EVIDENCE OF GRACE with chequered flags" } },
      { label: "Front", image: { src: "/portfolio/zoelife/holy-ghost-kid-front.jpg", width: 1080, height: 1350, alt: "Front of a white T-shirt with Holy Ghost Kid in red gothic lettering" } },
    ],
  },
  {
    slug: "zoelife-no-turning-back",
    title: "No Turning Back",
    client: "Zoe Life",
    category: "merchandise",
    description: "T-shirt design: NO TURNING BACK above a drifting sports car on the front, and FLEE with 1 Corinthians 6:18–20 on the back.",
    cover: { src: "/portfolio/zoelife/no-turning-back-back.jpg", width: 1080, height: 1350, alt: "Back of a brown T-shirt: FREE and FLEE in peach lettering above a sports car and 1 Corinthians 6:18-20" },
    presentation: "full",
    views: [
      { label: "Back", image: { src: "/portfolio/zoelife/no-turning-back-back.jpg", width: 1080, height: 1350, alt: "Back of a brown T-shirt: FREE and FLEE in peach lettering above a sports car and 1 Corinthians 6:18-20" } },
      { label: "Front", image: { src: "/portfolio/zoelife/no-turning-back-front.jpg", width: 1080, height: 1350, alt: "Front of a brown T-shirt: NO TURNING BACK repeated three times above a drifting sports car" } },
    ],
  },
  {
    slug: "zoelife-jesus-takes-all-the-glory",
    title: "Jesus Takes All the Glory",
    client: "Zoe Life",
    category: "merchandise",
    description: "T-shirt design: John 3:30 on the front, and “Jesus takes all the Glory. Vessel of God” on the back.",
    cover: { src: "/portfolio/zoelife/jesus-takes-all-the-glory-back.jpg", width: 1080, height: 1350, alt: "Back of a cream T-shirt: Jesus takes all the Glory, Vessel of God, in brown" },
    presentation: "full",
    views: [
      { label: "Back", image: { src: "/portfolio/zoelife/jesus-takes-all-the-glory-back.jpg", width: 1080, height: 1350, alt: "Back of a cream T-shirt: Jesus takes all the Glory, Vessel of God, in brown" } },
      { label: "Front", image: { src: "/portfolio/zoelife/jesus-takes-all-the-glory-front.jpg", width: 1080, height: 1350, alt: "Front of a cream T-shirt with John 3:30, He must become greater and I must become less" } },
    ],
  },
  {
    slug: "zoelife-go-ye-train",
    title: "Go Ye Train",
    client: "Zoe Life",
    category: "merchandise",
    description: "T-shirt design: a GO YE TRAIN badge, “Making Jesus known as the essential”, and SHINING THE LIGHT OF CHRIST on the back with Psalm 107:14.",
    cover: { src: "/portfolio/zoelife/go-ye-train-back.jpg", width: 1080, height: 1350, alt: "Back of a white T-shirt: SHINING THE LIGHT OF CHRIST in red and black with a chequered strip" },
    presentation: "full",
    views: [
      { label: "Back", image: { src: "/portfolio/zoelife/go-ye-train-back.jpg", width: 1080, height: 1350, alt: "Back of a white T-shirt: SHINING THE LIGHT OF CHRIST in red and black with a chequered strip" } },
      { label: "Front", image: { src: "/portfolio/zoelife/go-ye-train-front.jpg", width: 1080, height: 1350, alt: "Front of a white T-shirt with a black GO YE TRAIN badge" } },
    ],
  },
  {
    slug: "zoelife-when-we-pray",
    title: "When We Pray",
    client: "Zoe Life",
    category: "merchandise",
    description: "T-shirt design: WHEN WE PRAY HE ANSWERS US on the front, and Isaiah 65:24 with winged lettering on the back, in white and black.",
    cover: { src: "/portfolio/zoelife/when-we-pray-white-back.jpg", width: 1080, height: 1350, alt: "Back of a white T-shirt: EVEN BEFORE THEY FINISH PRAYING TO ME I WILL ANSWER THEIR PRAYERS, Isaiah 65:24, with wings" },
    presentation: "full",
    views: [
      { label: "White · back", image: { src: "/portfolio/zoelife/when-we-pray-white-back.jpg", width: 1080, height: 1350, alt: "Back of a white T-shirt: EVEN BEFORE THEY FINISH PRAYING TO ME I WILL ANSWER THEIR PRAYERS, Isaiah 65:24, with wings" } },
      { label: "White · front", image: { src: "/portfolio/zoelife/when-we-pray-white-front.jpg", width: 1080, height: 1350, alt: "Front of a white T-shirt: WHEN WE PRAY HE ANSWERS US in red and black" } },
      { label: "Black · back", image: { src: "/portfolio/zoelife/when-we-pray-black-back.jpg", width: 1080, height: 1350, alt: "Back of a black T-shirt with the Isaiah 65:24 design in white and yellow" } },
      { label: "Black · front", image: { src: "/portfolio/zoelife/when-we-pray-black-front.jpg", width: 1080, height: 1350, alt: "Front of a black T-shirt: WHEN WE PRAY HE ANSWERS US in white and yellow" } },
    ],
  },
  {
    slug: "zoelife-the-breaker",
    title: "The Breaker Hoodie",
    client: "Zoe Life",
    category: "merchandise",
    description: "Hoodie design: THE BREAKER with Micah 2:13 across the chest.",
    cover: { src: "/portfolio/zoelife/the-breaker-hoodie.jpg", width: 1080, height: 1350, alt: "Black hoodie printed with THE BREAKER and Micah 2:13 in white" },
    presentation: "full",
  },
  {
    slug: "zoelife-jugular",
    title: "Jugular Hoodie",
    client: "Zoe Life",
    category: "merchandise",
    description: "Hoodie design: JUGULAR repeated over an engraved-style illustration, signed “Break the Jugular” in red script.",
    cover: { src: "/portfolio/zoelife/jugular-hoodie.jpg", width: 1080, height: 1350, alt: "Back of a black hoodie: JUGULAR repeated in red over a black-and-white illustration, with Break the Jugular in red script" },
    presentation: "full",
  },
  {
    slug: "zoelife-guard-your-heart",
    title: "Guard Your Heart",
    client: "Zoe Life",
    category: "merchandise",
    description: "T-shirt design: a line-drawn heart on the front, and GUARD YOUR HEART with Proverbs 4:23 on the back.",
    cover: { src: "/portfolio/zoelife/guard-your-heart-back.jpg", width: 1080, height: 1350, alt: "Back of a black T-shirt: GUARD YOUR HEART and Proverbs 4:23 in white" },
    presentation: "full",
    views: [
      { label: "Back", image: { src: "/portfolio/zoelife/guard-your-heart-back.jpg", width: 1080, height: 1350, alt: "Back of a black T-shirt: GUARD YOUR HEART and Proverbs 4:23 in white" } },
      { label: "Front", image: { src: "/portfolio/zoelife/guard-your-heart-front.jpg", width: 1080, height: 1350, alt: "Front of a black T-shirt with GUARD YOUR HEART and a line-drawn heart" } },
    ],
  },
  {
    slug: "zoelife-fearless",
    title: "Fearless",
    client: "Zoe Life",
    category: "merchandise",
    description: "T-shirt design: FEAR NOT with Isaiah 41:10 on the front, and FEARLESS, “Jesus is with you always”, on the back.",
    cover: { src: "/portfolio/zoelife/fearless-back.jpg", width: 1080, height: 1350, alt: "Back of a black T-shirt: FEARLESS, Jesus is with you always, in white" },
    presentation: "full",
    views: [
      { label: "Back", image: { src: "/portfolio/zoelife/fearless-back.jpg", width: 1080, height: 1350, alt: "Back of a black T-shirt: FEARLESS, Jesus is with you always, in white" } },
      { label: "Front", image: { src: "/portfolio/zoelife/fearless-front.jpg", width: 1080, height: 1350, alt: "Front of a black T-shirt with FEAR NOT and Isaiah 41:10" } },
    ],
  },
  {
    slug: "zoelife-the-lord-is-my-shepherd",
    title: "The Lord Is My Shepherd",
    client: "Zoe Life",
    category: "merchandise",
    description: "T-shirt design: a lamb chest mark, and a line drawing of the Good Shepherd with Psalm 23 on the back, in three colourways.",
    cover: { src: "/portfolio/zoelife/the-lord-is-my-shepherd-black-back.jpg", width: 1080, height: 1350, alt: "Back of a black T-shirt: line drawing of Jesus carrying a lamb, The Lord is my Shepherd" },
    presentation: "full",
    views: [
      { label: "Black · back", image: { src: "/portfolio/zoelife/the-lord-is-my-shepherd-black-back.jpg", width: 1080, height: 1350, alt: "Back of a black T-shirt: line drawing of Jesus carrying a lamb, The Lord is my Shepherd" } },
      { label: "Black · front", image: { src: "/portfolio/zoelife/the-lord-is-my-shepherd-black-front.jpg", width: 1080, height: 1350, alt: "Front of a black T-shirt with a laurel logo and a lamb" } },
      { label: "Cream · back", image: { src: "/portfolio/zoelife/the-lord-is-my-shepherd-cream-back.jpg", width: 1080, height: 1350, alt: "Back of a cream T-shirt with the Good Shepherd line drawing in brown" } },
      { label: "Cream · front", image: { src: "/portfolio/zoelife/the-lord-is-my-shepherd-cream-front.jpg", width: 1080, height: 1350, alt: "Front of a cream T-shirt with a small lamb" } },
      { label: "Brown · back", image: { src: "/portfolio/zoelife/the-lord-is-my-shepherd-brown-back.jpg", width: 1080, height: 1350, alt: "Back of a brown T-shirt with the Good Shepherd line drawing in white" } },
      { label: "Brown · front", image: { src: "/portfolio/zoelife/the-lord-is-my-shepherd-brown-front.jpg", width: 1080, height: 1350, alt: "Front of a brown T-shirt with a small lamb" } },
    ],
  },
  {
    slug: "zoelife-talk-to-god",
    title: "Talk to God",
    client: "Zoe Life",
    category: "merchandise",
    description: "T-shirt design: HAVE YOU PRAYED ABOUT IT? in a four-block grid, signed “Talk to God”.",
    cover: { src: "/portfolio/zoelife/talk-to-god.jpg", width: 1080, height: 1350, alt: "Back of a black T-shirt: HAVE YOU PRAYED ABOUT IT? four times in orange and white blocks, with Talk to God in script" },
    presentation: "full",
  },
];

export function categoryBySlug(slug: string) {
  return portfolioCategories.find((c) => c.slug === slug);
}

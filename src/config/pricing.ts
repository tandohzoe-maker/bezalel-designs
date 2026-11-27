/**
 * Pricing, as supplied by the studio. Prices are in Ghana Cedis (GH₵).
 * Edit here to change prices; from Phase 1 this moves to the admin dashboard.
 *
 * `service` links each price to a service (src/config/services.ts) so the
 * "Request this service" button pre-selects it on the enquiry form.
 */

export type PriceItem = {
  slug: string;
  service: string;
  title: string;
  price: number; // GH₵
  unit: string; // short tag under the price, e.g. "2 sessions"
  summary: string;
  includes: string[];
  note?: string;
  extra?: string; // e.g. additional revision charges
  notIncluded?: string;
  featured?: boolean; // visual emphasis only
};

export const pricingIntro = {
  kicker: "Bezalel Designs | Creative & Brand Development",
  lead: "We don’t just create designs. We help brands find their identity, communicate their value and make a lasting impression.",
};

export const priceList: PriceItem[] = [
  {
    slug: "brand-consultation",
    service: "brand-consultation",
    title: "Brand Consultation",
    price: 200,
    unit: "2 sessions",
    summary: "For individuals, startups and businesses looking to build, refine or reposition their brands.",
    includes: [
      "One-on-one brand consultation",
      "Understanding your business vision, goals and target audience",
      "Brand mapping and strategic direction",
      "Guidance on marketing and brand positioning",
      "Practical steps to grow and promote your business",
      "Two consultation meetings",
    ],
    note: "This service provides strategic guidance and direction, not full marketing execution.",
  },
  {
    slug: "logo-brand-identity",
    service: "logo-brand-identity",
    title: "Logo Design & Brand Identity",
    price: 400,
    unit: "Brand package",
    summary: "A visual identity that gives your business recognition, consistency and character.",
    includes: [
      "Custom logo design",
      "Brand identity development",
      "Colour palette selection",
      "Typography recommendations",
      "Logo variations and colour options",
      "Mockups showing how your logo looks across different applications",
      "Presentation of the final design",
      "High-quality final files",
    ],
    featured: true,
  },
  {
    slug: "e-flyer",
    service: "flyer-poster-design",
    title: "E-Flyer Design",
    price: 120,
    unit: "5–7 working days",
    summary: "Creative and professional digital flyers designed to communicate your message and capture attention.",
    includes: [
      "Design brief and information gathering",
      "Custom flyer design",
      "Two rounds of revisions",
      "Final high-resolution digital file (PNG/JPG)",
    ],
    extra: "Additional revisions: GH₵50 per additional revision.",
  },
  {
    slug: "express-e-flyer",
    service: "flyer-poster-design",
    title: "Express E-Flyer Design",
    price: 180,
    unit: "Within 24 hours",
    summary: "For clients who need quality designs within a short turnaround time.",
    includes: [
      "Priority design service",
      "Custom flyer design",
      "Four rounds of revisions",
      "Final high-resolution digital file",
    ],
    note: "Express delivery begins once all required information and materials have been received.",
  },
  {
    slug: "video-editing",
    service: "video-editing",
    title: "Video Editing",
    price: 200,
    unit: "Per project",
    summary: "Transforming raw footage into engaging visual stories.",
    includes: [
      "Video trimming and sequencing",
      "Professional transitions",
      "Colour correction and colour grading",
      "Audio synchronisation and adjustments",
      "Text overlays and titles where necessary",
      "Final edited video",
    ],
    note: "Complex editing and extended projects may attract additional charges.",
  },
  {
    slug: "videography",
    service: "video-editing",
    title: "Videography (Shoot & Edit)",
    price: 500,
    unit: "5-day delivery",
    summary: "Professional video production, from capturing the moments to delivering the final visual story.",
    includes: [
      "Video shoot and footage capture",
      "Creative direction during the shoot",
      "Video editing",
      "Colour correction and grading",
      "Final edited video delivered within five days",
    ],
    note: "Location, extended shooting hours, additional equipment and specialised production requirements may attract additional fees.",
  },
  {
    slug: "website",
    service: "website-design",
    title: "Website Design & Development",
    price: 3000,
    unit: "Custom website",
    summary:
      "A professional digital presence designed to communicate your brand, showcase your services and convert visitors into potential clients.",
    includes: [
      "Website planning and structure",
      "Custom landing page design",
      "User Interface (UI) design",
      "User Experience (UX) optimisation",
      "Responsive design for mobile, tablet and desktop",
      "Four rounds of design reviews",
      "Basic contact and enquiry integration",
      "Website deployment",
    ],
    notIncluded: "Domain registration and renewal, hosting fees and third-party subscriptions.",
  },
];

export const customQuoteMessage = "Every creative project is different. Contact us for a customised quotation.";

export const terms: { title: string; text: string }[] = [
  {
    title: "Project commencement",
    text: "Work begins after the client has provided the required information and confirmed the project.",
  },
  {
    title: "Payment",
    text: "A 70% deposit is required before work begins, with the balance payable before final delivery.",
  },
  {
    title: "Client responsibility",
    text: "Clients are expected to provide accurate information, images, content and other necessary materials.",
  },
  {
    title: "Revisions",
    text: "Each service comes with its stated number of revisions. Additional changes attract extra charges.",
  },
  {
    title: "Delivery",
    text: "Turnaround times begin after all required materials and payment confirmations have been received.",
  },
  { title: "Urgent requests", text: "Projects requiring priority attention may attract express charges." },
  { title: "Final files", text: "High-resolution final files are delivered after full payment." },
];

export const brandStatement = {
  title: "Ideas. Identity. Impact.",
  body: "We believe every brand has a story worth telling. Our work is centred on transforming ideas into meaningful visual experiences, helping individuals and businesses communicate with clarity, creativity and excellence.",
  closing: "Designed with purpose. Created to make an impression.",
};

/** GH₵ formatting, e.g. 3000 → "GH₵3,000". */
export function cedis(amount: number) {
  return `GH₵${amount.toLocaleString("en-GH")}`;
}

/** Lowest listed price for a service, or null when it is quote-only. */
export function startingPrice(serviceSlug: string) {
  const prices = priceList.filter((p) => p.service === serviceSlug).map((p) => p.price);
  return prices.length ? Math.min(...prices) : null;
}

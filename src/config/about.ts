/**
 * About-page content. Moves to `site_settings` / an `about` table in Phase 1 so
 * it can be edited from the admin dashboard.
 *
 * Founder: the section is only rendered when `name` and `bio` are filled in.
 * `photo` is a path in /public (e.g. "/images/founder.jpg") or, from Phase 1,
 * a Supabase Storage URL.
 */
export const founder = {
  name: "",
  role: "Founder & Creative Director",
  bio: [] as string[],
  photo: "",
};

export const pillars = [
  {
    title: "Brand philosophy",
    text: "Design is communication before it is decoration. A flyer, a logo or a film succeeds when the right people understand it and remember it. Beauty is how we earn their attention; clarity is how we keep it.",
  },
  {
    title: "Creative approach",
    text: "We begin with listening: what you want to say, who needs to hear it, and where they will see it. Only then do we design, exploring directions, choosing deliberately and refining until every element has a reason to be there.",
  },
  {
    title: "Our commitment to excellence",
    text: "Excellence is not a finishing touch. It is in the alignment of a line of type, the balance of a colour, the files we hand over and the way we communicate along the way. Every project, whatever its size, receives the same care.",
  },
];

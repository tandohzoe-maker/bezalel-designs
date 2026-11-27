/**
 * About-page and track-record content, from the studio's Creative Portfolio.
 * Moves to the database in Phase 1 so it can be edited from the admin dashboard.
 *
 * `photo` is a path in /public (e.g. "/images/founder.jpg") or, from Phase 1,
 * a Supabase Storage URL. Left empty until a real photo is supplied.
 */
export const founder = {
  name: "Zoe Kwaku Afriyie Tandoh",
  role: "Founder · Graphic Designer & Brand Strategist",
  kicker: "Creative genius. Strategic thinking. Visual storytelling.",
  bio: [
    "Hello, I’m Zoe Kwaku Afriyie Tandoh, a passionate and innovative graphic designer and brand strategist with a keen eye for detail and a heart full of creativity.",
    "From a young age, I’ve been captivated by the power of design to communicate, inspire and solve problems. With a blend of strategic thinking, a blissful marriage of colours and an innate creative ability, I craft stunning designs that not only captivate but also drive results.",
    "My mission is to transform ideas into compelling visual stories, helping businesses gain leads, build brands and make meaningful connections with their audiences. Every project I take on is an opportunity to learn, grow and create something truly unique.",
  ],
  closing: "Let’s create. Let’s inspire. Let’s make a difference, one design at a time.",
  tools: ["Adobe Photoshop", "Canva"],
  photo: "",
};

/** Verified facts from the portfolio. Only add numbers that are true. */
export const trackRecord = [
  { value: "2019", label: "Designing since" },
  { value: "400+", label: "Flyer & product designs" },
  { value: "10+", label: "Brands & organisations" },
];

/** Brands and organisations the studio has worked with ("and many more"). */
export const clients = [
  "Touch of Hope Foundation",
  "Zomujo Foundation",
  "Nissie Creatives",
  "Zoe Life",
  "Essentials of Christ Missions",
  "GHAMSU",
  "Nunana Clinic",
  "Glow With OG",
  "Ghana Association of Urological Surgeons",
  "The Exchange Consult",
];

export const pillars = [
  {
    title: "Brand philosophy",
    text: "Design is communication before it is decoration. A flyer, a logo or a film succeeds when the right people understand it and remember it. Beauty is how we earn their attention; clarity is how we keep it.",
  },
  {
    title: "Creative approach",
    text: "We begin with listening: what you want to say, who needs to hear it, and where they will see it. Only then do we design, blending strategic thinking with colour and composition, and refining until every element has a reason to be there.",
  },
  {
    title: "Our commitment to excellence",
    text: "Excellence is not a finishing touch. It is in the alignment of a line of type, the balance of a colour, the files we hand over and the way we communicate along the way. Every project, whatever its size, receives the same care.",
  },
];

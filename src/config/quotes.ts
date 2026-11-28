/**
 * Quotes shown during the welcome countdown. Only well-documented quotes with
 * correct attribution. The studio's own quote comes last and stays on screen
 * as the countdown ends.
 */
export type Quote = { text: string; author: string; role?: string; own?: boolean };

export const welcomeQuotes: Quote[] = [
  { text: "Good design is as little design as possible.", author: "Dieter Rams", role: "Industrial designer" },
  {
    text: "Design is not just what it looks like and feels like. Design is how it works.",
    author: "Steve Jobs",
    role: "Co-founder, Apple",
  },
  { text: "Styles come and go. Good design is a language, not a style.", author: "Massimo Vignelli", role: "Designer" },
  { text: "Have no fear of perfection — you’ll never reach it.", author: "Salvador Dalí", role: "Artist" },
  {
    text: "Design is expressive. Let us help you express yours.",
    author: "Zoe Kwaku Afriyie Tandoh",
    role: "Founder, Bezalel Designs",
    own: true,
  },
];

/** Length of the welcome countdown, in seconds. */
export const WELCOME_SECONDS = 15;

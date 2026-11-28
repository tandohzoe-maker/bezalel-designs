import type { Metadata, Viewport } from "next";
import { IBM_Plex_Mono, Manrope } from "next/font/google";
import { siteConfig } from "@/config/site";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.siteName} — ${siteConfig.name} | ${siteConfig.tagline}`,
    template: `%s — ${siteConfig.siteName}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.siteName,
  openGraph: {
    type: "website",
    siteName: siteConfig.siteName,
    locale: siteConfig.locale,
    url: "/",
    title: `${siteConfig.siteName} — ${siteConfig.name}`,
    description: siteConfig.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.siteName} — ${siteConfig.name}`,
    description: siteConfig.description,
  },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#050505",
  colorScheme: "dark",
};

/* Pre-paint: marks JS availability, and decides whether the welcome countdown
   shows (first page of each visit). Automated browsers skip it unless the URL
   has ?welcome, so tests and screenshot tools are not blocked. */
const headScript = `(function(){var d=document.documentElement;d.classList.add('js');try{var f=location.search.indexOf('welcome')>-1;if(f||(!sessionStorage.getItem('bz-intro')&&!navigator.webdriver&&location.pathname.indexOf('/styleguide')!==0)){d.classList.add('intro')}}catch(e){}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GH" className={`${manrope.variable} ${plexMono.variable}`} suppressHydrationWarning>
      <head>
        {/* Runs before first paint: marks JS availability (reveal styles never hide content
            without JS) and decides whether the homepage brand intro plays. */}
        <script dangerouslySetInnerHTML={{ __html: headScript }} />
      </head>
      <body>{children}</body>
    </html>
  );
}

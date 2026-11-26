import type { Metadata, Viewport } from "next";
import { Bodoni_Moda, Inter_Tight } from "next/font/google";
import { siteConfig } from "@/config/site";
import "./globals.css";

const bodoni = Bodoni_Moda({
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz"],
  variable: "--font-bodoni",
  display: "swap",
});

const interTight = Inter_Tight({
  subsets: ["latin"],
  variable: "--font-inter-tight",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — ${siteConfig.tagline}`,
    template: `%s — ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  openGraph: {
    type: "website",
    siteName: siteConfig.name,
    locale: siteConfig.locale,
    url: "/",
    title: siteConfig.name,
    description: siteConfig.description,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
  },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#0b0b0c",
  colorScheme: "dark light",
};

const headScript = `(function(){var d=document.documentElement;d.classList.add('js');try{if(location.pathname==='/'&&!sessionStorage.getItem('bz-intro')&&!matchMedia('(prefers-reduced-motion: reduce)').matches){d.classList.add('intro')}}catch(e){}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GH" className={`${bodoni.variable} ${interTight.variable}`} suppressHydrationWarning>
      <head>
        {/* Runs before first paint: marks JS availability (reveal styles never hide content
            without JS) and decides whether the homepage brand intro plays. */}
        <script dangerouslySetInnerHTML={{ __html: headScript }} />
      </head>
      <body>{children}</body>
    </html>
  );
}

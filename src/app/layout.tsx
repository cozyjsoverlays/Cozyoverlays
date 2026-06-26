import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import "./globals.css";
import { SITE, LINKS } from "@/data/site";
import { CartDrawer } from "@/components/commerce/CartDrawer";
import { StarterPackPopupController } from "@/components/marketing/StarterPackPopupController";
import { JsonLd } from "@/components/seo/JsonLd";

const organizationLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE.name,
  url: SITE.url,
  logo: SITE.avatar,
  description: SITE.tagline,
  sameAs: [
    LINKS.etsy,
    LINKS.youtube,
    LINKS.instagram,
    LINKS.pinterest,
    LINKS.twitter,
  ],
};

const websiteLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE.name,
  url: SITE.url,
  potentialAction: {
    "@type": "SearchAction",
    target: `${SITE.url}/shop?category={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
};

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: "CozyOverlays — Animated Stream Overlay Packs for Twitch & More",
    template: "%s · CozyOverlays",
  },
  description:
    "Cozy, animated stream overlay packs for Twitch, YouTube, Kick & TikTok by CozyJsStudio. Etsy Star Seller · 4.9★ from 91 reviews · 686+ sales · instant download.",
  keywords: [
    "stream overlays",
    "animated overlays",
    "Twitch overlays",
    "OBS overlays",
    "cozy stream overlay",
    "Streamlabs",
    "CozyJsStudio",
  ],
  authors: [{ name: "CozyJsStudio" }],
  creator: "CozyJsStudio",
  openGraph: {
    type: "website",
    url: SITE.url,
    title: "CozyOverlays — Stream Overlays That Feel Alive & Cozy",
    description:
      "Animated overlay packs for Twitch, YouTube, Kick & TikTok. Etsy Star Seller · 4.9★ · 686+ sales.",
    siteName: SITE.name,
    images: [{ url: SITE.avatar, width: 180, height: 180, alt: "CozyJsStudio" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "CozyOverlays — Stream Overlays That Feel Alive & Cozy",
    description:
      "Animated overlay packs for Twitch, YouTube, Kick & TikTok. Etsy Star Seller · 4.9★ · 686+ sales.",
    creator: "@Cozyjsstudio",
    images: [SITE.avatar],
  },
  alternates: { canonical: SITE.url },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={poppins.variable}>
      <body className="grain min-h-screen bg-base font-sans antialiased">
        <JsonLd data={organizationLd} />
        <JsonLd data={websiteLd} />
        {children}
        <CartDrawer />
        <StarterPackPopupController />
        <GoogleAnalytics gaId="G-6GX8B1FJVT" />
      </body>
    </html>
  );
}

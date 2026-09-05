import type { Metadata, Viewport } from "next";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { WhatsAppButton } from "@/components/whatsapp-button";
import { siteConfig } from "@/data/config";
import { Providers } from "./providers";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  title: {
    default: "Sattva Skin — Lip Balms & Sugar Scrubs",
    template: "%s · Sattva Skin",
  },
  description: siteConfig.description,
  keywords: [
    "Sattva Skin",
    "Indian skincare",
    "lip balm",
    "lip scrub",
    "skin routine",
  ],
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: siteConfig.name,
    title: "Sattva Skin — Lip Balms & Sugar Scrubs",
    description: siteConfig.description,
    images: [
      {
        url: "/images/lip-care/lip-care-collection.webp",
        width: 1536,
        height: 1024,
        alt: "Sattva Skin lip balms and sugar scrubs",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sattva Skin — Lip Balms & Sugar Scrubs",
    description: siteConfig.description,
    images: ["/images/lip-care/lip-care-collection.webp"],
  },
  robots: siteConfig.catalogIsPreview
    ? { index: false, follow: false, nocache: true }
    : { index: true, follow: true },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#f7f3ec",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body>
        <Providers>
          <a className="skip-link" href="#main-content">
            Skip to content
          </a>
          <SiteHeader />
          <main id="main-content">{children}</main>
          <WhatsAppButton />
          <SiteFooter />
        </Providers>
      </body>
    </html>
  );
}

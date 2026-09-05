import type { Metadata } from "next";

import { siteConfig } from "@/data/config";

import { CartPageContent } from "./cart-page-content";

export const metadata: Metadata = {
  title: "Shopping bag",
  description: "Review the products saved in your Sattva Skin preview bag.",
  alternates: { canonical: `${siteConfig.siteUrl}/cart` },
  robots: { index: false, follow: false },
};

export default function CartPage() {
  return <CartPageContent />;
}

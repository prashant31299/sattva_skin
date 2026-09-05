import type { Metadata } from "next";

import { siteConfig } from "@/data/config";

import { CheckoutPageContent } from "./checkout-page-content";

export const metadata: Metadata = {
  title: "Checkout preview",
  description:
    "Preview the planned Sattva Skin checkout experience. Orders and payments are not currently available.",
  alternates: { canonical: `${siteConfig.siteUrl}/checkout` },
  robots: { index: false, follow: false },
};

export default function CheckoutPage() {
  return <CheckoutPageContent />;
}

import type { Metadata } from "next";

import { PolicyPage } from "@/components/policy-page";

export const metadata: Metadata = {
  title: "Terms of use",
  description:
    "Pre-launch terms status for Sattva Skin, with final website and commerce terms pending legal verification.",
};

const sections = [
  {
    title: "The site is an informational preview",
    paragraphs: [
      "Products, availability, pricing and commerce functions are not final. The preview catalog cannot currently accept an order or payment.",
      "Nothing on a preview product page should be treated as a confirmed offer, stock commitment, delivery promise or final product representation.",
    ],
  },
  {
    title: "What final terms will need to address",
    paragraphs: [
      "Website and commerce terms will be published only after the operating model and legal wording are reviewed. The finished terms may cover the subjects below, but no wording or outcome is being set by this placeholder.",
    ],
    items: [
      "Eligibility and acceptable website use",
      "Account, ordering, pricing and payment rules",
      "Product information, cancellations, shipping and returns",
      "Content ownership and permitted use",
      "Disclaimers, responsibility, disputes and applicable law",
      "Changes to the terms and verified contact information",
    ],
  },
  {
    title: "Review the final terms before purchasing",
    paragraphs: [
      "If commerce is enabled, read the terms presented at that time before placing an order. The final text—not this pre-launch summary—will describe the applicable arrangement.",
      "Operational and legal details remain subject to verification and may change before launch.",
    ],
  },
];

export default function TermsPage() {
  return (
    <PolicyPage
      slug="terms"
      eyebrow="Legal / Terms"
      title="Terms, still under review."
      intro="The finished store needs terms that match its real checkout, fulfilment and support operations. Those details have not been legally verified yet."
      statusTitle="Final website and commerce terms are pending."
      statusCopy="No final provisions on ordering, payment, content use, responsibility, disputes, governing law or support contacts are stated here. A reviewed version must replace this placeholder before launch."
      sections={sections}
      relatedLinks={[
        { href: "/privacy", label: "Privacy status" },
        { href: "/disclaimer", label: "Read the disclaimer" },
      ]}
    />
  );
}

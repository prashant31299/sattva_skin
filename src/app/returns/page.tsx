import type { Metadata } from "next";

import { PolicyPage } from "@/components/policy-page";

export const metadata: Metadata = {
  title: "Returns and refunds",
  description:
    "Pre-launch returns and refunds information for Sattva Skin, with final eligibility and procedures pending verification.",
};

const sections = [
  {
    title: "There are no site orders to return yet",
    paragraphs: [
      "The current catalog does not support checkout or payment. Because no orders can be placed through it, this site cannot currently open a return, replacement or refund request.",
      "This page is an information placeholder and is not a final returns or refund policy.",
    ],
  },
  {
    title: "What must be confirmed before launch",
    paragraphs: [
      "The brand must verify the complete process and publish it here before commerce goes live. Until then, no eligibility decision or outcome can be inferred.",
    ],
    items: [
      "Eligibility criteria, request windows and condition requirements",
      "Any exclusions for opened, used, damaged or specific product types",
      "The approved request, review, collection or return procedure",
      "Replacement, cancellation and refund methods and processing information",
    ],
  },
  {
    title: "Wait for verified instructions",
    paragraphs: [
      "Do not send a product to an address found elsewhere or assume that doing so creates a valid return. If ordering opens, use only the instructions published with the final policy or supplied through a verified brand channel.",
      "Final policy wording may differ from this overview after operational and legal review.",
    ],
  },
];

export default function ReturnsPage() {
  return (
    <PolicyPage
      slug="returns"
      eyebrow="Help / Returns"
      title="Returns, without the guesswork."
      intro="A useful returns page needs confirmed eligibility, steps and outcomes. Those operational details are not final while the store remains in preview."
      statusTitle="The returns and refunds policy is not final."
      statusCopy="Eligibility, exclusions, request windows, return instructions, replacements and refund processing details are pending brand and legal verification. This page does not promise a return, replacement or refund."
      sections={sections}
      relatedLinks={[
        { href: "/shipping", label: "Shipping preview" },
        { href: "/contact", label: "Contact Sattva Skin" },
      ]}
    />
  );
}

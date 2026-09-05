import type { Metadata } from "next";

import { PolicyPage } from "@/components/policy-page";

export const metadata: Metadata = {
  title: "Shipping information",
  description:
    "Pre-launch shipping information for Sattva Skin, with final coverage, charges and timelines pending verification.",
};

const sections = [
  {
    title: "The catalog cannot accept orders yet",
    paragraphs: [
      "Sattva Skin is currently presented as a preview catalog. Checkout, payment and fulfilment are not active, so no order can be dispatched from this site at this stage.",
      "Product pages marked as preview should not be read as confirming stock, serviceability or a delivery date.",
    ],
  },
  {
    title: "What the verified shipping page will cover",
    paragraphs: [
      "Before commerce is enabled, this page will be replaced or updated with operational information supplied and approved by the brand.",
    ],
    items: [
      "Serviceable destinations and any location restrictions",
      "Shipping charges and the conditions used to calculate them",
      "Dispatch and delivery estimates, including relevant limitations",
      "Carrier, tracking, failed-delivery and delay guidance",
    ],
  },
  {
    title: "Use launch-day information as the source of truth",
    paragraphs: [
      "Once ordering opens, review the shipping information shown at checkout and in the verified order confirmation before completing a purchase.",
      "Do not rely on assumptions, social posts or this pre-launch notice to plan a time-sensitive delivery.",
    ],
  },
];

export default function ShippingPage() {
  return (
    <PolicyPage
      slug="shipping"
      eyebrow="Help / Shipping"
      title="Shipping, before it starts moving."
      intro="The store is still in preview. Here is what can be stated clearly now—and which delivery details must wait for operational verification."
      statusTitle="Final shipping details are pending."
      statusCopy="Serviceable locations, shipping fees, carriers, dispatch estimates, delivery estimates and delay procedures have not been verified for launch. No promise about them is made on this preview page."
      sections={sections}
      relatedLinks={[
        { href: "/returns", label: "Returns preview" },
        { href: "/contact", label: "Contact Sattva Skin" },
      ]}
    />
  );
}

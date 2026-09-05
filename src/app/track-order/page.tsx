import type { Metadata } from "next";

import { PolicyPage, TrackOrderPreview } from "@/components/policy-page";

export const metadata: Metadata = {
  title: "Track an order",
  description:
    "Preview of Sattva Skin order tracking, currently disabled until ordering and fulfilment systems are verified.",
};

const sections = [
  {
    title: "A preview, not an active lookup",
    paragraphs: [
      "The fields above are shown only to make the future experience understandable. They are disabled and do not submit, search for or store an order reference.",
      "The identifiers and lookup method may change when the order system is configured.",
    ],
  },
  {
    title: "Tracking depends on verified fulfilment data",
    paragraphs: [
      "Order status, carrier events and tracking links can only be shown after checkout and fulfilment services are connected and tested. Those systems are not active in the preview catalog.",
    ],
  },
  {
    title: "Use an official route for help",
    paragraphs: [
      "If you have a question about the preview, visit the contact page for any currently configured brand channels. Do not share payment details, passwords or unrelated sensitive information.",
      "When commerce launches, the verified tracking and support instructions published at that time will be the source of truth.",
    ],
  },
];

export default function TrackOrderPage() {
  return (
    <PolicyPage
      slug="track-order"
      eyebrow="Help / Track order"
      title="Tracking starts after checkout does."
      intro="Order lookup is intentionally disabled while the catalog, checkout and fulfilment experience remain in preview."
      statusTitle="No active order tracker is connected."
      statusCopy="The store cannot accept orders yet. Tracking providers, order identifiers, status events and support procedures are pending operational verification before launch."
      sections={sections}
      relatedLinks={[
        { href: "/shipping", label: "Shipping preview" },
        { href: "/contact", label: "Visit contact" },
      ]}
    >
      <TrackOrderPreview />
    </PolicyPage>
  );
}

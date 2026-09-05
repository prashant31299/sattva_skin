import type { Metadata } from "next";

import { PolicyPage } from "@/components/policy-page";

export const metadata: Metadata = {
  title: "Disclaimer",
  description:
    "Important pre-launch context for Sattva Skin educational content and preview product information.",
};

const sections = [
  {
    title: "Educational content is not medical advice",
    paragraphs: [
      "The site, journal and routine quiz provide general educational information. They do not diagnose a skin or hair condition, assess an individual, prescribe treatment or replace advice from a qualified healthcare professional.",
      "Persistent, painful, sudden, severe or worrying concerns should be discussed with an appropriate qualified professional. Seek suitable urgent care for an emergency.",
    ],
  },
  {
    title: "Preview products are not final representations",
    paragraphs: [
      "Product names, descriptions, images and routine context are part of a pre-launch catalog. Final formulations, ingredient lists, directions, precautions, claims, pricing and availability must be supplied and verified before commerce is enabled.",
      "Do not use a preview description instead of a finished product label. If a product launches, follow its verified label, patch test before use and stop use if irritation occurs.",
    ],
  },
  {
    title: "No result is promised",
    paragraphs: [
      "Ingredient explainers and concern pages add general context; they do not guarantee a result. Individual experiences can differ, and a familiar ingredient does not describe a complete formula.",
      "External websites linked from Sattva Skin operate independently and may have their own information, terms and privacy practices.",
    ],
  },
  {
    title: "Final legal wording is still required",
    paragraphs: [
      "This page states the preview site’s current educational boundaries. It is not a substitute for a complete legal disclaimer reviewed against the finished products, operations and applicable requirements.",
      "The final legal disclaimer and verified brand contact details remain pending before launch.",
    ],
  },
];

export default function DisclaimerPage() {
  return (
    <PolicyPage
      slug="disclaimer"
      eyebrow="Legal / Disclaimer"
      title="Context matters. So do limits."
      intro="Sattva Skin is a pre-launch skincare concept. Its educational pages can offer a simpler starting point, but they cannot provide diagnosis, treatment or guaranteed results."
      statusTitle="Final legal wording is pending verification."
      statusCopy="The completed disclaimer must be reviewed against final products, claims, operations and applicable requirements. This page records clear preview boundaries without inventing final legal terms."
      sections={sections}
      relatedLinks={[
        { href: "/journal", label: "Educational journal" },
        { href: "/terms", label: "Terms status" },
      ]}
    />
  );
}

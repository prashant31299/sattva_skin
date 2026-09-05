import type { Metadata } from "next";

import { PolicyPage } from "@/components/policy-page";

export const metadata: Metadata = {
  title: "Privacy notice",
  description:
    "Pre-launch privacy notice status for Sattva Skin, with final data practices and rights information pending verification.",
};

const sections = [
  {
    title: "This is a status notice, not the final privacy notice",
    paragraphs: [
      "The site is in preview and its final commerce, customer support, analytics and marketing setup has not been confirmed. It would be misleading to describe data practices that may change before launch.",
      "Do not interpret this page as a complete statement of what information may be processed when the finished store goes live.",
    ],
  },
  {
    title: "What the verified notice will explain",
    paragraphs: [
      "A complete privacy notice will be published after the site configuration, service providers and applicable legal requirements have been reviewed.",
    ],
    items: [
      "Categories and sources of personal information",
      "Purposes and applicable legal bases for processing",
      "Service providers, disclosures and any relevant cross-border processing",
      "Retention, security, cookies, choices and applicable individual rights",
      "A verified privacy contact and procedure for requests",
    ],
  },
  {
    title: "Use external channels deliberately",
    paragraphs: [
      "Links to services such as Instagram or WhatsApp, when configured, take you to a third-party platform. That platform operates under its own terms and privacy practices.",
      "Until a verified privacy contact and request process are published, avoid sending sensitive personal, health, password or payment information through general brand channels.",
    ],
  },
];

export default function PrivacyPage() {
  return (
    <PolicyPage
      slug="privacy"
      eyebrow="Legal / Privacy"
      title="Privacy deserves verified detail."
      intro="A privacy notice should describe the systems the finished store actually uses. Those systems and legal details are still being reviewed."
      statusTitle="The final privacy notice is pending."
      statusCopy="Data categories, purposes, providers, retention, cookies, rights and a verified privacy contact have not been approved for launch. This placeholder is not a substitute for the final notice."
      sections={sections}
      relatedLinks={[
        { href: "/terms", label: "Terms status" },
        { href: "/contact", label: "Contact routes" },
      ]}
    />
  );
}

import type { Metadata } from "next";
import Link from "next/link";

import { concerns, products } from "@/data/catalog";
import { siteConfig } from "@/data/config";

import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Frequently asked questions",
  description:
    "Straightforward answers about the Sattva Skin preview catalog, routines, product use and support.",
};

const faqGroups = [
  {
    title: "Catalog & availability",
    label: "01 / Preview",
    items: [
      {
        question: "Can I buy products from the site now?",
        answer: siteConfig.catalogIsPreview
          ? "Not yet. The current catalog is a preview. Pricing and purchasing will be enabled only after final product details and availability are verified."
          : "Availability is shown on each product page. Products marked unavailable cannot currently be purchased.",
      },
      {
        question: "Why do some product details say they are pending?",
        answer:
          "The preview intentionally avoids filling gaps with unverified information. Final ingredient lists, directions, pricing and claims will be published only after they are supplied and checked by the brand.",
      },
      {
        question: "How many products are in the preview?",
        answer: `There are currently ${products.length} product concepts in the preview catalog. The range may change before launch.`,
      },
    ],
  },
  {
    title: "Building a routine",
    label: "02 / Routine",
    items: [
      {
        question: "Where should I start?",
        answer:
          "Begin with a few consistent basics: gentle cleansing, comfortable hydration and broad-spectrum sun protection during the day. Add focused steps gradually, one at a time.",
      },
      {
        question: "Does every routine need a serum?",
        answer:
          "No. A serum is an optional focused step, not a requirement for every person or every routine.",
      },
      {
        question: "Can the skin quiz tell me my skin type?",
        answer:
          "No. The quiz reflects the answers you select and offers a simple catalog-based starting point. It is non-diagnostic and does not assess a skin condition.",
      },
    ],
  },
  {
    title: "Use & safety",
    label: "03 / Care",
    items: [
      {
        question: "Should I patch test a new product?",
        answer:
          "Patch testing can be a useful precaution. Always follow the final label directions, introduce products gradually and stop use if irritation occurs.",
      },
      {
        question: "Can Sattva Skin diagnose acne, pigmentation or hair loss?",
        answer:
          "No. The site provides general skincare education and product context, not diagnosis or medical treatment. Persistent, painful, sudden or worrying concerns should be discussed with a qualified professional.",
      },
      {
        question: "Are ingredient pages a guarantee of results?",
        answer:
          "No. Ingredient pages provide general context. The complete formulation, concentration, packaging and way a product is used all matter.",
      },
    ],
  },
];

export default function FaqPage() {
  const concernQuestions = concerns.flatMap((concern) =>
    concern.faqs.map((faq) => ({ ...faq, concern })),
  );

  return (
    <div className={styles.page}>
      <header className={styles.hero}>
        <p className={styles.eyebrow}>Frequently asked</p>
        <h1>Clear answers, kept simple.</h1>
        <div>
          <p>
            Start here for the essentials on our preview catalog, building a
            routine and using product information responsibly.
          </p>
          <span>{faqGroups.length + 1} sections / {faqGroups.reduce((total, group) => total + group.items.length, concernQuestions.length)} answers</span>
        </div>
      </header>

      <div className={styles.faqSections}>
        {faqGroups.map((group) => (
          <section key={group.label} aria-labelledby={`faq-${group.label.slice(0, 2)}`}>
            <div className={styles.groupHeading}>
              <p>{group.label}</p>
              <h2 id={`faq-${group.label.slice(0, 2)}`}>{group.title}</h2>
            </div>
            <div className={styles.questions}>
              {group.items.map((item) => (
                <details key={item.question}>
                  <summary>
                    <span>{item.question}</span>
                    <span aria-hidden="true">+</span>
                  </summary>
                  <p>{item.answer}</p>
                </details>
              ))}
            </div>
          </section>
        ))}

        <section aria-labelledby="faq-concerns">
          <div className={styles.groupHeading}>
            <p>04 / Concerns</p>
            <h2 id="faq-concerns">Concern notes</h2>
          </div>
          <div className={styles.questions}>
            {concernQuestions.map(({ question, answer, concern }) => (
              <details key={`${concern.slug}-${question}`}>
                <summary>
                  <span>{question}</span>
                  <span aria-hidden="true">+</span>
                </summary>
                <p>{answer}</p>
                <Link href={`/pages/${concern.slug}`}>
                  Explore the {concern.name.toLowerCase()} routine
                </Link>
              </details>
            ))}
          </div>
        </section>
      </div>

      <section className={styles.contactCta} aria-labelledby="still-curious">
        <div>
          <p className={styles.eyebrow}>Still curious?</p>
          <h2 id="still-curious">Find the right next route.</h2>
        </div>
        <div>
          <Link href="/contact">Contact Sattva Skin</Link>
          <Link href="/journal">Read the journal</Link>
        </div>
      </section>
    </div>
  );
}

import type { ReactNode } from "react";
import Link from "next/link";

import { siteConfig } from "@/data/config";

import styles from "./policy-page.module.css";

export type InformationSection = {
  title: string;
  paragraphs: string[];
  items?: string[];
};

type PolicyPageProps = {
  slug: string;
  eyebrow: string;
  title: string;
  intro: string;
  statusTitle: string;
  statusCopy: string;
  sections: InformationSection[];
  children?: ReactNode;
  relatedLinks?: { href: string; label: string }[];
};

export function PolicyPage({
  slug,
  eyebrow,
  title,
  intro,
  statusTitle,
  statusCopy,
  sections,
  children,
  relatedLinks = [
    { href: "/faq", label: "Read the FAQ" },
    { href: "/contact", label: "Contact Sattva Skin" },
  ],
}: PolicyPageProps) {
  return (
    <div className={styles.page}>
      <header className={styles.hero}>
        <div className={styles.heroTopline}>
          <span>{siteConfig.shortName} / Information</span>
          <span>Pre-launch preview</span>
        </div>
        <p className={styles.eyebrow}>{eyebrow}</p>
        <h1>{title}</h1>
        <p className={styles.intro}>{intro}</p>
      </header>

      <aside className={styles.status} aria-labelledby={`${slug}-status-title`}>
        <p>Verification status</p>
        <div>
          <h2 id={`${slug}-status-title`}>{statusTitle}</h2>
          <p>{statusCopy}</p>
        </div>
      </aside>

      {children}

      <section className={styles.details} aria-labelledby={`${slug}-details-title`}>
        <header>
          <p className={styles.eyebrow}>What to know</p>
          <h2 id={`${slug}-details-title`}>Clear now. Complete at launch.</h2>
        </header>

        <div className={styles.sectionList}>
          {sections.map((section, index) => (
            <section
              className={styles.section}
              aria-labelledby={`${slug}-section-${index + 1}`}
              key={section.title}
            >
              <span>{String(index + 1).padStart(2, "0")}</span>
              <div>
                <h3 id={`${slug}-section-${index + 1}`}>{section.title}</h3>
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
                {section.items && (
                  <ul>
                    {section.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                )}
              </div>
            </section>
          ))}
        </div>
      </section>

      <nav className={styles.related} aria-label="Related information">
        <div>
          <p className={styles.eyebrow}>Need another route?</p>
          <h2>Keep exploring.</h2>
        </div>
        <div className={styles.relatedLinks}>
          {relatedLinks.map((link) => (
            <Link href={link.href} key={link.href}>
              {link.label}
              <span aria-hidden="true">→</span>
            </Link>
          ))}
        </div>
      </nav>
    </div>
  );
}

export function TrackOrderPreview() {
  return (
    <section className={styles.trackPreview} aria-labelledby="track-preview-title">
      <div>
        <p className={styles.eyebrow}>Order lookup</p>
        <h2 id="track-preview-title">Tracking is not active yet.</h2>
        <p id="track-preview-description">
          Orders cannot be placed through the preview catalog, so there is no
          order record to look up. This tool will be enabled only after checkout
          and the supporting order systems have been verified.
        </p>
      </div>

      <form aria-describedby="track-preview-description">
        <fieldset disabled>
          <legend>Disabled order tracking preview</legend>
          <label htmlFor="preview-order-reference">Order reference</label>
          <input
            id="preview-order-reference"
            name="order-reference"
            type="text"
            placeholder="Order reference"
          />
          <label htmlFor="preview-order-contact">Email or phone used at checkout</label>
          <input
            id="preview-order-contact"
            name="order-contact"
            type="text"
            placeholder="Email or phone"
          />
          <button type="button">Track order — coming later</button>
        </fieldset>
        <p>
          Need help with something else? <Link href="/contact">Visit contact</Link>.
        </p>
      </form>
    </section>
  );
}

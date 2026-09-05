import type { Metadata } from "next";
import Link from "next/link";

import { siteConfig } from "@/data/config";

import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Find the official Sattva Skin contact channels and useful links for product, routine and order questions.",
};

export default function ContactPage() {
  const whatsappNumber = siteConfig.whatsappNumber.replace(/\D/g, "");
  const instagramHandle = siteConfig.instagramHandle.replace(/^@/, "");
  const hasDirectChannel = Boolean(whatsappNumber || instagramHandle);

  return (
    <div className={styles.page}>
      <header className={styles.hero}>
        <p className={styles.eyebrow}>Contact</p>
        <h1>Let&apos;s keep the conversation clear.</h1>
        <p>
          Questions about a preview product, where to begin, or what information
          will be available at launch? Start with the routes below.
        </p>
      </header>

      <section className={styles.channels} aria-labelledby="contact-channels">
        <div className={styles.channelHeading}>
          <p className={styles.eyebrow}>Official channels</p>
          <h2 id="contact-channels">Reach Sattva Skin</h2>
        </div>

        <div className={styles.channelList}>
          {whatsappNumber && (
            <a
              href={`https://wa.me/${whatsappNumber}`}
              target="_blank"
              rel="noreferrer"
            >
              <span>01</span>
              <strong>WhatsApp</strong>
              <span aria-hidden="true">↗</span>
            </a>
          )}
          {instagramHandle && (
            <a
              href={`https://instagram.com/${instagramHandle}`}
              target="_blank"
              rel="noreferrer"
            >
              <span>{whatsappNumber ? "02" : "01"}</span>
              <strong>@{instagramHandle}</strong>
              <span aria-hidden="true">↗</span>
            </a>
          )}
          {!hasDirectChannel && (
            <div className={styles.pendingChannel}>
              <span>Before launch</span>
              <strong>Verified contact details are coming soon.</strong>
              <p>
                We will publish official direct-contact channels here once they
                have been configured by the brand.
              </p>
            </div>
          )}
        </div>
      </section>

      <section className={styles.help} aria-labelledby="help-title">
        <header>
          <p className={styles.eyebrow}>Find an answer now</p>
          <h2 id="help-title">The useful shortcuts.</h2>
        </header>
        <div className={styles.helpGrid}>
          <article>
            <span>Routine questions</span>
            <h3>Not sure where to start?</h3>
            <p>
              Answer six simple questions for a non-diagnostic AM and PM starting
              point based on the Sattva preview catalog.
            </p>
            <Link href="/pages/skin-quiz">Take the routine quiz</Link>
          </article>
          <article>
            <span>Product information</span>
            <h3>Looking for the fine print?</h3>
            <p>
              Browse usage context, ingredients and current availability for each
              catalog concept.
            </p>
            <Link href="/shop">Explore the preview</Link>
          </article>
          <article>
            <span>Common questions</span>
            <h3>Need a quick explanation?</h3>
            <p>
              Read what preview status means, how to introduce products and when
              to seek professional guidance.
            </p>
            <Link href="/faq">Visit the FAQ</Link>
          </article>
        </div>
      </section>

      <aside className={styles.safety} aria-labelledby="contact-safety">
        <p className={styles.eyebrow}>Important</p>
        <h2 id="contact-safety">Skincare support is not emergency care.</h2>
        <p>
          For severe, sudden or worrying symptoms, contact an appropriate local
          healthcare service. Brand channels cannot diagnose or provide emergency
          medical advice.
        </p>
      </aside>
    </div>
  );
}

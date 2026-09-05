import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { ingredients } from "@/data/catalog";
import { siteConfig } from "@/data/config";

import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "About",
  description:
    "Meet Sattva Skin: a skincare concept being built around clarity, considered routines and everyday Indian skin concerns.",
};

const principles = [
  {
    number: "01",
    title: "Clarity before clutter",
    copy: "Every product should have a clear place in the routine, with straightforward context around who it may suit and how it is intended to be used.",
  },
  {
    number: "02",
    title: "Familiar, seen afresh",
    copy: "We approach culturally familiar botanicals with respect for the complete formula, avoiding the idea that one headline ingredient can tell the whole story.",
  },
  {
    number: "03",
    title: "Realistic by design",
    copy: "Skincare can support an everyday routine. It should not pretend to diagnose concerns or replace advice from a qualified professional.",
  },
];

export default function AboutPage() {
  return (
    <div className={styles.page}>
      <section className={styles.hero} aria-labelledby="about-title">
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow}>About Sattva Skin</p>
          <h1 id="about-title">Rooted in clarity.</h1>
          <p>
            {siteConfig.description} We are shaping a smaller, more considered
            way to find your everyday essentials.
          </p>
        </div>
        <div className={styles.heroImage}>
          <Image
            src="/images/sattva-hero.webp"
            alt="Sattva Skin concept products in a warm botanical setting"
            fill
            loading="eager"
            fetchPriority="high"
            sizes="(max-width: 800px) 100vw, 46vw"
            style={{ objectFit: "cover", objectPosition: "center" }}
          />
          <span>Care / with context</span>
        </div>
      </section>

      <section className={styles.statement} aria-labelledby="what-we-are-building">
        <p className={styles.eyebrow}>What we are building</p>
        <h2 id="what-we-are-building">
          Less noise between your concern and your routine.
        </h2>
        <div>
          <p>
            Sattva Skin begins with the questions people actually bring to the
            mirror: Where do I start? Which step belongs where? What can I keep
            simple?
          </p>
          <p>
            Our preview catalog is organised around those questions. Final
            formulations, labels, pricing and availability will be published only
            after brand verification.
          </p>
        </div>
      </section>

      <section className={styles.principles} aria-labelledby="principles-title">
        <header>
          <p className={styles.eyebrow}>The working principles</p>
          <h2 id="principles-title">A considered start.</h2>
        </header>
        <div className={styles.principleGrid}>
          {principles.map((principle) => (
            <article key={principle.number}>
              <span>{principle.number}</span>
              <h3>{principle.title}</h3>
              <p>{principle.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.botanicals} aria-labelledby="botanical-title">
        <div className={styles.botanicalIntro}>
          <p className={styles.eyebrow}>The ingredient edit</p>
          <h2 id="botanical-title">Known names. Better questions.</h2>
          <p>
            We use ingredient stories to add context—not to make stand-alone
            promises. The finished formula and label always matter more than a
            familiar name.
          </p>
          <Link href="/ingredients">Explore all ingredients</Link>
        </div>
        <ol>
          {ingredients.map((ingredient) => (
            <li key={ingredient.slug}>
              <Link href={`/ingredients/${ingredient.slug}`}>
                <span>{ingredient.eyebrow.replace("Botanical ", "")}</span>
                <strong>{ingredient.name}</strong>
                <span aria-hidden="true">↗</span>
              </Link>
            </li>
          ))}
        </ol>
      </section>

      <section className={styles.closing} aria-labelledby="find-routine">
        <div>
          <p className={styles.eyebrow}>Start small</p>
          <h2 id="find-routine">Find a simple place to begin.</h2>
        </div>
        <div className={styles.actions}>
          <Link href="/pages/skin-quiz">Take the routine quiz</Link>
          <Link href="/shop">Explore the preview</Link>
        </div>
      </section>
    </div>
  );
}

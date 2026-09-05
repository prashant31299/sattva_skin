import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { journalArticles } from "./_data";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Journal",
  description:
    "Educational sample reads about simple skincare routines, thoughtful product use and ingredient literacy.",
};

export default function JournalPage() {
  const [featured, ...articles] = journalArticles;

  return (
    <div className={styles.page}>
      <header className={styles.hero}>
        <p className={styles.eyebrow}>Sattva journal</p>
        <div>
          <h1>A quieter read on everyday skin.</h1>
          <p>
            Clear, educational notes for building a considered routine—without
            treating more information as more skincare.
          </p>
        </div>
        <p className={styles.issue}>Notes / 001</p>
      </header>

      <section className={styles.disclaimer} aria-label="Editorial disclaimer">
        <strong>Educational sample content</strong>
        <p>
          These articles are general education, not medical advice. They do not
          diagnose skin or replace guidance from a qualified professional.
        </p>
      </section>

      <section className={styles.featured} aria-labelledby="featured-title">
        <div className={styles.featuredImage}>
          <Image
            src={featured.image}
            alt="Sattva Skin routine concepts arranged on a surface"
            fill
            loading="eager"
            fetchPriority="high"
            sizes="(max-width: 760px) 100vw, 55vw"
            style={{ objectFit: "cover", objectPosition: featured.imagePosition }}
          />
          <span>{featured.publishedLabel}</span>
        </div>
        <article>
          <div className={styles.meta}>
            <span>{featured.category}</span>
            <span>{featured.readTime}</span>
          </div>
          <h2 id="featured-title">{featured.title}</h2>
          <p>{featured.dek}</p>
          <Link href={`/journal/${featured.slug}`}>
            Read the note <span aria-hidden="true">↗</span>
          </Link>
        </article>
      </section>

      <section className={styles.latest} aria-labelledby="latest-title">
        <div className={styles.sectionHeading}>
          <p className={styles.eyebrow}>Latest notes</p>
          <h2 id="latest-title">Read, then simplify.</h2>
        </div>

        <div className={styles.articleGrid}>
          {articles.map((article, index) => (
            <article key={article.slug}>
              <div className={styles.articleImage}>
                <Image
                  src={article.image}
                  alt=""
                  fill
                  sizes="(max-width: 760px) 100vw, 50vw"
                  style={{ objectFit: "cover", objectPosition: article.imagePosition }}
                />
                <span>0{index + 2}</span>
              </div>
              <div className={styles.meta}>
                <span>{article.category}</span>
                <span>{article.readTime}</span>
              </div>
              <h3>{article.title}</h3>
              <p>{article.dek}</p>
              <Link href={`/journal/${article.slug}`}>
                Read educational sample <span aria-hidden="true">→</span>
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.quizCta} aria-labelledby="journal-quiz-title">
        <div>
          <p className={styles.eyebrow}>Prefer a starting point?</p>
          <h2 id="journal-quiz-title">Six questions. One simple routine.</h2>
        </div>
        <Link href="/pages/skin-quiz">Take the routine quiz</Link>
      </section>
    </div>
  );
}

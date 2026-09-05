import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { getJournalArticle, journalArticles } from "../_data";
import styles from "./page.module.css";

type JournalArticlePageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return journalArticles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({
  params,
}: JournalArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getJournalArticle(slug);

  if (!article) return { title: "Article not found" };

  return {
    title: article.title,
    description: article.dek,
  };
}

export default async function JournalArticlePage({
  params,
}: JournalArticlePageProps) {
  const { slug } = await params;
  const article = getJournalArticle(slug);

  if (!article) notFound();

  const nextArticle =
    journalArticles[
      (journalArticles.findIndex((item) => item.slug === article.slug) + 1) %
        journalArticles.length
    ];

  return (
    <div className={styles.page}>
      <article>
        <header className={styles.hero}>
          <div className={styles.topline}>
            <Link href="/journal">Journal</Link>
            <span>{article.publishedLabel}</span>
          </div>
          <div className={styles.meta}>
            <span>{article.category}</span>
            <span>{article.readTime}</span>
          </div>
          <h1>{article.title}</h1>
          <p>{article.dek}</p>
        </header>

        <div className={styles.heroImage}>
          <Image
            src={article.image}
            alt="Sattva Skin editorial still life"
            fill
            loading="eager"
            fetchPriority="high"
            sizes="100vw"
            style={{ objectFit: "cover", objectPosition: article.imagePosition }}
          />
        </div>

        <aside className={styles.disclaimer} aria-label="Important note">
          <strong>Before you read</strong>
          <p>
            This is educational sample content, not medical advice. It cannot
            diagnose a concern or replace care from a qualified professional.
          </p>
        </aside>

        <div className={styles.articleBody}>
          <nav aria-label="Article contents">
            <span>In this note</span>
            <ol>
              {article.sections.map((section) => (
                <li key={section.heading}>
                  <a href={`#${toId(section.heading)}`}>{section.heading}</a>
                </li>
              ))}
            </ol>
          </nav>

          <div className={styles.prose}>
            {article.sections.map((section, index) => (
              <section id={toId(section.heading)} key={section.heading}>
                <span>0{index + 1}</span>
                <h2>{section.heading}</h2>
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
                {section.points && (
                  <ul>
                    {section.points.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
          </div>
        </div>
      </article>

      <aside className={styles.nextRead} aria-labelledby="next-read-title">
        <div>
          <p>Continue reading</p>
          <h2 id="next-read-title">{nextArticle.title}</h2>
        </div>
        <Link href={`/journal/${nextArticle.slug}`}>
          Next note <span aria-hidden="true">→</span>
        </Link>
      </aside>
    </div>
  );
}

function toId(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

import type { CSSProperties } from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ProductGrid } from "@/components/product-grid";
import { concerns, getConcern, getIngredient, getProduct } from "@/data/catalog";
import { siteConfig } from "@/data/config";
import type { Product } from "@/data/types";

import styles from "./concern.module.css";

type ConcernPageProps = {
  params: Promise<{ slug: string }>;
};

const visualByConcern: Record<string, { src: string; position: string }> = {
  "acne-pimples": { src: "/images/neem-editorial.webp", position: "center" },
  "oily-skin": { src: "/images/neem-editorial.webp", position: "center" },
  "dry-skin": { src: "/images/sattva-hero.webp", position: "62% center" },
  "dull-skin": { src: "/images/sattva-hero.webp", position: "62% center" },
  pigmentation: { src: "/images/sattva-hero.webp", position: "62% center" },
  "hair-fall": { src: "/images/routine-lineup.webp", position: "center" },
  "dry-lips": { src: "/images/lip-care/lip-care-collection.webp", position: "70% center" },
};

export function generateStaticParams() {
  return concerns.map((concern) => ({ slug: concern.slug }));
}

export async function generateMetadata({ params }: ConcernPageProps): Promise<Metadata> {
  const { slug } = await params;
  const concern = getConcern(slug);

  if (!concern) {
    return { title: "Concern guide not found" };
  }

  const canonical = `${siteConfig.siteUrl}/pages/${concern.slug}`;
  const visual = visualByConcern[concern.slug] ?? visualByConcern["dry-skin"];

  return {
    title: `${concern.name} skincare routine`,
    description: concern.description,
    alternates: { canonical },
    openGraph: {
      title: `${concern.title} | Sattva Skin`,
      description: concern.description,
      url: canonical,
      images: [{ url: visual.src, alt: `${concern.name} routine editorial` }],
    },
  };
}

export default async function ConcernPage({ params }: ConcernPageProps) {
  const { slug } = await params;
  const concern = getConcern(slug);

  if (!concern) {
    notFound();
  }

  const concernProducts = concern.products
    .map((productSlug) => getProduct(productSlug))
    .filter((product): product is Product => Boolean(product));
  const ingredientNames = Array.from(
    new Set(concernProducts.flatMap((product) => product.ingredients)),
  );
  const visual = visualByConcern[concern.slug] ?? visualByConcern["dry-skin"];
  const currentIndex = concerns.findIndex((item) => item.slug === concern.slug);
  const nextConcerns = [
    concerns[(currentIndex + 1) % concerns.length],
    concerns[(currentIndex + 2) % concerns.length],
    concerns[(currentIndex + 3) % concerns.length],
  ];
  const accentStyle = { "--concern-accent": concern.accent } as CSSProperties;

  return (
    <div className={styles.page} style={accentStyle}>
      <nav className={styles.breadcrumbs} aria-label="Breadcrumb">
        <ol>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/shop">Shop by concern</Link>
          </li>
          <li aria-current="page">{concern.name}</li>
        </ol>
      </nav>

      <section className={styles.hero} aria-labelledby="concern-title">
        <div className={styles.heroCopy}>
          <p className={styles.heroIndex}>
            <span>Concern {String(currentIndex + 1).padStart(2, "0")}</span>
            <span>{concern.note}</span>
          </p>
          <p className={styles.eyebrow}>Start with what you want to solve</p>
          <h1 id="concern-title">{concern.title}</h1>
          <p className={styles.heroDescription}>{concern.description}</p>
          <div className={styles.heroActions}>
            <a className={styles.primaryAction} href="#recommended-products">
              {concernProducts.length ? "Shop the routine" : "View the routine"}
              <span aria-hidden="true">↓</span>
            </a>
            <Link className={styles.textAction} href="/shop">
              Browse all products <span aria-hidden="true">↗</span>
            </Link>
          </div>
          <p className={styles.scopeNote}>
            Cosmetic skincare guidance only. This page does not diagnose or treat a medical
            condition.
          </p>
        </div>

        <div className={styles.heroVisual}>
          <div className={styles.heroWord} aria-hidden="true">
            {concern.note}
          </div>
          <Image
            src={visual.src}
            alt={`${concern.name} routine editorial with realistic skincare textures`}
            fill
            loading="eager"
            fetchPriority="high"
            sizes="(max-width: 899px) 100vw, 50vw"
            style={{ objectPosition: visual.position }}
          />
          <span className={`${styles.visualTag} ${styles.tagOne}`}>Simple steps</span>
          <span className={`${styles.visualTag} ${styles.tagTwo}`}>Everyday care</span>
          <span className={styles.visualFootnote}>Concern guide / Sattva Skin</span>
        </div>
      </section>

      <section className={styles.routine} aria-labelledby="routine-title">
        <div className={styles.routineHeading}>
          <p className={styles.eyebrow}>A routine you can read at a glance</p>
          <h2 id="routine-title">Fewer steps. A clearer rhythm.</h2>
          <p>
            Keep the foundation consistent before adding complexity. Introduce one new
            product at a time and follow its verified label directions.
          </p>
        </div>

        <div className={styles.routineCards}>
          <article>
            <div className={styles.routineCardTopline}>
              <span>AM</span>
              <span>Morning / daily</span>
            </div>
            <h3>Prepare for the day.</h3>
            <ol>
              {concern.morning.map((step, index) => (
                <li key={`${step}-${index}`}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  {step}
                </li>
              ))}
            </ol>
          </article>

          <article>
            <div className={styles.routineCardTopline}>
              <span>PM</span>
              <span>Evening / reset</span>
            </div>
            <h3>Return to the essentials.</h3>
            <ol>
              {concern.evening.map((step, index) => (
                <li key={`${step}-${index}`}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  {step}
                </li>
              ))}
            </ol>
          </article>
        </div>
      </section>

      <section
        className={styles.recommended}
        id="recommended-products"
        aria-labelledby="recommended-title"
      >
        <div className={styles.sectionHeading}>
          <div>
            <p className={styles.eyebrow}>Selected for {concern.name.toLocaleLowerCase()}</p>
            <h2 id="recommended-title">The recommended edit.</h2>
          </div>
          <p>
            Explore the collection and contact us for current pricing and availability.
          </p>
        </div>

        <ProductGrid
          products={concernProducts}
          emptyTitle={`The ${concern.name.toLocaleLowerCase()} range is being prepared.`}
          emptyMessage="No product is being presented as available before its final formula, price and label are confirmed."
        />

        {!concernProducts.length ? (
          <Link className={styles.emptyAction} href="/shop">
            Explore the current preview <span aria-hidden="true">↗</span>
          </Link>
        ) : null}
      </section>

      <section className={styles.ingredients} aria-labelledby="ingredient-title">
        <div className={styles.ingredientVisual}>
          <Image
            src={concern.slug === "dry-lips" ? "/images/lip-care/lip-balm-base.webp" : "/images/neem-editorial.webp"}
            alt={concern.slug === "dry-lips" ? "Lip balm base infographic with shea butter, coconut oil and beeswax" : "Botanical leaf and skincare texture in an editorial still life"}
            fill
            sizes="(max-width: 799px) 100vw, 45vw"
          />
          <span>Texture / botanical / purpose</span>
        </div>

        <div className={styles.ingredientCopy}>
          <p className={styles.eyebrow}>Ingredient direction</p>
          <h2 id="ingredient-title">Purpose before the ingredient trend.</h2>
          <p>
            Explore the ingredient story behind the collection. Read each product label for the complete ingredient list and directions.
          </p>

          {ingredientNames.length ? (
            <ul>
              {ingredientNames.map((name, index) => {
                const ingredient = getIngredient(
                  name.toLocaleLowerCase().replaceAll(" ", "-"),
                );

                return (
                  <li key={name}>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    {ingredient ? (
                      <Link href={`/ingredients/${ingredient.slug}`}>
                        {name} <span aria-hidden="true">↗</span>
                      </Link>
                    ) : (
                      name
                    )}
                  </li>
                );
              })}
            </ul>
          ) : (
            <p className={styles.ingredientPending}>
              Ingredient details will be added with the verified product range.
            </p>
          )}
        </div>
      </section>

      <section className={styles.questions} aria-labelledby="questions-title">
        <div className={styles.questionsHeading}>
          <p className={styles.eyebrow}>Common questions</p>
          <h2 id="questions-title">A little more clarity.</h2>
          <p>
            If a concern is persistent, painful or changes suddenly, speak with a qualified
            healthcare professional.
          </p>
        </div>

        <div className={styles.questionList}>
          {concern.faqs.map((faq, index) => (
            <details key={faq.question} open={index === 0}>
              <summary>
                {faq.question}
                <span aria-hidden="true">+</span>
              </summary>
              <p>{faq.answer}</p>
            </details>
          ))}
          <details>
            <summary>
              Where are customer reviews?
              <span aria-hidden="true">+</span>
            </summary>
            <p>
              Authentic reviews will appear after verified customers have used the final
              products. We do not use placeholder testimonials or fabricated results.
            </p>
          </details>
        </div>
      </section>

      <section className={styles.nextConcerns} aria-labelledby="next-concerns-title">
        <div>
          <p className={styles.eyebrow}>Your skin may be asking something else</p>
          <h2 id="next-concerns-title">Explore another concern.</h2>
        </div>
        <ul>
          {nextConcerns.map((item, index) => (
            <li key={item.slug} style={{ "--item-accent": item.accent } as CSSProperties}>
              <Link href={`/pages/${item.slug}`}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{item.name}</strong>
                <em>{item.note}</em>
                <span aria-hidden="true">↗</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

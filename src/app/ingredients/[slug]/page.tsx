import type { Metadata } from "next";
import type { CSSProperties } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";

import { concerns, getIngredient, ingredients, products } from "@/data/catalog";

import styles from "./page.module.css";

type IngredientPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return ingredients.map((ingredient) => ({ slug: ingredient.slug }));
}

export async function generateMetadata({
  params,
}: IngredientPageProps): Promise<Metadata> {
  const { slug } = await params;
  const ingredient = getIngredient(slug);

  if (!ingredient) {
    return { title: "Ingredient not found" };
  }

  return {
    title: `${ingredient.name} | Ingredients`,
    description: ingredient.description,
  };
}

export default async function IngredientPage({ params }: IngredientPageProps) {
  const { slug } = await params;
  const ingredient = getIngredient(slug);

  if (!ingredient) notFound();

  const relatedProducts = products.filter((product) =>
    product.ingredients.some(
      (name) => name.toLowerCase() === ingredient.name.toLowerCase(),
    ),
  );
  const relatedConcernSlugs = Array.from(
    new Set(relatedProducts.flatMap((product) => product.concerns)),
  );
  const relatedConcerns = concerns.filter((concern) =>
    relatedConcernSlugs.includes(concern.slug),
  );

  return (
    <div
      className={styles.page}
      style={{ "--ingredient-tone": ingredient.tone } as CSSProperties}
    >
      <section className={styles.hero} aria-labelledby="ingredient-name">
        <div className={styles.heroTopline}>
          <Link href="/ingredients">Ingredients</Link>
          <span>{ingredient.eyebrow}</span>
        </div>
        <div className={styles.heroGrid}>
          <div>
            <p className={styles.kicker}>Meet the ingredient</p>
            <h1 id="ingredient-name">{ingredient.name}</h1>
            <p className={styles.lede}>{ingredient.description}</p>
          </div>
          <div className={styles.mark} aria-hidden="true">
            <span>{ingredient.name.slice(0, 1)}</span>
          </div>
        </div>
      </section>

      <section className={styles.context} aria-labelledby="role-title">
        <div className={styles.contextIntro}>
          <p className={styles.kicker}>In the routine</p>
          <h2 id="role-title">A considered supporting role.</h2>
        </div>
        <div className={styles.contextCopy}>
          <p>
            {ingredient.description} Explore its place in the collection below.
          </p>
          <ul>
            {ingredient.usedFor.map((use) => (
              <li key={use}>{use}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className={styles.related} aria-labelledby="related-title">
        <div className={styles.sectionHeading}>
          <p className={styles.kicker}>The Sattva collection</p>
          <h2 id="related-title">Where it appears</h2>
        </div>

        {relatedProducts.length > 0 ? (
          <div className={styles.productGrid}>
            {relatedProducts.map((product) => (
              <article key={product.slug}>
                <div>
                  <p>{product.category}</p>
                  <span>{product.available ? "Available" : "Preview"}</span>
                </div>
                <h3>{product.name}</h3>
                <p>{product.shortDescription}</p>
                <Link href={`/products/${product.slug}`}>
                  View product <span aria-hidden="true">→</span>
                </Link>
              </article>
            ))}
          </div>
        ) : (
          <div className={styles.emptyState}>
            <p>
              This botanical is being considered for a future range. No linked
              product has been published yet.
            </p>
            <Link href="/shop">Explore the current preview</Link>
          </div>
        )}
      </section>

      {relatedConcerns.length > 0 && (
        <nav className={styles.concernLinks} aria-label="Related skin concerns">
          <span>Explore related routines</span>
          <div>
            {relatedConcerns.map((concern) => (
              <Link key={concern.slug} href={`/pages/${concern.slug}`}>
                {concern.name}
              </Link>
            ))}
          </div>
        </nav>
      )}

      <aside className={styles.note} aria-labelledby="important-note">
        <p className={styles.kicker}>Good to know</p>
        <h2 id="important-note">Read the complete label.</h2>
        <p>
          Final ingredient lists and directions are still being verified for the
          preview catalog. Check the finished product label, patch test before use
          and stop if irritation occurs.
        </p>
      </aside>
    </div>
  );
}

import type { Metadata } from "next";
import type { CSSProperties } from "react";
import Link from "next/link";

import { ingredients, products } from "@/data/catalog";

import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Ingredients",
  description:
    "Explore the ingredient bases and signature variants of Sattva Skin lip balms and sugar scrubs.",
};

export default function IngredientsPage() {
  return (
    <div className={styles.page}>
      <section className={styles.hero} aria-labelledby="ingredients-title">
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow}>The ingredient edit</p>
          <h1 id="ingredients-title">Familiar roots, considered formulas.</h1>
          <p className={styles.intro}>
            Get to know our buttery bases and signature notes, starting with shea butter, coconut oil, beeswax and sugar.
          </p>
        </div>
        <aside className={styles.heroNote} aria-label="Our ingredient approach">
          <span>Our approach</span>
          <p>
            Ingredient stories are context, not promises. Always use the final
            product label as the source of truth.
          </p>
        </aside>
      </section>

      <section className={styles.collection} aria-labelledby="ingredient-collection">
        <div className={styles.sectionHeading}>
          <div>
            <p className={styles.eyebrow}>Ingredient index</p>
            <h2 id="ingredient-collection">Explore the edit</h2>
          </div>
          <p>{ingredients.length.toString().padStart(2, "0")} ingredients</p>
        </div>

        <div className={styles.grid}>
          {ingredients.map((ingredient, index) => {
            const productCount = products.filter((product) =>
              product.ingredients.some(
                (name) => name.toLowerCase() === ingredient.name.toLowerCase(),
              ),
            ).length;

            return (
              <article
                className={styles.card}
                key={ingredient.slug}
                style={{ "--ingredient-tone": ingredient.tone } as CSSProperties}
              >
                <div className={styles.cardTopline}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <span>{ingredient.eyebrow}</span>
                </div>
                <div className={styles.botanicalMark} aria-hidden="true">
                  {ingredient.name.slice(0, 1)}
                </div>
                <div className={styles.cardBody}>
                  <h3>{ingredient.name}</h3>
                  <p>{ingredient.description}</p>
                  <ul aria-label={`${ingredient.name} routine roles`}>
                    {ingredient.usedFor.map((use) => (
                      <li key={use}>{use}</li>
                    ))}
                  </ul>
                </div>
                <Link href={`/ingredients/${ingredient.slug}`}>
                  Explore ingredient
                  <span aria-hidden="true">↗</span>
                </Link>
                <p className={styles.productCount}>
                  {productCount > 0
                    ? `${productCount} ${productCount === 1 ? "product" : "products"}`
                    : "Future range"}
                </p>
              </article>
            );
          })}
        </div>
      </section>

      <section className={styles.closing} aria-labelledby="ingredient-context">
        <p className={styles.eyebrow}>A useful reminder</p>
        <h2 id="ingredient-context">The whole formula matters.</h2>
        <p>
          A familiar ingredient does not tell the whole story. Concentration,
          formulation, packaging and how you use a product all matter. Introduce
          new products gradually and patch test before use.
        </p>
        <Link href="/journal/reading-skincare-labels">
          Read our label guide <span aria-hidden="true">→</span>
        </Link>
      </section>
    </div>
  );
}

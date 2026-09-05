"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import type { Product } from "@/data/types";
import styles from "./lip-formula.module.css";

const ingredients = [
  { name: "Shea butter", slug: "shea-butter", role: "The rich, buttery texture." },
  { name: "Coconut oil", slug: "coconut-oil", role: "A smooth glide in every pot." },
  { name: "Beeswax", slug: "beeswax", role: "The structure that brings it together." },
  { name: "Sugar", slug: "sugar", role: "Fine polishing grains, only in our scrubs." },
];

export function LipFormula({ product }: { product?: Product }) {
  const [format, setFormat] = useState<"balm" | "scrub">("balm");
  const isScrub = product ? product.productType === "Lip Scrub" : format === "scrub";
  const recipe = ingredients.slice(0, isScrub ? 4 : 3);
  const image = product?.ingredientGraphic ?? `/images/lip-care/lip-${isScrub ? "scrub" : "balm"}-base.webp`;
  const headingId = product ? "product-formula-title" : "formula-title";

  return (
    <section className={styles.section} id="formula" aria-labelledby={headingId}>
      <div className={`container ${styles.layout}`}>
        <div className={styles.copy}>
          <p className="eyebrow">{product ? "The ingredient story" : "Inside every pot"}</p>
          <h2 id={headingId}>
            {product ? <>{product.variant}.<br /><span>At the heart.</span></> : <>Good things.<br /><span>In every pot.</span></>}
          </h2>
          <p className={styles.intro}>
            {product
              ? `${product.variant} leads the story. ${isScrub ? "Sugar adds a little polish to" : "Everyday comfort starts with"} our shared base of shea butter, coconut oil and beeswax.`
              : "One buttery base. Two different textures. Explore what goes into our everyday balms and sugar scrubs."}
          </p>
          {!product && (
            <div className={styles.toggle} aria-label="Choose an ingredient base">
              <button type="button" aria-pressed={!isScrub} onClick={() => setFormat("balm")}>Lip balm <span>03 ingredients</span></button>
              <button type="button" aria-pressed={isScrub} onClick={() => setFormat("scrub")}>Lip scrub <span>04 ingredients</span></button>
            </div>
          )}
          <ol className={styles.recipe} aria-label={`${isScrub ? "Lip scrub" : "Lip balm"} base ingredients`}>
            {recipe.map((ingredient, index) => (
              <li key={ingredient.slug}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <div><Link href={`/ingredients/${ingredient.slug}`}>{ingredient.name} <ArrowUpRight size={14} aria-hidden="true" /></Link><p>{ingredient.role}</p></div>
              </li>
            ))}
          </ol>
          <p className={styles.note}>Base ingredients shown. See each product label for the complete ingredient list.</p>
        </div>
        <figure className={styles.visual}>
          <Image src={image} alt={product?.imageAlts?.[1] ?? `${isScrub ? "Lip scrub" : "Lip balm"} ingredient infographic showing ${recipe.map((item) => item.name.toLowerCase()).join(", ")}`} width={1254} height={1254} sizes="(max-width: 800px) 100vw, 52vw" />
          <figcaption><span>Formula file / {isScrub ? "02" : "01"}</span><a href={image} download>Save infographic <ArrowUpRight size={14} aria-hidden="true" /></a></figcaption>
        </figure>
      </div>
    </section>
  );
}

"use client";

import Image from "next/image";
import { useState } from "react";
import type { Product } from "@/data/types";
import styles from "./product-gallery.module.css";

export function ProductGallery({ product }: { product: Product }) {
  const [active, setActive] = useState(0);
  const labels = ["Product & ingredients", "Ingredient story", "Original photograph"];
  return (
    <section className={styles.gallery} aria-label={`${product.name} image gallery`}>
      <figure className={styles.figure}>
        <a href={product.images[active]} target="_blank" rel="noreferrer" aria-label={`Open ${labels[active]?.toLowerCase() ?? "image"} of ${product.name} at full size`}>
          <Image src={product.images[active]} alt={product.imageAlts?.[active] ?? product.name} fill loading="eager" fetchPriority={active === 0 ? "high" : "auto"} sizes="(max-width: 799px) 92vw, 52vw" className={styles.mainImage} />
        </a>
        <figcaption aria-live="polite"><span>{labels[active]}</span><a href={product.images[active]} target="_blank" rel="noreferrer">Full image ↗</a><span>{String(active + 1).padStart(2, "0")} / {String(product.images.length).padStart(2, "0")}</span></figcaption>
      </figure>
      <div className={styles.thumbnails} aria-label="Choose a product image">
        {product.images.map((src, index) => (
          <button key={src} type="button" onClick={() => setActive(index)} aria-pressed={active === index} aria-label={`Show ${labels[index]?.toLowerCase() ?? `image ${index + 1}`}`}>
            <span><Image src={src} alt="" fill loading="eager" sizes="(max-width: 799px) 28vw, 16vw" /></span>
            <small>{labels[index]}</small>
          </button>
        ))}
      </div>
    </section>
  );
}

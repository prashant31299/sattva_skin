import Image from "next/image";
import Link from "next/link";

import { AddToCartButton } from "@/components/cart/add-to-cart-button";
import type { Product } from "@/data/types";

import styles from "./product-card.module.css";

type ProductCardProps = {
  product: Product;
};

export function ProductCard({ product }: ProductCardProps) {
  const primaryImage = product.images[0];
  const secondaryImage = product.images[1];
  const productHref = `/products/${product.slug}`;

  return (
    <article className={styles.card}>
      <Link
        className={styles.mediaLink}
        href={productHref}
        aria-label={`View ${product.name}`}
      >
        <span className={styles.media}>
          {primaryImage ? (
            <Image
              className={styles.primaryImage}
              src={primaryImage}
              alt={product.imageAlts?.[0] ?? product.name}
              fill
              loading="lazy"
              sizes="(max-width: 639px) 50vw, (max-width: 1023px) 33vw, 33vw"
              style={{ objectPosition: product.imagePosition ?? "center" }}
            />
          ) : (
            <span className={styles.imageFallback} aria-hidden="true">
              SATTVA
            </span>
          )}

          {secondaryImage ? (
            <Image
              className={styles.secondaryImage}
              src={secondaryImage}
              alt=""
              aria-hidden="true"
              fill
              sizes="(max-width: 639px) 50vw, (max-width: 1023px) 33vw, 33vw"
            />
          ) : null}

          <span className={styles.mediaTopline}>
            <span className={styles.previewBadge}>{product.productType ?? product.category}</span>
            <span className={styles.viewCue} aria-hidden="true">
              View&nbsp; ↗
            </span>
          </span>

          {product.badges?.[0] ? (
            <span className={styles.stepBadge}>{product.badges[0]}</span>
          ) : null}
        </span>
      </Link>

      <div className={styles.body}>
        <div className={styles.metaLine}>
          <span>{product.variant ?? product.category}</span>
          {product.rating && product.reviewCount ? (
            <span aria-label={`${product.rating} out of 5 from ${product.reviewCount} reviews`}>
              ★ {product.rating.toFixed(1)}
            </span>
          ) : (
            <span>{product.size}</span>
          )}
        </div>

        <h3 className={styles.title}>
          <Link href={productHref}>{product.name}</Link>
        </h3>

        <p className={styles.description}>{product.shortDescription}</p>

        <div className={styles.ingredients} aria-label="Featured ingredients">
          {product.ingredients.slice(0, 2).map((ingredient) => (
            <span key={ingredient}>{ingredient}</span>
          ))}
        </div>

        <div className={styles.purchaseRow}>
          <div className={styles.priceBlock}>
            <span className={styles.priceLabel}>Price</span>
            <strong>{product.price === null ? "Ask for price" : `₹${product.price}`}</strong>
          </div>
          <AddToCartButton className={styles.cardAddButton} product={product}>Save to bag</AddToCartButton>
        </div>
      </div>
    </article>
  );
}

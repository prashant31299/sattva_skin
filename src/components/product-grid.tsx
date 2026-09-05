import type { Product } from "@/data/types";

import { ProductCard } from "./product-card";
import styles from "./product-card.module.css";

type ProductGridProps = {
  products: Product[];
  emptyTitle?: string;
  emptyMessage?: string;
};

export function ProductGrid({
  products,
  emptyTitle = "Nothing matches just yet.",
  emptyMessage = "Try another filter or explore the complete preview collection.",
}: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className={styles.empty} role="status">
        <span aria-hidden="true">01 — 00</span>
        <h3>{emptyTitle}</h3>
        <p>{emptyMessage}</p>
      </div>
    );
  }

  return (
    <ul className={styles.grid} aria-label="Products">
      {products.map((product) => (
        <li className={styles.gridItem} key={product.id}>
          <ProductCard product={product} />
        </li>
      ))}
    </ul>
  );
}

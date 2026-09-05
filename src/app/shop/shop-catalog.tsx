"use client";

import { useMemo, useState } from "react";

import { ProductGrid } from "@/components/product-grid";
import type { Concern, Product } from "@/data/types";

import styles from "./shop.module.css";

type ShopCatalogProps = {
  products: Product[];
  concerns: Concern[];
  initialCategory?: string;
};

const allFilters = "all";

export function ShopCatalog({ products, concerns, initialCategory = allFilters }: ShopCatalogProps) {
  const [concern, setConcern] = useState(allFilters);
  const [signature, setSignature] = useState(allFilters);
  const [category, setCategory] = useState(initialCategory);
  const [sort, setSort] = useState("featured");

  const signatures = useMemo(
    () => Array.from(new Set(products.flatMap((product) => product.variant ? [product.variant] : []))).sort(),
    [products],
  );

  const categories = useMemo(
    () => Array.from(new Set(products.flatMap((product) => [product.category, ...(product.productType ? [product.productType] : [])]))).sort(),
    [products],
  );

  const visibleProducts = useMemo(() => {
    const filtered = products.filter((product) => {
      const matchesConcern = concern === allFilters || product.concerns.includes(concern);
      const matchesSignature = signature === allFilters || product.variant === signature;
      const matchesCategory = category === allFilters || (product.productType === category || product.category === category);

      return matchesConcern && matchesSignature && matchesCategory;
    });

    if (sort === "name-asc") {
      return [...filtered].sort((a, b) => a.name.localeCompare(b.name));
    }

    if (sort === "name-desc") {
      return [...filtered].sort((a, b) => b.name.localeCompare(a.name));
    }

    return filtered;
  }, [category, concern, products, signature, sort]);

  const hasActiveFilters =
    concern !== allFilters || signature !== allFilters || category !== allFilters;

  function clearFilters() {
    setConcern(allFilters);
    setSignature(allFilters);
    setCategory(allFilters);
  }

  return (
    <section className={styles.catalog} id="catalog" aria-labelledby="catalog-heading">
      <div className={styles.catalogHeading}>
        <div>
          <p className={styles.eyebrow}>The Sattva collection</p>
          <h2 id="catalog-heading">Find your kind of care.</h2>
        </div>
        <p>
          Face, hair and lip care. Explore each product, its featured ingredients and the details that make it yours.
        </p>
      </div>

      <div className={styles.filterShell}>
        <div className={styles.filters} aria-label="Filter products">
          <label className={styles.field}>
            <span>Concern</span>
            <select value={concern} onChange={(event) => setConcern(event.target.value)}>
              <option value={allFilters}>All concerns</option>
              {concerns.map((item) => (
                <option key={item.slug} value={item.slug}>
                  {item.name}
                </option>
              ))}
            </select>
          </label>

          <label className={styles.field}>
            <span>Signature</span>
            <select value={signature} onChange={(event) => setSignature(event.target.value)}>
              <option value={allFilters}>All signatures</option>
              {signatures.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </label>

          <label className={styles.field}>
            <span>Product type</span>
            <select value={category} onChange={(event) => setCategory(event.target.value)}>
              <option value={allFilters}>All product types</option>
              {categories.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </label>

          <label className={`${styles.field} ${styles.sortField}`}>
            <span>Sort</span>
            <select value={sort} onChange={(event) => setSort(event.target.value)}>
              <option value="featured">Featured</option>
              <option value="name-asc">Name: A to Z</option>
              <option value="name-desc">Name: Z to A</option>
              <option value="price-asc" disabled>
                Price: low to high — awaiting confirmation
              </option>
              <option value="price-desc" disabled>
                Price: high to low — awaiting confirmation
              </option>
            </select>
          </label>
        </div>

        <div className={styles.resultsLine}>
          <p role="status" aria-live="polite">
            <strong>{visibleProducts.length}</strong>{" "}
            {visibleProducts.length === 1 ? "formula" : "formulas"} in this view
          </p>
          {hasActiveFilters ? (
            <button className={styles.clearButton} type="button" onClick={clearFilters}>
              Clear filters
              <span aria-hidden="true">×</span>
            </button>
          ) : (
            <p className={styles.priceNote}>Contact us for pricing and availability.</p>
          )}
        </div>
      </div>

      <ProductGrid
        products={visibleProducts}
        emptyTitle="No products match these filters."
        emptyMessage="Clear the filters to explore the full Sattva Skin collection."
      />
    </section>
  );
}

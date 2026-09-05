"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Search, X } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { journalArticles } from "@/app/journal/_data";
import { concerns, ingredients, products } from "@/data/catalog";

import styles from "./search-overlay.module.css";

type SearchOverlayProps = {
  open: boolean;
  onClose: () => void;
};

function normalise(value: string) {
  return value
    .normalize("NFKD")
    .toLocaleLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function matchesQuery(query: string, values: Array<string | undefined>) {
  const terms = normalise(query).split(" ").filter(Boolean);
  if (!terms.length) return false;
  const searchableText = normalise(values.filter(Boolean).join(" "));
  return terms.every((term) => searchableText.includes(term));
}

export function SearchOverlay({ open, onClose }: SearchOverlayProps) {
  const [query, setQuery] = useState("");
  const dialogRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const closeSearch = useCallback(() => {
    setQuery("");
    onClose();
  }, [onClose]);

  useEffect(() => {
    if (!open) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const focusFrame = window.requestAnimationFrame(() => inputRef.current?.focus());

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeSearch();
        return;
      }

      if (event.key !== "Tab" || !dialogRef.current) return;
      const focusable = Array.from(
        dialogRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ),
      );
      if (!focusable.length) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      window.cancelAnimationFrame(focusFrame);
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
      previouslyFocused?.focus();
    };
  }, [closeSearch, open]);

  const results = useMemo(() => {
    if (!normalise(query)) {
      return { products: [], concerns: [], ingredients: [], articles: [] };
    }

    return {
      products: products.filter((product) => {
        const productConcerns = concerns
          .filter((concern) => product.concerns.includes(concern.slug))
          .map((concern) => concern.name);
        return matchesQuery(query, [
          product.name,
          product.shortDescription,
          product.category,
          ...product.ingredients,
          ...productConcerns,
        ]);
      }),
      concerns: concerns.filter((concern) =>
        matchesQuery(query, [
          concern.name,
          concern.title,
          concern.description,
          concern.note,
        ]),
      ),
      ingredients: ingredients.filter((ingredient) =>
        matchesQuery(query, [
          ingredient.name,
          ingredient.description,
          ...ingredient.usedFor,
        ]),
      ),
      articles: journalArticles.filter((article) =>
        matchesQuery(query, [
          article.title,
          article.dek,
          article.category,
          ...article.sections.flatMap((section) => [
            section.heading,
            ...section.paragraphs,
            ...(section.points ?? []),
          ]),
        ]),
      ),
    };
  }, [query]);

  if (!open) return null;

  const hasQuery = Boolean(normalise(query));
  const resultCount =
    results.products.length +
    results.concerns.length +
    results.ingredients.length +
    results.articles.length;

  return (
    <div
      ref={dialogRef}
      className={styles.overlay}
      role="dialog"
      aria-modal="true"
      aria-labelledby="search-title"
    >
      <div className={styles.topbar}>
        <div className={styles.brand} aria-hidden="true">
          SATTVA <span>SKIN</span>
        </div>
        <p id="search-title">Find your routine</p>
        <button
          className={styles.closeButton}
          type="button"
          aria-label="Close search"
          onClick={closeSearch}
        >
          <X aria-hidden="true" size={22} strokeWidth={1.7} />
        </button>
      </div>

      <div className={styles.inner}>
        <div className={styles.searchField}>
          <Search aria-hidden="true" size={25} strokeWidth={1.5} />
          <label className={styles.visuallyHidden} htmlFor="site-search-input">
            Search products, concerns, ingredients and articles
          </label>
          <input
            ref={inputRef}
            id="site-search-input"
            type="search"
            inputMode="search"
            autoComplete="off"
            placeholder="Search acne, neem, hydration…"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
          {query ? (
            <button
              className={styles.clearButton}
              type="button"
              onClick={() => {
                setQuery("");
                inputRef.current?.focus();
              }}
            >
              Clear
            </button>
          ) : null}
        </div>

        <p className={styles.resultStatus} role="status">
          {hasQuery
            ? `${resultCount} ${resultCount === 1 ? "result" : "results"} for “${query.trim()}”`
            : "Search the catalog by what your skin needs."}
        </p>

        {!hasQuery ? (
          <div className={styles.discoveryGrid}>
            <section aria-labelledby="popular-concerns-title">
              <div className={styles.sectionHeading}>
                <p id="popular-concerns-title">Start with a concern</p>
                <span>01</span>
              </div>
              <div className={styles.quickLinks}>
                {concerns.slice(0, 6).map((concern) => (
                  <Link
                    key={concern.slug}
                    href={`/pages/${concern.slug}`}
                    onClick={closeSearch}
                  >
                    {concern.name}
                    <ArrowUpRight aria-hidden="true" size={15} />
                  </Link>
                ))}
              </div>
            </section>

            <section aria-labelledby="popular-ingredients-title">
              <div className={styles.sectionHeading}>
                <p id="popular-ingredients-title">Browse ingredients</p>
                <span>02</span>
              </div>
              <div className={styles.quickLinks}>
                {ingredients.map((ingredient) => (
                  <Link
                    key={ingredient.slug}
                    href={`/ingredients/${ingredient.slug}`}
                    onClick={closeSearch}
                  >
                    {ingredient.name}
                    <ArrowUpRight aria-hidden="true" size={15} />
                  </Link>
                ))}
              </div>
            </section>
          </div>
        ) : resultCount === 0 ? (
          <div className={styles.noResults}>
            <p>No exact match yet.</p>
            <span>Try a concern such as “oily skin” or an ingredient such as “neem”.</span>
            <Link href="/shop" onClick={closeSearch}>
              Browse all products
            </Link>
          </div>
        ) : (
          <div className={styles.resultsGrid}>
            {results.products.length ? (
              <section className={styles.productSection} aria-labelledby="product-results-title">
                <div className={styles.sectionHeading}>
                  <p id="product-results-title">Products</p>
                  <span>{String(results.products.length).padStart(2, "0")}</span>
                </div>
                <div className={styles.productResults}>
                  {results.products.map((product) => (
                    <Link
                      className={styles.productResult}
                      key={product.id}
                      href={`/products/${product.slug}`}
                      onClick={closeSearch}
                    >
                      <span className={styles.productImage}>
                        <Image
                          src={product.images[0]}
                          alt=""
                          fill
                          sizes="84px"
                          style={{ objectPosition: product.imagePosition }}
                        />
                      </span>
                      <span className={styles.productCopy}>
                        <small>{product.category}</small>
                        <strong>{product.name}</strong>
                        <span>{product.shortDescription}</span>
                      </span>
                      <ArrowUpRight aria-hidden="true" size={18} />
                    </Link>
                  ))}
                </div>
              </section>
            ) : null}

            <div className={styles.sideResults}>
              {results.concerns.length ? (
                <section aria-labelledby="concern-results-title">
                  <div className={styles.sectionHeading}>
                    <p id="concern-results-title">Concerns</p>
                    <span>{String(results.concerns.length).padStart(2, "0")}</span>
                  </div>
                  <div className={styles.textResults}>
                    {results.concerns.map((concern) => (
                      <Link
                        key={concern.slug}
                        href={`/pages/${concern.slug}`}
                        onClick={closeSearch}
                      >
                        <span>
                          <strong>{concern.name}</strong>
                          <small>{concern.description}</small>
                        </span>
                        <ArrowUpRight aria-hidden="true" size={17} />
                      </Link>
                    ))}
                  </div>
                </section>
              ) : null}

              {results.ingredients.length ? (
                <section aria-labelledby="ingredient-results-title">
                  <div className={styles.sectionHeading}>
                    <p id="ingredient-results-title">Ingredients</p>
                    <span>{String(results.ingredients.length).padStart(2, "0")}</span>
                  </div>
                  <div className={styles.textResults}>
                    {results.ingredients.map((ingredient) => (
                      <Link
                        key={ingredient.slug}
                        href={`/ingredients/${ingredient.slug}`}
                        onClick={closeSearch}
                      >
                        <span>
                          <strong>{ingredient.name}</strong>
                          <small>{ingredient.usedFor.join(" · ")}</small>
                        </span>
                        <ArrowUpRight aria-hidden="true" size={17} />
                      </Link>
                    ))}
                  </div>
                </section>
              ) : null}

              {results.articles.length ? (
                <section aria-labelledby="article-results-title">
                  <div className={styles.sectionHeading}>
                    <p id="article-results-title">Journal</p>
                    <span>{String(results.articles.length).padStart(2, "0")}</span>
                  </div>
                  <div className={styles.textResults}>
                    {results.articles.map((article) => (
                      <Link
                        key={article.slug}
                        href={`/journal/${article.slug}`}
                        onClick={closeSearch}
                      >
                        <span>
                          <strong>{article.title}</strong>
                          <small>
                            {article.category} · {article.readTime}
                          </small>
                        </span>
                        <ArrowUpRight aria-hidden="true" size={17} />
                      </Link>
                    ))}
                  </div>
                </section>
              ) : null}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { concerns, products } from "@/data/catalog";
import { siteConfig } from "@/data/config";

import { ShopCatalog } from "./shop-catalog";
import styles from "./shop.module.css";

export const metadata: Metadata = {
  title: "Lip balms & lip scrubs",
  description:
    "Explore Strawberry, Butterscotch and Chocolate Lip Balms, plus Strawberry and Red Wine Lip Scrubs.",
  alternates: { canonical: `${siteConfig.siteUrl}/shop` },
  openGraph: {
    title: "Lip balms & lip scrubs | Sattva Skin",
    description:
      "Lip balms and sugar scrubs with shea butter, coconut oil and beeswax.",
    url: `${siteConfig.siteUrl}/shop`,
    images: [{ url: "/images/lip-care/lip-care-collection.webp", alt: "Sattva Skin lip-care collection" }],
  },
};

type ShopPageProps = {
  searchParams: Promise<{ category?: string }>;
};

const categoryMap: Record<string, string> = {
  "face-care": "Face care",
  "hair-care": "Hair care",
  "lip-care": "all",
  "lip-balm": "Lip Balm",
  "lip-scrub": "Lip Scrub",
};

export default async function ShopPage({ searchParams }: ShopPageProps) {
  const { category } = await searchParams;
  const initialCategory = category ? categoryMap[category] : undefined;

  return (
    <div className={styles.page}>
      <nav className={styles.breadcrumbs} aria-label="Breadcrumb">
        <ol>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li aria-current="page">Shop</li>
        </ol>
      </nav>

      <section className={styles.hero} aria-labelledby="shop-title">
        <div className={styles.heroCopy}>
          <p className={styles.indexLine}>
            <span>Collection 01</span>
            <span>The lip edit</span>
          </p>
          <h1 id="shop-title">
            Lip care.
            <span>Your way.</span>
          </h1>
          <p className={styles.heroIntro}>
            Smooth balms and sugar scrubs. Familiar ingredients, favourite signatures, and a little everyday comfort.
          </p>
          <div className={styles.heroActions}>
            <a className={styles.primaryAction} href="#catalog">
              Explore the collection
              <span aria-hidden="true">↓</span>
            </a>
            <Link className={styles.textAction} href="/pages/dry-lips">
              Find your lip ritual <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </div>

        <div className={styles.heroVisual}>
          <div className={styles.heroWord} aria-hidden="true">
            ROUTINE
          </div>
          <Image
            src="/images/lip-care/lip-care-collection.webp"
            alt="Sattva Skin lip balm and lip scrub collection with their signature ingredients"
            fill
            loading="eager"
            fetchPriority="high"
            sizes="(max-width: 899px) 100vw, 52vw"
          />
          <span className={`${styles.floatingLabel} ${styles.labelOne}`}>01 Shea butter</span>
          <span className={`${styles.floatingLabel} ${styles.labelTwo}`}>02 Coconut oil</span>
          <span className={`${styles.floatingLabel} ${styles.labelThree}`}>03 Beeswax</span>
          <span className={styles.visualCaption}>The Sattva lip collection / 2026</span>
        </div>
      </section>

      <ShopCatalog
        key={initialCategory ?? "all"}
        products={products}
        concerns={concerns}
        initialCategory={initialCategory}
      />

      <section className={styles.concernRail} aria-labelledby="concern-rail-title">
        <div>
          <p className={styles.eyebrow}>Prefer to start with the problem?</p>
          <h2 id="concern-rail-title">Take the concern-led route.</h2>
        </div>
        <ul>
          {concerns.map((concern, index) => (
            <li key={concern.slug}>
              <Link href={`/pages/${concern.slug}`}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                {concern.name}
                <span aria-hidden="true">↗</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

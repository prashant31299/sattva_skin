import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { concerns, products } from "@/data/catalog";
import { siteConfig } from "@/data/config";

import { ShopCatalog } from "./shop-catalog";
import styles from "./shop.module.css";

export const metadata: Metadata = {
  title: "Face, hair & lip care",
  description:
    "Explore Sattva Skin face washes, toner, serum, masks, night gel, lip balms and lip scrubs.",
  alternates: { canonical: `${siteConfig.siteUrl}/shop` },
  openGraph: {
    title: "Face, hair & lip care | Sattva Skin",
    description:
      "Discover the Sattva Skin collection and explore each product’s ingredient story.",
    url: `${siteConfig.siteUrl}/shop`,
    images: [{ url: "/images/face-care/neem-acne-control-face-wash-hero.webp", alt: "Sattva Skin Neem Acne Control Face Wash" }],
  },
};

type ShopPageProps = {
  searchParams: Promise<{ category?: string }>;
};

const categoryMap: Record<string, string> = {
  "face-care": "Face care",
  "hair-care": "Hair care",
  "lip-care": "Lip care",
  "face-wash": "Face Wash",
  "toner": "Toner",
  "serum": "Serum",
  "night-gel": "Night Gel",
  "face-mask": "Face Mask",
  "hair-mask": "Hair Mask",
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
            <span>The collection</span>
            <span>Face / Hair / Lips</span>
          </p>
          <h1 id="shop-title">
            Your care.
            <span>Your way.</span>
          </h1>
          <p className={styles.heroIntro}>
            From your cleansing step to your favourite balm. Explore botanical ingredient stories across face, hair and lip care.
          </p>
          <div className={styles.heroActions}>
            <a className={styles.primaryAction} href="#catalog">
              Explore the collection
              <span aria-hidden="true">↓</span>
            </a>
            <Link className={styles.textAction} href="/shop?category=face-care#catalog">
              Explore face care <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </div>

        <div className={styles.heroVisual}>
          <div className={styles.heroWord} aria-hidden="true">
            ROUTINE
          </div>
          <Image
            src="/images/face-care/neem-acne-control-face-wash-hero.webp"
            alt="Sattva Skin Neem Acne Control Face Wash styled on ivory stone"
            fill
            loading="eager"
            fetchPriority="high"
            sizes="(max-width: 899px) 100vw, 52vw"
          />
          <span className={`${styles.floatingLabel} ${styles.labelOne}`}>01 Face care</span>
          <span className={`${styles.floatingLabel} ${styles.labelTwo}`}>02 Hair care</span>
          <span className={`${styles.floatingLabel} ${styles.labelThree}`}>03 Lip care</span>
          <span className={styles.visualCaption}>The Sattva collection / 2026</span>
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

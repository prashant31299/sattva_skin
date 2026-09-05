import type { Metadata } from "next";
import { ProductGallery } from "@/components/product-gallery";
import { LipFormula } from "@/components/lip-formula";
import { ProductGuide } from "@/components/product-guide";
import Link from "next/link";
import { notFound } from "next/navigation";

import { AddToCartButton } from "@/components/cart/add-to-cart-button";
import { ProductGrid } from "@/components/product-grid";
import { concerns, getProduct, ingredients, products } from "@/data/catalog";
import { siteConfig } from "@/data/config";

import styles from "./product.module.css";

type ProductPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);

  if (!product) {
    return { title: "Product not found" };
  }

  const canonical = `${siteConfig.siteUrl}/products/${product.slug}`;

  return {
    title: product.name,
    description: product.shortDescription,
    alternates: { canonical },
    openGraph: {
      title: `${product.name} | Sattva Skin`,
      description: product.shortDescription,
      url: canonical,
      type: "website",
      images: product.images[0]
        ? [{ url: product.images[0], alt: product.imageAlts?.[0] ?? product.name }]
        : undefined,
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProduct(slug);

  if (!product) {
    notFound();
  }
  const isLipCare = product.category === "Lip care";

  const productConcerns = concerns.filter((concern) =>
    product.concerns.includes(concern.slug),
  );
  const productIngredients = product.ingredients.map((name) => ({
    name,
    detail: ingredients.find(
      (ingredient) => ingredient.name.toLocaleLowerCase() === name.toLocaleLowerCase(),
    ),
  }));
  const relatedProducts = products
    .filter(
      (item) =>
        item.id !== product.id &&
        (item.category === product.category ||
          item.concerns.some((concern) => product.concerns.includes(concern))),
    )
    .slice(0, 4);

  return (
    <div className={styles.page}>
      <nav className={styles.breadcrumbs} aria-label="Breadcrumb">
        <ol>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/shop">Shop</Link>
          </li>
          <li aria-current="page">{product.name}</li>
        </ol>
      </nav>

      <article className={styles.productStage}>
        <ProductGallery product={product} />

        <section className={styles.summary} aria-labelledby="product-title">
          <div className={styles.summaryInner}>
            <div className={styles.summaryTopline}>
              <span>{product.productType ?? product.category}</span>
              <span>{product.size} / Sattva Skin</span>
            </div>

            {product.badges?.length ? (
              <div className={styles.badges} aria-label="Product labels">
                {product.badges.map((badge) => (
                  <span key={badge}>{badge}</span>
                ))}
              </div>
            ) : null}

            <h1 id="product-title">{product.name}</h1>
            <p className={styles.benefit}>{product.shortDescription}</p>

            {product.rating && product.reviewCount ? (
              <p className={styles.rating}>
                <span aria-hidden="true">★★★★★</span>
                <span className={styles.srOnly}>{product.rating} out of 5.</span>
                {product.rating.toFixed(1)} ({product.reviewCount} verified reviews)
              </p>
            ) : null}

            <div className={styles.pricePanel}>
              <div>
                <span>Price</span>
                <strong>{product.price === null ? "Ask for price" : `₹${product.price}`}</strong>
              </div>
              <p>Contact us for pricing and availability.</p>
            </div>

            <div className={styles.purchaseActions}>
              <AddToCartButton className={styles.addButton} product={product}>Save to bag</AddToCartButton>
              <Link className={styles.concernLink} href="/contact">Ask about this product <span aria-hidden="true">↗</span></Link>
              {productConcerns[0] ? (
                <Link className={styles.concernLink} href={`/pages/${productConcerns[0].slug}`}>
                  Explore the {productConcerns[0].name.toLocaleLowerCase()} routine
                  <span aria-hidden="true">↗</span>
                </Link>
              ) : null}
            </div>

            <div className={styles.ingredientBlock}>
              <p>{isLipCare ? "Signature + ingredient base" : product.ingredients.length ? "Featured on the label" : "Product format"}</p>
              <ul>
                {productIngredients.map(({ name, detail }) => (
                  <li key={name}>
                    {detail ? <Link href={`/ingredients/${detail.slug}`}>{name}</Link> : name}
                  </li>
                ))}
                {!productIngredients.length && <li>{product.productType} · {product.size}</li>}
              </ul>
            </div>

            <ul className={styles.trustList} aria-label="Shopping commitments">
              <li>
                <span aria-hidden="true">01</span>
                {isLipCare ? "Small pots, simple care" : "Original packaging, up close"}
              </li>
              <li>
                <span aria-hidden="true">02</span>
                {isLipCare ? "Ingredients with a role" : "Explore the product details"}
              </li>
              <li>
                <span aria-hidden="true">03</span>
                Human customer support
              </li>
            </ul>
          </div>
        </section>
      </article>

      <section className={styles.editorialIntro} aria-labelledby="product-story-title">
        <p>Formula note / {product.badges?.[0] ?? "Everyday care"}</p>
        <div>
          <h2 id="product-story-title">{product.storyHeading ?? (product.productType === "Lip Scrub" ? "A little polish. A lovely ritual." : "Your everyday pocket companion.")}</h2>
          <p>{product.description}</p>
        </div>
      </section>

      {isLipCare ? <LipFormula product={product} /> : <ProductGuide product={product} />}

      <section className={styles.details} aria-labelledby="product-details-title">
        <div className={styles.detailsHeading}>
          <p>Product file</p>
          <h2 id="product-details-title">What you need to know.</h2>
          <p>
            Get to know the texture, the ingredient base and this product’s place in your routine.
          </p>
        </div>

        <div className={styles.accordions}>
          <details open>
            <summary>
              About the product <span aria-hidden="true">+</span>
            </summary>
            <div>{product.description}</div>
          </details>
          {productIngredients.length > 0 && <details>
            <summary>
              Key ingredients <span aria-hidden="true">+</span>
            </summary>
            <div>
              {productIngredients.map(({ name, detail }) => (
                <p key={name}>
                  <strong>{name}</strong>
                  {isLipCare && detail ? ` — ${detail.description}` : " — Featured on the product label."}
                </p>
              ))}
            </div>
          </details>}
          <details>
            <summary>
              {isLipCare ? "Ingredient base" : "Ingredient information"} <span aria-hidden="true">+</span>
            </summary>
            <div>{product.fullIngredients}</div>
          </details>
          {product.howToUse && <details>
            <summary>
              How to use <span aria-hidden="true">+</span>
            </summary>
            <div>{product.howToUse}</div>
          </details>}
          {product.whoItsFor && <details>
            <summary>
              Who it is for <span aria-hidden="true">+</span>
            </summary>
            <div>
              <p>{product.whoItsFor}</p>
              
            </div>
          </details>}
          {product.precautions && <details>
            <summary>
              Precautions <span aria-hidden="true">+</span>
            </summary>
            <div>{product.precautions}</div>
          </details>}
          <details>
            <summary>
              Common questions <span aria-hidden="true">+</span>
            </summary>
            <div>
              <p>
                <strong>Can I purchase this now?</strong>
                <br />
                Save your favourites to the bag and contact us for current pricing and availability. Online checkout is not open yet.
              </p>
              {isLipCare && <p>
                <strong>What is the difference between balm and scrub?</strong>
                <br />
                Both use shea butter, coconut oil and beeswax. The scrub also contains sugar for a polishing texture; the balm has a smooth finish.
              </p>}
              {product.faqs?.map((faq) => <p key={faq.question}><strong>{faq.question}</strong><br />{faq.answer}</p>)}
            </div>
          </details>
        </div>
      </section>

      <section className={styles.related} aria-labelledby="related-title">
        <div className={styles.relatedHeading}>
          <div>
            <p>Continue the ritual</p>
            <h2 id="related-title">Build around this step.</h2>
          </div>
          <Link href="/shop">View all products <span aria-hidden="true">↗</span></Link>
        </div>
        <ProductGrid
          products={relatedProducts}
          emptyTitle="More routine steps are coming."
          emptyMessage="The complete catalog will appear here after the range is verified."
        />
      </section>

      <aside className={styles.mobilePurchase} aria-label="Product purchase shortcut">
        <div>
          <strong>{product.name}</strong>
          <span>{product.price === null ? "Ask for price" : `₹${product.price}`}</span>
        </div>
        <AddToCartButton className={styles.mobileAddButton} product={product}>Save to bag</AddToCartButton>
      </aside>
    </div>
  );
}

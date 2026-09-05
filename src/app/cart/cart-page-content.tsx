"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";

import { useCart } from "@/components/cart/cart-context";
import { siteConfig } from "@/data/config";

import styles from "./page.module.css";

const formatCurrency = (amount: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);

export function CartPageContent() {
  const {
    items,
    itemCount,
    subtotal,
    hasCompletePricing,
    isHydrated,
    updateQuantity,
    removeItem,
    clearCart,
  } = useCart();

  return (
    <div className={styles.page}>
      <nav className={styles.breadcrumbs} aria-label="Breadcrumb">
        <ol>
          <li><Link href="/">Home</Link></li>
          <li aria-current="page">Shopping bag</li>
        </ol>
      </nav>

      <header className={styles.pageHeader}>
        <p className={styles.eyebrow}>Your selection · Preview</p>
        <h1>Your bag.</h1>
        <p>
          Review your routine concepts here. Pricing and purchasing remain unavailable
          while the catalog is being verified.
        </p>
      </header>

      {!isHydrated ? (
        <section className={styles.loading} aria-busy="true" aria-label="Loading shopping bag">
          <span />
          <span />
          <span />
        </section>
      ) : items.length === 0 ? (
        <section className={styles.empty} aria-labelledby="empty-bag-title">
          <span className={styles.emptyIcon} aria-hidden="true">
            <ShoppingBag size={32} strokeWidth={1.45} />
          </span>
          <p className={styles.emptyIndex}>Bag / 00</p>
          <h2 id="empty-bag-title">Your cart is waiting for something good.</h2>
          <p>Explore problem-solving skincare and save the concepts that fit your routine.</p>
          <div className={styles.emptyActions}>
            <Link className={styles.primaryButton} href="/shop">
              Explore products <ArrowRight aria-hidden="true" size={16} />
            </Link>
            <Link className={styles.textLink} href="/#concerns">
              Start with a concern
            </Link>
          </div>
        </section>
      ) : (
        <div className={styles.cartLayout}>
          <section className={styles.lineItems} aria-labelledby="bag-items-title">
            <div className={styles.listHeader}>
              <h2 id="bag-items-title">
                {itemCount} {itemCount === 1 ? "item" : "items"}
              </h2>
              <button type="button" onClick={clearCart}>Clear bag</button>
            </div>

            <ul aria-live="polite">
              {items.map(({ product, quantity }, index) => (
                <li key={product.id} className={styles.lineItem}>
                  <Link
                    className={styles.productImage}
                    href={`/products/${product.slug}`}
                    aria-label={`View ${product.name}`}
                  >
                    <Image
                      src={product.images[0]}
                      alt=""
                      fill
                      sizes="(max-width: 600px) 112px, 160px"
                      style={{ objectPosition: product.imagePosition }}
                    />
                    <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                  </Link>

                  <div className={styles.productDetails}>
                    <div className={styles.productTopline}>
                      <span>{product.category}</span>
                      <button
                        className={styles.removeButton}
                        type="button"
                        onClick={() => removeItem(product.id)}
                        aria-label={`Remove ${product.name} from shopping bag`}
                      >
                        <Trash2 aria-hidden="true" size={17} strokeWidth={1.6} />
                        <span>Remove</span>
                      </button>
                    </div>

                    <Link className={styles.productName} href={`/products/${product.slug}`}>
                      {product.name}
                    </Link>
                    <p>{product.shortDescription}</p>
                    <div className={styles.tags} aria-label="Featured ingredients">
                      {product.ingredients.slice(0, 2).map((ingredient) => (
                        <span key={ingredient}>{ingredient}</span>
                      ))}
                    </div>

                    <div className={styles.productBottomline}>
                      <div
                        className={styles.quantity}
                        role="group"
                        aria-label={`Quantity for ${product.name}`}
                      >
                        <button
                          type="button"
                          onClick={() => updateQuantity(product.id, quantity - 1)}
                          aria-label={`Decrease ${product.name} quantity`}
                        >
                          <Minus aria-hidden="true" size={14} />
                        </button>
                        <span aria-label={`Quantity ${quantity}`}>{quantity}</span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(product.id, quantity + 1)}
                          aria-label={`Increase ${product.name} quantity`}
                          disabled={quantity >= 99}
                        >
                          <Plus aria-hidden="true" size={14} />
                        </button>
                      </div>
                      <strong>
                        {product.price === null
                          ? "Price pending"
                          : formatCurrency(product.price * quantity)}
                      </strong>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <Link className={styles.continueLink} href="/shop">
              ← Continue browsing
            </Link>
          </section>

          <aside className={styles.summary} aria-labelledby="bag-summary-title">
            <p className={styles.summaryIndex}>Summary / Preview</p>
            <h2 id="bag-summary-title">Bag summary</h2>
            <dl>
              <div>
                <dt>Items</dt>
                <dd>{itemCount}</dd>
              </div>
              <div>
                <dt>Product pricing</dt>
                <dd>{hasCompletePricing ? formatCurrency(subtotal) : "Pending"}</dd>
              </div>
              <div>
                <dt>Shipping</dt>
                <dd>Not configured</dd>
              </div>
              <div className={styles.totalRow}>
                <dt>Estimated subtotal</dt>
                <dd>{hasCompletePricing ? formatCurrency(subtotal) : "To be announced"}</dd>
              </div>
            </dl>

            <div className={styles.previewNotice}>
              <strong>This is not a live store yet.</strong>
              <p>
                {siteConfig.catalogIsPreview
                  ? "Final prices, stock, shipping and payment methods still require configuration."
                  : "Checkout integration is still pending."}
              </p>
            </div>

            <Link className={styles.primaryButton} href="/checkout">
              Review checkout status <ArrowRight aria-hidden="true" size={16} />
            </Link>
            <p className={styles.actionNote}>No payment or order can be submitted.</p>
          </aside>
        </div>
      )}
    </div>
  );
}

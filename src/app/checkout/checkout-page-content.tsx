"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  CreditCard,
  LockKeyhole,
  MapPin,
  PackageCheck,
  ShieldCheck,
  ShoppingBag,
} from "lucide-react";

import { useCart } from "@/components/cart/cart-context";

import styles from "./page.module.css";

export function CheckoutPageContent() {
  const { items, itemCount, isHydrated } = useCart();

  return (
    <div className={styles.page}>
      <nav className={styles.breadcrumbs} aria-label="Breadcrumb">
        <ol>
          <li><Link href="/">Home</Link></li>
          <li><Link href="/cart">Shopping bag</Link></li>
          <li aria-current="page">Checkout preview</li>
        </ol>
      </nav>

      <header className={styles.hero}>
        <div className={styles.heroIcon} aria-hidden="true">
          <LockKeyhole size={28} strokeWidth={1.45} />
        </div>
        <p>Checkout / Preview status</p>
        <h1>Checkout isn’t live yet.</h1>
        <span>
          This page explains the current store status only. You cannot submit payment,
          place an order, or reserve stock here.
        </span>
      </header>

      <div className={styles.statusBanner} role="status">
        <ShieldCheck aria-hidden="true" size={20} strokeWidth={1.6} />
        <div>
          <strong>Preview only — no order will be placed.</strong>
          <span>No payment information is requested or collected on this website.</span>
        </div>
      </div>

      <div className={styles.layout}>
        <section className={styles.readiness} aria-labelledby="readiness-title">
          <div className={styles.sectionHeading}>
            <p>Store readiness / 03 checks</p>
            <h2 id="readiness-title">What still needs to be connected.</h2>
          </div>

          <ol className={styles.readinessList}>
            <li>
              <span className={styles.stepNumber}>01</span>
              <span className={styles.stepIcon} aria-hidden="true">
                <PackageCheck size={22} strokeWidth={1.5} />
              </span>
              <div>
                <h3>Verified catalog and pricing</h3>
                <p>
                  Final product prices, availability, tax treatment and product facts must
                  be approved before checkout can open.
                </p>
              </div>
              <strong>Pending</strong>
            </li>
            <li>
              <span className={styles.stepNumber}>02</span>
              <span className={styles.stepIcon} aria-hidden="true">
                <MapPin size={22} strokeWidth={1.5} />
              </span>
              <div>
                <h3>Delivery and address service</h3>
                <p>
                  Serviceable locations, shipping rates, delivery estimates and an order
                  tracking flow have not been configured.
                </p>
              </div>
              <strong>Pending</strong>
            </li>
            <li>
              <span className={styles.stepNumber}>03</span>
              <span className={styles.stepIcon} aria-hidden="true">
                <CreditCard size={22} strokeWidth={1.5} />
              </span>
              <div>
                <h3>Payments and order processing</h3>
                <p>
                  No payment provider or commerce backend is connected. UPI, cards, net
                  banking and COD are therefore unavailable.
                </p>
              </div>
              <strong>Not connected</strong>
            </li>
          </ol>

          <div className={styles.guidance}>
            <h2>What can you do now?</h2>
            <p>
              Keep exploring the preview collection, adjust your bag, or contact Sattva
              Skin if you would like help choosing a future routine. Saving items does not
              reserve them.
            </p>
            <div>
              <Link className={styles.primaryLink} href="/shop">Continue browsing</Link>
              <Link className={styles.secondaryLink} href="/contact">Contact Sattva Skin</Link>
            </div>
          </div>
        </section>

        <aside className={styles.orderSummary} aria-labelledby="order-summary-title">
          <div className={styles.summaryHeader}>
            <div>
              <p>Saved selection</p>
              <h2 id="order-summary-title">Bag summary</h2>
            </div>
            <ShoppingBag aria-hidden="true" size={21} strokeWidth={1.5} />
          </div>

          {!isHydrated ? (
            <div className={styles.summaryLoading} aria-busy="true" aria-label="Loading bag summary">
              <span />
              <span />
            </div>
          ) : items.length === 0 ? (
            <div className={styles.emptySummary}>
              <p>Your preview bag is empty.</p>
              <span>Add a product concept to see it summarized here.</span>
              <Link href="/shop">Explore products</Link>
            </div>
          ) : (
            <>
              <ul className={styles.items}>
                {items.map(({ product, quantity }) => (
                  <li key={product.id}>
                    <Link
                      className={styles.itemImage}
                      href={`/products/${product.slug}`}
                      aria-label={`View ${product.name}`}
                    >
                      <Image
                        src={product.images[0]}
                        alt=""
                        fill
                        sizes="68px"
                        style={{ objectPosition: product.imagePosition }}
                      />
                    </Link>
                    <div>
                      <Link href={`/products/${product.slug}`}>{product.name}</Link>
                      <span>Quantity {quantity}</span>
                    </div>
                    <strong>Price pending</strong>
                  </li>
                ))}
              </ul>

              <dl className={styles.totals}>
                <div>
                  <dt>Items</dt>
                  <dd>{itemCount}</dd>
                </div>
                <div>
                  <dt>Subtotal</dt>
                  <dd>Not available</dd>
                </div>
                <div>
                  <dt>Shipping</dt>
                  <dd>Not configured</dd>
                </div>
                <div>
                  <dt>Total</dt>
                  <dd>Cannot be calculated</dd>
                </div>
              </dl>
            </>
          )}

          <button className={styles.disabledOrderButton} type="button" disabled>
            Order placement unavailable
          </button>
          <p className={styles.disclaimer}>
            This disabled control is shown only to make the preview status explicit.
          </p>
          <Link className={styles.backLink} href="/cart">
            <ArrowLeft aria-hidden="true" size={15} /> Review your bag
          </Link>
        </aside>
      </div>
    </div>
  );
}

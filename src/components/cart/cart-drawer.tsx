"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import { useCallback, useEffect, useRef } from "react";

import { siteConfig } from "@/data/config";

import { useCart } from "./cart-context";
import styles from "./cart-drawer.module.css";

type CartDrawerProps = {
  open?: boolean;
  onClose?: () => void;
};

const formatCurrency = (amount: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);

export function CartDrawer({ open, onClose }: CartDrawerProps) {
  const {
    items,
    itemCount,
    subtotal,
    hasCompletePricing,
    isHydrated,
    isCartOpen,
    updateQuantity,
    removeItem,
    clearCart,
    closeCart,
  } = useCart();
  const panelRef = useRef<HTMLElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const isOpen = open ?? isCartOpen;

  const handleClose = useCallback(() => {
    if (onClose) onClose();
    else closeCart();
  }, [closeCart, onClose]);

  useEffect(() => {
    if (!isOpen) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const focusFrame = window.requestAnimationFrame(() =>
      closeButtonRef.current?.focus(),
    );

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        handleClose();
        return;
      }

      if (event.key !== "Tab" || !panelRef.current) return;
      const focusable = Array.from(
        panelRef.current.querySelectorAll<HTMLElement>(
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
  }, [handleClose, isOpen]);

  if (!isOpen) return null;

  return (
    <div className={styles.layer}>
      <button
        className={styles.backdrop}
        type="button"
        aria-label="Close shopping bag"
        onClick={handleClose}
      />

      <aside
        ref={panelRef}
        className={styles.drawer}
        role="dialog"
        aria-modal="true"
        aria-labelledby="cart-drawer-title"
      >
        <header className={styles.header}>
          <div>
            <p className={styles.eyebrow}>Your selection</p>
            <h2 id="cart-drawer-title">Shopping bag</h2>
          </div>
          <button
            ref={closeButtonRef}
            className={styles.iconButton}
            type="button"
            aria-label="Close shopping bag"
            onClick={handleClose}
          >
            <X aria-hidden="true" size={21} strokeWidth={1.8} />
          </button>
        </header>

        <div className={styles.content} aria-live="polite">
          {!isHydrated ? (
            <p className={styles.loading}>Loading your bag…</p>
          ) : items.length === 0 ? (
            <div className={styles.empty}>
              <span className={styles.emptyIcon} aria-hidden="true">
                <ShoppingBag size={26} strokeWidth={1.5} />
              </span>
              <h3>Your cart is waiting for something good.</h3>
              <p>Explore problem-solving skincare and build a simple routine.</p>
              <Link className={styles.shopButton} href="/shop" onClick={handleClose}>
                Explore products
              </Link>
            </div>
          ) : (
            <>
              <div className={styles.summaryRow}>
                <span>
                  {itemCount} {itemCount === 1 ? "item" : "items"}
                </span>
                <button type="button" onClick={clearCart}>
                  Clear bag
                </button>
              </div>
              <ul className={styles.items}>
                {items.map(({ product, quantity }) => (
                  <li className={styles.item} key={product.id}>
                    <Link
                      className={styles.imageWrap}
                      href={`/products/${product.slug}`}
                      onClick={handleClose}
                      aria-label={`View ${product.name}`}
                    >
                      <Image
                        src={product.images[0]}
                        alt=""
                        fill
                        sizes="88px"
                        className={styles.image}
                        style={{ objectPosition: product.imagePosition }}
                      />
                    </Link>

                    <div className={styles.itemDetails}>
                      <div className={styles.itemTopline}>
                        <span>{product.category}</span>
                        <button
                          className={styles.removeButton}
                          type="button"
                          aria-label={`Remove ${product.name}`}
                          onClick={() => removeItem(product.id)}
                        >
                          <Trash2 aria-hidden="true" size={16} strokeWidth={1.7} />
                        </button>
                      </div>
                      <Link href={`/products/${product.slug}`} onClick={handleClose}>
                        {product.name}
                      </Link>
                      <div className={styles.itemBottomline}>
                        <div
                          className={styles.quantity}
                          role="group"
                          aria-label={`Quantity for ${product.name}`}
                        >
                          <button
                            type="button"
                            aria-label={`Decrease ${product.name} quantity`}
                            onClick={() => updateQuantity(product.id, quantity - 1)}
                          >
                            <Minus aria-hidden="true" size={13} />
                          </button>
                          <span aria-label={`Quantity ${quantity}`}>{quantity}</span>
                          <button
                            type="button"
                            aria-label={`Increase ${product.name} quantity`}
                            onClick={() => updateQuantity(product.id, quantity + 1)}
                            disabled={quantity >= 99}
                          >
                            <Plus aria-hidden="true" size={13} />
                          </button>
                        </div>
                        <span className={styles.price}>
                          {product.price === null
                            ? "Price pending"
                            : formatCurrency(product.price * quantity)}
                        </span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>

        {isHydrated && items.length > 0 ? (
          <footer className={styles.footer}>
            <div className={styles.subtotal}>
              <span>Estimated subtotal</span>
              <strong>
                {hasCompletePricing ? formatCurrency(subtotal) : "To be announced"}
              </strong>
            </div>
            <p className={styles.previewNote}>
              {siteConfig.catalogIsPreview
                ? "Preview catalog: prices, payment and checkout are not live yet."
                : "Taxes and shipping are calculated at checkout."}
            </p>
            <Link className={styles.checkoutButton} href="/cart" onClick={handleClose}>
              View full bag
            </Link>
            <button className={styles.continueButton} type="button" onClick={handleClose}>
              Continue browsing
            </button>
          </footer>
        ) : null}
      </aside>
    </div>
  );
}

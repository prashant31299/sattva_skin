"use client";

import Link from "next/link";
import { Menu, Search, ShoppingBag, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

import { CartDrawer } from "@/components/cart/cart-drawer";
import { useCart } from "@/components/cart/cart-context";
import { SearchOverlay } from "@/components/search-overlay";
import { siteConfig } from "@/data/config";

import styles from "./site-header.module.css";

const primaryNavigation = [
  { label: "Shop", href: "/shop" },
  { label: "Face care", href: "/shop?category=face-care" },
  { label: "Hair care", href: "/shop?category=hair-care" },
  { label: "Lip care", href: "/shop?category=lip-care" },
  { label: "Ingredients", href: "/ingredients" },
  { label: "Our story", href: "/about" },
];

const secondaryNavigation = [
  { label: "Skin guide", href: "/pages/skin-quiz" },
  { label: "FAQs", href: "/faq" },
  { label: "Contact", href: "/contact" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const { itemCount, isHydrated, openCart, closeCart } = useCart();
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const menuCloseButtonRef = useRef<HTMLButtonElement>(null);

  const closeMobileMenu = useCallback(() => setMobileMenuOpen(false), []);

  useEffect(() => {
    if (!mobileMenuOpen) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const focusFrame = window.requestAnimationFrame(() =>
      menuCloseButtonRef.current?.focus(),
    );

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeMobileMenu();
        return;
      }

      if (event.key !== "Tab" || !menuRef.current) return;
      const focusable = Array.from(
        menuRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
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
  }, [closeMobileMenu, mobileMenuOpen]);

  const isActive = (href: string) =>
    pathname === href || (href !== "/" && pathname.startsWith(`${href}/`));

  const showSearch = () => {
    closeCart();
    setMobileMenuOpen(false);
    setSearchOpen(true);
  };

  const showCart = () => {
    setSearchOpen(false);
    setMobileMenuOpen(false);
    openCart();
  };

  const showMobileMenu = () => {
    closeCart();
    setSearchOpen(false);
    setMobileMenuOpen(true);
  };

  return (
    <>
      <header className={styles.shell}>
        <div className={styles.announcement}>
          <span>A little everyday care</span>
          <span aria-hidden="true">•</span>
          <span>Face · Hair · Lips</span>
          {siteConfig.catalogIsPreview ? (
            <>
              <span aria-hidden="true">•</span>
              <span>Preview collection</span>
            </>
          ) : null}
        </div>

        <div className={styles.headerBar}>
          <button
            className={`${styles.menuButton} ${styles.iconAction}`}
            type="button"
            aria-label="Open navigation"
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation"
            onClick={showMobileMenu}
          >
            <Menu aria-hidden="true" size={21} strokeWidth={1.7} />
          </button>

          <Link className={styles.logo} href="/" aria-label={`${siteConfig.name} home`}>
            <span>{siteConfig.shortName}</span>
            <small>SKIN</small>
          </Link>

          <nav className={styles.desktopNav} aria-label="Primary navigation">
            {primaryNavigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive(item.href) ? "page" : undefined}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className={styles.actions}>
            <button className={styles.action} type="button" onClick={showSearch}>
              <Search aria-hidden="true" size={19} strokeWidth={1.7} />
              <span>Search</span>
            </button>
            <button
              className={styles.action}
              type="button"
              onClick={showCart}
              aria-label={`Open shopping bag${isHydrated ? `, ${itemCount} ${itemCount === 1 ? "item" : "items"}` : ""}`}
            >
              <ShoppingBag aria-hidden="true" size={19} strokeWidth={1.7} />
              <span>Bag</span>
              {isHydrated && itemCount > 0 ? (
                <strong aria-hidden="true">{itemCount > 99 ? "99+" : itemCount}</strong>
              ) : null}
            </button>
          </div>
        </div>
      </header>

      {mobileMenuOpen ? (
        <div className={styles.mobileMenuLayer}>
          <button
            className={styles.mobileBackdrop}
            type="button"
            aria-label="Close navigation"
            onClick={closeMobileMenu}
          />
          <div
            ref={menuRef}
            id="mobile-navigation"
            className={styles.mobileMenu}
            role="dialog"
            aria-modal="true"
            aria-labelledby="mobile-navigation-title"
          >
            <div className={styles.mobileMenuHeader}>
              <p id="mobile-navigation-title">Menu</p>
              <button
                ref={menuCloseButtonRef}
                className={styles.mobileCloseButton}
                type="button"
                aria-label="Close navigation"
                onClick={closeMobileMenu}
              >
                <X aria-hidden="true" size={21} strokeWidth={1.7} />
              </button>
            </div>

            <nav className={styles.mobilePrimary} aria-label="Mobile navigation">
              {primaryNavigation.map((item, index) => (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  onClick={closeMobileMenu}
                >
                  <span>{item.label}</span>
                  <small>{String(index + 1).padStart(2, "0")}</small>
                </Link>
              ))}
            </nav>

            <div className={styles.mobileSecondary}>
              {secondaryNavigation.map((item) => (
                <Link key={item.href} href={item.href} onClick={closeMobileMenu}>
                  {item.label}
                </Link>
              ))}
            </div>

            <div className={styles.mobileMenuFooter}>
              <p>Understand your skin. Build your routine.</p>
              <span>Botanical intelligence, considered clearly.</span>
            </div>
          </div>
        </div>
      ) : null}

      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
      <CartDrawer />
    </>
  );
}

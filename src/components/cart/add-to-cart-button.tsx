"use client";

import {
  useEffect,
  useRef,
  useState,
  type ButtonHTMLAttributes,
  type MouseEventHandler,
  type ReactNode,
} from "react";

import { siteConfig } from "@/data/config";
import type { Product } from "@/data/types";

import { useCart } from "./cart-context";

type AddToCartButtonProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "children"
> & {
  product: Product;
  quantity?: number;
  openCartOnAdd?: boolean;
  children?: ReactNode;
};

export function AddToCartButton({
  product,
  quantity = 1,
  openCartOnAdd = true,
  children,
  className,
  disabled,
  onClick,
  ...buttonProps
}: AddToCartButtonProps) {
  const { addItem, openCart } = useCart();
  const [wasAdded, setWasAdded] = useState(false);
  const resetTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isUnavailable = !siteConfig.catalogIsPreview && !product.available;

  useEffect(
    () => () => {
      if (resetTimer.current) clearTimeout(resetTimer.current);
    },
    [],
  );

  const handleClick: MouseEventHandler<HTMLButtonElement> = (event) => {
    onClick?.(event);
    if (event.defaultPrevented || disabled || isUnavailable) return;

    addItem(product, quantity);
    setWasAdded(true);

    if (resetTimer.current) clearTimeout(resetTimer.current);
    resetTimer.current = setTimeout(() => setWasAdded(false), 1400);

    if (openCartOnAdd) openCart();
  };

  const defaultLabel = isUnavailable
    ? "Coming soon"
    : siteConfig.catalogIsPreview
      ? "Add to preview cart"
      : "Add to cart";

  return (
    <button
      {...buttonProps}
      type={buttonProps.type ?? "button"}
      className={className}
      disabled={disabled || isUnavailable}
      onClick={handleClick}
      aria-label={
        buttonProps["aria-label"] ??
        `${wasAdded ? "Added" : defaultLabel}: ${product.name}`
      }
    >
      {wasAdded && !openCartOnAdd ? "Added" : (children ?? defaultLabel)}
    </button>
  );
}

"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import { products } from "@/data/catalog";
import type { Product } from "@/data/types";

const STORAGE_KEY = "sattva-skin-cart:v1";
const MAX_ITEM_QUANTITY = 99;

type StoredCartLine = {
  productId: string;
  quantity: number;
};

export type CartItem = StoredCartLine & {
  product: Product;
};

type CartContextValue = {
  items: CartItem[];
  itemCount: number;
  subtotal: number;
  hasCompletePricing: boolean;
  isHydrated: boolean;
  isCartOpen: boolean;
  addItem: (product: Product | string, quantity?: number) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  removeItem: (productId: string) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

function normaliseQuantity(quantity: number) {
  if (!Number.isFinite(quantity)) return 1;
  return Math.min(MAX_ITEM_QUANTITY, Math.max(1, Math.floor(quantity)));
}

function parseStoredCart(value: string | null): StoredCartLine[] {
  if (!value) return [];

  try {
    const parsed: unknown = JSON.parse(value);
    if (!Array.isArray(parsed)) return [];

    const knownProductIds = new Set(products.map((product) => product.id));
    const quantities = new Map<string, number>();

    for (const candidate of parsed) {
      if (
        !candidate ||
        typeof candidate !== "object" ||
        !("productId" in candidate) ||
        !("quantity" in candidate) ||
        typeof candidate.productId !== "string" ||
        typeof candidate.quantity !== "number" ||
        !knownProductIds.has(candidate.productId)
      ) {
        continue;
      }

      const current = quantities.get(candidate.productId) ?? 0;
      quantities.set(
        candidate.productId,
        normaliseQuantity(current + candidate.quantity),
      );
    }

    return Array.from(quantities, ([productId, quantity]) => ({
      productId,
      quantity,
    }));
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<StoredCartLine[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    const hydrationFrame = window.requestAnimationFrame(() => {
      setLines(parseStoredCart(window.localStorage.getItem(STORAGE_KEY)));
      setIsHydrated(true);
    });

    const syncCart = (event: StorageEvent) => {
      if (event.key === STORAGE_KEY) {
        setLines(parseStoredCart(event.newValue));
      }
    };

    window.addEventListener("storage", syncCart);
    return () => {
      window.cancelAnimationFrame(hydrationFrame);
      window.removeEventListener("storage", syncCart);
    };
  }, []);

  useEffect(() => {
    if (!isHydrated) return;

    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
    } catch {
      // Storage can be unavailable in private browsing or restricted contexts.
      // The in-memory cart remains fully usable in that case.
    }
  }, [isHydrated, lines]);

  const addItem = useCallback((product: Product | string, quantity = 1) => {
    const productId = typeof product === "string" ? product : product.id;
    if (!products.some((catalogProduct) => catalogProduct.id === productId)) return;

    setLines((currentLines) => {
      const existingLine = currentLines.find((line) => line.productId === productId);
      if (!existingLine) {
        return [
          ...currentLines,
          { productId, quantity: normaliseQuantity(quantity) },
        ];
      }

      return currentLines.map((line) =>
        line.productId === productId
          ? {
              ...line,
              quantity: normaliseQuantity(line.quantity + quantity),
            }
          : line,
      );
    });
  }, []);

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    if (quantity <= 0) {
      setLines((currentLines) =>
        currentLines.filter((line) => line.productId !== productId),
      );
      return;
    }

    setLines((currentLines) =>
      currentLines.map((line) =>
        line.productId === productId
          ? { ...line, quantity: normaliseQuantity(quantity) }
          : line,
      ),
    );
  }, []);

  const removeItem = useCallback((productId: string) => {
    setLines((currentLines) =>
      currentLines.filter((line) => line.productId !== productId),
    );
  }, []);

  const clearCart = useCallback(() => setLines([]), []);
  const openCart = useCallback(() => setIsCartOpen(true), []);
  const closeCart = useCallback(() => setIsCartOpen(false), []);

  const items = useMemo<CartItem[]>(() => {
    const productsById = new Map(products.map((product) => [product.id, product]));
    return lines.flatMap((line) => {
      const product = productsById.get(line.productId);
      return product ? [{ ...line, product }] : [];
    });
  }, [lines]);

  const value = useMemo<CartContextValue>(() => {
    const itemCount = items.reduce((total, item) => total + item.quantity, 0);
    const subtotal = items.reduce(
      (total, item) => total + (item.product.price ?? 0) * item.quantity,
      0,
    );

    return {
      items,
      itemCount,
      subtotal,
      hasCompletePricing: items.every((item) => item.product.price !== null),
      isHydrated,
      isCartOpen,
      addItem,
      updateQuantity,
      removeItem,
      clearCart,
      openCart,
      closeCart,
    };
  }, [
    addItem,
    clearCart,
    closeCart,
    isCartOpen,
    isHydrated,
    items,
    openCart,
    removeItem,
    updateQuantity,
  ]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider.");
  }
  return context;
}

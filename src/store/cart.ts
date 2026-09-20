"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

/** Minimal snapshot stored in the cart. Price is display-only - the server
 * always recomputes the authoritative total from the DB at checkout. */
export interface CartItem {
  slug: string;
  name: string;
  priceCents: number;
  image: string;
  currency: string;
}

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  add: (item: CartItem) => void;
  remove: (slug: string) => void;
  clear: () => void;
  has: (slug: string) => boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
}

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      add: (item) =>
        set((state) =>
          // Digital goods: one of each, no duplicates.
          state.items.some((i) => i.slug === item.slug)
            ? { items: state.items, isOpen: true }
            : { items: [...state.items, item], isOpen: true },
        ),
      remove: (slug) =>
        set((state) => ({
          items: state.items.filter((i) => i.slug !== slug),
        })),
      clear: () => set({ items: [] }),
      has: (slug) => get().items.some((i) => i.slug === slug),
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      toggleCart: () => set((s) => ({ isOpen: !s.isOpen })),
    }),
    {
      name: "cozy-cart",
      // Only persist the line items, not the drawer open/closed UI state.
      partialize: (state) => ({ items: state.items }),
    },
  ),
);

export function cartSubtotalCents(items: CartItem[]): number {
  return items.reduce((sum, i) => sum + i.priceCents, 0);
}

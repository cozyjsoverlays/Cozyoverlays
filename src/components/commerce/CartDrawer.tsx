"use client";

import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { X, Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import { useCart, cartSubtotalCents } from "@/store/cart";
import { useHydrated } from "@/lib/use-hydrated";
import { formatCents } from "@/lib/money";
import { packThumbAlt } from "@/lib/seo";

export function CartDrawer() {
  const { items, isOpen, closeCart, remove } = useCart();
  const hydrated = useHydrated();

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && closeCart();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, closeCart]);

  const subtotal = cartSubtotalCents(items);
  const currency = items[0]?.currency ?? "USD";

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[90]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          role="dialog"
          aria-modal="true"
          aria-label="Shopping cart"
        >
          <div
            className="absolute inset-0 bg-base/80 backdrop-blur-sm"
            onClick={closeCart}
          />

          <motion.aside
            className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col border-l border-subtle bg-surface shadow-card"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <header className="flex items-center justify-between border-b border-subtle p-5">
              <h2 className="flex items-center gap-2 text-lg font-extrabold text-heading">
                <ShoppingBag size={18} className="text-lavender" /> Your Cart
              </h2>
              <button
                type="button"
                onClick={closeCart}
                aria-label="Close cart"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full text-body hover:bg-white/5 hover:text-heading"
              >
                <X size={20} />
              </button>
            </header>

            <div className="flex-1 overflow-y-auto p-5">
              {!hydrated ? null : items.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center gap-4 text-center">
                  <span className="text-4xl" aria-hidden>
                    🛒
                  </span>
                  <p className="text-body">Your cart is empty.</p>
                  <Link
                    href="/shop"
                    onClick={closeCart}
                    className="inline-flex items-center gap-2 rounded-full border border-lavender/30 bg-lavender/10 px-5 py-2.5 text-sm font-bold text-heading hover:border-lavender/60"
                  >
                    Browse packs <ArrowRight size={15} />
                  </Link>
                </div>
              ) : (
                <ul className="flex flex-col gap-3">
                  {items.map((item) => (
                    <li
                      key={item.slug}
                      className="glass flex items-center gap-3 rounded-xl p-3"
                    >
                      <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-black/40">
                        <Image
                          src={item.image}
                          alt={packThumbAlt(item.name)}
                          fill
                          sizes="64px"
                          className="object-cover"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-bold text-heading">
                          {item.name}
                        </p>
                        <p className="text-sm text-lavender">
                          {formatCents(item.priceCents, item.currency)}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => remove(item.slug)}
                        aria-label={`Remove ${item.name}`}
                        className="inline-flex h-8 w-8 items-center justify-center rounded-full text-muted hover:bg-white/5 hover:text-pink"
                      >
                        <Trash2 size={16} />
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {hydrated && items.length > 0 && (
              <footer className="border-t border-subtle p-5">
                <div className="mb-4 flex items-center justify-between">
                  <span className="text-sm text-body">Subtotal</span>
                  <span className="text-lg font-extrabold text-heading">
                    {formatCents(subtotal, currency)}
                  </span>
                </div>
                <Link
                  href="/checkout"
                  onClick={closeCart}
                  className="relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-full bg-accent-gradient bg-[length:200%_auto] px-6 py-3 text-sm font-bold text-base shadow-glow transition-all hover:bg-[position:100%_50%]"
                >
                  Checkout <ArrowRight size={16} />
                </Link>
                <Link
                  href="/cart"
                  onClick={closeCart}
                  className="mt-2 flex w-full items-center justify-center gap-2 rounded-full px-6 py-2.5 text-sm font-medium text-body hover:text-heading"
                >
                  View full cart
                </Link>
                <p className="mt-3 text-center text-xs text-muted">
                  Instant digital download · Pay securely with PayPal
                </p>
              </footer>
            )}
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

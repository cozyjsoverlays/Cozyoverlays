"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { X, CreditCard, CheckCircle2, Loader2, Mail } from "lucide-react";
import { PAYPAL_CLIENT_ID } from "@/data/site";
import { clsx } from "@/lib/clsx";

/**
 * "Buy on Site" — direct purchase via PayPal Smart Buttons, fully client-side
 * (static-export friendly: no server, no API routes). The PayPal JS SDK is
 * lazy-loaded only when a buyer opens the modal. After capture, the buyer sees
 * a confirmation; fulfillment is manual (PayPal emails the shop each sale, and
 * the pack is sent to the buyer's PayPal email).
 */

declare global {
  interface Window {
    paypal?: {
      Buttons: (opts: Record<string, unknown>) => { render: (el: HTMLElement) => Promise<void> };
    };
  }
}

let sdkPromise: Promise<void> | null = null;

function loadPayPalSdk(): Promise<void> {
  if (window.paypal) return Promise.resolve();
  if (!sdkPromise) {
    sdkPromise = new Promise((resolve, reject) => {
      const s = document.createElement("script");
      s.src = `https://www.paypal.com/sdk/js?client-id=${encodeURIComponent(
        PAYPAL_CLIENT_ID,
      )}&currency=USD&intent=capture&disable-funding=paylater,credit`;
      s.onload = () => resolve();
      s.onerror = () => {
        sdkPromise = null;
        reject(new Error("PayPal SDK failed to load"));
      };
      document.head.appendChild(s);
    });
  }
  return sdkPromise;
}

interface SiteBuyButtonProps {
  name: string;
  /** Display price like "$13.85". */
  price: string;
  large?: boolean;
}

type Stage = "idle" | "loading" | "ready" | "paid" | "error";

export function SiteBuyButton({ name, price, large = false }: SiteBuyButtonProps) {
  const [open, setOpen] = useState(false);
  const [stage, setStage] = useState<Stage>("idle");
  const boxRef = useRef<HTMLDivElement>(null);
  const amount = (parseFloat(price.replace(/[^0-9.]/g, "")) || 0).toFixed(2);

  // Escape closes; lock scroll while open.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  // Load the SDK + render PayPal buttons when the modal opens.
  useEffect(() => {
    if (!open) return;
    let cancelled = false;
    setStage("loading");
    loadPayPalSdk()
      .then(() => {
        if (cancelled || !boxRef.current || !window.paypal) return;
        boxRef.current.innerHTML = "";
        return window.paypal
          .Buttons({
            style: { shape: "pill", label: "pay", height: 45 },
            createOrder: (_d: unknown, actions: { order: { create: (o: unknown) => Promise<string> } }) =>
              actions.order.create({
                purchase_units: [
                  {
                    description: name.slice(0, 120),
                    amount: { value: amount, currency_code: "USD" },
                  },
                ],
              }),
            onApprove: (_d: unknown, actions: { order: { capture: () => Promise<unknown> } }) =>
              actions.order.capture().then(() => {
                if (!cancelled) setStage("paid");
              }),
            onError: () => {
              if (!cancelled) setStage("error");
            },
          })
          .render(boxRef.current)
          .then(() => {
            if (!cancelled) setStage("ready");
          });
      })
      .catch(() => {
        if (!cancelled) setStage("error");
      });
    return () => {
      cancelled = true;
    };
  }, [open, amount, name]);

  if (!PAYPAL_CLIENT_ID) return null;

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={`Buy ${name} on this site`}
        className={clsx(
          "inline-flex w-full items-center justify-center gap-2 rounded-full border border-lavender/40 bg-lavender/10 font-bold text-heading transition-all hover:border-lavender/70 hover:bg-lavender/20 hover:shadow-glow",
          large ? "px-6 py-3 text-sm" : "px-4 py-2.5 text-sm",
        )}
      >
        <CreditCard size={16} /> Buy on Site
      </button>

      {open &&
        typeof document !== "undefined" &&
        createPortal(
          <div
            className="fixed inset-0 z-[110] flex items-center justify-center bg-base/85 p-4 backdrop-blur-md"
            role="dialog"
            aria-modal="true"
            aria-label={`Buy ${name}`}
            onClick={() => setOpen(false)}
          >
            <div
              className="relative w-full max-w-md rounded-2xl border border-subtle bg-surface p-6 shadow-card"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close"
                className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full text-muted hover:bg-white/5 hover:text-heading"
              >
                <X size={18} />
              </button>

              {stage === "paid" ? (
                <div className="py-4 text-center">
                  <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-cyan/15 text-cyan">
                    <CheckCircle2 size={30} />
                  </span>
                  <h2 className="mt-4 text-xl font-extrabold text-heading">
                    Payment received ♡
                  </h2>
                  <p className="mt-2 text-sm text-body">
                    Thank you! Your <strong>{name}</strong> will be sent to your
                    PayPal email shortly.
                  </p>
                  <p className="mt-3 inline-flex items-center gap-1.5 text-xs text-muted">
                    <Mail size={13} /> Check your inbox (and spam) — questions?
                    Reply to the receipt email.
                  </p>
                </div>
              ) : (
                <>
                  <h2 className="pr-8 text-lg font-extrabold text-heading">{name}</h2>
                  <p className="mt-1 text-sm text-body">
                    <span className="text-xl font-extrabold text-lavender">
                      ${amount}
                    </span>{" "}
                    · instant digital pack, delivered to your PayPal email
                  </p>

                  <div className="mt-5 min-h-[52px]">
                    {stage === "loading" && (
                      <p className="flex items-center justify-center gap-2 py-3 text-sm text-muted">
                        <Loader2 size={16} className="animate-spin" /> Loading
                        secure PayPal checkout…
                      </p>
                    )}
                    {stage === "error" && (
                      <p className="rounded-xl bg-pink/10 px-4 py-3 text-sm text-pink">
                        Couldn&apos;t load PayPal checkout. Please try again — or
                        use the &quot;Buy on Etsy&quot; button instead.
                      </p>
                    )}
                    <div ref={boxRef} />
                  </div>

                  <p className="mt-3 text-center text-xs text-muted">
                    Secure payment via PayPal · no account needed on this site
                  </p>
                </>
              )}
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}

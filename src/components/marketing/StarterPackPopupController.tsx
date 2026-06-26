"use client";

import { useCallback, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { StarterPackPopup } from "@/components/marketing/StarterPackPopup";
import { NEWSLETTER_FORM_ACTION } from "@/data/site";

interface ControllerProps {
  /** localStorage key so the same popup can be reused independently per page. */
  storageKey?: string;
  /** Auto-open delay in ms (also opens on exit-intent, whichever is first). */
  delayMs?: number;
}

/** Routes where the popup should never appear. */
const SUPPRESS = ["/thank-you"];

/** Subscribe straight from the browser to the provider's public form endpoint.
 *  No server, no secret. Uses no-cors so cross-origin form posts don't error. */
async function subscribe(email: string): Promise<void> {
  if (!NEWSLETTER_FORM_ACTION) {
    // Demo mode — not configured yet. Resolve so the UX still works.
    console.warn("[newsletter] NEWSLETTER_FORM_ACTION is empty — email not captured.");
    return;
  }
  await fetch(NEWSLETTER_FORM_ACTION, {
    method: "POST",
    mode: "no-cors",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ email_address: email, email }),
  });
}

/**
 * Mount once globally. Opens after `delayMs` OR on exit-intent, whichever is
 * first; never reopens once dismissed (persisted in localStorage).
 */
export function StarterPackPopupController({
  storageKey = "cz_pack_seen",
  delayMs = 15000,
}: ControllerProps) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const suppressed = SUPPRESS.some((p) => pathname?.startsWith(p));

  useEffect(() => {
    if (suppressed) return;
    if (typeof window === "undefined") return;
    try {
      if (localStorage.getItem(storageKey)) return;
    } catch {
      /* storage blocked — just allow it */
    }

    let done = false;
    const trigger = () => {
      if (done) return;
      done = true;
      setOpen(true);
    };

    const timer = setTimeout(trigger, delayMs);
    const onLeave = (e: MouseEvent) => {
      if (e.clientY <= 0) trigger();
    };
    document.addEventListener("mouseleave", onLeave);

    return () => {
      clearTimeout(timer);
      document.removeEventListener("mouseleave", onLeave);
    };
  }, [storageKey, delayMs, suppressed]);

  const close = useCallback(() => {
    try {
      localStorage.setItem(storageKey, "1");
    } catch {
      /* ignore */
    }
    setOpen(false);
  }, [storageKey]);

  if (suppressed) return null;

  return <StarterPackPopup open={open} onClose={close} onSubmit={subscribe} />;
}

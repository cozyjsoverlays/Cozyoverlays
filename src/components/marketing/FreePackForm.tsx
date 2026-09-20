"use client";

import { useState } from "react";
import { Loader2, Mail, CheckCircle2 } from "lucide-react";
import { NEWSLETTER_FORM_ACTION } from "@/data/site";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Inline email capture for the free Cozy Starter Pack (same Kit form as the popup). */
export function FreePackForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  async function submit() {
    if (status === "submitting") return;
    if (!EMAIL_RE.test(email.trim())) {
      setStatus("error");
      return;
    }
    setStatus("submitting");
    try {
      if (NEWSLETTER_FORM_ACTION) {
        await fetch(NEWSLETTER_FORM_ACTION, {
          method: "POST",
          mode: "no-cors",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: new URLSearchParams({ email_address: email.trim(), email: email.trim() }),
        });
      }
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-subtle bg-surface/60 p-6 text-center">
        <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-warm/15 text-warm">
          <CheckCircle2 size={24} />
        </span>
        <h2 className="mt-3 text-xl font-extrabold text-heading">Check your inbox ♡</h2>
        <p className="mt-2 text-sm text-body">
          Your Cozy Starter Pack is on its way. If it&apos;s hiding, peek in
          promotions or spam.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col gap-3 sm:flex-row">
        <input
          type="email"
          inputMode="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (status === "error") setStatus("idle");
          }}
          onKeyDown={(e) => e.key === "Enter" && submit()}
          placeholder="you@email.com"
          aria-label="Email address"
          className="flex-1 rounded-full border border-subtle bg-surface/50 px-5 py-3.5 text-sm text-heading placeholder:text-muted focus:border-lavender/60 focus:outline-none focus:ring-2 focus:ring-lavender/20"
        />
        <button
          type="button"
          onClick={submit}
          disabled={status === "submitting"}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-accent-gradient px-7 py-3.5 text-sm font-bold text-base shadow-glow transition-transform hover:-translate-y-0.5 disabled:opacity-60"
        >
          {status === "submitting" ? (
            <Loader2 size={16} className="animate-spin" />
          ) : (
            <Mail size={16} />
          )}
          {status === "submitting" ? "Sending…" : "Send me the pack"}
        </button>
      </div>
      {status === "error" && (
        <p className="text-sm font-semibold text-pink">
          That email doesn&apos;t look right - mind checking it?
        </p>
      )}
      <p className="text-xs text-muted">
        Instant download · no spam, just cozy drops · unsubscribe anytime
      </p>
    </div>
  );
}

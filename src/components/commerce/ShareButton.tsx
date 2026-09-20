"use client";

import { useEffect, useRef, useState } from "react";
import { Share2, Link2, Check } from "lucide-react";
import { SITE } from "@/data/site";
import { clsx } from "@/lib/clsx";

interface ShareButtonProps {
  slug: string;
  name: string;
  image?: string;
}

/** Native share on mobile; copy/X/Pinterest/WhatsApp/Facebook popover fallback. */
export function ShareButton({ slug, name, image }: ShareButtonProps) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const boxRef = useRef<HTMLDivElement>(null);

  const url = `${SITE.url}/shop/${slug}/`;
  const text = `${name} · cozy animated stream overlay`;

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (boxRef.current && !boxRef.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  async function share() {
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({ title: name, text, url });
        return;
      } catch {
        /* user cancelled or unsupported - fall through to popover */
      }
    }
    setOpen((v) => !v);
  }

  function copy() {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  const enc = encodeURIComponent;
  const targets = [
    { label: "X / Twitter", href: `https://twitter.com/intent/tweet?text=${enc(text)}&url=${enc(url)}` },
    { label: "Pinterest", href: `https://pinterest.com/pin/create/button/?url=${enc(url)}&media=${enc(image ?? "")}&description=${enc(text)}` },
    { label: "WhatsApp", href: `https://wa.me/?text=${enc(`${text} ${url}`)}` },
    { label: "Facebook", href: `https://www.facebook.com/sharer/sharer.php?u=${enc(url)}` },
  ];

  return (
    <div ref={boxRef} className="relative inline-block">
      <button
        type="button"
        onClick={share}
        aria-expanded={open}
        aria-label={`Share ${name}`}
        title="Share"
        className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-subtle bg-white/5 text-heading transition-colors hover:border-lavender/50 hover:text-lavender"
      >
        <Share2 size={18} />
      </button>

      <div
        className={clsx(
          "absolute right-0 z-30 mt-2 w-48 origin-top-right rounded-2xl border border-subtle bg-surface p-2 shadow-card transition-all",
          open ? "scale-100 opacity-100" : "pointer-events-none scale-95 opacity-0",
        )}
      >
        <button
          type="button"
          onClick={copy}
          className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-left text-sm font-semibold text-heading hover:bg-white/5"
        >
          {copied ? <Check size={15} className="text-warm" /> : <Link2 size={15} />}
          {copied ? "Copied!" : "Copy link"}
        </button>
        {targets.map((t) => (
          <a
            key={t.label}
            href={t.href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-semibold text-body hover:bg-white/5 hover:text-heading"
          >
            {t.label}
          </a>
        ))}
      </div>
    </div>
  );
}

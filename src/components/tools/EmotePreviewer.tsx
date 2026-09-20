"use client";

/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import { Sun, Moon, X, Plus, Cat } from "lucide-react";
import { DropZone } from "@/components/tools/DropZone";
import { SizeBadge } from "@/components/tools/SizeBadge";
import { ChatPreview, type ChatTheme } from "@/components/tools/ChatPreview";
import { PLATFORM } from "@/lib/tools-config";
import { clsx } from "@/lib/clsx";

// ── Built-in sample assets (CozyJsStudio's own simple SVGs - no copyrighted art).
const svg = (inner: string) =>
  `data:image/svg+xml;utf8,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">${inner}</svg>`,
  )}`;

const SAMPLE_EMOTE = svg(
  `<g><circle cx="50" cy="55" r="34" fill="#ffd9ec"/><path d="M22 34l10 18 12-6z" fill="#ffb3da"/><path d="M78 34l-10 18-12-6z" fill="#ffb3da"/><circle cx="40" cy="54" r="4" fill="#5b3b57"/><circle cx="60" cy="54" r="4" fill="#5b3b57"/><path d="M46 64q4 4 8 0" stroke="#5b3b57" stroke-width="2.5" fill="none" stroke-linecap="round"/><circle cx="34" cy="62" r="4" fill="#ff8fc4" opacity="0.6"/><circle cx="66" cy="62" r="4" fill="#ff8fc4" opacity="0.6"/></g>`,
);

const BADGES: { id: string; src: string; label: string }[] = [
  { id: "heart", label: "Heart", src: svg(`<circle cx="50" cy="50" r="48" fill="#ff6bd6"/><path d="M50 72C30 58 28 44 38 38c6-4 12 0 12 6 0-6 6-10 12-6 10 6 8 20-12 34z" fill="#fff"/>`) },
  { id: "star", label: "Star", src: svg(`<circle cx="50" cy="50" r="48" fill="#b088ff"/><path d="M50 26l7 16 18 1-14 11 5 17-16-10-16 10 5-17-14-11 18-1z" fill="#fff"/>`) },
  { id: "paw", label: "Paw", src: svg(`<circle cx="50" cy="50" r="48" fill="#46e5ff"/><g fill="#fff"><circle cx="50" cy="58" r="13"/><circle cx="35" cy="44" r="6"/><circle cx="50" cy="38" r="6"/><circle cx="65" cy="44" r="6"/></g>`) },
];

interface TrayItem {
  id: string;
  name: string;
  src: string;
}

export function EmotePreviewer() {
  const [tray, setTray] = useState<TrayItem[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [mode, setMode] = useState<"emote" | "badge">("emote");
  const [theme, setTheme] = useState<ChatTheme>("dark");
  const [badgeId, setBadgeId] = useState<string>("heart");

  const activeSrc = tray.find((t) => t.id === activeId)?.src ?? SAMPLE_EMOTE;
  const usingSample = !tray.find((t) => t.id === activeId);
  const sizes = mode === "emote" ? PLATFORM.twitchEmote.sizes : PLATFORM.twitchBadge.sizes;
  const badgeSrc = BADGES.find((b) => b.id === badgeId)?.src;

  function addFiles(files: File[]) {
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        const id = `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
        setTray((t) => [...t, { id, name: file.name, src: String(reader.result) }]);
        setActiveId(id);
      };
      reader.readAsDataURL(file);
    });
  }

  function remove(id: string) {
    setTray((t) => t.filter((x) => x.id !== id));
    setActiveId((cur) => (cur === id ? null : cur));
  }

  const noteFor = (i: number, total: number) =>
    i === 0 ? "Largest" : i === total - 1 ? "In chat" : "Medium";

  return (
    <div className="flex flex-col gap-8">
      {/* Upload + tray */}
      <div>
        {tray.length === 0 ? (
          <>
            <DropZone onFiles={addFiles} />
            <p className="mt-3 text-center text-sm text-muted">
              No image handy?{" "}
              <button
                type="button"
                onClick={() => setActiveId(null)}
                className="inline-flex items-center gap-1 font-bold text-lavender hover:text-pink"
              >
                <Cat size={14} /> Try it with our sample
              </button>
            </p>
          </>
        ) : (
          <div className="flex flex-wrap items-center gap-3">
            {tray.map((item) => (
              <div key={item.id} className="relative">
                <button
                  type="button"
                  onClick={() => setActiveId(item.id)}
                  className={clsx(
                    "flex h-16 w-16 items-center justify-center rounded-xl border-2 bg-black/30 p-1.5 transition-colors",
                    activeId === item.id ? "border-lavender" : "border-subtle hover:border-lavender/50",
                  )}
                >
                  <img src={item.src} alt={item.name} className="max-h-full max-w-full" />
                </button>
                <button
                  type="button"
                  onClick={() => remove(item.id)}
                  aria-label={`Remove ${item.name}`}
                  className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-pink text-base shadow"
                >
                  <X size={13} />
                </button>
              </div>
            ))}
            <label className="flex h-16 w-16 cursor-pointer items-center justify-center rounded-xl border-2 border-dashed border-subtle text-muted hover:border-lavender/50 hover:text-lavender">
              <Plus size={20} />
              <input
                type="file"
                accept="image/*"
                multiple
                className="sr-only"
                onChange={(e) => {
                  const f = Array.from(e.target.files ?? []);
                  if (f.length) addFiles(f);
                  e.target.value = "";
                }}
              />
            </label>
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="inline-flex rounded-full border border-subtle p-1">
          {(["emote", "badge"] as const).map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => setMode(m)}
              className={clsx(
                "rounded-full px-4 py-1.5 text-sm font-bold capitalize transition-colors",
                mode === m ? "bg-accent-gradient text-base" : "text-body hover:text-heading",
              )}
            >
              {m === "emote" ? "Emote sizes" : "Badge sizes"}
            </button>
          ))}
        </div>
        {usingSample && (
          <span className="rounded-full bg-lavender/15 px-3 py-1 text-xs font-bold text-lavender">
            Showing sample - drop your own above
          </span>
        )}
      </div>

      {/* Size row */}
      <div>
        <h2 className="text-lg font-extrabold text-heading">
          Every {mode === "emote" ? "Twitch emote" : "Twitch badge"} size at once
        </h2>
        <p className="mt-1 text-sm text-muted">
          Watch the smallest one - that&apos;s where detail dies. Aim for a bold, simple shape.
        </p>
        <div className="mt-5 flex flex-wrap items-end gap-6">
          {sizes.map((size, i) => (
            <SizeBadge key={size} src={activeSrc} size={size} note={noteFor(i, sizes.length)} />
          ))}
        </div>
      </div>

      {/* Live chat previews */}
      <div>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-lg font-extrabold text-heading">Live in chat</h2>
          <button
            type="button"
            onClick={() => setTheme((t) => (t === "dark" ? "light" : "dark"))}
            className="inline-flex items-center gap-2 rounded-full border border-subtle bg-white/5 px-4 py-2 text-sm font-bold text-heading hover:border-lavender/40"
          >
            {theme === "dark" ? <Sun size={15} /> : <Moon size={15} />}
            {theme === "dark" ? "Light" : "Dark"} backgrounds
          </button>
        </div>

        {/* Twitch sub-badge picker */}
        <div className="mt-4 flex flex-wrap items-center gap-2 text-sm">
          <span className="text-muted">Sub badge:</span>
          {BADGES.map((b) => (
            <button
              key={b.id}
              type="button"
              onClick={() => setBadgeId(b.id)}
              aria-pressed={badgeId === b.id}
              className={clsx(
                "flex h-8 w-8 items-center justify-center rounded-full border-2 p-1",
                badgeId === b.id ? "border-lavender" : "border-subtle hover:border-lavender/50",
              )}
              title={b.label}
            >
              <img src={b.src} alt={b.label} className="h-full w-full" />
            </button>
          ))}
        </div>

        <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-3">
          <ChatPreview platform="twitch" theme={theme} emoteSrc={activeSrc} badgeSrc={badgeSrc} />
          <ChatPreview platform="discord" theme={theme} emoteSrc={activeSrc} />
          <ChatPreview platform="youtube" theme={theme} emoteSrc={activeSrc} />
        </div>
      </div>
    </div>
  );
}

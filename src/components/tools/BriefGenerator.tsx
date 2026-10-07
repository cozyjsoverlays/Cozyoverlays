"use client";

import { useState } from "react";
import { Sparkles, Copy, Check, Mail } from "lucide-react";
import { clsx } from "@/lib/clsx";
import { CONTACT_EMAIL } from "@/data/site";

// Aesthetic-specific cozy motion details (cozyoverlays house style).
const MOTION_BY_STYLE: Record<string, string> = {
  "Kawaii pastel": "a blinking chibi mascot, floating hearts and tiny stars, soft sparkle drift",
  "Lofi bedroom": "rain streaking down the window, a slow-glowing desk lamp, a sleeping cat that breathes, a softly blinking monitor",
  "Cottagecore": "swaying wildflowers, drifting fireflies, gentle steam rising from a teacup",
  "Witchy / dark fantasy": "a flickering candle, drifting embers, a cat asleep on an open spellbook, slow potion bubbles",
  "Cyberpunk": "flickering neon signage, faint scan-lines, rain on neon-lit glass, a pulsing hologram",
  "Seasonal": "falling snow or drifting leaves, fairy-light twinkle, a warm window glow",
};

const PLATFORMS = ["Twitch", "Kick", "YouTube"];
const STYLES = [
  "Kawaii pastel",
  "Lofi bedroom",
  "Cottagecore",
  "Witchy / dark fantasy",
  "Cyberpunk",
  "Seasonal",
];
const ASSETS = [
  "Starting Soon screen",
  "BRB screen",
  "Ending screen",
  "Offline banner",
  "Animated alerts",
  "Info panels",
  "Webcam / VTuber frame",
  "Emotes",
  "Sub badges",
];

const list = (arr: string[], fallback: string) => (arr.length ? arr.join(", ") : fallback);

interface Fields {
  name: string;
  channel: string;
  content: string;
  vibe: string;
  styleOther: string;
  colors: string;
  url: string;
  email: string;
}

const EMPTY: Fields = {
  name: "",
  channel: "",
  content: "",
  vibe: "",
  styleOther: "",
  colors: "",
  url: "",
  email: "",
};

function buildBrief(d: Fields, sel: { platform: string[]; style: string[]; assets: string[] }) {
  const styles = [...sel.style];
  if (d.styleOther) styles.push(d.styleOther);
  const styleStr = list(styles, "cozy - pick what fits the channel best");

  const motions = [
    ...new Set(sel.style.flatMap((s) => (MOTION_BY_STYLE[s] || "").split(", ").filter(Boolean))),
  ];
  const motionStr = motions.length
    ? motions.slice(0, 4).join("; ")
    : "one or two living details - e.g. rain on the window, a candle flicker, a breathing pet";

  const assets = list(
    sel.assets,
    "a full pack: Starting Soon, BRB, Ending, Offline, alerts, panels, webcam frame, emotes, sub badges",
  );

  const L: string[] = [];
  L.push(
    "Design a cohesive, custom cozy stream-overlay pack - in the cozyoverlays.com house style. Make it feel like a *place*, not a template, and like nobody else's channel.",
  );
  L.push("");
  L.push("## The streamer");
  L.push(`- Channel: ${d.channel || "[channel name]"}${d.name ? `  (host: ${d.name})` : ""}`);
  if (sel.platform.length) L.push(`- Platform(s): ${sel.platform.join(", ")}`);
  if (d.content) L.push(`- Streams: ${d.content}`);
  if (d.vibe) L.push(`- Vibe & community: ${d.vibe}`);
  L.push("");
  L.push("## Aesthetic direction");
  L.push(`- Style: ${styleStr}`);
  L.push(`- Palette: ${d.colors || "a soft, cohesive cozy palette that suits the vibe"}`);
  L.push(`- Living details to include (subtle, looping): ${motionStr}.`);
  L.push("- Mood: warm, soft, a little dreamy - calm but never flat. One signature detail the channel becomes known for.");
  L.push("");
  L.push("## Assets to produce (one consistent set)");
  L.push(`- ${assets}`);
  L.push("");
  L.push("## Production specs");
  L.push("- Full scenes (Starting Soon / BRB / Ending / Offline): 1920×1080, leave clear space for the cam + chat.");
  L.push("- Webcam / VTuber frame: transparent PNG, fits a 16:9 cam, edges that don't crop the face.");
  L.push("- Info panels: ~320px wide, matching headers, consistent icon set.");
  L.push("- Animated alerts: transparent background, short loop, with follow / sub / donation variants.");
  L.push("- Emotes: 112×112 with 56×56 and 28×28 versions, readable at the smallest size.");
  L.push("- Sub badges: 72×72 with 36 and 18 versions, a clear tier progression.");
  L.push("- Deliver OBS-ready: transparent PNGs for stills, looping WebM/GIF for animated pieces.");
  L.push("");
  L.push("Keep type, color, lighting and motion consistent across every asset so the whole channel reads as one cozy world.");
  if (d.url) {
    L.push("");
    L.push(`Reference channel: ${d.url}`);
  }
  if (d.email) L.push(`Send previews to: ${d.email}`);
  return L.join("\n");
}

const inputCls =
  "w-full rounded-xl border border-subtle bg-surface/50 px-4 py-3 text-sm text-heading placeholder:text-muted focus:border-lavender/60 focus:outline-none focus:ring-2 focus:ring-lavender/20";
const labelCls = "mb-2 block text-sm font-bold text-heading";

export function BriefGenerator() {
  const [f, setF] = useState<Fields>(EMPTY);
  const [sel, setSel] = useState({ platform: [] as string[], style: [] as string[], assets: [] as string[] });
  const [brief, setBrief] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const set = (k: keyof Fields) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setF((p) => ({ ...p, [k]: e.target.value }));

  const toggle = (group: keyof typeof sel, val: string) =>
    setSel((p) => ({
      ...p,
      [group]: p[group].includes(val) ? p[group].filter((x) => x !== val) : [...p[group], val],
    }));

  const Chip = ({ group, val, label }: { group: keyof typeof sel; val: string; label: string }) => (
    <button
      type="button"
      onClick={() => toggle(group, val)}
      aria-pressed={sel[group].includes(val)}
      className={clsx(
        "rounded-full border px-3.5 py-2 text-sm font-semibold transition-colors",
        sel[group].includes(val)
          ? "border-transparent bg-accent-gradient text-base"
          : "border-subtle bg-white/5 text-body hover:border-lavender/40 hover:text-heading",
      )}
    >
      {label}
    </button>
  );

  function generate() {
    setBrief(buildBrief(f, sel));
    setTimeout(() => document.getElementById("brief-out")?.scrollIntoView({ behavior: "smooth", block: "nearest" }), 50);
  }

  function copy() {
    if (!brief) return;
    navigator.clipboard.writeText(brief);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className={labelCls}>Your name or handle</label>
          <input className={inputCls} value={f.name} onChange={set("name")} placeholder="e.g. miloplays / @milocozy" />
        </div>
        <div>
          <label className={labelCls}>Channel name</label>
          <input className={inputCls} value={f.channel} onChange={set("channel")} placeholder="e.g. Milo's Cozy Corner" />
        </div>
      </div>

      <div>
        <label className={labelCls}>Where do you stream?</label>
        <div className="flex flex-wrap gap-2">
          {PLATFORMS.map((p) => (
            <Chip key={p} group="platform" val={p} label={p} />
          ))}
        </div>
      </div>

      <div>
        <label className={labelCls}>What you stream</label>
        <input className={inputCls} value={f.content} onChange={set("content")} placeholder="e.g. cozy games, Just Chatting, art, lofi music" />
      </div>

      <div>
        <label className={labelCls}>Describe your channel &amp; vibe</label>
        <textarea
          className={clsx(inputCls, "min-h-[90px] resize-y")}
          value={f.vibe}
          onChange={set("vibe")}
          placeholder="Who's your community? What's the mood? What makes your channel feel like yours? (1–3 sentences)"
        />
      </div>

      <div>
        <label className={labelCls}>
          Aesthetic <span className="font-medium text-muted">- pick any that fit</span>
        </label>
        <div className="flex flex-wrap gap-2">
          {STYLES.map((s) => (
            <Chip key={s} group="style" val={s} label={s.replace(" / dark fantasy", "")} />
          ))}
        </div>
        <input
          className={clsx(inputCls, "mt-3")}
          value={f.styleOther}
          onChange={set("styleOther")}
          placeholder="Something else? Describe it here (optional)"
        />
      </div>

      <div>
        <label className={labelCls}>What you need in your pack</label>
        <div className="flex flex-wrap gap-2">
          {ASSETS.map((a) => (
            <Chip key={a} group="assets" val={a} label={a.replace(" screen", "").replace(" / VTuber frame", " frame")} />
          ))}
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className={labelCls}>Color palette</label>
          <input className={inputCls} value={f.colors} onChange={set("colors")} placeholder="e.g. soft pink & cream, lavender + sage, #F4C7D9" />
        </div>
        <div>
          <label className={labelCls}>
            Channel / socials URL <span className="font-medium text-muted">(optional)</span>
          </label>
          <input className={inputCls} value={f.url} onChange={set("url")} placeholder="e.g. twitch.tv/milocozy" />
        </div>
      </div>

      <div>
        <label className={labelCls}>
          Email or Discord <span className="font-medium text-muted">(optional)</span>
        </label>
        <input className={inputCls} value={f.email} onChange={set("email")} placeholder="So we can send your previews - leave blank otherwise." />
      </div>

      <button
        type="button"
        onClick={generate}
        className="inline-flex items-center justify-center gap-2 rounded-full bg-accent-gradient px-6 py-3.5 text-sm font-bold text-base shadow-glow transition-transform hover:-translate-y-0.5"
      >
        <Sparkles size={16} /> Generate my overlay brief
      </button>

      {brief && (
        <div id="brief-out" className="overflow-hidden rounded-2xl border border-subtle bg-surface/40">
          <div className="flex items-center justify-between border-b border-subtle bg-surface-2 px-4 py-3">
            <span className="text-xs font-bold uppercase tracking-wide text-lavender">Your overlay brief</span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={copy}
                className="inline-flex items-center gap-1.5 rounded-lg border border-subtle bg-white/5 px-3 py-1.5 text-xs font-bold text-heading hover:border-lavender/40"
              >
                {copied ? <Check size={13} /> : <Copy size={13} />} {copied ? "Copied" : "Copy"}
              </button>
              {/* Copy first: long briefs get truncated by some mail clients, so
                  the full text is always on the clipboard to paste. */}
              <a
                href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
                  "Custom overlay brief",
                )}&body=${encodeURIComponent(brief)}`}
                onClick={copy}
                className="inline-flex items-center gap-1.5 rounded-lg border border-subtle bg-white/5 px-3 py-1.5 text-xs font-bold text-heading hover:border-lavender/40"
              >
                <Mail size={13} /> Email it
              </a>
            </div>
          </div>
          <pre className="max-h-[420px] overflow-auto whitespace-pre-wrap break-words p-4 font-mono text-[12.5px] leading-relaxed text-body">
            {brief}
          </pre>
          <p className="border-t border-subtle bg-surface/60 px-4 py-3 text-xs text-muted">
            Drop this into your image generator to create the pack, or send it to{" "}
            <a href={`mailto:${CONTACT_EMAIL}`} className="font-bold text-lavender hover:text-pink">
              {CONTACT_EMAIL}
            </a>{" "}
            as your commission brief.
          </p>
        </div>
      )}
    </div>
  );
}

"use client";

/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import JSZip from "jszip";
import { Download, Package, AlertTriangle, CheckCircle2 } from "lucide-react";
import { DropZone } from "@/components/tools/DropZone";
import { PLATFORM } from "@/lib/tools-config";
import { clsx } from "@/lib/clsx";

type ModeKey = "twitchEmote" | "twitchBadge" | "discordEmoji" | "youtubeEmoji";

const MODES: { key: ModeKey; label: string; sizes: number[]; maxKB?: number }[] = [
  { key: "twitchEmote", label: "Twitch emote", sizes: [...PLATFORM.twitchEmote.sizes] },
  { key: "twitchBadge", label: "Twitch badge", sizes: [...PLATFORM.twitchBadge.sizes] },
  { key: "discordEmoji", label: "Discord emoji", sizes: [PLATFORM.discordEmoji.size], maxKB: PLATFORM.discordEmoji.maxKB },
  { key: "youtubeEmoji", label: "YouTube emoji", sizes: [PLATFORM.youtubeEmoji.size] },
];

interface Output {
  size: number;
  dataUrl: string;
  blob: Blob;
  kb: number;
  overLimit: boolean;
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((res, rej) => {
    const img = new Image();
    img.onload = () => res(img);
    img.onerror = rej;
    img.src = src;
  });
}

export function EmoteResizer() {
  const [srcUrl, setSrcUrl] = useState<string | null>(null);
  const [srcDims, setSrcDims] = useState<{ w: number; h: number } | null>(null);
  const [mode, setMode] = useState<ModeKey>("twitchEmote");
  const [outputs, setOutputs] = useState<Output[]>([]);
  const [busy, setBusy] = useState(false);

  const activeMode = MODES.find((m) => m.key === mode)!;
  const notSquare = srcDims ? Math.abs(srcDims.w - srcDims.h) > 2 : false;

  async function handleFiles(files: File[]) {
    const file = files[0];
    const url = await new Promise<string>((res) => {
      const r = new FileReader();
      r.onload = () => res(String(r.result));
      r.readAsDataURL(file);
    });
    const img = await loadImage(url);
    setSrcUrl(url);
    setSrcDims({ w: img.naturalWidth, h: img.naturalHeight });
    await generate(url, mode);
  }

  async function generate(url: string, modeKey: ModeKey) {
    setBusy(true);
    const m = MODES.find((x) => x.key === modeKey)!;
    const img = await loadImage(url);
    const results: Output[] = [];
    for (const size of m.sizes) {
      const canvas = document.createElement("canvas");
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext("2d")!;
      ctx.imageSmoothingQuality = "high";
      // Contain the image within the square, preserving aspect + transparency.
      const scale = Math.min(size / img.naturalWidth, size / img.naturalHeight);
      const w = img.naturalWidth * scale;
      const h = img.naturalHeight * scale;
      ctx.drawImage(img, (size - w) / 2, (size - h) / 2, w, h);
      const blob: Blob = await new Promise((res) =>
        canvas.toBlob((b) => res(b!), "image/png"),
      );
      const kb = blob.size / 1024;
      results.push({
        size,
        dataUrl: canvas.toDataURL("image/png"),
        blob,
        kb,
        overLimit: m.maxKB ? kb > m.maxKB : false,
      });
    }
    setOutputs(results);
    setBusy(false);
  }

  function changeMode(modeKey: ModeKey) {
    setMode(modeKey);
    if (srcUrl) void generate(srcUrl, modeKey);
  }

  function downloadOne(o: Output) {
    const a = document.createElement("a");
    a.href = o.dataUrl;
    a.download = `${activeMode.key}-${o.size}x${o.size}.png`;
    a.click();
  }

  async function downloadZip() {
    const zip = new JSZip();
    outputs.forEach((o) =>
      zip.file(`${activeMode.key}-${o.size}x${o.size}.png`, o.blob),
    );
    const blob = await zip.generateAsync({ type: "blob" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `${activeMode.key}-pack.zip`;
    a.click();
    URL.revokeObjectURL(a.href);
  }

  return (
    <div className="flex flex-col gap-8">
      {!srcUrl ? (
        <DropZone onFiles={handleFiles} multiple={false} hint="A square, high-res PNG with transparency works best" />
      ) : (
        <>
          {/* Mode picker */}
          <div className="flex flex-wrap gap-2">
            {MODES.map((m) => (
              <button
                key={m.key}
                type="button"
                onClick={() => changeMode(m.key)}
                className={clsx(
                  "rounded-full border px-4 py-2 text-sm font-bold transition-colors",
                  mode === m.key
                    ? "border-transparent bg-accent-gradient text-base"
                    : "border-subtle bg-white/5 text-body hover:border-lavender/40",
                )}
              >
                {m.label}
              </button>
            ))}
          </div>

          {/* Warnings */}
          {notSquare && (
            <p className="inline-flex items-center gap-2 rounded-xl bg-pink/10 px-4 py-2.5 text-sm text-pink">
              <AlertTriangle size={15} /> Your image isn&apos;t square ({srcDims!.w}×{srcDims!.h}). It&apos;s been centered with transparent padding - for best results, start from a square canvas.
            </p>
          )}

          {/* Outputs */}
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            {outputs.map((o) => (
              <div key={o.size} className="flex flex-col items-center gap-3 rounded-2xl border border-subtle bg-surface/40 p-4">
                <div
                  className="flex items-center justify-center rounded-lg p-2"
                  style={{
                    backgroundImage:
                      "linear-gradient(45deg,rgba(255,255,255,.06) 25%,transparent 25%),linear-gradient(-45deg,rgba(255,255,255,.06) 25%,transparent 25%),linear-gradient(45deg,transparent 75%,rgba(255,255,255,.06) 75%),linear-gradient(-45deg,transparent 75%,rgba(255,255,255,.06) 75%)",
                    backgroundSize: "12px 12px",
                    backgroundPosition: "0 0,0 6px,6px -6px,-6px 0",
                  }}
                >
                  <img src={o.dataUrl} alt={`${o.size}px output`} width={Math.min(o.size, 96)} height={Math.min(o.size, 96)} />
                </div>
                <div className="text-center">
                  <p className="font-mono text-sm font-bold text-heading">{o.size}×{o.size}</p>
                  <p className={clsx("text-xs", o.overLimit ? "text-pink" : "text-muted")}>
                    {o.kb.toFixed(1)} KB {o.overLimit && `(> ${activeMode.maxKB}KB!)`}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => downloadOne(o)}
                  className="inline-flex items-center gap-1.5 rounded-full border border-subtle px-3 py-1.5 text-xs font-bold text-heading hover:border-lavender/40"
                >
                  <Download size={13} /> PNG
                </button>
              </div>
            ))}
          </div>

          {/* Actions */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={downloadZip}
              disabled={busy || outputs.length === 0}
              className="inline-flex items-center gap-2 rounded-full bg-accent-gradient px-6 py-3 text-sm font-bold text-base shadow-glow disabled:opacity-50"
            >
              <Package size={16} /> Download all as .zip
            </button>
            <button
              type="button"
              onClick={() => {
                setSrcUrl(null);
                setOutputs([]);
                setSrcDims(null);
              }}
              className="text-sm font-medium text-muted hover:text-heading"
            >
              Start over
            </button>
            <span className="inline-flex items-center gap-1.5 text-xs text-cyan">
              <CheckCircle2 size={13} /> Resized in your browser - nothing uploaded.
            </span>
          </div>
        </>
      )}
    </div>
  );
}

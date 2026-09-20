"use client";

import { useRef, useState, type DragEvent } from "react";
import { UploadCloud, ShieldCheck } from "lucide-react";
import { clsx } from "@/lib/clsx";

interface DropZoneProps {
  onFiles: (files: File[]) => void;
  accept?: string;
  multiple?: boolean;
  hint?: string;
}

/**
 * Drag-and-drop / click file picker. Purely local - it hands File objects to
 * the parent, which reads them in the browser. Nothing is ever uploaded.
 */
export function DropZone({
  onFiles,
  accept = "image/png,image/gif,image/jpeg,image/webp",
  multiple = true,
  hint = "PNG or GIF works best",
}: DropZoneProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [over, setOver] = useState(false);

  function handleDrop(e: DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setOver(false);
    const files = Array.from(e.dataTransfer.files).filter((f) =>
      f.type.startsWith("image/"),
    );
    if (files.length) onFiles(files);
  }

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault();
        setOver(true);
      }}
      onDragLeave={() => setOver(false)}
      onDrop={handleDrop}
      onClick={() => inputRef.current?.click()}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") inputRef.current?.click();
      }}
      role="button"
      tabIndex={0}
      aria-label="Upload an image (processed locally, never uploaded)"
      className={clsx(
        "flex cursor-pointer flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed p-10 text-center transition-colors focus:outline-none focus:ring-2 focus:ring-lavender/40",
        over
          ? "border-lavender bg-lavender/10"
          : "border-subtle bg-surface/40 hover:border-lavender/50 hover:bg-white/5",
      )}
    >
      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-lavender/15 text-lavender">
        <UploadCloud size={26} />
      </span>
      <p className="text-base font-bold text-heading">
        Drop an image here, or click to choose
      </p>
      <p className="text-sm text-muted">{hint}</p>
      <p className="mt-1 inline-flex items-center gap-1.5 text-xs text-cyan">
        <ShieldCheck size={13} /> Your files never leave your device.
      </p>
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        className="sr-only"
        onChange={(e) => {
          const files = Array.from(e.target.files ?? []);
          if (files.length) onFiles(files);
          e.target.value = "";
        }}
      />
    </div>
  );
}

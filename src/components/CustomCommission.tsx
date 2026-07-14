import { Check, Sparkles, ExternalLink } from "lucide-react";
import { LINKS } from "@/data/site";
import { Reveal } from "@/components/ui/Reveal";

const FEATURES = [
  "Your character or mascot",
  "Custom color palette",
  "All screens + alerts",
  "Custom emotes",
  "Sub badge set",
  "Panels + overlays",
];

export function CustomCommission() {
  return (
    <section className="section-pad">
      <div className="container-page">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-subtle bg-surface p-8 md:p-12">
            <div
              aria-hidden
              className="glow-blob absolute -right-20 -top-20 h-72 w-72 bg-pink opacity-25"
            />
            <div
              aria-hidden
              className="glow-blob absolute -bottom-24 -left-16 h-72 w-72 bg-lavender opacity-20"
            />

            <div className="relative grid gap-10 lg:grid-cols-2 lg:items-center">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full border border-subtle bg-white/5 px-3 py-1.5 text-xs font-bold text-lavender">
                  <Sparkles size={14} /> Custom Commission
                </span>
                <h2 className="mt-5 text-[clamp(1.9rem,4vw,3rem)] font-extrabold leading-tight text-heading">
                  Need Something{" "}
                  <span className="gradient-text">Unique?</span>
                </h2>
                <p className="mt-4 max-w-md text-base text-body">
                  Want a one-of-a-kind world built around your own character?
                  Commission a fully bespoke animated pack designed from scratch
                  for your channel.
                </p>
                <div className="mt-6 flex items-baseline gap-3">
                  <span className="text-lg font-semibold text-muted line-through">
                    $399.50
                  </span>
                  <span className="text-4xl font-extrabold text-heading">
                    $99.87
                  </span>
                  <span className="rounded-full bg-pink/15 px-2.5 py-1 text-xs font-bold text-pink">
                    -75%
                  </span>
                </div>
                <div className="mt-7 flex flex-wrap gap-3">
                  <a
                    href={LINKS.etsyCustom}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-accent-gradient px-6 py-3 text-sm font-bold text-base shadow-glow transition-transform hover:-translate-y-0.5"
                  >
                    Start a Commission <ExternalLink size={15} />
                  </a>
                  <a
                    href="/custom"
                    className="inline-flex items-center gap-2 rounded-full border border-subtle bg-white/5 px-6 py-3 text-sm font-bold text-heading hover:border-lavender/40"
                  >
                    Build your brief
                  </a>
                </div>
              </div>

              <ul className="grid gap-3 sm:grid-cols-2">
                {FEATURES.map((f) => (
                  <li
                    key={f}
                    className="glass flex items-center gap-3 rounded-xl p-4 text-sm font-medium text-body"
                  >
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-lavender/15 text-lavender">
                      <Check size={15} />
                    </span>
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

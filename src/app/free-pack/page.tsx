import type { Metadata } from "next";
import { Check } from "lucide-react";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { AuroraBackground } from "@/components/ui/AuroraBackground";
import { FreePackForm } from "@/components/marketing/FreePackForm";
import { SITE } from "@/data/site";

export const metadata: Metadata = {
  title: "Free Cozy Starter Pack - Stream Screens & 28 Panels",
  description:
    "Grab the free Cozy Starter Pack: Starting Soon, Be Right Back, Ending and Offline screens plus 28 matching panels. Ready for OBS in minutes - emailed instantly.",
  alternates: { canonical: "/free-pack" },
  openGraph: {
    type: "website",
    title: "Free Cozy Starter Pack · CozyOverlays",
    description:
      "Free stream screens + 28 panels, ready for OBS in minutes. Emailed instantly.",
    url: `${SITE.url}/free-pack`,
  },
};

const BENEFITS = [
  "Starting Soon, Be Right Back, Ending & Offline screens",
  "28 matching profile panels",
  "Ready for OBS, Streamlabs & StreamElements in minutes",
  "Instant email delivery - nothing ships",
  "A taste of the full cozy house style",
];

export default function FreePackPage() {
  return (
    <>
      <Nav />
      <main>
        <section className="relative isolate overflow-hidden pb-16 pt-32 md:pt-44">
          <AuroraBackground intense />
          <div className="container-page max-w-3xl text-center">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-lavender">
              Free overlay drop
            </span>
            <h1 className="mt-4 text-[clamp(2.4rem,6vw,4rem)] font-extrabold leading-tight text-heading">
              Grab your free{" "}
              <span className="gradient-text">Cozy Starter Pack</span>
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-lg text-body">
              Make your stream feel like home before you spend a cent - a full
              set of screens and panels, straight to your inbox.
            </p>

            <ul className="mx-auto mt-8 flex max-w-md flex-col gap-2.5 text-left">
              {BENEFITS.map((b) => (
                <li key={b} className="flex items-center gap-2.5 text-sm text-body">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-warm/15 text-warm">
                    <Check size={12} />
                  </span>
                  {b}
                </li>
              ))}
            </ul>

            <div className="mx-auto mt-9 max-w-xl">
              <FreePackForm />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

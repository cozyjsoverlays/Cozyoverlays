import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { CONTACT_EMAIL } from "@/data/site";

export const metadata: Metadata = {
  title: "Refund Policy",
  description: "Refund policy for CozyOverlays digital download products.",
  alternates: { canonical: "/refund-policy" },
};

export default function RefundPolicyPage() {
  return (
    <LegalPage
      title="Refund Policy"
      updated="June 2026"
      sections={[
        {
          heading: "Digital goods are non-refundable",
          body: [
            "Every product sold on CozyOverlays is an instant digital download. Because the files are delivered immediately and cannot be returned, all sales are final once a download link has been accessed.",
          ],
        },
        {
          heading: "Technical issues",
          body: [
            `If a file is corrupted, won't open, or a download link isn't working, email ${CONTACT_EMAIL} within a reasonable time and we'll repair the file or re-issue your download links. We want every pack working on your stream.`,
          ],
        },
        {
          heading: "Accidental or duplicate purchases",
          body: [
            `If you were charged twice for the same pack or purchased in error before downloading, email ${CONTACT_EMAIL} and we'll review it case by case.`,
          ],
        },
      ]}
    />
  );
}

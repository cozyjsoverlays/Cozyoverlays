import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { CONTACT_EMAIL } from "@/data/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How CozyOverlays handles your data.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      updated="June 2026"
      sections={[
        {
          heading: "What we collect",
          body: [
            "To deliver your purchase we store your email address and order details (which packs you bought and when). Your cart is kept in your own browser's local storage.",
          ],
        },
        {
          heading: "Payments",
          body: [
            "Payments are handled entirely by PayPal. We receive a confirmation and your payer email, but never your card or bank details.",
          ],
        },
        {
          heading: "Email",
          body: [
            "We use your email solely to send your download links and order-related messages. We don't sell your data.",
          ],
        },
        {
          heading: "Your choices",
          body: [
            `Want your order data removed after your download window closes? Email ${CONTACT_EMAIL} and we'll take care of it.`,
          ],
        },
      ]}
    />
  );
}

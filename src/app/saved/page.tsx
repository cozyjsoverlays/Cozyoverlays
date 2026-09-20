import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { SavedClient } from "@/components/commerce/SavedClient";

export const metadata: Metadata = {
  title: "Saved Packs - Your Cozy Wishlist",
  description:
    "Packs you've saved for later. Share your wishlist with a single link.",
  robots: { index: false },
};

export default function SavedPage() {
  return (
    <>
      <Nav />
      <main className="pt-28">
        <div className="container-page pb-20">
          <SavedClient />
        </div>
      </main>
      <Footer />
    </>
  );
}

"use client";

import { useEffect, useState } from "react";

/** True only after the first client render - use to gate localStorage-backed
 * state (e.g. the cart) so SSR markup and the first client paint match. */
export function useHydrated(): boolean {
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => setHydrated(true), []);
  return hydrated;
}

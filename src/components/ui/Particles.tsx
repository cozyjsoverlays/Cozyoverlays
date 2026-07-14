"use client";

import { useMemo } from "react";
import { useReducedMotion } from "framer-motion";

const COLORS = ["#B088FF", "#FF6BD6", "#46E5FF"];

/** Deterministic pseudo-random so SSR and client markup match (no hydration warnings). */
function seeded(i: number, salt: number) {
  const x = Math.sin(i * 928.31 + salt * 13.7) * 10000;
  return x - Math.floor(x);
}

interface ParticlesProps {
  count?: number;
}

export function Particles({ count = 26 }: ParticlesProps) {
  const reduce = useReducedMotion();

  const dots = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => {
        const size = 2 + seeded(i, 1) * 5;
        return {
          left: `${seeded(i, 2) * 100}%`,
          size,
          color: COLORS[Math.floor(seeded(i, 3) * COLORS.length)],
          delay: seeded(i, 4) * 18,
          duration: 14 + seeded(i, 5) * 16,
          bottom: `-${seeded(i, 6) * 20}%`,
        };
      }),
    [count],
  );

  if (reduce) return null;

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
    >
      {dots.map((d, i) => (
        <span
          key={i}
          className="absolute rounded-full blur-[1px]"
          style={{
            left: d.left,
            bottom: d.bottom,
            width: d.size,
            height: d.size,
            backgroundColor: d.color,
            boxShadow: `0 0 ${d.size * 2}px ${d.color}`,
            animation: `float ${d.duration}s linear ${d.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
}

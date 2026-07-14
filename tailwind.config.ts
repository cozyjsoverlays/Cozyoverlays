import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/data/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Original CozyOverlays palette.
        // Backgrounds
        base: "#0D0814",
        surface: "#130D26",
        "surface-2": "#1A1230",
        // Accents
        lavender: "#B088FF",
        pink: "#FF6BD6",
        cyan: "#46E5FF",
        warm: "#46E5FF", // alias used by sale badges/prices — original cyan accent
        // Text
        heading: "#F0ECFA",
        body: "#C4BBD9",
        muted: "#8A82A0",
      },
      borderColor: {
        subtle: "rgba(176,136,255,.12)",
      },
      fontFamily: {
        sans: ["var(--font-nunito)", "system-ui", "sans-serif"],
        display: ["var(--font-fraunces)", "serif"],
      },
      boxShadow: {
        glow: "0 0 40px -8px rgba(176,136,255,.45)",
        "glow-pink": "0 0 40px -8px rgba(255,107,214,.45)",
        "glow-cyan": "0 0 40px -8px rgba(70,229,255,.45)",
        card: "0 20px 60px -20px rgba(0,0,0,.6)",
        "card-hover":
          "0 30px 80px -20px rgba(176,136,255,.35), 0 0 0 1px rgba(176,136,255,.25)",
      },
      backgroundImage: {
        "accent-gradient":
          "linear-gradient(120deg, #B088FF 0%, #FF6BD6 50%, #46E5FF 100%)",
      },
      keyframes: {
        "aurora-1": {
          "0%, 100%": { transform: "translate(0,0) scale(1)" },
          "33%": { transform: "translate(8%, -6%) scale(1.15)" },
          "66%": { transform: "translate(-6%, 8%) scale(0.95)" },
        },
        "aurora-2": {
          "0%, 100%": { transform: "translate(0,0) scale(1.1)" },
          "33%": { transform: "translate(-10%, 6%) scale(0.9)" },
          "66%": { transform: "translate(6%, -8%) scale(1.2)" },
        },
        "aurora-3": {
          "0%, 100%": { transform: "translate(0,0) scale(1)" },
          "50%": { transform: "translate(5%, 5%) scale(1.25)" },
        },
        float: {
          "0%": { transform: "translateY(0)", opacity: "0" },
          "10%": { opacity: "0.8" },
          "90%": { opacity: "0.8" },
          "100%": { transform: "translateY(-120vh)", opacity: "0" },
        },
        shimmer: {
          "0%": { transform: "translateX(-150%)" },
          "100%": { transform: "translateX(150%)" },
        },
        "gradient-pan": {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
      },
      animation: {
        "aurora-1": "aurora-1 22s ease-in-out infinite",
        "aurora-2": "aurora-2 26s ease-in-out infinite",
        "aurora-3": "aurora-3 30s ease-in-out infinite",
        shimmer: "shimmer 1.2s ease-out",
        "gradient-pan": "gradient-pan 6s ease infinite",
      },
    },
  },
  plugins: [],
};

export default config;

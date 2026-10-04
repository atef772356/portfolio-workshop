import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)"],
        mono: ["var(--font-mono)"],
      },
      animation: {
        ticker: "ticker 26s linear infinite",
        pulseLine: "pulseLine 2.6s ease-in-out infinite",
      },
      keyframes: {
        ticker: { to: { transform: "translateX(-50%)" } },
        pulseLine: {
          "0%, 100%": { opacity: "0.25" },
          "50%": { opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};

export default config;

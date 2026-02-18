import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Extracted from mockups — vivid green primary
        primary: {
          50:  "#f0fdf4",
          100: "#dcfce7",
          200: "#bbf7d0",
          300: "#86efac",
          400: "#4ade80",
          500: "#22c55e", // active nav, icons, tags
          600: "#16c653", // main button fill — matches mockup CTA green
          700: "#15803d",
          800: "#166534",
          900: "#14532d",
          950: "#052e16",
        },
        surface: "#f0f2f0",   // page background
        card:    "#ffffff",   // card background
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      borderRadius: {
        card: "16px",   // card corner radius from mockups
        input: "12px",  // input/dropdown corner radius
        btn:   "12px",  // button corner radius
      },
      boxShadow: {
        card: "0 1px 4px rgba(0,0,0,0.07), 0 2px 8px rgba(0,0,0,0.04)",
      },
      screens: {
        xs: "360px",
      },
    },
  },
  plugins: [],
};

export default config;

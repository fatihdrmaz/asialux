import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#eff6ff",
          100: "#dbeafe",
          200: "#bfdbfe",
          300: "#93c5fd",
          400: "#60a5fa",
          500: "#3b82f6",
          600: "#1d4ed8",
          700: "#1e40af",
          800: "#1e3a8a",
          900: "#172554",
        },
        dark: {
          50: "#f6f6f6",
          100: "#e7e7e7",
          200: "#d1d1d1",
          300: "#b0b0b0",
          400: "#888888",
          500: "#6d6d6d",
          600: "#5d5d5d",
          700: "#4f4f4f",
          800: "#454545",
          900: "#3d3d3d",
          950: "#1a1a1a",
        },
      },
      spacing: {
        section: "5rem",
        "section-lg": "6rem",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-playfair)", "serif"],
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "hero-zoom": {
          "0%": { transform: "scale(1)" },
          "100%": { transform: "scale(1.05)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.6s ease-out forwards",
        "fade-in": "fade-in 0.5s ease-out forwards",
        "hero-zoom": "hero-zoom 20s ease-in-out infinite alternate",
      },
    },
  },
  plugins: [
    plugin(function ({ addComponents }) {
      addComponents({
        ".btn-primary": {
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          paddingLeft: "2rem",
          paddingRight: "2rem",
          paddingTop: "1rem",
          paddingBottom: "1rem",
          backgroundColor: "#1d4ed8",
          color: "#ffffff",
          borderRadius: "0.5rem",
          fontWeight: "600",
          transitionProperty: "all",
          transitionDuration: "300ms",
          boxShadow: "0 10px 15px -3px rgba(29, 78, 216, 0.5)",
          "&:hover": {
            backgroundColor: "#1e40af",
            transform: "scale(1.05)",
            boxShadow: "0 20px 25px -5px rgba(29, 78, 216, 0.4), 0 0 0 1px rgba(255,255,255,0.1)",
          },
        },
        ".btn-ghost": {
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          paddingLeft: "2rem",
          paddingRight: "2rem",
          paddingTop: "1rem",
          paddingBottom: "1rem",
          backgroundColor: "rgba(255, 255, 255, 0.1)",
          backdropFilter: "blur(4px)",
          color: "#ffffff",
          borderRadius: "0.5rem",
          fontWeight: "600",
          border: "1px solid rgba(255, 255, 255, 0.2)",
          transitionProperty: "all",
          transitionDuration: "300ms",
          "&:hover": {
            backgroundColor: "rgba(255, 255, 255, 0.25)",
            borderColor: "rgba(255, 255, 255, 0.4)",
            transform: "translateY(-1px)",
          },
        },
        ".card-hover": {
          transitionProperty: "all",
          transitionDuration: "300ms",
          "&:hover": {
            boxShadow: "0 25px 50px -12px rgba(29, 78, 216, 0.15), 0 0 0 1px rgba(29, 78, 216, 0.08)",
          },
        },
      });
    }),
  ],
};
export default config;

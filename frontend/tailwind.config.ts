import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      xs: "400px",
      sm: "600px",
      md: "905px",
      lg: "1240px",
      xl: "1440px",
    },
    colors: {
      primary: "#93CBDF",
      secondary: "#89D1BD",
      accent: "#F0A875",
      purple: "#B0A5E8",
      red: "#F1A6A6",
      transparent: "transparent",
      current: "currentColor",
      black: "#171717",
      white: "#F3F3F3",
    },
    fontWeight: {
      normal: "400",
      medium: "500",
      bold: "700",
      extrabold: "900",
    },
    fontSize: {
      base: ".88em",
      h1: "4.125rem",
      h2: "2rem",
      h3: "1.65rem",
      h4: "1.4375rem",
      lg: "1.125rem",
      xl: "1.25rem",
      "2xl": "1.563rem",
      "3xl": "1.953rem",
      "4xl": "2.441rem",
      "5xl": "3.052rem",
      "6xl": "3.815rem",
    },
    lineHeight: {
      h1: "1.2",
      h2: "1.3",
      h3: "1.3",
      h4: "1.3",
      p: "1.5",
      7: "1.75rem",
      8: "1.25rem",
    },
    extend: {
      fontFamily: {
        title: ["var(--font-oswald)", "sans-serif"],
        body: ["var(--font-open-sans)", "serif"],
        "luckiest-guy": ["var(--font-luckiest-guy)", "cursive"]
      }
    }
  },
  plugins: [],
} satisfies Config;
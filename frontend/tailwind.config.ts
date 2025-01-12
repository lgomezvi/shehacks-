import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

export default {
    darkMode: ["class"],
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
      white: "#ffffff",
      "off-white": "#F3F3F3",
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
      borderRadius: {
        button: "100px",
      },
      fontFamily: {
        title: ["var(--font-oswald)", "sans-serif"],
        body: ["var(--font-open-sans)", "serif"],
        "luckiest-guy": ["var(--font-luckiest-guy)", "cursive"],
      },
    },
  },
 plugins: [tailwindcssAnimate],
  	extend: {
  		colors: {
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  } as Config;

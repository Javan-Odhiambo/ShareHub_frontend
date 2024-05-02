import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/stories/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },

      colors: {
        // Primary Colors
        "primary-app-bg": "hsl(var(--primary-1) / <alpha-value>)",
        "primary-subtle-bg": "hsl(var(--primary-2) / <alpha-value>)",
        "primary-element-bg": "hsl(var(--primary-3) / <alpha-value>)",
        "primary-hover-bg": "hsl(var(--primary-4) / <alpha-value>)",
        "primary-active-bg": "hsl(var(--primary-5) / <alpha-value>)",
        "primary-border": "hsl(var(--primary-6) / <alpha-value>)",
        "primary-element-border": "hsl(var(--primary-7) / <alpha-value>)",
        "primary-hover-border": "hsl(var(--primary-8) / <alpha-value>)",
        "primary-solid-bg": "hsl(var(--primary-9) / <alpha-value>)",
        "primary-hover-solid-bg": "hsl(var(--primary-10) / <alpha-value>)",
        "primary-low-constrast-text": "hsl(var(--primary-11) / <alpha-value>)",
        "primary-high-contrast-text": "hsl(var(--primary-12) / <alpha-value>)",

        // Secondary Colors
        "secondary-app-bg": "hsl(var(--secondary-1) / <alpha-value>)",
        "secondary-subtle-bg": "hsl(var(--secondary-2) / <alpha-value>)",
        "secondary-element-bg": "hsl(var(--secondary-3) / <alpha-value>)",
        "secondary-hover-bg": "hsl(var(--secondary-4) / <alpha-value>)",
        "secondary-active-bg": "hsl(var(--secondary-5) / <alpha-value>)",
        "secondary-border": "hsl(var(--secondary-6) / <alpha-value>)",
        "secondary-element-border": "hsl(var(--secondary-7) / <alpha-value>)",
        "secondary-hover-border": "hsl(var(--secondary-8) / <alpha-value>)",
        "secondary-solid-bg": "hsl(var(--secondary-9) / <alpha-value>)",
        "secondary-hover-solid-bg": "hsl(var(--secondary-10) / <alpha-value>)",
        "secondary-low-constrast-text": "hsl(var(--secondary-11) / <alpha-value>)",
        "secondary-high-contrast-text": "hsl(var(--secondary-12) / <alpha-value>)",

        // Tertiary Colors
        "tertiary-app-bg": "hsl(var(--tertiary-1) / <alpha-value>)",
        "tertiary-subtle-bg": "hsl(var(--tertiary-2) / <alpha-value>)",
        "tertiary-element-bg": "hsl(var(--tertiary-3) / <alpha-value>)",
        "tertiary-hover-bg": "hsl(var(--tertiary-4) / <alpha-value>)",
        "tertiary-active-bg": "hsl(var(--tertiary-5) / <alpha-value>)",
        "tertiary-border": "hsl(var(--tertiary-6) / <alpha-value>)",
        "tertiary-element-border": "hsl(var(--tertiary-7) / <alpha-value>)",
        "tertiary-hover-border": "hsl(var(--tertiary-8) / <alpha-value>)",
        "tertiary-solid-bg": "hsl(var(--tertiary-9) / <alpha-value>)",
        "tertiary-hover-solid-bg": "hsl(var(--tertiary-10) / <alpha-value>)",
        "tertiary-low-constrast-text": "hsl(var(--tertiary-11) / <alpha-value>)",
        "tertiary-high-contrast-text": "hsl(var(--tertiary-12) / <alpha-value>)",

        // Error and Success Colors
        "error": "hsl(var(--error-color) / <alpha-value>)",
        "success": "hsl(var(--success-color) / <alpha-value>)",
        "error-container": "hsl(var(--error-container) / <alpha-value>)",
        "success-container": "hsl(var(--success-container) / <alpha-value>)",
        "on-error": "hsl(var(--on-error-color) / <alpha-value>)",
        "on-success": "hsl(var(--on-success-color) / <alpha-value>)",
        "on-error-container": "hsl(var(--on-error-container) / <alpha-value>)",
        "on-success-container": "hsl(var(--on-success-container) / <alpha-value>)",
      },
    },
  },
  plugins: [],
};
export default config;

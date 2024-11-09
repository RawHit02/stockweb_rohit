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
        primary: "#092E20",
        primary200: "#B6D063",
        primary300: "#37554A",
        primaryLight: "#255435",
        primaryExtraLight: "#EDFFF2",
        secondary: "#E8EBED",
        secondary100: "#F9F871",
        secondary800: "#4B7D47",
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [],
};
export default config;

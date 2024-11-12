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
        primary100: "#BED2C5",
        primary200: "#B6D063",
        primary300: "#37554A",
        primary500: "#255435",
        primaryExtraLight: "#EDFFF2",
        secondary: "#E8EBED",
        secondary100: "#F9F871",
        secondary800: "#4B7D47",
        gray100: "#1C1B1F",
        gray200: "#64707D",
        gray300: "#D2D6DB",
        purple100: "#484C72",
        error200: "#C03744",
        red100: "#E4626F"
      },
    },
  },
  plugins: [],
};
export default config;

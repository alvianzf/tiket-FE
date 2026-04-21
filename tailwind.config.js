// eslint-disable-next-line
const { nextui } = require("@nextui-org/react");

/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line
module.exports = {
  content: [
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: "#5a7ec4",
          DEFAULT: "#4267B2",
          dark: "#2f4f8a",
        },
        secondary: {
          DEFAULT: "#0AD1FF",
          dark: "#00b3d9",
        },
        cta: {
          light: "#ff7a33",
          DEFAULT: "#FF5A00",
          dark: "#e65100",
        },
        dark: {
          DEFAULT: "#2F3033",
          mid: "#3d3f44",
        },
        orange: {
          500: "#ff5a00",
          600: "#e65100",
        },
        cornflower: "#3C9DFF",
        deepbluesky: "#0AD1FF",
        darkslategrey: "#2F3033",
      },
      fontFamily: {
        sans: ["Montserrat", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      borderRadius: {
        "ds-sm": "8px",
        "ds-md": "12px",
        "ds-lg": "16px",
        "ds-xl": "24px",
      },
    },
  },
  plugins: [nextui()],
};

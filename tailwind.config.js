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
          DEFAULT: "#ff5a00",
          dark: "#e65100",
        },
        secondary: "#FFD700",
        accent: "#2F3033",
        orange: {
          500: "#ff5a00",
          600: "#e65100",
        },
        cornflower: "#3C9DFF",
        deepbluesky: "#0AD1FF",
        darkslategrey: "#2F3033",
      },
    },
  },
  plugins: [nextui()],
};

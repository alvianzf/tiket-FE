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
          DEFAULT: "#3C9DFF",
          dark: "#0AD1FF",
        },
        secondary: "#0AD1FF",
        accent: "#2F3033",
        cornflower: "#3C9DFF",
        deepbluesky: "#0AD1FF",
        darkslategrey: "#2F3033",
      },
    },
  },
  plugins: [nextui()],
};

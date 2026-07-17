import createCache from "@emotion/cache";

// Prepend MUI's emotion styles so Tailwind utility classes (loaded via
// global.css) can still override component styles when intentionally used.
export default function createEmotionCache() {
  return createCache({ key: "mui", prepend: true });
}

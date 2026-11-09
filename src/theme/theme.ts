import { createTheme } from "@mui/material/styles";

/**
 * TiketQ Material UI theme.
 *
 * Carries the pre-existing brand forward: primary cornflower #4267B2, CTA
 * orange #FF5A00, Montserrat, and the 8/12/16/24 radius scale. The visual
 * language is a solid, professional surface system (white cards, a subtle
 * 1px border, soft shadow) — no backdrop blur / translucency anywhere,
 * replacing the previous glassmorphism look.
 */

export const brand = {
  primary: "#4267B2",
  primaryLight: "#5A7EC4",
  primaryDark: "#2F4F8A",
  secondary: "#0AD1FF",
  secondaryDark: "#00B3D9",
  cta: "#FF5A00",
  ctaLight: "#FF7A33",
  ctaDark: "#E65100",
  dark: "#2F3033",
  bgBase: "#F7F8FA",
  border: "#E6E9EE",
} as const;

// Shared solid surface — opaque white with a neutral hairline border.
const surface = {
  background: "#FFFFFF",
  border: `1px solid ${brand.border}`,
  boxShadow: "0 1px 2px 0 rgba(16,24,40,0.04), 0 1px 3px 0 rgba(16,24,40,0.06)",
};

const theme = createTheme({
  cssVariables: true,
  palette: {
    mode: "light",
    primary: { main: brand.primary, light: brand.primaryLight, dark: brand.primaryDark, contrastText: "#fff" },
    secondary: { main: brand.secondary, dark: brand.secondaryDark, contrastText: brand.dark },
    warning: { main: brand.cta, light: brand.ctaLight, dark: brand.ctaDark, contrastText: "#fff" },
    background: { default: brand.bgBase, paper: "#FFFFFF" },
    text: { primary: "#0f172a", secondary: "#475569" },
  },
  typography: {
    fontFamily: ['"Montserrat"', "sans-serif"].join(","),
    button: { textTransform: "none", fontWeight: 700 },
    h1: { fontWeight: 800 },
    h2: { fontWeight: 800 },
    h3: { fontWeight: 700 },
    h4: { fontWeight: 700 },
    h5: { fontWeight: 700 },
    h6: { fontWeight: 700 },
  },
  shape: { borderRadius: 12 },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
          ...surface,
          borderRadius: 16,
        },
      },
    },
    MuiCard: {
      defaultProps: { elevation: 0 },
      styleOverrides: {
        root: {
          ...surface,
          borderRadius: 16,
          transition: "box-shadow .2s ease, transform .2s ease",
        },
      },
    },
    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: {
        root: {
          borderRadius: 8,
          fontWeight: 700,
          paddingInline: 24,
          transition: "all .2s ease",
          "&:active": { transform: "scale(0.97)" },
        },
      },
      variants: [
        {
          props: { variant: "contained", color: "primary" },
          style: {
            boxShadow: "0 4px 14px rgba(66,103,178,0.3)",
            "&:hover": { boxShadow: "0 6px 20px rgba(66,103,178,0.4)" },
          },
        },
        {
          props: { variant: "contained", color: "warning" },
          style: {
            boxShadow: "0 4px 14px rgba(255,90,0,0.3)",
            "&:hover": { boxShadow: "0 6px 20px rgba(255,90,0,0.4)" },
          },
        },
      ],
    },
    MuiTextField: { defaultProps: { variant: "outlined", size: "small" } },
    MuiOutlinedInput: {
      styleOverrides: {
        root: { borderRadius: 8, background: "#FFFFFF" },
      },
    },
    MuiChip: { styleOverrides: { root: { fontWeight: 600 } } },
    MuiAppBar: {
      styleOverrides: {
        root: { background: brand.primary, boxShadow: "none" },
      },
    },
  },
});

export default theme;

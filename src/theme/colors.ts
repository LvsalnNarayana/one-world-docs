// Parent, Sibling, Index
import { type ThemeColors } from "./themeInterfaces";

const themeColors: ThemeColors = {
  light: {
    divider: "#e0e0e0", // very light grey
    primary: {
      main: "#5b84fa",
      dark: "#3f5caf",
      light: "#bdcefd",
    },
    secondary: {
      main: "#4A4A4A",
      dark: "#333333",
      light: "#6e6e6e",
    },
    background: {
      paper: "#ffffff",
      default: "#fafafa",
    },
    text: {
      hint: "#bdbdbd", // ~23% black
      primary: "#212121", // ~87% black on white
      disabled: "#9e9e9e", // ~38% black
      secondary: "#616161", // ~60% black
    },
  },

  dark: {
    divider: "#616161", // medium grey for dividers
    primary: {
      main: "#5b84fa",
      dark: "#3f5caf",
      light: "#7b9cfb",
    },
    secondary: {
      main: "#4A4A4A",
      dark: "#333333",
      light: "#6e6e6e",
    },
    background: {
      paper: "#353535", // slightly lighter surface
      default: "#252525", // main dark bg
    },
    text: {
      hint: "#757575", // ~46% white
      primary: "#ffffff", // full white
      disabled: "#9e9e9e", // ~62% white
      secondary: "#e0e0e0", // ~87% white
    },
  },
};

export default themeColors;

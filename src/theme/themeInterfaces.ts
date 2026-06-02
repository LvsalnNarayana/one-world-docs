// MUI
import { type Palette } from "@mui/material";

export interface ThemeColors {
  light: {
    primary: { main: string; light: string; dark: string };
    secondary: { main: string; light: string; dark: string };
    text: {
      primary: string;
      secondary: string;
      disabled: string;
      hint: string;
    };
    background: { default: string; paper: string };
    divider: string;
  };
  dark: {
    primary: { main: string; light: string; dark: string };
    secondary: { main: string; light: string; dark: string };
    text: {
      primary: string;
      secondary: string;
      disabled: string;
      hint: string;
    };
    background: { default: string; paper: string };
    divider: string;
  };
}

export interface CustomPaletteOptions {
  mode: "light" | "dark";
  primary: Palette["primary"];
  secondary: Palette["secondary"];
  text: Palette["text"];
  background: Palette["background"];
  divider: Palette["divider"];
  action: Palette["action"];
}

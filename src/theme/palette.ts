// Parent, Sibling, Index
import { type ThemeColors, type CustomPaletteOptions } from "./themeInterfaces";

export function DarkPalette(colors: ThemeColors): CustomPaletteOptions {
  return {
    divider: colors.dark.divider,
    mode: "dark",
    background: {
      paper: colors.dark.background.paper,
      default: colors.dark.background.default,
    },
    text: {
      primary: colors.dark.text.primary,
      disabled: colors.dark.text.disabled,
      secondary: colors.dark.text.secondary,
    },
    primary: {
      main: colors.dark.primary.main,
      dark: colors.dark.primary.dark,
      light: colors.dark.primary.light,
      contrastText: colors.dark.text.primary,
    },
    secondary: {
      main: colors.dark.secondary.main,
      dark: colors.dark.secondary.dark,
      light: colors.dark.secondary.light,
      contrastText: colors.dark.text.primary,
    },
    action: {
      focusOpacity: 0.12,
      hoverOpacity: 0.08,
      selectedOpacity: 0.08,
      disabledOpacity: 0.38,
      activatedOpacity: 0.12,
      active: colors.dark.primary.main,
      focus: colors.dark.primary.light,
      selected: colors.dark.primary.dark,
      disabled: colors.dark.text.disabled,
      hover: `${colors.dark.primary.dark}80`,
      disabledBackground: colors.dark.text.hint,
    },
  };
}

export function LightPalette(colors: ThemeColors): CustomPaletteOptions {
  return {
    divider: colors.light.divider,
    mode: "light",
    background: {
      paper: colors.light.background.paper,
      default: colors.light.background.default,
    },
    text: {
      primary: colors.light.text.primary,
      disabled: colors.light.text.disabled,
      secondary: colors.light.text.secondary,
    },
    primary: {
      main: colors.light.primary.main,
      dark: colors.light.primary.dark,
      light: colors.light.primary.light,
      contrastText: colors.light.text.primary,
    },
    secondary: {
      main: colors.light.secondary.main,
      dark: colors.light.secondary.dark,
      light: colors.light.secondary.light,
      contrastText: colors.light.text.primary,
    },
    action: {
      focusOpacity: 0.12,
      hoverOpacity: 0.08,
      selectedOpacity: 0.08,
      disabledOpacity: 0.38,
      activatedOpacity: 0.12,
      active: colors.light.primary.main,
      hover: colors.light.primary.light,
      focus: colors.light.primary.light,
      selected: colors.light.primary.dark,
      disabled: colors.light.text.disabled,
      disabledBackground: colors.light.text.hint,
    },
  };
}

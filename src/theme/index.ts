import { createTheme, type Palette } from "@mui/material/styles";

import themeColors from "./colors";
import { DarkPalette } from "./palette";
import themeTypography from "./typography";
import componentStyleOverrides from "./componentStyleOverrides";

export const theme = createTheme({
  typography: themeTypography(),
  palette: DarkPalette(themeColors) as Palette,
  shape: {
    borderRadius: 8,
    radius: {
      xs: 2,
      sm: 4,
      md: 6,
      lg: 8,
      xl: 12,
    },
  },
});

theme.components = componentStyleOverrides(theme);

// custom-mui.d.ts
import "@mui/material/styles";
import { type Shape } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Shape {
    borderRadius: number | string;
    radius: {
      xs: number;
      sm: number;
      md: number;
      lg: number;
      xl: number;
    };
  }

  interface ShapeOptions {
    borderRadius?: number | string;
    radius?: {
      xs?: number;
      sm?: number;
      md?: number;
      lg?: number;
      xl?: number;
    };
  }

  interface ThemeOptions {
    shape?: ShapeOptions;
  }

  interface Theme {
    shape: Shape;
  }
}

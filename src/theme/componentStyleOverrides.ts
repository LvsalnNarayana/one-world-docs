// MUI
import {
  type Theme,
  svgIconClasses,
  typographyClasses,
  listItemIconClasses,
  listItemTextClasses,
} from "@mui/material";

export default function componentStyleOverrides(
  theme: Theme
): Theme["components"] {
  return {
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          minWidth: "auto",
          marginRight: 10,
        },
      },
    },
    MuiSelect: {
      defaultProps: {
        fullWidth: true,
        size: "small" as const,
        variant: "outlined" as const,
      },
    },
    MuiToggleButton: {
      defaultProps: {
        disableRipple: true,
        size: "small" as const,
        disableTouchRipple: true,
      },
    },
    MuiListItemText: {
      styleOverrides: {
        root: {
          [`& .${typographyClasses.root}`]: {
            fontSize: 12,
          },
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        root: {
          borderRadius: theme.shape.radius.xs,
          "& .MuiTabs-indicator": {
            height: 4,
            borderRadius: theme.shape.radius.xs,
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
        },
        rounded: {
          borderRadius: theme.shape.borderRadius,
        },
      },
      defaultProps: {
        elevation: 0,
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          "&:hover": {
            backgroundColor: theme.palette.action.hover,
          },
        },
      },
      defaultProps: {
        disableRipple: true,
        disableTouchRipple: true,
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          fontSize: 18,
          fontWeight: 500,
          letterSpacing: 0.75,
          textTransform: "capitalize",
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.background.paper,
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          "&:hover": {
            backgroundColor: theme.palette.action.hover,
          },
          "&.Mui-selected": {
            backgroundColor: theme.palette.action.selected,
          },
          "&.Mui-selected:hover": {
            backgroundColor: theme.palette.action.selected,
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          fontSize: 14,
          lineHeight: 1,
          textTransform: "none",
          padding: theme.spacing(0.75, 1.75),
          borderRadius: theme.shape.borderRadius,
          fontWeight: theme.typography.fontWeightMedium,
        },
      },
      defaultProps: {
        disableRipple: true,
        disableElevation: true,
        disableFocusRipple: true,
        disableTouchRipple: true,
        variant: "contained" as const,
      },
    },
    MuiToggleButtonGroup: {
      styleOverrides: {
        root: {
          "& .MuiToggleButton-root": {
            border: `1px solid ${theme.palette.common.white}80`,
            "&:hover": {
              backgroundColor: `${theme.palette.action.hover}`,
            },
            "&.Mui-selected": {
              backgroundColor: theme.palette.action.selected,
            },
            "&.Mui-selected:hover": {
              backgroundColor: `${theme.palette.action.hover}`,
            },
          },
        },
      },
      defaultProps: {
        size: "small" as const,
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          lineHeight: 1,
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.background.default,
          "&::-webkit-scrollbar-corner, & *::-webkit-scrollbar-corner": {
            backgroundColor: "transparent",
          },
          "&::-webkit-scrollbar-thumb:focus, & *::-webkit-scrollbar-thumb:focus":
            {
              backgroundColor: theme.palette.grey[500],
            },
          "&::-webkit-scrollbar-thumb:hover, & *::-webkit-scrollbar-thumb:hover":
            {
              backgroundColor: theme.palette.grey[500],
            },
          "&::-webkit-scrollbar-thumb:active, & *::-webkit-scrollbar-thumb:active":
            {
              backgroundColor: theme.palette.grey[500],
            },
          "&::-webkit-scrollbar, & *::-webkit-scrollbar": {
            width: "8px",
            height: "8px",
            backgroundColor: "transparent",
          },
          "&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb": {
            minHeight: "24px",
            borderRadius: "8px",
            border: "1px solid transparent",
            backgroundColor: theme.palette.grey[700],
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "&.Mui-disabled": {
            backgroundColor: theme.palette.action.disabledBackground,
          },
          "&.Mui-error .MuiOutlinedInput-notchedOutline": {
            borderColor: theme.palette.error.main,
          },
          "&.Mui-error:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: theme.palette.error.main,
          },
          "&.Mui-error.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: theme.palette.error.main,
          },
          "&.Mui-disabled.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: theme.palette.text.disabled,
          },
          "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: theme.palette.primary.main,
          },
          "&.Mui-disabled:hover .MuiOutlinedInput-notchedOutline": {
            backgroundColor: theme.palette.action.disabledBackground,
          },
          "& .MuiInputBase-input::placeholder": {
            fontSize: 16,
            opacity: 0.5,
            color: theme.palette.text.primary,
          },
          "& .MuiOutlinedInput-notchedOutline": {
            borderWidth: 1,
            outline: "none",
            borderColor: theme.palette.divider,
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderWidth: 1,
            outline: "none",
            borderColor: theme.palette.primary.main,
          },
          "& .MuiInputBase-input": {
            borderWidth: 1,
            fontSize: 16,
            lineHeight: 1,
            height: "20px",
            display: "flex",
            padding: "8px 12px",
            alignItems: "center",
            verticalAlign: "middle",
            color: theme.palette.text.primary,
          },
        },
      },
      defaultProps: {
        fullWidth: true,
        size: "small" as const,
        variant: "outlined" as const,
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          "&:hover": {
            backgroundColor: theme.palette.action.hover,
          },
          "&.Mui-selected": {
            backgroundColor: theme.palette.action.selected,
          },
          "&.Mui-selected:hover": {
            backgroundColor: theme.palette.action.selected,
          },
          "&.Mui-disabled": {
            backgroundColor: theme.palette.action.disabledBackground,
          },
          [`& .${listItemTextClasses.root} .${typographyClasses.root}`]: {
            fontSize: 14,
          },

          "&.Mui-disabled:hover": {
            backgroundColor: theme.palette.action.disabledBackground,
          },
          [`& .${listItemIconClasses.root} .${svgIconClasses.root}`]: {
            fontSize: 18,
            color:
              theme?.palette?.mode === "light"
                ? theme?.palette?.getContrastText(theme?.palette?.primary?.main)
                : theme?.palette?.text?.primary,
          },
          [`& .${listItemIconClasses.root}`]: {
            minWidth: "auto",
            fontSize: 16,
            color:
              theme?.palette?.mode === "light"
                ? theme?.palette?.getContrastText(theme?.palette?.primary?.main)
                : theme?.palette?.text?.primary,
          },
          [`&.Mui-selected .${listItemTextClasses.root} .${typographyClasses.root}`]:
            {
              color:
                theme?.palette?.mode === "light"
                  ? theme?.palette?.getContrastText(
                      theme?.palette?.primary?.main
                    )
                  : theme?.palette?.text?.primary,
            },
          [`&.Mui-selected .${listItemIconClasses.root} .${svgIconClasses.root}`]:
            {
              fontSize: 14,
              color:
                theme?.palette?.mode === "light"
                  ? theme?.palette?.getContrastText(
                      theme?.palette?.primary?.main
                    )
                  : theme?.palette?.text?.primary,
            },
        },
      },
      defaultProps: {
        disableRipple: true,
        disableTouchRipple: true,
      },
    },
  };
}

// External
import React, { useState, type JSX } from "react";


// MUI
import {
  Menu,
  Button,
  MenuItem,
  useTheme,
  ListItemIcon,
  ListItemText,
  buttonClasses,
  svgIconClasses,
} from "@mui/material";

interface MenuItemProps {
  value: string;
  icon?: JSX.Element;
  onClick?: () => void;
}
interface ButtonMenuProps {
  type?: "text" | "icon";
  value: string | JSX.Element;
  onButtonClick?: () => void;
  startIcon?: JSX.Element;
  endIcon?: JSX.Element;
  menu?: MenuItemProps[];
  variant?: "text" | "outlined" | "contained";
  anchorOrigin?: {
    vertical: "top" | "bottom";
    horizontal: "left" | "center" | "right";
  };
  transformOrigin?: {
    vertical: "top" | "bottom";
    horizontal: "left" | "center" | "right";
  };
}

const ButtonMenu: React.ElementType<ButtonMenuProps> = (
  props: ButtonMenuProps
): JSX.Element => {
  const theme = useTheme();

  const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);

  const menuOpen = Boolean(menuAnchorEl);

  const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setMenuAnchorEl(event.currentTarget);
    if (props.onButtonClick) {
      props.onButtonClick();
    }
  };

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  };

  return (
    <>
      <Button
        onClick={handleMenuOpen}
        variant={props?.variant || "text"}
        sx={{
          minWidth: "fit-content",
          py: 1,
          fontSize: 14,
          height: "100%",
          color: theme.palette.text.primary,
          px: props?.type === "icon" ? 1 : 2,
          borderRadius: props?.type === "icon" ? "50%" : 1,
          [`& .${buttonClasses.endIcon} .${svgIconClasses.root}`]: {
            fontSize: 16,
          },
          [`& .${buttonClasses.startIcon} .${svgIconClasses.root}`]: {
            fontSize: 16,
          },
        }}
        startIcon={props?.startIcon && props.startIcon}
        endIcon={props?.endIcon && props.endIcon}
      >
        {props?.value}
      </Button>
      <Menu
        PaperProps={{
          sx: {
            marginTop: 0.5,
            boxShadow: theme.shadows[1],
            border: `1px solid ${theme.palette.divider}`,
          },
        }}
        onClose={handleMenuClose}
        anchorEl={menuAnchorEl}
        open={menuOpen}
        anchorOrigin={
          props?.anchorOrigin || {
            vertical: "bottom",
            horizontal: "center",
          }
        }
        transformOrigin={
          props?.transformOrigin || {
            vertical: "top",
            horizontal: "center",
          }
        }
      >
        {props?.menu?.map((menuItem: MenuItemProps) => {
          return (
            <MenuItem
              selected={menuItem.value === props.value}
              key={menuItem.value}
              onClick={() => {
                if (menuItem.onClick) {
                  menuItem.onClick();
                }
                handleMenuClose();
              }}
            >
              {menuItem.icon && <ListItemIcon>{menuItem.icon}</ListItemIcon>}
              <ListItemText>{menuItem.value}</ListItemText>
            </MenuItem>
          );
        })}
      </Menu>
    </>
  );
};

export default ButtonMenu;

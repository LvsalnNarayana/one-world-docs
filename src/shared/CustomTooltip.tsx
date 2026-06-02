// External
import type { JSX, ReactNode } from "react";


// MUI
import { styled } from "@mui/material/styles";
import { Zoom, Tooltip, tooltipClasses } from "@mui/material";

const CustomTooltip = styled(
  ({
    open,
    title,
    onOpen,
    margin,
    onClose,
    padding,
    children,
    className,
    position = "top",
    ...props
  }: {
    open?: boolean;
    onClose?: () => void;
    onOpen?: () => void;
    margin?: string | number;
    padding?: string | number;
    title?: string | ReactNode;
    position?: "top" | "bottom" | "left" | "right";
    children: JSX.Element;
    className?: string;
  }) => {
    return (
      <Tooltip
        {...props}
        arrow
        title={title}
        open={open}
        onClose={onClose}
        onOpen={onOpen}
        placement={position}
        TransitionComponent={Zoom}
        classes={{ popper: className }}
        PopperProps={{
          modifiers: [
            {
              name: "flip",
              enabled: true,
            },
            {
              enabled: true,
              name: "preventOverflow",
              options: {
                boundary: "viewport",
              },
            },
          ],
        }}
      >
        {children}
      </Tooltip>
    );
  }
)(({ theme, margin, padding }) => {
  return {
    [`& .${tooltipClasses.tooltip}`]: {
      width: "auto",
      maxWidth: "100% !important",
      borderRadius: "5px",
      padding: padding || 7,
      color: theme?.palette?.text?.primary,
      fontSize: theme.typography.pxToRem(12),
      border: `1px solid ${theme?.palette?.divider}`,
      backgroundColor: theme?.palette?.background?.paper,
      "&.MuiTooltip-tooltip": {
        marginTop: margin || "7px",
        marginBottom: margin || "7px",
      },
      "& .MuiTooltip-arrow:before": {
        color: theme?.palette?.background?.paper,
        border: `1px solid ${theme?.palette?.divider}`,
      },
    },
  };
});

export default CustomTooltip;

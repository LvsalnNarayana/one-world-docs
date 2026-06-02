import { Button as MuiButton, type ButtonProps } from "@mui/material";
import type { JSX, ReactNode } from "react";

type Props = ButtonProps & {
  children?: ReactNode;
  "data-test-id"?: string;
};

export default function Button({
  children,
  className,
  ...props
}: Props): JSX.Element {
  return (
    <MuiButton
      size="small"
      variant="contained"
      className={className}
      {...props}
    >
      {children}
    </MuiButton>
  );
}

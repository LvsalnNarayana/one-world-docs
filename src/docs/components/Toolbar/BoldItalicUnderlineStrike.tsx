import CodeOutlinedIcon from "@mui/icons-material/CodeOutlined";
import FormatBoldOutlinedIcon from "@mui/icons-material/FormatBoldOutlined";
import FormatItalicOutlinedIcon from "@mui/icons-material/FormatItalicOutlined";
import FormatUnderlinedOutlinedIcon from "@mui/icons-material/FormatUnderlinedOutlined";
import StrikethroughSOutlinedIcon from "@mui/icons-material/StrikethroughSOutlined";
import { IconButton, Stack, Tooltip, useTheme } from "@mui/material";
import type { ReactNode } from "react";
import type { TextFormatType } from "lexical";

import { useLexicalToolbarContext } from "../../../editor/context/LexicalToolbarContext";
import { preventEditorBlur } from "../../../shared/toolbarMouseDown";

type FormatKey = TextFormatType | "code";

export default function BoldItalicUnderlineStrike() {
  const theme = useTheme();
  const { formatState, toggleFormat, toggleInlineCode } =
    useLexicalToolbarContext();

  const btnSx = {
    p: 0.5,
    color: theme.palette.text.secondary,
    "& .MuiSvgIcon-root": { fontSize: 20 },
    "&.active": {
      color: theme.palette.primary.main,
      bgcolor: "action.selected",
    },
  };

  const items: {
    key: FormatKey;
    title: string;
    icon: ReactNode;
    active: boolean;
  }[] = [
    { key: "bold", title: "Bold", icon: <FormatBoldOutlinedIcon />, active: formatState.isBold },
    { key: "italic", title: "Italic", icon: <FormatItalicOutlinedIcon />, active: formatState.isItalic },
    { key: "underline", title: "Underline", icon: <FormatUnderlinedOutlinedIcon />, active: formatState.isUnderline },
    { key: "strikethrough", title: "Strikethrough", icon: <StrikethroughSOutlinedIcon />, active: formatState.isStrikethrough },
    { key: "code", title: "Inline code", icon: <CodeOutlinedIcon />, active: formatState.isCode },
  ];

  const onFormat = (key: FormatKey) => {
    if (key === "code") {
      toggleInlineCode();
    } else {
      toggleFormat(key);
    }
  };

  return (
    <Stack direction="row" spacing={0}>
      {items.map(({ key, title, icon, active }) => (
        <Tooltip key={key} title={title}>
          <IconButton
            size="small"
            className={active ? "active" : undefined}
            sx={btnSx}
            onMouseDown={preventEditorBlur}
            onClick={() => onFormat(key)}
          >
            {icon}
          </IconButton>
        </Tooltip>
      ))}
    </Stack>
  );
}

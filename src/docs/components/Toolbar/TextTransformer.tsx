import type { JSX } from "react";
import BrushOutlinedIcon from "@mui/icons-material/BrushOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import SubscriptOutlinedIcon from "@mui/icons-material/SubscriptOutlined";
import FormatSizeOutlinedIcon from "@mui/icons-material/FormatSizeOutlined";
import SuperscriptOutlinedIcon from "@mui/icons-material/SuperscriptOutlined";
import StrikethroughSOutlinedIcon from "@mui/icons-material/StrikethroughSOutlined";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";

import { useLexicalToolbarContext } from "../../../editor/context/LexicalToolbarContext";
import ButtonMenu from "../../../shared/ButtonMenu";

const TextTransformer = (): JSX.Element => {
  const { toggleFormat, clearFormatting, applyBackgroundColor } =
    useLexicalToolbarContext();

  const menu = [
    {
      onClick: () => toggleFormat("strikethrough"),
      value: "Strikethrough",
      icon: <StrikethroughSOutlinedIcon />,
    },
    {
      onClick: () => toggleFormat("subscript"),
      value: "Subscript",
      icon: <SubscriptOutlinedIcon />,
    },
    {
      onClick: () => toggleFormat("superscript"),
      value: "Superscript",
      icon: <SuperscriptOutlinedIcon />,
    },
    {
      onClick: () => applyBackgroundColor("#fff59d"),
      value: "Highlight",
      icon: <BrushOutlinedIcon />,
    },
    {
      onClick: clearFormatting,
      value: "Clear Formatting",
      icon: <DeleteOutlinedIcon />,
    },
  ];

  return (
    <ButtonMenu
      value={<FormatSizeOutlinedIcon />}
      endIcon={<KeyboardArrowDownOutlinedIcon />}
      menu={menu}
    />
  );
};

export default TextTransformer;

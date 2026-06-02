import type { JSX } from "react";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import SuperscriptOutlinedIcon from "@mui/icons-material/SuperscriptOutlined";
import SubscriptOutlinedIcon from "@mui/icons-material/SubscriptOutlined";
import StrikethroughSOutlinedIcon from "@mui/icons-material/StrikethroughSOutlined";
import CodeOutlinedIcon from "@mui/icons-material/CodeOutlined";

import { useLexicalToolbarContext } from "../../../editor/context/LexicalToolbarContext";
import ButtonMenu from "../../../shared/ButtonMenu";

const MoreFormatsMenu = (): JSX.Element => {
  const { toggleFormat, toggleInlineCode, setBlockStyle } =
    useLexicalToolbarContext();

  const menu = [
    {
      value: "Strikethrough",
      icon: <StrikethroughSOutlinedIcon />,
      onClick: () => toggleFormat("strikethrough"),
    },
    {
      value: "Inline code",
      icon: <CodeOutlinedIcon />,
      onClick: () => toggleInlineCode(),
    },
    {
      value: "Code block",
      icon: <CodeOutlinedIcon />,
      onClick: () => setBlockStyle("Code"),
    },
    {
      value: "Superscript",
      icon: <SuperscriptOutlinedIcon />,
      onClick: () => toggleFormat("superscript"),
    },
    {
      value: "Subscript",
      icon: <SubscriptOutlinedIcon />,
      onClick: () => toggleFormat("subscript"),
    },
  ];

  return (
    <ButtonMenu
      value=""
      startIcon={<MoreVertOutlinedIcon />}
      menu={menu}
    />
  );
};

export default MoreFormatsMenu;

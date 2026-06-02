import type { JSX } from "react";
import CodeOutlinedIcon from "@mui/icons-material/CodeOutlined";
import SubjectOutlinedIcon from "@mui/icons-material/SubjectOutlined";
import CheckBoxOutlinedIcon from "@mui/icons-material/CheckBoxOutlined";
import FormatQuoteOutlinedIcon from "@mui/icons-material/FormatQuoteOutlined";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import FormatListBulletedOutlinedIcon from "@mui/icons-material/FormatListBulletedOutlined";
import FormatListNumberedOutlinedIcon from "@mui/icons-material/FormatListNumberedOutlined";

import { useLexicalToolbarContext } from "../../../editor/context/LexicalToolbarContext";
import ButtonMenu from "../../../shared/ButtonMenu";

const TextStylesMenu = (): JSX.Element => {
  const { formatState, setBlockStyle } = useLexicalToolbarContext();

  const menu = [
    {
      onClick: () => setBlockStyle("Normal Text"),
      value: "Normal Text",
      icon: <SubjectOutlinedIcon />,
    },
    {
      onClick: () => setBlockStyle("Heading 1"),
      value: "Heading 1",
      icon: <span style={{ fontSize: 12 }}>H1</span>,
    },
    {
      onClick: () => setBlockStyle("Heading 2"),
      value: "Heading 2",
      icon: <span style={{ fontSize: 12 }}>H2</span>,
    },
    {
      onClick: () => setBlockStyle("Heading 3"),
      value: "Heading 3",
      icon: <span style={{ fontSize: 12 }}>H3</span>,
    },
    {
      onClick: () => setBlockStyle("Heading 4"),
      value: "Heading 4",
      icon: <span style={{ fontSize: 12 }}>H4</span>,
    },
    {
      onClick: () => setBlockStyle("Heading 5"),
      value: "Heading 5",
      icon: <span style={{ fontSize: 12 }}>H5</span>,
    },
    {
      onClick: () => setBlockStyle("Heading 6"),
      value: "Heading 6",
      icon: <span style={{ fontSize: 12 }}>H6</span>,
    },
    {
      value: "Quote",
      onClick: () => setBlockStyle("Quote"),
      icon: <FormatQuoteOutlinedIcon />,
    },
    {
      onClick: () => setBlockStyle("Bulleted List"),
      value: "Bulleted List",
      icon: <FormatListBulletedOutlinedIcon />,
    },
    {
      onClick: () => setBlockStyle("Numbered List"),
      value: "Numbered List",
      icon: <FormatListNumberedOutlinedIcon />,
    },
    {
      onClick: () => setBlockStyle("To-do List"),
      value: "To-do List",
      icon: <CheckBoxOutlinedIcon />,
    },
    {
      value: "Code",
      onClick: () => setBlockStyle("Code"),
      icon: <CodeOutlinedIcon />,
    },
  ];

  return (
    <ButtonMenu
      value={formatState.blockTypeLabel}
      startIcon={<SubjectOutlinedIcon />}
      endIcon={<KeyboardArrowDownOutlinedIcon />}
      menu={menu}
    />
  );
};

export default TextStylesMenu;

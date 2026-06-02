import type { JSX } from "react";
import HeightOutlinedIcon from "@mui/icons-material/HeightOutlined";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";

import { useLexicalToolbarContext } from "../../../editor/context/LexicalToolbarContext";
import ButtonMenu from "../../../shared/ButtonMenu";

const LineSpacingMenu = (): JSX.Element => {
  const { applyLineHeight, applyParagraphSpacingAfter } =
    useLexicalToolbarContext();

  const menu = [
    { value: "Single", onClick: () => applyLineHeight("1") },
    { value: "1.15", onClick: () => applyLineHeight("1.15") },
    { value: "1.5", onClick: () => applyLineHeight("1.5") },
    { value: "Double", onClick: () => applyLineHeight("2") },
    { value: "Add space after — 6pt", onClick: () => applyParagraphSpacingAfter("6pt") },
    { value: "Add space after — 12pt", onClick: () => applyParagraphSpacingAfter("12pt") },
    { value: "Add space after — 18pt", onClick: () => applyParagraphSpacingAfter("18pt") },
  ];

  return (
    <ButtonMenu
      value="Spacing"
      startIcon={<HeightOutlinedIcon />}
      endIcon={<KeyboardArrowDownOutlinedIcon />}
      menu={menu}
    />
  );
};

export default LineSpacingMenu;

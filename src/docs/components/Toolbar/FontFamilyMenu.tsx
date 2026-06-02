import type { JSX } from "react";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";

import { useLexicalToolbarContext } from "../../../editor/context/LexicalToolbarContext";
import ButtonMenu from "../../../shared/ButtonMenu";
import { useState } from "react";

const FontFamilyMenu = (): JSX.Element => {
  const { applyFontFamily } = useLexicalToolbarContext();
  const [family, setFamily] = useState("Arial");

  const menu = [
    {
      value: "Arial",
      onClick: () => {
        setFamily("Arial");
        applyFontFamily("Arial, sans-serif");
      },
    },
    {
      value: "Times New Roman",
      onClick: () => {
        setFamily("Times New Roman");
        applyFontFamily('"Times New Roman", serif');
      },
    },
    {
      value: "Verdana",
      onClick: () => {
        setFamily("Verdana");
        applyFontFamily("Verdana, sans-serif");
      },
    },
  ];

  return (
    <ButtonMenu
      value={family}
      endIcon={<KeyboardArrowDownOutlinedIcon />}
      menu={menu}
    />
  );
};

export default FontFamilyMenu;

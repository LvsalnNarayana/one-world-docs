import type { JSX } from "react";
import FormatAlignLeftOutlinedIcon from "@mui/icons-material/FormatAlignLeftOutlined";
import FormatAlignRightOutlinedIcon from "@mui/icons-material/FormatAlignRightOutlined";
import FormatAlignCenterOutlinedIcon from "@mui/icons-material/FormatAlignCenterOutlined";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import FormatAlignJustifyOutlinedIcon from "@mui/icons-material/FormatAlignJustifyOutlined";

import { useLexicalToolbarContext } from "../../../editor/context/LexicalToolbarContext";
import ButtonMenu from "../../../shared/ButtonMenu";
import { useState } from "react";

const FontAligner = (): JSX.Element => {
  const { setElementFormat } = useLexicalToolbarContext();
  const [label, setLabel] = useState("Left Align");

  const menu = [
    {
      onClick: () => {
        setLabel("Left Align");
        setElementFormat("left");
      },
      value: "Left Align",
      icon: <FormatAlignLeftOutlinedIcon />,
    },
    {
      onClick: () => {
        setLabel("Center Align");
        setElementFormat("center");
      },
      value: "Center Align",
      icon: <FormatAlignCenterOutlinedIcon />,
    },
    {
      onClick: () => {
        setLabel("Right Align");
        setElementFormat("right");
      },
      value: "Right Align",
      icon: <FormatAlignRightOutlinedIcon />,
    },
    {
      onClick: () => {
        setLabel("Justify Align");
        setElementFormat("justify");
      },
      value: "Justify Align",
      icon: <FormatAlignJustifyOutlinedIcon />,
    },
  ];

  return (
    <ButtonMenu
      value={label}
      startIcon={<FormatAlignLeftOutlinedIcon />}
      endIcon={<KeyboardArrowDownOutlinedIcon />}
      menu={menu}
    />
  );
};

export default FontAligner;

// External
import React, { type JSX } from "react";


// MUI
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";


// Shared
import ButtonMenu from "../../../shared/ButtonMenu";


// Context
import { useDocConfig } from "../../context/DocsConfigContext";

const ZoomControllerMenu: React.ElementType = (): JSX.Element => {
  const { settings, updateSetting } = useDocConfig();

  const menu = [
    {
      value: "25%",
      onClick: () => {
        updateSetting({ key: "zoom", section: "document" }, 25);
      },
    },
    {
      value: "50%",
      onClick: () => {
        updateSetting({ key: "zoom", section: "document" }, 50);
      },
    },
    {
      value: "75%",
      onClick: () => {
        updateSetting({ key: "zoom", section: "document" }, 75);
      },
    },
    {
      value: "100%",
      onClick: () => {
        updateSetting({ key: "zoom", section: "document" }, 100);
      },
    },
    {
      value: "125%",
      onClick: () => {
        updateSetting({ key: "zoom", section: "document" }, 125);
      },
    },
    {
      value: "150%",
      onClick: () => {
        updateSetting({ key: "zoom", section: "document" },150);
      },
    },
    {
      value: "200%",
      onClick: () => {
        updateSetting({ key: "zoom", section: "document" }, 200);
      },
    },
    {
      value: "300%",
      onClick: () => {
        updateSetting({ key: "zoom", section: "document" },300);
      },
    },
    {
      value: "400%",
      onClick: () => {
        updateSetting({ key: "zoom", section: "document" }, 400);
      },
    },
  ];

  return (
    <>
      <ButtonMenu
        value={`${settings.document.zoom}%`}
        endIcon={<KeyboardArrowDownOutlinedIcon />}
        menu={menu}
      />
    </>
  );
};

export default ZoomControllerMenu;

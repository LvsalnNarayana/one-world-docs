import type { JSX } from "react";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import WebOutlinedIcon from "@mui/icons-material/WebOutlined";
import CodeOutlinedIcon from "@mui/icons-material/CodeOutlined";
import GifBoxOutlinedIcon from "@mui/icons-material/GifBoxOutlined";
import BallotOutlinedIcon from "@mui/icons-material/BallotOutlined";
import ViewWeekOutlinedIcon from "@mui/icons-material/ViewWeekOutlined";
import TableViewOutlinedIcon from "@mui/icons-material/TableViewOutlined";
import ContentCutOutlinedIcon from "@mui/icons-material/ContentCutOutlined";
import BrokenImageOutlinedIcon from "@mui/icons-material/BrokenImageOutlined";
import FormatQuoteOutlinedIcon from "@mui/icons-material/FormatQuoteOutlined";
import OndemandVideoOutlinedIcon from "@mui/icons-material/OndemandVideoOutlined";
import HorizontalRuleOutlinedIcon from "@mui/icons-material/HorizontalRuleOutlined";
import InsertPageBreakOutlinedIcon from "@mui/icons-material/InsertPageBreakOutlined";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";

import { useInsertDialog } from "../../../editor/context/InsertDialogContext";
import { useLexicalToolbarContext } from "../../../editor/context/LexicalToolbarContext";
import ButtonMenu from "../../../shared/ButtonMenu";

const InsertNodeMenu = (): JSX.Element => {
  const { openDialog } = useInsertDialog();
  const {
    insertHorizontalRule,
    insertPageBreak,
    setBlockStyle,
  } = useLexicalToolbarContext();

  const menu = [
    {
      onClick: insertHorizontalRule,
      value: "Divider",
      icon: <HorizontalRuleOutlinedIcon />,
    },
    {
      onClick: insertPageBreak,
      value: "Page Break",
      icon: <ContentCutOutlinedIcon />,
    },
    {
      onClick: () => openDialog("image"),
      value: "Image",
      icon: <BrokenImageOutlinedIcon />,
    },
    {
      onClick: () => openDialog("gif"),
      value: "GIF",
      icon: <GifBoxOutlinedIcon />,
    },
    {
      onClick: () => openDialog("table"),
      value: "Table",
      icon: <TableViewOutlinedIcon />,
    },
    {
      onClick: () => openDialog("poll"),
      value: "Poll",
      icon: <BallotOutlinedIcon />,
    },
    {
      onClick: () => openDialog("layout"),
      value: "Column View",
      icon: <ViewWeekOutlinedIcon />,
    },
    {
      onClick: () => setBlockStyle("Quote"),
      value: "Quote",
      icon: <FormatQuoteOutlinedIcon />,
    },
    {
      onClick: () => setBlockStyle("Code"),
      value: "Code",
      icon: <CodeOutlinedIcon />,
    },
    {
      onClick: insertHorizontalRule,
      value: "Horizontal Rule",
      icon: <InsertPageBreakOutlinedIcon />,
    },
    {
      onClick: () => openDialog("embed"),
      value: "Embed",
      icon: <WebOutlinedIcon />,
    },
    {
      onClick: () => openDialog("youtube"),
      value: "Video",
      icon: <OndemandVideoOutlinedIcon />,
    },
  ];

  return (
    <ButtonMenu
      type="icon"
      value={<AddOutlinedIcon />}
      endIcon={<KeyboardArrowDownOutlinedIcon />}
      menu={menu}
    />
  );
};

export default InsertNodeMenu;

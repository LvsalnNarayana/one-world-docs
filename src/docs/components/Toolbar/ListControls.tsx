import FormatListBulletedOutlinedIcon from "@mui/icons-material/FormatListBulletedOutlined";
import FormatListNumberedOutlinedIcon from "@mui/icons-material/FormatListNumberedOutlined";
import CheckBoxOutlinedIcon from "@mui/icons-material/CheckBoxOutlined";
import { IconButton, Stack, Tooltip } from "@mui/material";

import { useLexicalToolbarContext } from "../../../editor/context/LexicalToolbarContext";
import { preventEditorBlur } from "../../../shared/toolbarMouseDown";

export default function ListControls() {
  const { setBlockStyle, formatState } = useLexicalToolbarContext();

  return (
    <Stack direction="row">
      <Tooltip title="Bulleted list">
        <IconButton
          size="small"
          color={formatState.blockType === "bullet" ? "primary" : "default"}
          onMouseDown={preventEditorBlur}
          onClick={() => setBlockStyle("Bulleted List")}
        >
          <FormatListBulletedOutlinedIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="Numbered list">
        <IconButton
          size="small"
          color={formatState.blockType === "number" ? "primary" : "default"}
          onMouseDown={preventEditorBlur}
          onClick={() => setBlockStyle("Numbered List")}
        >
          <FormatListNumberedOutlinedIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="Checklist">
        <IconButton
          size="small"
          color={formatState.blockType === "check" ? "primary" : "default"}
          onMouseDown={preventEditorBlur}
          onClick={() => setBlockStyle("To-do List")}
        >
          <CheckBoxOutlinedIcon />
        </IconButton>
      </Tooltip>
    </Stack>
  );
}

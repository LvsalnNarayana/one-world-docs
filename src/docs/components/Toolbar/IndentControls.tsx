import FormatIndentDecreaseOutlinedIcon from "@mui/icons-material/FormatIndentDecreaseOutlined";
import FormatIndentIncreaseOutlinedIcon from "@mui/icons-material/FormatIndentIncreaseOutlined";
import { IconButton, Stack, Tooltip } from "@mui/material";

import { useLexicalToolbarContext } from "../../../editor/context/LexicalToolbarContext";
import { preventEditorBlur } from "../../../shared/toolbarMouseDown";

export default function IndentControls() {
  const { outdent, indent } = useLexicalToolbarContext();

  return (
    <Stack direction="row">
      <Tooltip title="Decrease indent">
        <IconButton size="small" onMouseDown={preventEditorBlur} onClick={outdent}>
          <FormatIndentDecreaseOutlinedIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="Increase indent">
        <IconButton size="small" onMouseDown={preventEditorBlur} onClick={indent}>
          <FormatIndentIncreaseOutlinedIcon />
        </IconButton>
      </Tooltip>
    </Stack>
  );
}

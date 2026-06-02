import FormatClearOutlinedIcon from "@mui/icons-material/FormatClearOutlined";
import { IconButton, Tooltip } from "@mui/material";

import { useLexicalToolbarContext } from "../../../editor/context/LexicalToolbarContext";
import { preventEditorBlur } from "../../../shared/toolbarMouseDown";

export default function FormatClearButton() {
  const { clearFormatting } = useLexicalToolbarContext();

  return (
    <Tooltip title="Clear formatting">
      <IconButton size="small" onMouseDown={preventEditorBlur} onClick={clearFormatting}>
        <FormatClearOutlinedIcon />
      </IconButton>
    </Tooltip>
  );
}

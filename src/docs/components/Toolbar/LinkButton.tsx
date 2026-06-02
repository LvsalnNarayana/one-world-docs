import InsertLinkOutlinedIcon from "@mui/icons-material/InsertLinkOutlined";
import { IconButton, Tooltip } from "@mui/material";

import { useLexicalToolbarContext } from "../../../editor/context/LexicalToolbarContext";
import { preventEditorBlur } from "../../../shared/toolbarMouseDown";

export default function LinkButton() {
  const { toggleLink } = useLexicalToolbarContext();

  return (
    <Tooltip title="Insert link">
      <IconButton size="small" onMouseDown={preventEditorBlur} onClick={toggleLink}>
        <InsertLinkOutlinedIcon />
      </IconButton>
    </Tooltip>
  );
}

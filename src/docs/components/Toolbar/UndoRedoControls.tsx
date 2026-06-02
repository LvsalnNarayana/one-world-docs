import UndoOutlinedIcon from "@mui/icons-material/UndoOutlined";
import RedoOutlinedIcon from "@mui/icons-material/RedoOutlined";
import { IconButton, Stack } from "@mui/material";

import { useLexicalToolbarContext } from "../../../editor/context/LexicalToolbarContext";
import { preventEditorBlur } from "../../../shared/toolbarMouseDown";

export default function UndoRedoControls() {
  const { formatState, undo, redo } = useLexicalToolbarContext();
  return (
    <Stack direction="row">
      <IconButton size="small" disabled={!formatState.canUndo} onMouseDown={preventEditorBlur} onClick={undo}>
        <UndoOutlinedIcon fontSize="small" />
      </IconButton>
      <IconButton size="small" disabled={!formatState.canRedo} onMouseDown={preventEditorBlur} onClick={redo}>
        <RedoOutlinedIcon fontSize="small" />
      </IconButton>
    </Stack>
  );
}

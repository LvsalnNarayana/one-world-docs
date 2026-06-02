import { useState } from "react";
import FormatColorTextOutlinedIcon from "@mui/icons-material/FormatColorTextOutlined";
import FormatColorFillOutlinedIcon from "@mui/icons-material/FormatColorFillOutlined";
import { IconButton, Popover, Stack, Tooltip } from "@mui/material";

import ColorPickerGrid from "../../../shared/ColorPickerGrid";
import { useLexicalToolbarContext } from "../../../editor/context/LexicalToolbarContext";

export default function TextColorPicker() {
  const { applyTextColor, applyBackgroundColor } = useLexicalToolbarContext();
  const [textAnchor, setTextAnchor] = useState<HTMLElement | null>(null);
  const [bgAnchor, setBgAnchor] = useState<HTMLElement | null>(null);

  return (
    <Stack direction="row">
      <Tooltip title="Text color">
        <IconButton size="small" onClick={(e) => setTextAnchor(e.currentTarget)}>
          <FormatColorTextOutlinedIcon />
        </IconButton>
      </Tooltip>
      <Popover
        open={Boolean(textAnchor)}
        anchorEl={textAnchor}
        onClose={() => setTextAnchor(null)}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      >
        <ColorPickerGrid
          onSelect={(c) => {
            applyTextColor(c);
            setTextAnchor(null);
          }}
        />
      </Popover>
      <Tooltip title="Highlight color">
        <IconButton size="small" onClick={(e) => setBgAnchor(e.currentTarget)}>
          <FormatColorFillOutlinedIcon />
        </IconButton>
      </Tooltip>
      <Popover
        open={Boolean(bgAnchor)}
        anchorEl={bgAnchor}
        onClose={() => setBgAnchor(null)}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      >
        <ColorPickerGrid
          onSelect={(c) => {
            applyBackgroundColor(c);
            setBgAnchor(null);
          }}
        />
      </Popover>
    </Stack>
  );
}

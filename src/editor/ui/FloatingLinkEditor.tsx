import { $isLinkNode, TOGGLE_LINK_COMMAND } from "@lexical/link";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $findMatchingParent, mergeRegister } from "@lexical/utils";
import {
  $getSelection,
  $isRangeSelection,
  SELECTION_CHANGE_COMMAND,
  COMMAND_PRIORITY_LOW,
} from "lexical";
import { useCallback, useEffect, useRef, useState } from "react";
import { IconButton, Paper, Stack, TextField, Tooltip } from "@mui/material";
import OpenInNewOutlinedIcon from "@mui/icons-material/OpenInNewOutlined";
import LinkOffOutlinedIcon from "@mui/icons-material/LinkOffOutlined";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";

function getSelectedLinkUrl(): string {
  const selection = $getSelection();
  if (!$isRangeSelection(selection)) return "";
  const node = selection.anchor.getNode();
  const linkParent = $findMatchingParent(node, $isLinkNode);
  if (linkParent && $isLinkNode(linkParent)) {
    return linkParent.getURL();
  }
  return "";
}

export default function FloatingLinkEditor() {
  const [editor] = useLexicalComposerContext();
  const [url, setUrl] = useState("");
  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const inputRef = useRef<HTMLInputElement>(null);

  const updateLinkEditor = useCallback(() => {
    editor.getEditorState().read(() => {
      const selection = $getSelection();
      if (!$isRangeSelection(selection)) {
        setVisible(false);
        return;
      }
      const linkUrl = getSelectedLinkUrl();
      if (linkUrl) {
        setUrl(linkUrl);
        const domSelection = window.getSelection();
        const domRange =
          domSelection?.rangeCount && domSelection.rangeCount > 0
            ? domSelection.getRangeAt(0)
            : null;
        if (domRange) {
          const rect = domRange.getBoundingClientRect();
          setPosition({
            top: rect.bottom + window.scrollY + 8,
            left: rect.left + window.scrollX,
          });
        }
        setVisible(true);
      } else {
        setVisible(false);
      }
    });
  }, [editor]);

  useEffect(() => {
    return mergeRegister(
      editor.registerUpdateListener(() => updateLinkEditor()),
      editor.registerCommand(
        SELECTION_CHANGE_COMMAND,
        () => {
          updateLinkEditor();
          return false;
        },
        COMMAND_PRIORITY_LOW
      )
    );
  }, [editor, updateLinkEditor]);

  const saveLink = () => {
    editor.dispatchCommand(TOGGLE_LINK_COMMAND, url || null);
    setVisible(false);
  };

  const removeLink = () => {
    editor.dispatchCommand(TOGGLE_LINK_COMMAND, null);
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <Paper
      elevation={6}
      sx={{
        position: "fixed",
        top: position.top,
        left: position.left,
        zIndex: 1200,
        p: 1,
        minWidth: 280,
      }}
      onMouseDown={(e) => e.preventDefault()}
    >
      <Stack direction="row" spacing={0.5} alignItems="center">
        <TextField
          size="small"
          value={url}
          inputRef={inputRef}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://"
          sx={{ flex: 1 }}
          onKeyDown={(e) => {
            if (e.key === "Enter") saveLink();
          }}
        />
        <Tooltip title="Apply">
          <IconButton size="small" onClick={saveLink}>
            <CheckOutlinedIcon fontSize="small" />
          </IconButton>
        </Tooltip>
        <Tooltip title="Open">
          <IconButton
            size="small"
            disabled={!url}
            onClick={() => window.open(url, "_blank")}
          >
            <OpenInNewOutlinedIcon fontSize="small" />
          </IconButton>
        </Tooltip>
        <Tooltip title="Remove link">
          <IconButton size="small" onClick={removeLink}>
            <LinkOffOutlinedIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </Stack>
    </Paper>
  );
}

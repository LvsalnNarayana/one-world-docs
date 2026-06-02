import { useRef, type ChangeEvent } from "react";
import { Box, Stack, Typography, useTheme } from "@mui/material";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";

import { useFindReplace } from "../../editor/context/FindReplaceContext";
import { useLexicalToolbarContext } from "../../editor/context/LexicalToolbarContext";
import {
  exportDocAsDocx,
  exportDocAsHtml,
  exportDocAsPlainText,
  importDocxIntoEditor,
  printDocument,
} from "../../editor/io/documentIo";
import ButtonMenu from "../../shared/ButtonMenu";
import { useDocConfig } from "../context/DocsConfigContext";
import { useEditorDoc } from "../context/EditorDocContext";

interface DocsMenuRibbonProps {
  onWordCount?: () => void;
  onVersionHistory?: () => void;
}

export default function DocsMenuRibbon({
  onWordCount,
  onVersionHistory,
}: DocsMenuRibbonProps) {
  const theme = useTheme();
  const [editor] = useLexicalComposerContext();
  const { doc, saveDoc } = useEditorDoc();
  const { settings, updateSetting } = useDocConfig();
  const { openFindBar } = useFindReplace();
  const {
    undo,
    redo,
    toggleFormat,
    toggleInlineCode,
    setBlockStyle,
    insertHorizontalRule,
    insertPageBreak,
    toggleLink,
    clearFormatting,
  } = useLexicalToolbarContext();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const onPickDocx = () => fileInputRef.current?.click();

  const onFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    if (!file.name.toLowerCase().endsWith(".docx")) {
      window.alert("Please choose a .docx file.");
      return;
    }
    try {
      await importDocxIntoEditor(editor, file);
      await saveDoc();
    } catch {
      window.alert("Could not open this document.");
    }
  };

  return (
    <Box
      className="no-print"
      sx={{
        px: 1.25,
        py: 0.25,
        borderBottom: `1px solid ${theme.palette.divider}`,
        bgcolor: theme.palette.background.paper,
        "& .MuiButton-root": {
          px: 1.1,
          py: 0.35,
          minWidth: "fit-content",
          fontSize: 12,
          color: theme.palette.text.secondary,
        },
      }}
    >
      <input
        ref={fileInputRef}
        type="file"
        hidden
        accept=".docx,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        onChange={onFileChange}
      />
      <Stack direction="row" alignItems="center" spacing={0.5} flexWrap="wrap">
        <ButtonMenu
          value="File"
          menu={[
            { value: "Open .docx", onClick: onPickDocx },
            { value: "Save now", onClick: () => void saveDoc() },
            { value: "Export as .docx", onClick: () => void exportDocAsDocx(editor, doc.title) },
            { value: "Export as .html", onClick: () => exportDocAsHtml(editor, doc.title) },
            { value: "Export as .txt", onClick: () => exportDocAsPlainText(editor, doc.title) },
            { value: "Print", onClick: printDocument },
          ]}
          anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
          transformOrigin={{ vertical: "top", horizontal: "left" }}
        />
        <ButtonMenu
          value="Edit"
          menu={[
            { value: "Undo", onClick: undo },
            { value: "Redo", onClick: redo },
            { value: "Find", onClick: () => openFindBar(false) },
            { value: "Find and Replace", onClick: () => openFindBar(true) },
          ]}
          anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
          transformOrigin={{ vertical: "top", horizontal: "left" }}
        />
        <ButtonMenu
          value="View"
          menu={[
            { value: "Zoom 75%", onClick: () => updateSetting({ section: "document", key: "zoom" }, 75) },
            { value: "Zoom 100%", onClick: () => updateSetting({ section: "document", key: "zoom" }, 100) },
            { value: "Zoom 125%", onClick: () => updateSetting({ section: "document", key: "zoom" }, 125) },
            {
              value: settings.layout.comments ? "Hide comments panel" : "Show comments panel",
              onClick: () =>
                updateSetting({ section: "layout", key: "comments" }, !settings.layout.comments),
            },
            {
              value: settings.layout.tableOfContents ? "Hide outline" : "Show outline",
              onClick: () =>
                updateSetting(
                  { section: "layout", key: "tableOfContents" },
                  !settings.layout.tableOfContents
                ),
            },
          ]}
          anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
          transformOrigin={{ vertical: "top", horizontal: "left" }}
        />
        <ButtonMenu
          value="Insert"
          menu={[
            { value: "Link", onClick: toggleLink },
            { value: "Horizontal line", onClick: insertHorizontalRule },
            { value: "Page break", onClick: insertPageBreak },
            {
              value: "Toggle comments",
              onClick: () =>
                updateSetting({ section: "layout", key: "comments" }, !settings.layout.comments),
            },
          ]}
          anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
          transformOrigin={{ vertical: "top", horizontal: "left" }}
        />
        <ButtonMenu
          value="Format"
          menu={[
            { value: "Bold", onClick: () => toggleFormat("bold") },
            { value: "Italic", onClick: () => toggleFormat("italic") },
            { value: "Underline", onClick: () => toggleFormat("underline") },
            { value: "Strikethrough", onClick: () => toggleFormat("strikethrough") },
            { value: "Inline code", onClick: toggleInlineCode },
            { value: "Heading 1", onClick: () => setBlockStyle("Heading 1") },
            { value: "Normal text", onClick: () => setBlockStyle("Normal Text") },
            { value: "Clear formatting", onClick: clearFormatting },
          ]}
          anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
          transformOrigin={{ vertical: "top", horizontal: "left" }}
        />
        <ButtonMenu
          value="Tools"
          menu={[
            { value: "Word count", onClick: onWordCount },
            { value: "Version history", onClick: onVersionHistory },
            {
              value: settings.editor.spellingGrammar
                ? "Disable spelling & grammar"
                : "Enable spelling & grammar",
              onClick: () =>
                updateSetting(
                  { section: "editor", key: "spellingGrammar" },
                  !settings.editor.spellingGrammar
                ),
            },
          ]}
          anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
          transformOrigin={{ vertical: "top", horizontal: "left" }}
        />
        <ButtonMenu
          value="Help"
          menu={[
            {
              value: "Keyboard shortcuts",
              onClick: () =>
                window.alert("Find: Ctrl/Cmd+F\nReplace: Ctrl/Cmd+H\nUndo/Redo: Ctrl/Cmd+Z, Shift+Ctrl/Cmd+Z"),
            },
            {
              value: "About editor",
              onClick: () =>
                window.alert("One World Docs editor with rich text, comments, rulers, import/export."),
            },
          ]}
          anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
          transformOrigin={{ vertical: "top", horizontal: "left" }}
        />
        <Typography variant="caption" color="text.disabled" sx={{ ml: 1 }}>
          {settings.document.zoom}% • {doc.permission}
        </Typography>
      </Stack>
    </Box>
  );
}


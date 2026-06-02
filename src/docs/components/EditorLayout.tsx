import { useCallback, useEffect, useRef, useState, type JSX } from "react";
import { Box, Stack, Divider } from "@mui/material";

import LexicalEditorShell from "../../editor/LexicalEditorShell";
import { InsertDialogProvider } from "../../editor/context/InsertDialogContext";
import { useFindReplace } from "../../editor/context/FindReplaceContext";
import { useDocConfig } from "../context/DocsConfigContext";
import { useEditorDoc } from "../context/EditorDocContext";
import PageLayout from "./PageLayout";
import DocToolbar from "./DocToolbar";
import DocsMenuRibbon from "./DocsMenuRibbon";
import EditorToolbar from "./EditorToolbar";
import TableOfContents from "./TableOfContents";
import DocCommentsContainer from "./DocCommentsContainer";
import FindReplaceBar from "./FindReplaceBar";
import WordCountDialog from "./WordCountDialog";
import VersionHistoryPanel from "./VersionHistoryPanel";
import EditorRevisionBridge from "./EditorRevisionBridge";
import PrintLayout from "./PrintLayout";

function EditorKeyboardShortcuts() {
  const { openFindBar } = useFindReplace();
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "f") {
        e.preventDefault();
        openFindBar(false);
      }
      if ((e.metaKey || e.ctrlKey) && e.key === "h") {
        e.preventDefault();
        openFindBar(true);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [openFindBar]);
  return null;
}

const EditorLayout = (): JSX.Element => {
  const { settings } = useDocConfig();
  const { doc, readOnly } = useEditorDoc();
  const [wordCountOpen, setWordCountOpen] = useState(false);
  const [versionOpen, setVersionOpen] = useState(false);
  const restoreRef = useRef<((json: string) => void) | null>(null);
  const zoom = settings.document.zoom / 100;

  const handleRestoreReady = useCallback((fn: (json: string) => void) => {
    restoreRef.current = fn;
  }, []);

  return (
    <LexicalEditorShell
      editorStateJson={doc.editorStateJson}
      editable={!readOnly}
    >
      <InsertDialogProvider>
        <PrintLayout>
          <EditorKeyboardShortcuts />
          <EditorRevisionBridge onRestoreReady={handleRestoreReady} />
          <Stack
            className="ow-docs-print-root"
            width="100%"
            height="100%"
            gap={1}
            sx={{ overflow: "hidden", position: "relative" }}
          >
            <Box className="no-print">
              <DocToolbar
                onWordCount={() => setWordCountOpen(true)}
                onVersionHistory={() => setVersionOpen(true)}
              />
              <Divider />
              <DocsMenuRibbon
                onWordCount={() => setWordCountOpen(true)}
                onVersionHistory={() => setVersionOpen(true)}
              />
              <EditorToolbar />
            </Box>

            <Stack
              width="100%"
              flexGrow={1}
              display="grid"
              gap={2}
              gridTemplateColumns="250px 1fr 300px"
              sx={{ overflow: "hidden", position: "relative" }}
            >
              <Stack
                className="no-print"
                sx={{ height: "100%", overflowY: "auto" }}
              >
                {(settings.layout.tableOfContents ||
                  settings.layout.outline) && <TableOfContents />}
              </Stack>

              <Box
                className="ow-docs-canvas-scroll"
                sx={{
                  width: "100%",
                  height: "100%",
                  overflow: "auto",
                  position: "relative",
                }}
              >
                <Box className="no-print">
                  <FindReplaceBar />
                </Box>
                <Box
                  className="ow-docs-zoom-wrapper"
                  style={{ ["--ow-doc-zoom" as string]: String(zoom) }}
                >
                  <Box
                    className="ow-docs-zoom-inner"
                    sx={{
                      zoom,
                      width: "fit-content",
                      margin: "0 auto",
                    }}
                  >
                    <PageLayout />
                  </Box>
                </Box>
              </Box>

              <Stack
                className="no-print"
                sx={{ height: "100%", overflowY: "auto" }}
              >
                {settings.layout.comments && <DocCommentsContainer />}
              </Stack>
            </Stack>
          </Stack>

          <WordCountDialog
            open={wordCountOpen}
            onClose={() => setWordCountOpen(false)}
          />
          <VersionHistoryPanel
            open={versionOpen}
            onClose={() => setVersionOpen(false)}
            onRestore={(json) => restoreRef.current?.(json)}
          />
        </PrintLayout>
      </InsertDialogProvider>
    </LexicalEditorShell>
  );
};

export default EditorLayout;

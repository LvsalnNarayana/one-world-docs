import { Box, Stack, useTheme } from "@mui/material";
import { useEffect, useMemo, useRef, useState } from "react";

import CommentMarginAnchors from "../../collaboration/components/CommentMarginAnchors";
import CollaboratorCursor from "../../collaboration/components/CollaboratorCursor";
import DocsEditorPlugins from "../../editor/plugins/DocsEditorPlugins";
import FloatingLinkEditor from "../../editor/ui/FloatingLinkEditor";
import PageRulers from "./PageRulers";
import { useDocConfig } from "../context/DocsConfigContext";
import { useEditorDoc } from "../context/EditorDocContext";

const PageLayout = () => {
  const theme = useTheme();
  const { doc, updateDoc, saveDoc } = useEditorDoc();
  const { settings } = useDocConfig();
  const { margins, orientation } = doc.pageSetup;
  const isLandscape = orientation === "landscape";
  const pageRef = useRef<HTMLDivElement | null>(null);
  const [pageSize, setPageSize] = useState({ width: 0, height: 0 });

  const pageWidth = isLandscape ? "297mm" : "210mm";
  const pageMinHeight = isLandscape ? "210mm" : "297mm";
  const contentLeftPadding = 40;

  useEffect(() => {
    const page = pageRef.current;
    if (!page) return;
    const update = () =>
      setPageSize({
        width: page.clientWidth,
        height: page.clientHeight,
      });
    update();
    const observer = new ResizeObserver(update);
    observer.observe(page);
    return () => observer.disconnect();
  }, []);

  const rulerMargins = useMemo(
    () => ({
      top: margins.top,
      bottom: margins.bottom,
      left: margins.left + contentLeftPadding,
      right: margins.right,
    }),
    [margins.bottom, margins.left, margins.right, margins.top]
  );

  const applyMarginsFromRuler = (next: typeof rulerMargins) => {
    updateDoc({
      pageSetup: {
        ...doc.pageSetup,
        margins: {
          top: next.top,
          bottom: next.bottom,
          left: Math.max(16, next.left - contentLeftPadding),
          right: next.right,
        },
      },
    });
  };

  return (
    <Stack
      alignItems="center"
      justifyContent="flex-start"
      className="ow-docs-print-area"
      sx={{ width: "100%", py: 1.5 }}
    >
      <Box sx={{ position: "relative", pt: "28px", pl: "28px" }}>
        <Box
          className="ow-docs-page page-canvas-print"
          ref={pageRef}
          sx={{
            width: pageWidth,
            minHeight: pageMinHeight,
            flexShrink: 0,
            position: "relative",
            boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
            borderRadius: "2px",
            backgroundColor: theme.palette.common.white,
            overflow: "visible",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {pageSize.width > 0 && pageSize.height > 0 && (
            <PageRulers
              pageWidth={pageSize.width}
              pageHeight={pageSize.height}
              margins={rulerMargins}
              onMarginsChange={applyMarginsFromRuler}
              onMarginsCommit={(next) => {
                applyMarginsFromRuler(next);
                void saveDoc({
                  pageSetup: {
                    ...doc.pageSetup,
                    margins: {
                      top: next.top,
                      bottom: next.bottom,
                      left: Math.max(16, next.left - contentLeftPadding),
                      right: next.right,
                    },
                  },
                });
              }}
            />
          )}
          <Box
            className="ow-docs-page-inner"
            sx={{
              flex: 1,
              position: "relative",
              minHeight: pageMinHeight,
              pt: `${margins.top}px`,
              pb: `${margins.bottom}px`,
              pl: `${margins.left + contentLeftPadding}px`,
              pr: `${margins.right}px`,
            }}
          >
            <CommentMarginAnchors />
            <DocsEditorPlugins />
            {settings.layout.showCollaboratorPresence && <CollaboratorCursor />}
            <FloatingLinkEditor />
          </Box>
        </Box>
      </Box>
    </Stack>
  );
};

export default PageLayout;

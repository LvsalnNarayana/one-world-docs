import { Box, Stack, useTheme } from "@mui/material";
import { useCallback, useLayoutEffect, useMemo, useRef, useState } from "react";

import CommentMarginAnchors from "../../collaboration/components/CommentMarginAnchors";
import CollaboratorCursor from "../../collaboration/components/CollaboratorCursor";
import DocsEditorPlugins from "../../editor/plugins/DocsEditorPlugins";
import FloatingLinkEditor from "../../editor/ui/FloatingLinkEditor";
import {
  getA4Dimensions,
  getPageFlowSpacerHeight,
  PAGE_GAP_PX,
} from "../constants/pageLayout";
import PageRulers from "./PageRulers";
import { useDocConfig } from "../context/DocsConfigContext";
import { useEditorDoc } from "../context/EditorDocContext";

const PageLayout = () => {
  const theme = useTheme();
  const { doc, updateDoc, saveDoc } = useEditorDoc();
  const { settings } = useDocConfig();
  const { margins, orientation } = doc.pageSetup;
  const { pageWidth, pageHeight } = getA4Dimensions(orientation);

  const measureRef = useRef<HTMLDivElement | null>(null);
  const [pageHeightPx, setPageHeightPx] = useState(0);
  const [pageWidthPx, setPageWidthPx] = useState(0);
  const [pageCount, setPageCount] = useState(1);

  const contentLeftPadding = 40;

  const usablePageHeightPx = useMemo(
    () => Math.max(1, pageHeightPx - margins.top - margins.bottom),
    [margins.bottom, margins.top, pageHeightPx]
  );

  const pageFlowSpacerHeight = getPageFlowSpacerHeight(
    margins.top,
    margins.bottom
  );

  const stackMinHeight =
    pageCount * pageHeightPx + Math.max(0, pageCount - 1) * PAGE_GAP_PX;

  useLayoutEffect(() => {
    const measure = measureRef.current;
    if (!measure) {
      return;
    }
    const update = () => {
      setPageHeightPx(measure.offsetHeight);
      setPageWidthPx(measure.offsetWidth);
    };
    update();
    const observer = new ResizeObserver(update);
    observer.observe(measure);
    return () => observer.disconnect();
  }, [pageHeight, pageWidth]);

  const handlePageCountChange = useCallback((count: number) => {
    setPageCount(Math.max(1, count));
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
      <Box
        ref={measureRef}
        aria-hidden
        sx={{
          position: "absolute",
          visibility: "hidden",
          pointerEvents: "none",
          width: pageWidth,
          height: pageHeight,
        }}
      />

      <Box sx={{ position: "relative", pt: "28px", pl: "28px" }}>
        <Box
          className="ow-docs-pages-host"
          sx={{
            position: "relative",
            minHeight: stackMinHeight > 0 ? stackMinHeight : pageHeight,
            width: pageWidth,
          }}
        >
          <Stack
            className="ow-docs-page-stack"
            spacing={`${PAGE_GAP_PX}px`}
            sx={{ position: "relative", zIndex: 0 }}
          >
            {Array.from({ length: pageCount }, (_, index) => (
              <Box
                key={`page-surface-${index}`}
                className="ow-docs-page ow-docs-page-surface page-canvas-print"
                sx={{
                  width: pageWidth,
                  height: pageHeight,
                  flexShrink: 0,
                  boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                  borderRadius: "2px",
                  backgroundColor: theme.palette.common.white,
                }}
              />
            ))}
          </Stack>

          <Box
            className="ow-docs-page-editor-layer"
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: pageWidth,
              zIndex: 1,
            }}
          >
            {pageWidthPx > 0 && pageHeightPx > 0 && (
              <PageRulers
                pageWidth={pageWidthPx}
                pageHeight={pageHeightPx}
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
                position: "relative",
                pt: `${margins.top}px`,
                pb: `${margins.bottom}px`,
                pl: `${margins.left + contentLeftPadding}px`,
                pr: `${margins.right}px`,
                ["--ow-page-flow-spacer-h" as string]: `${pageFlowSpacerHeight}px`,
              }}
            >
              <CommentMarginAnchors />
              <DocsEditorPlugins
                usablePageHeightPx={usablePageHeightPx}
                onPageCountChange={handlePageCountChange}
              />
              {settings.layout.showCollaboratorPresence && (
                <CollaboratorCursor />
              )}
              <FloatingLinkEditor />
            </Box>
          </Box>
        </Box>
      </Box>
    </Stack>
  );
};

export default PageLayout;

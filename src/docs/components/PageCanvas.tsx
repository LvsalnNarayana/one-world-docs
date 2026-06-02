import { Stack, useTheme } from "@mui/material";

import CollaboratorCursor from "../../collaboration/components/CollaboratorCursor";
import DocsEditorPlugins from "../../editor/plugins/DocsEditorPlugins";
import { useDocConfig } from "../context/DocsConfigContext";
import { useEditorDoc } from "../context/EditorDocContext";

export default function PageCanvas() {
  const theme = useTheme();
  const { doc } = useEditorDoc();
  const { settings } = useDocConfig();
  const zoom = settings.document.zoom / 100;
  const { margins, backgroundColor, orientation } = doc.pageSetup;
  const isLandscape = orientation === "landscape";

  return (
    <Stack
      alignItems="center"
      sx={{
        width: "100%",
        minHeight: "100%",
        py: 3,
        bgcolor: "#f0f4f9",
      }}
    >
      <Stack
        sx={{
          transform: `scale(${zoom})`,
          transformOrigin: "top center",
          position: "relative",
        }}
      >
        <Stack
          sx={{
            width: isLandscape ? "297mm" : "210mm",
            minHeight: isLandscape ? "210mm" : "297mm",
            boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
            borderRadius: "2px",
            backgroundColor: backgroundColor || theme.palette.common.white,
            overflow: "hidden",
            position: "relative",
            fontFamily: "Arial, sans-serif",
            fontSize: "11pt",
            pt: `${margins.top}px`,
            pb: `${margins.bottom}px`,
            pl: `${margins.left}px`,
            pr: `${margins.right}px`,
          }}
        >
          <DocsEditorPlugins />
          <CollaboratorCursor />
        </Stack>
      </Stack>
    </Stack>
  );
}

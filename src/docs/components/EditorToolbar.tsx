import type { ReactNode } from "react";
import PrintOutlinedIcon from "@mui/icons-material/PrintOutlined";
import { Stack, Divider, useTheme, IconButton, Tooltip, Box } from "@mui/material";

import UndoRedoControls from "./Toolbar/UndoRedoControls";
import ToolbarDivider from "./Toolbar/ToolbarDivider";
import TextStylesMenu from "./Toolbar/TextStylesMenu";
import FontFamilyMenu from "./Toolbar/FontFamilyMenu";
import FontSizer from "./Toolbar/FontSizer";
import BoldItalicUnderlineStrike from "./Toolbar/BoldItalicUnderlineStrike";
import TextColorPicker from "./Toolbar/TextColorPicker";
import LinkButton from "./Toolbar/LinkButton";
import InsertNodeMenu from "./Toolbar/InsertNodeMenu";
import FontAligner from "./Toolbar/FontAligner";
import LineSpacingMenu from "./Toolbar/LineSpacingMenu";
import ListControls from "./Toolbar/ListControls";
import IndentControls from "./Toolbar/IndentControls";
import FormatClearButton from "./Toolbar/FormatClearButton";
import MoreFormatsMenu from "./Toolbar/MoreFormatsMenu";
import ZoomControllerMenu from "./Toolbar/ZoomControllerMenu";
import TextTransformer from "./Toolbar/TextTransformer";
import AddCommentButton from "./Toolbar/AddCommentButton";
import { printDocument } from "../../editor/io/documentIo";
import { preventEditorBlur } from "../../shared/toolbarMouseDown";

const toolbarSx = {
  "& .MuiIconButton-root": { p: 0.5 },
  "& .MuiIconButton-root .MuiSvgIcon-root": { fontSize: 20 },
  "& .MuiToggleButton-root": { p: 0.5 },
  "& .MuiToggleButton-root .MuiSvgIcon-root": { fontSize: 20 },
  "& .MuiButton-root": {
    minWidth: "auto",
    py: 0.35,
    px: 0.85,
    fontSize: 13,
  },
  "& .MuiButton-root .MuiSvgIcon-root": { fontSize: 18 },
};

function ToolbarGroup({ children }: { children: ReactNode }) {
  return (
    <Stack direction="row" alignItems="center" spacing={0.25} flexWrap="nowrap">
      {children}
    </Stack>
  );
}

const EditorToolbar = () => {
  const theme = useTheme();

  return (
    <Box
      px={1}
      py={0.5}
      width="100%"
      bgcolor={theme.palette.background.paper}
      sx={{
        ...toolbarSx,
        top: 0,
        zIndex: 1000,
        borderRadius: 5,
        position: "sticky",
        borderBottom: `1px solid ${theme.palette.divider}`,
      }}
    >
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        width="100%"
        flexWrap="wrap"
        rowGap={0.5}
        columnGap={1}
      >
        <ToolbarGroup>
          <UndoRedoControls />
          <ToolbarDivider />
          <Tooltip title="Print layout">
            <IconButton
              size="small"
              onMouseDown={preventEditorBlur}
              onClick={printDocument}
            >
              <PrintOutlinedIcon />
            </IconButton>
          </Tooltip>
          <ToolbarDivider />
          <ZoomControllerMenu />
        </ToolbarGroup>

        <ToolbarGroup>
          <TextStylesMenu />
          <ToolbarDivider />
          <FontFamilyMenu />
          <ToolbarDivider />
          <FontSizer />
          <ToolbarDivider />
          <BoldItalicUnderlineStrike />
          <ToolbarDivider />
          <TextColorPicker />
        </ToolbarGroup>

        <ToolbarGroup>
          <LinkButton />
          <ToolbarDivider />
          <InsertNodeMenu />
          <ToolbarDivider />
          <FontAligner />
          <ToolbarDivider />
          <LineSpacingMenu />
          <ToolbarDivider />
          <ListControls />
          <ToolbarDivider />
          <IndentControls />
        </ToolbarGroup>

        <ToolbarGroup>
          <FormatClearButton />
          <TextTransformer />
          <MoreFormatsMenu />
          <Divider orientation="vertical" flexItem sx={{ mx: 0.25, my: 0.5 }} />
          <AddCommentButton />
        </ToolbarGroup>
      </Stack>
    </Box>
  );
};

export default EditorToolbar;

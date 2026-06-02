import React, { useState, type JSX } from "react";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import {
  Menu,
  Button,
  MenuItem,
  Checkbox,
  useTheme,
  ListItemIcon,
  ListItemText,
  buttonClasses,
  svgIconClasses,
} from "@mui/material";

import { useDocConfig } from "../context/DocsConfigContext";

const layoutLabels: Record<string, string> = {
  comments: "Comments",
  showCollaboratorPresence: "Show collaborator cursors",
  pageSetup: "Page Setup",
  tableOfContents: "Table of Contents",
  outline: "Table of Contents",
};

interface DocSettingsMenuProps {
  onWordCount?: () => void;
  onVersionHistory?: () => void;
}

const DocSettingsMenu: React.FC<DocSettingsMenuProps> = ({
  onWordCount,
  onVersionHistory,
}): JSX.Element => {
  const theme = useTheme();
  const { settings, updateSetting } = useDocConfig();
  const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);
  const menuOpen = Boolean(menuAnchorEl);

  const renderLayoutItem = (key: string, checked: boolean) => {
    if (key === "pageSetup" || key === "outline") return null;
    const label = layoutLabels[key] ?? key;

    return (
      <MenuItem
        key={key}
        onClick={() => updateSetting({ key, section: "layout" }, !checked)}
      >
        <ListItemIcon>
          <Checkbox
            sx={{ p: 0 }}
            checked={checked}
            onClick={(e) => e.stopPropagation()}
            onChange={() =>
              updateSetting({ key, section: "layout" }, !checked)
            }
          />
        </ListItemIcon>
        <ListItemText>{label}</ListItemText>
      </MenuItem>
    );
  };

  return (
    <>
      <Button
        onClick={(e) => setMenuAnchorEl(e.currentTarget)}
        variant="text"
        sx={{
          minWidth: "fit-content",
          px: 2,
          py: 1,
          fontSize: 14,
          height: "100%",
          color: theme.palette.text.primary,
          [`& .${buttonClasses.endIcon} .${svgIconClasses.root}`]: {
            fontSize: 16,
          },
          [`& .${buttonClasses.startIcon} .${svgIconClasses.root}`]: {
            fontSize: 16,
          },
        }}
      >
        <SettingsOutlinedIcon />
      </Button>

      <Menu
        PaperProps={{
          sx: {
            marginTop: 0.5,
            boxShadow: theme.shadows[1],
            border: `1px solid ${theme.palette.divider}`,
          },
        }}
        anchorEl={menuAnchorEl}
        open={menuOpen}
        onClose={() => setMenuAnchorEl(null)}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        {Object.entries(settings.layout).map(([key, value]) =>
          renderLayoutItem(key, value)
        )}
        {onWordCount && (
          <MenuItem
            onClick={() => {
              setMenuAnchorEl(null);
              onWordCount();
            }}
          >
            Word count
          </MenuItem>
        )}
        {onVersionHistory && (
          <MenuItem
            onClick={() => {
              setMenuAnchorEl(null);
              onVersionHistory();
            }}
          >
            Version history
          </MenuItem>
        )}
      </Menu>
    </>
  );
};

export default DocSettingsMenu;

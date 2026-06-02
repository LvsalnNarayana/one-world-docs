import { useState, type JSX } from "react";
import {
  Box,
  Container,
  IconButton,
  InputAdornment,
  Menu,
  MenuItem,
  Paper,
  Stack,
  TextField,
  Tooltip,
  Typography,
  Divider,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import {
  ViewList as ListViewIcon,
  ViewModule as GridViewIcon,
  Search as SearchIcon,
  SettingsOutlined as SettingsIcon,
  Clear as ClearIcon,
  Sort as SortIcon,
  HelpOutline as HelpIcon,
} from "@mui/icons-material";

import UserAvatar from "../../shared/UserAvatar";
import { useAuth } from "../context/AuthContext";
import { getUserDisplayName } from "../../types/doc/doc.types";

interface HeaderProps {
  viewMode: "grid" | "list";
  onViewModeChange: (mode: "grid" | "list") => void;
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
  onSortClick?: (el: HTMLElement) => void;
}

const Header = ({
  viewMode,
  onViewModeChange,
  searchQuery = "",
  onSearchChange,
  onSortClick,
}: HeaderProps): JSX.Element => {
  const { currentUser } = useAuth();
  const [settingsAnchor, setSettingsAnchor] = useState<null | HTMLElement>(null);
  const [userAnchor, setUserAnchor] = useState<null | HTMLElement>(null);

  return (
    <Container maxWidth="xl">
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        py={1.5}
        gap={2}
      >
        <Stack direction="row" alignItems="center" gap={1} flexShrink={0}>
          <Box
            component="img"
            src="/images/planet-earth.png"
            alt=""
            sx={{ width: 32, height: 32 }}
          />
          <Typography variant="h5" fontWeight={600} noWrap>
            One World Docs
          </Typography>
        </Stack>

        {onSearchChange && (
          <TextField
            size="small"
            placeholder="Search documents, people, and shared content..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            sx={{
              flex: 1,
              maxWidth: 560,
              "& .MuiOutlinedInput-root": {
                borderRadius: 3,
                bgcolor: "background.paper",
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon color="action" fontSize="small" />
                </InputAdornment>
              ),
              endAdornment: searchQuery ? (
                <InputAdornment position="end">
                  <IconButton size="small" onClick={() => onSearchChange("")}>
                    <ClearIcon fontSize="small" />
                  </IconButton>
                </InputAdornment>
              ) : null,
            }}
          />
        )}

        <Stack direction="row" alignItems="center" spacing={0.5} flexShrink={0}>
          {onSortClick && (
            <Tooltip title="Sort">
              <IconButton onClick={(e) => onSortClick(e.currentTarget)}>
                <SortIcon />
              </IconButton>
            </Tooltip>
          )}

          <Paper
            elevation={0}
            sx={{
              border: 1,
              display: "flex",
              borderRadius: 1,
              overflow: "hidden",
              borderColor: "divider",
              mr: 1,
            }}
          >
            <Tooltip title="Grid view">
              <IconButton
                onClick={() => onViewModeChange("grid")}
                sx={{
                  borderRadius: 0,
                  bgcolor: viewMode === "grid" ? "primary.main" : "transparent",
                  color:
                    viewMode === "grid" ? "primary.contrastText" : "text.primary",
                  "&:hover": {
                    bgcolor:
                      viewMode === "grid" ? "primary.dark" : "action.hover",
                  },
                }}
              >
                <GridViewIcon sx={{ width: 20, height: 20 }} />
              </IconButton>
            </Tooltip>
            <Tooltip title="List view">
              <IconButton
                onClick={() => onViewModeChange("list")}
                sx={{
                  borderRadius: 0,
                  bgcolor: viewMode === "list" ? "primary.main" : "transparent",
                  color:
                    viewMode === "list" ? "primary.contrastText" : "text.primary",
                  "&:hover": {
                    bgcolor:
                      viewMode === "list" ? "primary.dark" : "action.hover",
                  },
                }}
              >
                <ListViewIcon sx={{ width: 20, height: 20 }} />
              </IconButton>
            </Tooltip>
          </Paper>

          <Tooltip title="Settings">
            <IconButton onClick={(e) => setSettingsAnchor(e.currentTarget)}>
              <SettingsIcon />
            </IconButton>
          </Tooltip>

          <Tooltip title={getUserDisplayName(currentUser)}>
            <IconButton onClick={(e) => setUserAnchor(e.currentTarget)}>
              <UserAvatar width={36} username={currentUser.username} />
            </IconButton>
          </Tooltip>
        </Stack>
      </Stack>

      <Menu
        anchorEl={settingsAnchor}
        open={Boolean(settingsAnchor)}
        onClose={() => setSettingsAnchor(null)}
      >
        <MenuItem onClick={() => setSettingsAnchor(null)}>
          <ListItemIcon>
            <SettingsIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Preferences</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => setSettingsAnchor(null)}>
          <ListItemIcon>
            <HelpIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Help & feedback</ListItemText>
        </MenuItem>
      </Menu>

      <Menu
        anchorEl={userAnchor}
        open={Boolean(userAnchor)}
        onClose={() => setUserAnchor(null)}
      >
        <Box sx={{ px: 2, py: 1.5, minWidth: 200 }}>
          <Stack direction="row" spacing={1.5} alignItems="center">
            <UserAvatar width={40} username={currentUser.username} />
            <Box>
              <Typography variant="subtitle2" fontWeight={600}>
                {getUserDisplayName(currentUser)}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                @{currentUser.username}
              </Typography>
            </Box>
          </Stack>
        </Box>
        <Divider />
        <MenuItem onClick={() => setUserAnchor(null)}>Manage account</MenuItem>
        <MenuItem onClick={() => setUserAnchor(null)}>Sign out</MenuItem>
      </Menu>
    </Container>
  );
};

export default Header;

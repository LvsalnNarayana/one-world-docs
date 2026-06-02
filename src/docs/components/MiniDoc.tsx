// External
import { useState } from "react";
import Markdown from "react-markdown";
import { useNavigate } from "react-router";

// MUI
import StarIcon from "@mui/icons-material/Star";
import LockIcon from "@mui/icons-material/Lock";
import ShareIcon from "@mui/icons-material/Share";
import PeopleIcon from "@mui/icons-material/People";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import LaunchOutlinedIcon from "@mui/icons-material/LaunchOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import {
  Box,
  Menu,
  Card,
  Stack,
  Avatar,
  Tooltip,
  MenuItem,
  useTheme,
  IconButton,
  Typography,
  CardContent,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

// Shared
import UserGroup from "../../shared/UserGroup";
import ConfirmDialog from "../../shared/ConfirmDialog";
import { localMockDocRepository } from "../../repository/LocalMockDocRepository";
import type { DocSummary } from "../../types/doc/doc.types";
import { formatRelativeTime, getUserDisplayName } from "../../types/doc/doc.types";

const defaultMarkdown =
  "# Project Proposal\n\n*This document outlines the key objectives and timeline for our upcoming project initiative.*\n\n## Overview\nWe are proposing a comprehensive solution that will streamline our workflow and improve team collaboration.";

interface MiniDocProps {
  doc?: DocSummary;
  viewMode?: "grid" | "list";
  isRecent?: boolean;
  isShared?: boolean;
  isStarred?: boolean;
}

const MiniDoc = ({
  doc,
  isShared = false,
  viewMode = "grid",
  isStarred = false,
}: MiniDocProps) => {
  const navigate = useNavigate();

  const theme = useTheme();

  const [starred, setStarred] = useState(isStarred ?? doc?.isStarred ?? false);
  const [trashOpen, setTrashOpen] = useState(false);

  const isPrivate =
    doc?.permission === "owner" && doc.collaborators.length <= 1;
  const authorName = doc ? getUserDisplayName(doc.author) : "Unknown";
  const lastModifiedLabel = doc
    ? formatRelativeTime(doc.lastModified)
    : "Recently";

  const docData = {
    id: doc?.id ?? "1",
    isPrivate: doc ? isPrivate : !isShared,
    title: doc?.title ?? "Project Proposal",
    lastModified: lastModifiedLabel,
    author: authorName,
    collaborators:
      doc?.collaborators.map((c) => ({
        id: c.id,
        username: c.username,
        firstname: c.firstName,
        lastname: c.lastName,
      })) ?? [],
  };

  const markdown = doc?.previewMarkdown ?? defaultMarkdown;

  const openEditor = () => navigate(`/docs/editor/${docData.id}`);

  const calculateFontSize = (px: number) => {
    const a4Width = 210;

    const a4Height = 297;

    const a4Diagonal = Math.sqrt(a4Width ** 2 + a4Height ** 2);

    const a4FontSize = a4Diagonal / Math.sqrt(2);

    const fontSize = (px * a4FontSize) / a4Diagonal;
    return fontSize;
  };

  const baseSise = {
    fontFamily: theme.typography.fontFamily,
    h1FontSize: calculateFontSize(20) + "px",
    h2FontSize: calculateFontSize(18) + "px",
    h3FontSize: calculateFontSize(16) + "px",
    body1FontSize: calculateFontSize(10) + "px",
  };

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    event.preventDefault();
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleStarToggle = async (event: React.MouseEvent) => {
    event.stopPropagation();
    const next = !starred;
    setStarred(next);
    if (doc) {
      const full = await localMockDocRepository.getById(doc.id);
      if (full) await localMockDocRepository.save({ ...full, isStarred: next });
    }
  };

  const handleDuplicate = async (e: React.MouseEvent) => {
    e.stopPropagation();
    handleClose();
    if (doc) {
      const copy = await localMockDocRepository.duplicate(doc.id);
      if (copy) navigate(`/docs/editor/${copy.id}`);
    }
  };

  const handleTrash = async () => {
    if (doc) await localMockDocRepository.delete(doc.id);
    setTrashOpen(false);
    window.location.reload();
  };

  if (viewMode === "list") {
    return (
      <Card
        sx={{
          width: "100%",
          flexShrink: 0,
          borderRadius: 1,
          cursor: "pointer",
          height: "fit-content",
          transition: "all 0.2s ease",
        }}
        onClick={openEditor}
      >
        <CardContent sx={{ p: 3 }}>
          {/* Increased padding */}
          <Stack direction="row" spacing={3} alignItems="center">
            {" "}
            {/* Increased spacing */}
            {/* Document Preview */}
            <Box
              sx={{
                width: 100, // Increased width
                height: 120, // Increased height
                flexShrink: 0,
                borderRadius: 1,
                overflow: "hidden",
                backgroundColor: theme.palette.common.white,
                border: `1px solid ${theme.palette.divider}`,
              }}
            >
              <Box sx={{ p: 1, height: "100%", overflow: "hidden" }}>
                {" "}
                {/* Increased padding */}
                <Markdown
                  components={{
                    p: ({ node, ...props }) => (
                      <Typography
                        fontSize="8px" // Increased font size
                        lineHeight={1.3}
                        margin={0}
                        mb={0.2}
                        color="text.primary"
                        {...props}
                      />
                    ),
                    em: ({ node, ...props }) => (
                      <Typography
                        fontSize="8px" // Increased font size
                        lineHeight={1.3}
                        margin={0}
                        color="text.primary"
                        component="i"
                        {...props}
                      />
                    ),
                    h2: ({ node, ...props }) => (
                      <Typography
                        fontSize="9px" // Increased font size
                        lineHeight={1.3}
                        margin={0}
                        mb={0.3}
                        color="text.primary"
                        fontWeight={500}
                        {...props}
                      />
                    ),
                    h1: ({ node, ...props }) => (
                      <Typography
                        fontSize="10px" // Increased font size
                        lineHeight={1.3}
                        margin={0}
                        mb={0.5}
                        color="text.primary"
                        fontWeight={600}
                        {...props}
                      />
                    ),
                  }}
                >
                  {markdown}
                </Markdown>
              </Box>
            </Box>
            {/* Document Info */}
            <Stack flex={1} spacing={1.5}>
              {" "}
              {/* Increased spacing */}
              <Typography
                variant="h6"
                fontWeight={600}
                color="text.primary"
                fontSize={16}
              >
                {docData.title}
              </Typography>
              <Typography variant="body1" color="text.primary" fontSize={14}>
                Modified {docData.lastModified} by {docData.author}
              </Typography>
              <Stack direction="row" alignItems="center" spacing={1.5}>
                {" "}
                {/* Increased spacing */}
                {docData.isPrivate ? (
                  <LockIcon sx={{ fontSize: 20, color: "text.primary" }} /> // Increased icon size
                ) : (
                  <PeopleIcon sx={{ fontSize: 20, color: "text.primary" }} /> // Increased icon size
                )}
                <Typography variant="body2" color="text.primary" fontSize={13}>
                  {docData.isPrivate
                    ? "Private"
                    : `${docData.collaborators.length} collaborators`}
                </Typography>
              </Stack>
            </Stack>
            {/* Actions */}
            <Stack direction="row" alignItems="center" spacing={1}>
              {" "}
              {/* Added spacing */}
              <Tooltip
                title={starred ? "Remove from starred" : "Add to starred"}
              >
                <IconButton size="medium" onClick={handleStarToggle}>
                  {" "}
                  {/* Changed to medium */}
                  {starred ? (
                    <StarIcon sx={{ color: "warning.main" }} />
                  ) : (
                    <StarBorderIcon />
                  )}
                </IconButton>
              </Tooltip>
              <IconButton size="medium" onClick={handleClick}>
                {" "}
                {/* Changed to medium */}
                <MoreVertIcon />
              </IconButton>
            </Stack>
          </Stack>
        </CardContent>
      </Card>
    );
  }

  // Grid view
  return (
    <Stack
      sx={{
        width: 250,
        borderRadius: 1,
        cursor: "pointer",
        overflow: "hidden",
        // boxShadow: 1,
        border: "1px solid",
        position: "relative",
        borderColor: "divider",
        aspectRatio: "210 / 297",
        transition: "all 0.2s ease",
      }}
      onClick={openEditor}
    >
      {/* Star Button */}
      <Tooltip title={starred ? "Remove from favourites" : "Add to favourite"}>
        <IconButton
          size="small"
          onClick={handleStarToggle}
          sx={{
            p: 0.5,
            top: 8,
            right: 8,
            zIndex: 2,
            position: "absolute",
            backgroundColor: "transparent",
            "&:hover": {
              backgroundColor: "transparent",
            },
          }}
        >
          {starred ? (
            <StarIcon sx={{ fontSize: 18, color: "warning.main" }} />
          ) : (
            <StarBorderIcon sx={{ fontSize: 18 }} />
          )}
        </IconButton>
      </Tooltip>

      {/* Document Preview */}
      <Box
        sx={{
          width: "100%",
          p: 1.5,
          overflow: "hidden",
          position: "relative",
          height: "calc(100% - 80px)",
          backgroundColor: theme.palette.common.white,
        }}
      >
        <Markdown
          components={{
            p: ({ node, ...props }) => (
              <Typography
                lineHeight={1.4}
                margin={0}
                mb={0.4}
                fontSize={baseSise.body1FontSize}
                color={"#000"}
                variant="body1"
                {...props}
              />
            ),
            em: ({ node, ...props }) => (
              <Typography
                lineHeight={1.4}
                margin={0}
                variant="body1"
                color={"#000"}
                component="i"
                fontSize={baseSise.body1FontSize}
                {...props}
              />
            ),
            h1: ({ node, ...props }) => (
              <Typography
                lineHeight={1.3}
                margin={0}
                mb={0.8}
                fontSize={baseSise.h1FontSize}
                color={"#000"}
                fontWeight={600}
                variant="h1"
                {...props}
              />
            ),
            h2: ({ node, ...props }) => (
              <Typography
                lineHeight={1.3}
                margin={0}
                mb={0.6}
                fontSize={baseSise.h2FontSize}
                color={"#000"}
                fontWeight={500}
                variant="h2"
                {...props}
              />
            ),
          }}
        >
          {markdown}
        </Markdown>
      </Box>

      {/* Document Footer */}
      <Stack
        py={1}
        px={1.5}
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"flex-start"}
        position={"absolute"}
        bottom={0}
        width={"100%"}
        bgcolor={`${theme?.palette?.background?.paper}`}
        sx={{
          minHeight: "80px",
          borderTop: `1px solid ${theme.palette.divider}`,
        }}
      >
        <Stack gap={0.5} flex={1}>
          <Typography
            variant="body1"
            fontSize={14}
            fontWeight={600}
            noWrap
            color="text.primary"
          >
            {docData.title}
          </Typography>
          <Typography fontSize={2} fontWeight={400} color="text.primary" noWrap>
            Modified {docData.lastModified}
          </Typography>

          {/* Collaborators or Privacy Status */}
          <Stack direction="row" alignItems="center" spacing={0.8} mt={0.5}>
            {docData.isPrivate ? (
              <>
                <LockIcon sx={{ fontSize: 14, color: "text.primary" }} />
                <Typography
                  variant="caption"
                  fontSize={11}
                  color="text.primary"
                >
                  Private
                </Typography>
              </>
            ) : (
              <>
                <Stack direction="row" alignItems={"center"} spacing={-0.75}>
                  <UserGroup
                    users={docData.collaborators}
                    size={22}
                    length={3}
                  />
                  {docData.collaborators.length > 3 && (
                    <Avatar
                      sx={{
                        width: 22,
                        height: 22,
                        fontSize: 9,
                        fontWeight: 600,
                        backgroundColor: "text.secondary",
                        border: `1px solid ${theme.palette.background.paper}`,
                      }}
                    >
                      +{docData.collaborators.length - 3}
                    </Avatar>
                  )}
                </Stack>
                <Typography
                  variant="caption"
                  fontSize={12}
                  color="text.primary"
                >
                  {docData.collaborators.length} collaborators
                </Typography>
              </>
            )}
          </Stack>
        </Stack>

        <IconButton
          sx={{
            p: 0.5,
          }}
          onClick={handleClick}
        >
          <MoreVertIcon
            sx={{
              fontSize: 18,
            }}
          />
        </IconButton>
      </Stack>

      {/* Context Menu */}
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        slotProps={{
          list: {
            "aria-labelledby": "basic-button",
          },
        }}
        transformOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <MenuItem
          onClick={async (e) => {
            e.stopPropagation();
            handleClose();
            if (!doc) return;
            const name = window.prompt("Rename document", doc.title);
            if (name?.trim()) {
              const full = await localMockDocRepository.getById(doc.id);
              if (full)
                await localMockDocRepository.save({
                  ...full,
                  title: name.trim(),
                });
              window.location.reload();
            }
          }}
        >
          <ListItemIcon>
            <EditOutlinedIcon fontSize="small" sx={{ fontSize: 16 }} />
          </ListItemIcon>
          <ListItemText>Rename</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleDuplicate}>
          <ListItemIcon>
            <LaunchOutlinedIcon fontSize="small" sx={{ fontSize: 16 }} />
          </ListItemIcon>
          <ListItemText>Make a copy</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <ShareIcon
              fontSize="small"
              sx={{
                fontSize: 16,
              }}
            />
          </ListItemIcon>
          <ListItemText>Share</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <LaunchOutlinedIcon
              fontSize="small"
              sx={{
                fontSize: 16,
              }}
            />
          </ListItemIcon>
          <ListItemText>Open in new tab</ListItemText>
        </MenuItem>
        <MenuItem
          onClick={(e) => {
            e.stopPropagation();
            handleClose();
            setTrashOpen(true);
          }}
          sx={{
            "&:hover": {
              color: "white",
              backgroundColor: "error.main",
            },
          }}
        >
          <ListItemIcon>
            <DeleteOutlineOutlinedIcon fontSize="small" sx={{ fontSize: 16 }} />
          </ListItemIcon>
          <ListItemText>Move to trash</ListItemText>
        </MenuItem>
      </Menu>
      <ConfirmDialog
        open={trashOpen}
        title="Move to trash?"
        message={`"${docData.title}" will be removed from your library.`}
        confirmLabel="Move to trash"
        onConfirm={() => void handleTrash()}
        onCancel={() => setTrashOpen(false)}
      />
    </Stack>
  );
};

export default MiniDoc;

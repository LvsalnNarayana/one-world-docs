// External
import type React from "react";
import type { JSX } from "react";
import { useNavigate, type NavigateFunction } from "react-router";

// MUI
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";
import ModeCommentOutlinedIcon from "@mui/icons-material/ModeCommentOutlined";
import StarIcon from "@mui/icons-material/Star";
import {
  Stack,
  Button,
  Switch,
  useTheme,
  IconButton,
  Typography,
  type Theme,
  FormControlLabel,
} from "@mui/material";

// Shared
import UserGroup from "../../shared/UserGroup";
import UserAvatar from "../../shared/UserAvatar";
import PresenceAvatarRow from "../../collaboration/components/PresenceAvatarRow";

// Parent, Sibling, Index
import DocSettingsMenu from "./DocSettingsMenu";
import ShareDialog from "./ShareDialog";
import { useEditorDoc } from "../context/EditorDocContext";
import { useDocConfig } from "../context/DocsConfigContext";
import { getUserDisplayName } from "../../types/doc/doc.types";
import { useState } from "react";

interface DocToolbarProps {
  onWordCount?: () => void;
  onVersionHistory?: () => void;
}

const DocToolbar: React.ElementType<DocToolbarProps> = ({
  onWordCount,
  onVersionHistory,
}): JSX.Element => {
  const theme: Theme = useTheme();
  const navigate: NavigateFunction = useNavigate();
  const { doc, saveDoc, saveStatus, updateDoc } = useEditorDoc();
  const { updateSetting, settings } = useDocConfig();
  const [shareOpen, setShareOpen] = useState(false);
  const [starred, setStarred] = useState(doc.isStarred);

  const saveLabel =
    saveStatus === "saving"
      ? "Saving…"
      : saveStatus === "saved"
        ? "All changes saved"
        : saveStatus === "error"
          ? "Offline"
          : "";

  const collaborators = doc.collaborators.map((c) => ({
    id: c.id,
    username: c.username,
    firstname: c.firstName,
    lastname: c.lastName,
  }));

  return (
    <>
      <Stack
        minHeight={40}
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        mr={6}
      >
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="flex-start"
          gap={1}
        >
          <IconButton
            sx={{
              p: 1,
              color: theme.palette.text.secondary,
              "&:hover": { color: theme.palette.text.primary },
            }}
            onClick={() => navigate(-1)}
          >
            <ArrowBackOutlinedIcon sx={{ fontSize: 18 }} />
          </IconButton>
          <Typography variant="h4">{doc.title}</Typography>
          <IconButton
            sx={{
              p: 1,
              color: theme.palette.text.secondary,
              "&:hover": { color: theme.palette.text.primary },
            }}
          >
            <EditOutlinedIcon sx={{ fontSize: 18 }} />
          </IconButton>
          <IconButton
            sx={{
              p: 1,
              color: theme.palette.text.secondary,
              "&:hover": { color: theme.palette.text.primary },
            }}
            onClick={async () => {
              const next = !starred;
              setStarred(next);
              updateDoc({ isStarred: next });
              await saveDoc({ isStarred: next });
            }}
          >
            {starred ? (
              <StarIcon sx={{ fontSize: 18, color: "warning.main" }} />
            ) : (
              <StarBorderOutlinedIcon sx={{ fontSize: 18 }} />
            )}
          </IconButton>
          {saveLabel && (
            <Typography variant="caption" color="text.secondary">
              {saveLabel}
            </Typography>
          )}
        </Stack>
        <Stack
          direction="row"
          justifyContent="flex-end"
          alignItems="center"
          gap={2}
        >
          <Stack gap={1} direction="row" alignItems="center">
            <Typography variant="body1">Last edited by:</Typography>
            <UserAvatar
              width={25}
              username={doc.author.username}
            />
            <Typography variant="caption" color="text.secondary">
              {getUserDisplayName(doc.author)}
            </Typography>
          </Stack>
          {settings.layout.showCollaboratorPresence && (
            <Stack gap={1} direction="row" alignItems="center">
              <Typography variant="body1">Active:</Typography>
              <PresenceAvatarRow />
            </Stack>
          )}
          <Stack gap={3} direction="row" alignItems="center">
            <Typography variant="body1">Shared with:</Typography>
            <UserGroup users={collaborators} length={3} size={25} />
          </Stack>
          <FormControlLabel
            label="Autosave:"
            control={<Switch size="small" sx={{ ml: 1 }} defaultChecked />}
            labelPlacement="start"
          />
          <Button
            variant="text"
            startIcon={<ShareOutlinedIcon />}
            onClick={() => setShareOpen(true)}
          >
            Share
          </Button>
          <Button
            variant="text"
            startIcon={<ModeCommentOutlinedIcon />}
            onClick={() =>
              updateSetting(
                { section: "layout", key: "comments" },
                !settings.layout.comments
              )
            }
          >
            Comment
          </Button>
          <DocSettingsMenu
            onWordCount={onWordCount}
            onVersionHistory={onVersionHistory}
          />
        </Stack>
      </Stack>
      <ShareDialog
        open={shareOpen}
        onClose={() => setShareOpen(false)}
        docTitle={doc.title}
      />
    </>
  );
};

export default DocToolbar;

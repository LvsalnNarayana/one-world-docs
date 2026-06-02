import {
  Box,
  Button,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";

import { useRevisions } from "../../collaboration/context/RevisionContext";
import { getUserDisplayName } from "../../types/doc/doc.types";
import { useEditorDoc } from "../context/EditorDocContext";

interface VersionHistoryPanelProps {
  open: boolean;
  onClose: () => void;
  onRestore: (editorStateJson: string) => void;
}

export default function VersionHistoryPanel({
  open,
  onClose,
  onRestore,
}: VersionHistoryPanelProps) {
  const { revisions, previewRevisionById, previewRevision, exitPreview } =
    useRevisions();
  const { readOnly } = useEditorDoc();

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Box sx={{ width: 400, p: 2 }}>
        <Typography variant="h6" gutterBottom>
          Version history
        </Typography>
        {previewRevision && (
          <Stack
            sx={{
              mb: 2,
              p: 1,
              bgcolor: "#fff8e1",
              borderRadius: 1,
            }}
          >
            <Typography variant="body2">
              Previewing a past version (read-only)
            </Typography>
            <Stack direction="row" spacing={1} mt={1}>
              <Button
                size="small"
                variant="contained"
                onClick={() => {
                  onRestore(previewRevision.editorStateJson);
                  exitPreview();
                  onClose();
                }}
              >
                Restore this version
              </Button>
              <Button size="small" onClick={exitPreview}>
                Exit preview
              </Button>
            </Stack>
          </Stack>
        )}
        {revisions.length === 0 ? (
          <Typography variant="body2" color="text.secondary">
            Versions are saved automatically every 5 minutes while you edit.
          </Typography>
        ) : (
          <List>
            {revisions.map((rev) => (
              <ListItemButton
                key={rev.id}
                selected={previewRevision?.id === rev.id}
                onClick={() => previewRevisionById(rev.id)}
              >
                <ListItemText
                  primary={
                    rev.label ??
                    new Date(rev.createdAt).toLocaleString()
                  }
                  secondary={getUserDisplayName(rev.author)}
                />
              </ListItemButton>
            ))}
          </List>
        )}
        {readOnly && (
          <Typography variant="caption" color="text.secondary">
            Editor is in preview mode
          </Typography>
        )}
      </Box>
    </Drawer>
  );
}

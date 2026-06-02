import { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import type { DocPermission } from "../../types/doc/doc.types";

interface ShareDialogProps {
  open: boolean;
  onClose: () => void;
  docTitle: string;
}

export default function ShareDialog({
  open,
  onClose,
  docTitle,
}: ShareDialogProps) {
  const [email, setEmail] = useState("");
  const [permission, setPermission] = useState<DocPermission>("viewer");
  const [linkAccess, setLinkAccess] = useState<"restricted" | "anyone">(
    "restricted"
  );

  const copyLink = () => {
    void navigator.clipboard.writeText(
      `${window.location.origin}/docs/editor/shared-mock-id`
    );
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Share &ldquo;{docTitle}&rdquo;</DialogTitle>
      <DialogContent>
        <Stack spacing={2} sx={{ mt: 1 }}>
          <Typography variant="subtitle2">Add people</Typography>
          <Stack direction="row" spacing={1}>
            <TextField
              size="small"
              fullWidth
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              select
              size="small"
              value={permission}
              onChange={(e) =>
                setPermission(e.target.value as DocPermission)
              }
              sx={{ minWidth: 130 }}
            >
              <MenuItem value="viewer">Viewer</MenuItem>
              <MenuItem value="commenter">Commenter</MenuItem>
              <MenuItem value="editor">Editor</MenuItem>
            </TextField>
          </Stack>
          <Typography variant="subtitle2">Get link</Typography>
          <TextField
            select
            size="small"
            fullWidth
            value={linkAccess}
            onChange={(e) =>
              setLinkAccess(e.target.value as "restricted" | "anyone")
            }
          >
            <MenuItem value="restricted">Restricted</MenuItem>
            <MenuItem value="anyone">Anyone with the link</MenuItem>
          </TextField>
          <Button variant="outlined" onClick={copyLink}>
            Copy link
          </Button>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Done</Button>
      </DialogActions>
    </Dialog>
  );
}

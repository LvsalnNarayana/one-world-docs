import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  Typography,
} from "@mui/material";

import { useWordCountStats } from "../../editor/context/WordCountContext";

interface WordCountDialogProps {
  open: boolean;
  onClose: () => void;
}

export default function WordCountDialog({
  open,
  onClose,
}: WordCountDialogProps) {
  const { stats } = useWordCountStats();

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>Word count</DialogTitle>
      <DialogContent>
        <Stack spacing={1} sx={{ pt: 1 }}>
          <Typography variant="body2">Pages: {stats.pages}</Typography>
          <Typography variant="body2">Words: {stats.words}</Typography>
          <Typography variant="body2">
            Characters: {stats.characters}
          </Typography>
          <Typography variant="body2">
            Characters (no spaces): {stats.charactersNoSpaces}
          </Typography>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}

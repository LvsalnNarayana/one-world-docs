import {
  Box,
  IconButton,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

import { useFindReplace } from "../../editor/context/FindReplaceContext";

export default function FindReplaceBar() {
  const {
    isOpen,
    showReplace,
    query,
    replaceWith,
    matchCount,
    currentMatch,
    setQuery,
    setReplaceWith,
    closeFindBar,
    findNext,
    findPrev,
    replaceOne,
    replaceAll,
  } = useFindReplace();

  if (!isOpen) return null;

  return (
    <Paper
      elevation={4}
      sx={{
        position: "absolute",
        top: 8,
        right: 16,
        zIndex: 1100,
        p: 1.5,
        minWidth: 360,
      }}
    >
      <Stack spacing={1}>
        <Stack direction="row" alignItems="center" spacing={1}>
          <TextField
            size="small"
            placeholder="Find in document"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            sx={{ flex: 1 }}
          />
          <Typography variant="caption" sx={{ minWidth: 48 }}>
            {matchCount > 0 ? `${currentMatch} of ${matchCount}` : "0 of 0"}
          </Typography>
          <IconButton size="small" onClick={findPrev}>
            <KeyboardArrowUpIcon fontSize="small" />
          </IconButton>
          <IconButton size="small" onClick={findNext}>
            <KeyboardArrowDownIcon fontSize="small" />
          </IconButton>
          <IconButton size="small" onClick={closeFindBar}>
            <CloseIcon fontSize="small" />
          </IconButton>
        </Stack>
        {showReplace && (
          <Stack direction="row" spacing={1}>
            <TextField
              size="small"
              placeholder="Replace with"
              value={replaceWith}
              onChange={(e) => setReplaceWith(e.target.value)}
              sx={{ flex: 1 }}
            />
            <Box component="button" onClick={replaceOne} sx={{ fontSize: 12 }}>
              Replace
            </Box>
            <Box component="button" onClick={replaceAll} sx={{ fontSize: 12 }}>
              All
            </Box>
          </Stack>
        )}
      </Stack>
    </Paper>
  );
}

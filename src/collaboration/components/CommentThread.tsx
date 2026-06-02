import {
  Box,
  Button,
  Collapse,
  Stack,
  Typography,
} from "@mui/material";

import UserAvatar from "../../shared/UserAvatar";
import { getUserDisplayName } from "../../types/doc/doc.types";
import type { CommentThread as CommentThreadType } from "../../types/doc/comment.types";
import { useComments } from "../context/CommentContext";
import CommentInput from "./CommentInput";

interface CommentThreadProps {
  thread: CommentThreadType;
}

export default function CommentThread({ thread }: CommentThreadProps) {
  const {
    addReply,
    resolveThread,
    deleteThread,
    activeThreadId,
    setActiveThreadId,
  } = useComments();
  const isActive = activeThreadId === thread.id;

  return (
    <Box
      onClick={() => setActiveThreadId(thread.id)}
      sx={{
        p: 1.5,
        mb: 1,
        borderRadius: 1,
        border: "1px solid",
        borderColor: isActive ? "primary.main" : "divider",
        bgcolor: "background.paper",
        cursor: "pointer",
      }}
    >
      <Typography
        variant="caption"
        component="blockquote"
        sx={{
          display: "block",
          mb: 1,
          fontStyle: "italic",
          bgcolor: "#fef08a",
          color: "#1a1a1a",
          px: 1,
          py: 0.75,
          borderRadius: 0.5,
          borderLeft: "3px solid",
          borderColor: "warning.dark",
        }}
      >
        &ldquo;{thread.anchor.quotedText}&rdquo;
      </Typography>
      {thread.entries.map((entry) => (
        <Stack key={entry.id} direction="row" spacing={1} mb={1}>
          <UserAvatar width={24} username={entry.author.username} />
          <Box flex={1} minWidth={0}>
            <Typography
              variant="caption"
              fontWeight={600}
              color="text.primary"
              display="block"
            >
              {getUserDisplayName(entry.author)}
            </Typography>
            <Typography variant="body2" color="text.primary" sx={{ mt: 0.25 }}>
              {entry.text}
            </Typography>
          </Box>
        </Stack>
      ))}
      <Collapse in={isActive}>
        <CommentInput
          autoFocus
          placeholder="Reply…"
          onSubmit={(text) => addReply(thread.id, text)}
        />
        <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
          <Button
            size="small"
            variant="outlined"
            onClick={(e) => {
              e.stopPropagation();
              resolveThread(thread.id);
            }}
          >
            Resolve
          </Button>
          <Button
            size="small"
            color="error"
            onClick={(e) => {
              e.stopPropagation();
              deleteThread(thread.id);
            }}
          >
            Delete
          </Button>
        </Stack>
      </Collapse>
    </Box>
  );
}

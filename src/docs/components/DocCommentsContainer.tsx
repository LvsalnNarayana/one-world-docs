import type { JSX } from "react";
import {
  Stack,
  Divider,
  useTheme,
  Typography,
  type Theme,
} from "@mui/material";

import CommentThread from "../../collaboration/components/CommentThread";
import { useComments } from "../../collaboration/context/CommentContext";

const DocCommentsContainer = (): JSX.Element => {
  const theme: Theme = useTheme();
  const { threads } = useComments();
  const openThreads = threads.filter((t) => !t.isResolved);
  const resolvedThreads = threads.filter((t) => t.isResolved);

  return (
    <Stack
      spacing={1}
      sx={{
        width: "100%",
        p: 1,
        top: 0,
        flexGrow: 1,
        zIndex: 100,
        maxHeight: "100%",
        position: "sticky",
        borderRadius: theme.shape.radius.xs,
        backgroundColor: theme.palette.background.paper,
      }}
    >
      <Typography variant="h6" textAlign="center" fontSize={14}>
        Comments
      </Typography>
      <Divider />
      <Stack sx={{ overflowY: "auto", maxHeight: "calc(100vh - 220px)" }}>
        {openThreads.length === 0 && resolvedThreads.length === 0 ? (
          <Typography variant="body2" color="text.secondary" px={1} py={2}>
            Select text and use the comment button in the toolbar to add a
            comment.
          </Typography>
        ) : (
          <>
            {openThreads.map((thread) => (
              <CommentThread key={thread.id} thread={thread} />
            ))}
            {resolvedThreads.length > 0 && (
              <>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{ mt: 1, px: 0.5 }}
                >
                  Resolved ({resolvedThreads.length})
                </Typography>
                {resolvedThreads.map((thread) => (
                  <CommentThread key={thread.id} thread={thread} />
                ))}
              </>
            )}
          </>
        )}
      </Stack>
    </Stack>
  );
};

export default DocCommentsContainer;

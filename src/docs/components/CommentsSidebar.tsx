import { Divider, Stack, Typography, useTheme } from "@mui/material";

import CommentThread from "../../collaboration/components/CommentThread";
import { useComments } from "../../collaboration/context/CommentContext";

export default function CommentsSidebar() {
  const theme = useTheme();
  const { threads } = useComments();
  const open = threads.filter((t) => !t.isResolved);
  const resolved = threads.filter((t) => t.isResolved);

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
        borderRadius: theme.shape.radius?.xs ?? 1,
        backgroundColor: theme.palette.background.paper,
      }}
    >
      <Typography variant="h6" textAlign="center" fontSize={14}>
        Comments
      </Typography>
      <Divider />
      <Stack sx={{ overflowY: "auto", maxHeight: "calc(100vh - 200px)" }}>
        {open.map((t) => (
          <CommentThread key={t.id} thread={t} />
        ))}
        {open.length === 0 && (
          <Typography variant="body2" color="text.secondary" px={1}>
            No open comments. Select text and use the comment button to add one.
          </Typography>
        )}
        {resolved.length > 0 && (
          <>
            <Typography variant="caption" color="text.secondary" sx={{ mt: 2 }}>
              Resolved ({resolved.length})
            </Typography>
            {resolved.map((t) => (
              <CommentThread key={t.id} thread={t} />
            ))}
          </>
        )}
      </Stack>
    </Stack>
  );
}

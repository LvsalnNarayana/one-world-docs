import { Box, Typography } from "@mui/material";

import { usePresence } from "../context/PresenceContext";
import { getUserDisplayName } from "../../types/doc/doc.types";

export default function CollaboratorCursor() {
  const { activeUsers } = usePresence();

  return (
    <>
      {activeUsers.map((p) => {
        if (!p.cursorPosition) return null;
        return (
          <Box
            key={p.user.id}
            sx={{
              position: "absolute",
              left: p.cursorPosition.x,
              top: p.cursorPosition.y,
              pointerEvents: "none",
              zIndex: 10,
            }}
          >
            <Typography
              variant="caption"
              sx={{
                bgcolor: p.color,
                color: "#fff",
                px: 0.75,
                py: 0.25,
                borderRadius: 0.5,
                fontSize: 10,
                whiteSpace: "nowrap",
              }}
            >
              {getUserDisplayName(p.user)}
            </Typography>
          </Box>
        );
      })}
    </>
  );
}

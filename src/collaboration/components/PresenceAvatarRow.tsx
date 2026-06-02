import { Stack } from "@mui/material";

import UserAvatar from "../../shared/UserAvatar";
import { usePresence } from "../context/PresenceContext";

export default function PresenceAvatarRow() {
  const { activeUsers } = usePresence();

  return (
    <Stack direction="row" spacing={-0.5} alignItems="center">
      {activeUsers.map((p) => (
        <Stack
          key={p.user.id}
          sx={{
            border: `2px solid ${p.color}`,
            borderRadius: "50%",
            p: "1px",
          }}
        >
          <UserAvatar width={28} username={p.user.username} />
        </Stack>
      ))}
    </Stack>
  );
}

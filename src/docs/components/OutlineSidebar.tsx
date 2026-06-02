import { Divider, Stack, Typography, useTheme } from "@mui/material";

import { useOutline } from "../../editor/context/OutlineContext";

export default function OutlineSidebar() {
  const theme = useTheme();
  const { entries } = useOutline();

  const scrollToHeading = (key: string) => {
    const el = document.querySelector(`[data-lexical-key="${key}"]`);
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

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
        Document outline
      </Typography>
      <Divider />
      {entries.length === 0 ? (
        <Typography variant="body2" color="text.secondary" px={1}>
          Add headings to your document to see them here.
        </Typography>
      ) : (
        <Stack px={1}>
          {entries.map((entry) => (
            <Typography
              key={entry.key}
              variant="body2"
              onClick={() => scrollToHeading(entry.key)}
              sx={{
                pl: (entry.level - 1) * 1.5,
                py: 0.5,
                cursor: "pointer",
                "&:hover": { color: "primary.main" },
              }}
            >
              {entry.text || "(empty heading)"}
            </Typography>
          ))}
        </Stack>
      )}
    </Stack>
  );
}

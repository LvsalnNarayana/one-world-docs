import { Stack, Typography } from "@mui/material";

import type { DocSummary } from "../../types/doc/doc.types";
import MiniDoc from "./MiniDoc";

interface RecentDocsSectionProps {
  docs: DocSummary[];
  viewMode: "grid" | "list";
}

function groupByRecency(docs: DocSummary[]): Record<string, DocSummary[]> {
  const groups: Record<string, DocSummary[]> = {
    Today: [],
    Yesterday: [],
    "Last 7 days": [],
    Earlier: [],
  };
  const now = Date.now();
  for (const doc of docs) {
    const t = new Date(doc.lastOpenedAt || doc.lastModified).getTime();
    const diffDays = Math.floor((now - t) / (1000 * 60 * 60 * 24));
    if (diffDays <= 0) groups.Today.push(doc);
    else if (diffDays === 1) groups.Yesterday.push(doc);
    else if (diffDays < 7) groups["Last 7 days"].push(doc);
    else groups.Earlier.push(doc);
  }
  return groups;
}

export default function RecentDocsSection({
  docs,
  viewMode,
}: RecentDocsSectionProps) {
  const groups = groupByRecency(docs);

  return (
    <Stack spacing={3}>
      {Object.entries(groups).map(([label, items]) => {
        if (!items.length) return null;
        return (
          <Stack key={label} spacing={1.5}>
            <Typography variant="subtitle1" fontWeight={600}>
              {label}
            </Typography>
            <Stack
              display="grid"
              sx={{
                gridTemplateColumns:
                  viewMode === "grid"
                    ? "repeat(auto-fill, minmax(250px, 1fr))"
                    : "1fr",
                gap: 3,
              }}
            >
              {items.map((doc) => (
                <MiniDoc
                  key={doc.id}
                  doc={doc}
                  viewMode={viewMode}
                  isStarred={doc.isStarred}
                />
              ))}
            </Stack>
          </Stack>
        );
      })}
      {docs.length === 0 && (
        <Typography color="text.secondary">No documents found.</Typography>
      )}
    </Stack>
  );
}

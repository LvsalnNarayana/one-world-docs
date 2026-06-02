import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import {
  Chip,
  Container,
  Divider,
  Fab,
  Menu,
  MenuItem,
  Stack,
} from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";

import Header from "../../docs/components/Header";
import MiniDoc from "../../docs/components/MiniDoc";
import { localMockDocRepository } from "../../repository/LocalMockDocRepository";
import type { DocSummary } from "../../types/doc/doc.types";
import { formatRelativeTime } from "../../types/doc/doc.types";

const DocList = () => {
  const navigate = useNavigate();
  const [docs, setDocs] = useState<DocSummary[]>([]);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortAnchor, setSortAnchor] = useState<null | HTMLElement>(null);
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [selectedSort, setSelectedSort] = useState("recent");

  const filters = [
    { count: docs.length, key: "all", label: "All Documents" },
    {
      count: docs.filter((d) => {
        const t = new Date(d.lastOpenedAt).getTime();
        return Date.now() - t < 48 * 60 * 60 * 1000;
      }).length,
      key: "recent",
      label: "Recent",
    },
    {
      count: docs.filter((d) => d.collaborators.length > 1).length,
      key: "shared",
      label: "Shared with me",
    },
    {
      count: docs.filter((d) => d.isStarred).length,
      key: "starred",
      label: "Starred",
    },
  ];

  const sortOptions = [
    { key: "recent", label: "Last modified" },
    { key: "name", label: "Name" },
    { key: "created", label: "Created date" },
  ];

  const [searchQuery, setSearchQuery] = useState("");

  const loadDocs = useCallback(async () => {
    const list = searchQuery.trim()
      ? await localMockDocRepository.search(searchQuery)
      : await localMockDocRepository.list();
    setDocs(list);
  }, [searchQuery]);

  useEffect(() => {
    const t = setTimeout(() => void loadDocs(), 300);
    return () => clearTimeout(t);
  }, [loadDocs]);

  const filtered = docs.filter((doc) => {
    if (selectedFilter === "starred") return doc.isStarred;
    if (selectedFilter === "shared") return doc.collaborators.length > 1;
    if (selectedFilter === "recent") {
      const t = new Date(doc.lastOpenedAt).getTime();
      return Date.now() - t < 48 * 60 * 60 * 1000;
    }
    return true;
  });

  const sorted = [...filtered].sort((a, b) => {
    if (selectedSort === "name") return a.title.localeCompare(b.title);
    return (
      new Date(b.lastModified).getTime() - new Date(a.lastModified).getTime()
    );
  });

  const createDoc = async () => {
    const doc = await localMockDocRepository.createBlank();
    navigate(`/docs/editor/${doc.id}`);
  };

  return (
    <>
      <Header
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onSortClick={(el) => setSortAnchor(el)}
      />
      <Divider sx={{ mb: 1 }} />
      <Container maxWidth="lg" sx={{ width: "100%", px: 1, py: 1, height: "100%" }}>
        <Stack
          flexShrink={0}
          direction="row"
          spacing={1}
          mb={2}
          sx={{ pb: 1, overflowX: "auto" }}
        >
          {filters.map((filter) => (
            <Chip
              key={filter.key}
              label={`${filter.label} (${filter.count})`}
              variant={selectedFilter === filter.key ? "filled" : "outlined"}
              color={selectedFilter === filter.key ? "primary" : "default"}
              onClick={() => setSelectedFilter(filter.key)}
              size="small"
            />
          ))}
        </Stack>

        <Divider sx={{ mb: 2 }} />

        <Stack flex={1} sx={{ overflowY: "auto" }}>
          <Stack
            display="grid"
            flexShrink={0}
            sx={{
              gridTemplateColumns:
                viewMode === "grid"
                  ? "repeat(auto-fill, minmax(250px, 1fr))"
                  : "1fr",
              gap: 4,
              overflowX: "hidden",
              height: "fit-content",
            }}
          >
            {sorted.map((doc) => (
              <MiniDoc
                key={doc.id}
                doc={doc}
                viewMode={viewMode}
                isRecent={formatRelativeTime(doc.lastModified).includes("hour")}
                isShared={doc.collaborators.length > 1}
                isStarred={doc.isStarred}
              />
            ))}
          </Stack>
        </Stack>

        <Menu
          anchorEl={sortAnchor}
          open={Boolean(sortAnchor)}
          onClose={() => setSortAnchor(null)}
        >
          {sortOptions.map((option) => (
            <MenuItem
              key={option.key}
              selected={selectedSort === option.key}
              onClick={() => {
                setSelectedSort(option.key);
                setSortAnchor(null);
              }}
            >
              {option.label}
            </MenuItem>
          ))}
        </Menu>

        <Fab
          color="primary"
          sx={{ right: 24, bottom: 24, position: "fixed" }}
          onClick={() => void createDoc()}
        >
          <AddIcon />
        </Fab>
      </Container>
    </>
  );
};

export default DocList;

import { useState } from "react";
import { Stack, Divider, useTheme, Typography, type Theme } from "@mui/material";

import { useOutline } from "../../editor/context/OutlineContext";

const TableOfContents = () => {
  const theme: Theme = useTheme();
  const { entries } = useOutline();
  const [activeIndex, setActiveIndex] = useState(0);

  const titles =
    entries.length > 0
      ? entries.map((e) => ({ title: e.text || "(empty)", key: e.key, level: e.level }))
      : [];

  const scrollTo = (key: string, index: number) => {
    setActiveIndex(index);
    document
      .querySelector(`[data-lexical-key="${key}"]`)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
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
        borderRadius: theme.shape.radius.xs,
        backgroundColor: theme.palette.background.paper,
      }}
    >
      <Typography variant="h6" textAlign="center">
        Table of Contents
      </Typography>
      <Divider />
      {titles.length === 0 ? (
        <Typography variant="body2" color="text.secondary" px={2}>
          Add headings to your document to see them here.
        </Typography>
      ) : (
        <Stack px={3} sx={{ position: "relative" }}>
          <Stack
            height="100%"
            width="2px"
            bgcolor={`${theme.palette.primary.light}60`}
            sx={{
              top: 0,
              left: 0,
              position: "absolute",
              borderRadius: theme.shape.radius.xs,
            }}
          >
            <Stack
              width="100%"
              height={32}
              bgcolor={theme.palette.primary.main}
              sx={{
                left: 0,
                position: "absolute",
                transition: "top 0.3s ease",
                top: `${activeIndex * 32}px`,
                borderRadius: theme.shape.radius.xs,
              }}
            />
          </Stack>
          {titles.map((item, index) => (
            <Stack key={item.key} height={32} width="100%" justifyContent="center">
              <Typography
                variant="body1"
                onClick={() => scrollTo(item.key, index)}
                sx={{
                  zIndex: 1,
                  fontSize: 14,
                  pl: (item.level - 1) * 1,
                  cursor: "pointer",
                  fontWeight: activeIndex === index ? 600 : 400,
                  color:
                    activeIndex === index
                      ? theme.palette.primary.main
                      : theme.palette.text.primary,
                }}
              >
                {item.title}
              </Typography>
            </Stack>
          ))}
        </Stack>
      )}
    </Stack>
  );
};

export default TableOfContents;

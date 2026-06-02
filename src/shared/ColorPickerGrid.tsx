import { Box, Button, Stack } from "@mui/material";

const SWATCHES = [
  "#000000", "#434343", "#666666", "#999999", "#b7b7b7", "#cccccc", "#d9d9d9", "#efefef", "#f3f3f3", "#ffffff",
  "#980000", "#ff0000", "#ff9900", "#ffff00", "#00ff00", "#00ffff", "#4a86e8", "#0000ff", "#9900ff", "#ff00ff",
  "#e6b8af", "#f4cccc", "#fce5cd", "#fff2cc", "#d9ead3", "#d0e0e3", "#c9daf8", "#cfe2f3", "#d9d2e9", "#ead1dc",
  "#dd7e6b", "#ea9999", "#f9cb9c", "#ffe599", "#b6d7a8", "#a2c4c9", "#a4c2f4", "#9fc5e8", "#b4a7d6", "#d5a6bd",
];

interface ColorPickerGridProps {
  onSelect: (color: string) => void;
}

export default function ColorPickerGrid({ onSelect }: ColorPickerGridProps) {
  return (
    <Stack spacing={1} sx={{ p: 1, maxWidth: 220 }}>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(10, 1fr)",
          gap: 0.5,
        }}
      >
        {SWATCHES.map((color) => (
          <Box
            key={color}
            onClick={() => onSelect(color)}
            sx={{
              width: 18,
              height: 18,
              bgcolor: color,
              border: "1px solid",
              borderColor: "divider",
              cursor: "pointer",
              borderRadius: 0.5,
            }}
          />
        ))}
      </Box>
      <Button
        size="small"
        onClick={() => {
          const c = window.prompt("Custom color (CSS)", "#000000");
          if (c) onSelect(c);
        }}
      >
        Custom
      </Button>
    </Stack>
  );
}

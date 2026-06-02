import { useState } from "react";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import RemoveOutlinedIcon from "@mui/icons-material/RemoveOutlined";
import { Stack, useTheme, IconButton, Typography } from "@mui/material";

import { useLexicalToolbarContext } from "../../../editor/context/LexicalToolbarContext";

const FontSizer = () => {
  const theme = useTheme();
  const { applyFontSize } = useLexicalToolbarContext();
  const [size, setSize] = useState(15);

  const changeSize = (delta: number) => {
    const next = Math.min(72, Math.max(8, size + delta));
    setSize(next);
    applyFontSize(next);
  };

  return (
    <Stack
      direction="row"
      flexWrap="wrap"
      justifyContent="center"
      alignItems="center"
      spacing={0.75}
    >
      <IconButton
        onClick={() => changeSize(-1)}
        sx={{
          p: 0.5,
          color: theme?.palette?.text?.secondary,
          "&:hover": { color: theme?.palette?.text?.primary },
        }}
      >
        <RemoveOutlinedIcon sx={{ fontSize: 18 }} />
      </IconButton>
      <Typography
        fontSize={15}
        sx={{
          px: 1,
          py: 0.4,
          borderRadius: 1,
          border: `1px solid ${theme.palette.divider}`,
        }}
      >
        {size}
      </Typography>
      <IconButton
        onClick={() => changeSize(1)}
        sx={{
          p: 0.5,
          color: theme?.palette?.text?.secondary,
          "&:hover": { color: theme?.palette?.text?.primary },
        }}
      >
        <AddOutlinedIcon sx={{ fontSize: 18 }} />
      </IconButton>
    </Stack>
  );
};

export default FontSizer;

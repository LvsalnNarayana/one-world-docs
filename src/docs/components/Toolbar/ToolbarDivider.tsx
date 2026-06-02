import { Divider } from "@mui/material";

export default function ToolbarDivider() {
  return (
    <Divider
      orientation="vertical"
      flexItem
      sx={{ mx: 0.25, my: 0.5, height: 20, alignSelf: "center" }}
    />
  );
}

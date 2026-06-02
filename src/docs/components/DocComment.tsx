// External
import type { JSX } from "react";


// MUI
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import {
  Stack,
  useTheme,
  IconButton,
  Typography,
  type Theme,
} from "@mui/material";


// Shared
import UserAvatar from "../../shared/UserAvatar";

const DocComment = (): JSX.Element => {
  const theme: Theme = useTheme();
  return (
    <Stack
      sx={{
        p: 2,
        boxShadow: theme.shadows[1],
        borderRadius: theme.shape.radius.xs,
        backgroundColor: theme.palette.background.default,
      }}
      width={"100%"}
      spacing={1}
    >
      <Stack
        justifyContent={"space-between"}
        alignItems={"center"}
        direction={"row"}
      >
        <Stack
          justifyContent={"flex-start"}
          alignItems={"center"}
          direction={"row"}
          gap={2}
        >
          <UserAvatar username="chijcdjcd" width={28} />
          <Stack>
            <Typography fontWeight={600} variant="body1" fontSize={14}>
              chijcdjcd
            </Typography>
            <Typography fontWeight={400} variant="body1" fontSize={11}>
              12:39&nbsp;PM Today
            </Typography>
          </Stack>
        </Stack>
        <Stack
          justifyContent={"center"}
          alignItems={"center"}
          direction={"row"}
          gap={1}
        >
          <IconButton sx={{ p: 0.5 }}>
            <CheckOutlinedIcon
              sx={{
                fontSize: 18,
              }}
            />
          </IconButton>
          <IconButton sx={{ p: 0.5 }}>
            <MoreVertOutlinedIcon
              sx={{
                fontSize: 18,
              }}
            />
          </IconButton>
        </Stack>
      </Stack>
      <Stack>
        <Typography fontWeight={400} variant="body1" fontSize={14}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
        </Typography>
      </Stack>
      <Stack></Stack>
    </Stack>
  );
};

export default DocComment;

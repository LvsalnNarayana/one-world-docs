import { useState, type JSX } from "react";
import {
  Box,
  Container,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";

import UserAvatar from "../../shared/UserAvatar";
import { useAuth } from "../context/AuthContext";

interface GoogleDocsHeaderProps {
  searchQuery?: string;
  onSearchChange?: (q: string) => void;
  showSearch?: boolean;
}

export default function GoogleDocsHeader({
  searchQuery = "",
  onSearchChange,
  showSearch = true,
}: GoogleDocsHeaderProps): JSX.Element {
  const { currentUser } = useAuth();
  const [localQuery, setLocalQuery] = useState(searchQuery);

  const q = onSearchChange ? searchQuery : localQuery;
  const setQ = onSearchChange ?? setLocalQuery;

  return (
    <Container maxWidth="xl">
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        py={2}
        gap={2}
      >
        <Stack direction="row" alignItems="center" gap={1}>
          <Box
            component="img"
            src="/images/planet-earth.png"
            alt=""
            sx={{ width: 32, height: 32 }}
          />
          <Typography variant="h5" fontWeight={600} color="primary.main">
            One World Docs
          </Typography>
        </Stack>

        {showSearch && (
          <TextField
            size="small"
            placeholder="Search documents"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            sx={{ width: { xs: "100%", sm: 480 }, maxWidth: 480 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon color="action" />
                </InputAdornment>
              ),
            }}
          />
        )}

        <Stack direction="row" alignItems="center" gap={1}>
          <IconButton size="small">
            <SettingsOutlinedIcon />
          </IconButton>
          <UserAvatar width={36} username={currentUser.username} />
        </Stack>
      </Stack>
    </Container>
  );
}

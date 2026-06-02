// External
import React, { type JSX } from "react";


// MUI
import { Stack, useTheme } from "@mui/material";


// Parent, Sibling, Index
import UserAvatar from "./UserAvatar";
import CustomTooltip from "./CustomTooltip";

interface UserGroupProps {
  sx?: object;
  users: any[];
  length: number;
  size: number;
  props?: Record<string, unknown>;
}
interface User {
  id: string;
  username: string;
  firstname: string;
  lastname: string;
}

const UserGroup: React.ElementType<UserGroupProps> = ({
  sx,
  users,
  length,
  size = 32,
}: UserGroupProps): JSX.Element => {
  const theme = useTheme();
  return (
    <Stack
      pl={1}
      direction="row"
      justifyContent="flex-start"
      alignItems="center"
      sx={{ position: "relative", ...sx }}
    >
      {users.slice(0, length).map((user: User, index: number) => {
        return (
          <CustomTooltip
            key={index}
            margin={10}
            padding={4}
            position="bottom"
            title={`${user?.firstname} ${user?.lastname}`}
          >
            <div
              style={{
                marginLeft: -10,
                borderRadius: "100%",
                zIndex: `${users.length + 100 - index}`,
                border: `2px solid ${theme?.palette?.background?.paper}`,
              }}
            >
              <UserAvatar username={user?.username} width={size} />
            </div>
          </CustomTooltip>
        );
      })}
    </Stack>
  );
};

export default UserGroup;

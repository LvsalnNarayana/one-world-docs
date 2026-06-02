const ADMIN = "admin" as const;
const USER = "user" as const;

export type UserRole = typeof ADMIN | typeof USER;

export const USER_ROLES_OPTIONS = [
  {
    value: ADMIN,
    label: "Admin",
  },
  {
    value: USER,
    label: "User",
  },
];

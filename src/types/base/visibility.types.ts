const Friends = "friends" as const;
const Public = "public" as const;
const OnlyMe = "only_me" as const;


export type Visibility = typeof Friends | typeof Public | typeof OnlyMe;

export const VISIBILITY_OPTIONS : Array<{ label: string; value: Visibility }> = [
  { label: "Public", value: "public" as const },
  { label: "Friends", value: "friends" as const },
  { label: "only Me", value: "only_me" as const },
];


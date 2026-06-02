const Male = "male" as const;
const Female = "female" as const;
const Other = "other" as const;

export type Gender = typeof Male | typeof Female | typeof Other;

export const GENDER_OPTIONS = [
  { label: "Male", value: "male" as const },
  { label: "Female", value: "female" as const },
  { label: "Other", value: "other" as const },
];

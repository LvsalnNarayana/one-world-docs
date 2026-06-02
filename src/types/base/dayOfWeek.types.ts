export const Sunday = "SUNDAY" as const;
export const Monday = "MONDAY" as const;
const Tuesday = "TUESDAY" as const;
const Wednesday = "WEDNESDAY" as const;
const Thursday = "THURSDAY" as const;
const Friday = "FRIDAY" as const;
const Saturday = "SATURDAY" as const;

export type DayOfWeek =
  | typeof Sunday
  | typeof Monday
  | typeof Tuesday
  | typeof Wednesday
  | typeof Thursday
  | typeof Friday
  | typeof Saturday;

export const DAY_OF_WEEK_OPTIONS: { label: string; value: DayOfWeek }[] = [
  {
    value: Sunday,
    label: "Sunday",
  },
  {
    value: Monday,
    label: "Monday",
  },
  {
    value: Tuesday,
    label: "Tuesday",
  },
  {
    value: Wednesday,
    label: "Wednesday",
  },
  {
    value: Thursday,
    label: "Thursday",
  },
  {
    value: Friday,
    label: "Friday",
  },
  {
    value: Saturday,
    label: "Saturday",
  },
];

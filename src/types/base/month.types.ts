const January = "JANUARY" as const;
const February = "FEBRUARY" as const;
const March = "MARCH" as const;
const April = "APRIL" as const;
const May = "MAY" as const;
const June = "JUNE" as const;
const July = "JULY" as const;
const August = "AUGUST" as const;
const September = "SEPTEMBER" as const;
const October = "OCTOBER" as const;
const November = "NOVEMBER" as const;
const December = "DECEMBER" as const;

export type Month =
  | typeof January
  | typeof February
  | typeof March
  | typeof April
  | typeof May
  | typeof June
  | typeof July
  | typeof August
  | typeof September
  | typeof October
  | typeof November
  | typeof December;

export const MONTH_OPTIONS: { label: string; value: Month }[] = [
  {
    value: January,
    label: "January",
  },
  {
    value: February,
    label: "February",
  },
  {
    value: March,
    label: "March",
  },
  {
    value: April,
    label: "April",
  },
  {
    value: May,
    label: "May",
  },
  {
    value: June,
    label: "June",
  },
  {
    value: July,
    label: "July",
  },
  {
    value: August,
    label: "August",
  },
  {
    value: September,
    label: "September",
  },
  {
    value: October,
    label: "October",
  },
  {
    value: November,
    label: "November",
  },
  {
    value: December,
    label: "December",
  },
];

// Enhanced Timezone interface
export interface TimezoneOptions {
  label: string;
  value: string; // Fixed: was recursive Timezone type
  offset: string; // e.g., "+05:30", "-08:00"
  abbreviation: string; // e.g., "IST", "PST"
  region: string; // e.g., "Asia/Kolkata", "America/Los_Angeles"
}

const India = "Asia/Kolkata" as const;
const America = "America/New_York" as const;
const UK = "Europe/London" as const;
const Germany = "Europe/Berlin" as const;
const France = "Europe/Paris" as const;
const Japan = "Asia/Tokyo" as const;
const China = "Asia/Shanghai" as const;
const Australia = "Australia/Sydney" as const;
const Canada = "America/Toronto" as const;
const Brazil = "America/Sao_Paulo" as const;
const Russia = "Europe/Moscow" as const;
const SouthAfrica = "Africa/Johannesburg" as const;
const UAE = "Asia/Dubai" as const;
const Singapore = "Asia/Singapore" as const;
const SouthKorea = "Asia/Seoul" as const;
const Mexico = "America/Mexico_City" as const;
const Argentina = "America/Argentina/Buenos_Aires" as const;
const Chile = "America/Santiago" as const;
const Egypt = "Africa/Cairo" as const;
const Turkey = "Europe/Istanbul" as const;
const Thailand = "Asia/Bangkok" as const;
const Indonesia = "Asia/Jakarta" as const;
const Philippines = "Asia/Manila" as const;
const Vietnam = "Asia/Ho_Chi_Minh" as const;
const NewZealand = "Pacific/Auckland" as const;
const Hawaii = "Pacific/Honolulu" as const;
const Alaska = "America/Anchorage" as const;
const California = "America/Los_Angeles" as const;
const Denver = "America/Denver" as const;
const Chicago = "America/Chicago" as const;

export type Timezone =
  | typeof India
  | typeof America
  | typeof UK
  | typeof Germany
  | typeof France
  | typeof Japan
  | typeof China
  | typeof Australia
  | typeof Canada
  | typeof Brazil
  | typeof Russia
  | typeof SouthAfrica
  | typeof UAE
  | typeof Singapore
  | typeof SouthKorea
  | typeof Mexico
  | typeof Argentina
  | typeof Chile
  | typeof Egypt
  | typeof Turkey
  | typeof Thailand
  | typeof Indonesia
  | typeof Philippines
  | typeof Vietnam
  | typeof NewZealand
  | typeof Hawaii
  | typeof Alaska
  | typeof California
  | typeof Denver
  | typeof Chicago;

export const TIMEZONES_LIST: {
  label: string;
  value: Timezone;
}[] = [
  { label: "India", value: "Asia/Kolkata" },
  { label: "America", value: "America/New_York" },
  { label: "UK", value: "Europe/London" },
  { label: "Germany", value: "Europe/Berlin" },
  { label: "France", value: "Europe/Paris" },
  { label: "Japan", value: "Asia/Tokyo" },
  { label: "China", value: "Asia/Shanghai" },
  { label: "Australia", value: "Australia/Sydney" },
  { label: "Canada", value: "America/Toronto" },
  { label: "Brazil", value: "America/Sao_Paulo" },
  { label: "Russia", value: "Europe/Moscow" },
  { label: "South Africa", value: "Africa/Johannesburg" },
  { label: "UAE", value: "Asia/Dubai" },
  { label: "Singapore", value: "Asia/Singapore" },
  { value: "Asia/Seoul", label: "South Korea" },
  { label: "Mexico", value: "America/Mexico_City" },
  { label: "Argentina", value: "America/Argentina/Buenos_Aires" },
  { label: "Chile", value: "America/Santiago" },
  { label: "Egypt", value: "Africa/Cairo" },
  { label: "Turkey", value: "Europe/Istanbul" },
  { label: "Thailand", value: "Asia/Bangkok" },
  { label: "Indonesia", value: "Asia/Jakarta" },
  { label: "Philippines", value: "Asia/Manila" },
  { label: "Vietnam", value: "Asia/Ho_Chi_Minh" },
  { label: "New Zealand", value: "Pacific/Auckland" },
  { label: "Hawaii", value: "Pacific/Honolulu" },
  { label: "Alaska", value: "America/Anchorage" },
  { label: "California", value: "America/Los_Angeles" },
  { label: "Denver", value: "America/Denver" },
  { label: "Chicago", value: "America/Chicago" },
];

// Utility functions for timezone operations
export const getTimezoneOffset = (timezone: string): string => {
  const offsetMap: Record<Timezone, string> = {
    "Asia/Tokyo": "+09:00",
    "Asia/Dubai": "+04:00",
    "Asia/Seoul": "+09:00",
    "Asia/Manila": "+08:00",
    "Asia/Kolkata": "+05:30",
    "Europe/Paris": "+01:00",
    "Africa/Cairo": "+02:00",
    "Asia/Bangkok": "+07:00",
    "Asia/Jakarta": "+07:00",
    "Europe/London": "+00:00",
    "Europe/Berlin": "+01:00",
    "Asia/Shanghai": "+08:00",
    "Europe/Moscow": "+03:00",
    "Asia/Singapore": "+08:00",
    "America/Denver": "-07:00",
    "America/Toronto": "-05:00",
    "Europe/Istanbul": "+03:00",
    "America/Chicago": "-06:00",
    "America/New_York": "-05:00",
    "Australia/Sydney": "+10:00",
    "America/Santiago": "-04:00",
    "Asia/Ho_Chi_Minh": "+07:00",
    "Pacific/Auckland": "+12:00",
    "Pacific/Honolulu": "-10:00",
    "America/Sao_Paulo": "-03:00",
    "America/Anchorage": "-09:00",
    "Africa/Johannesburg": "+02:00",
    "America/Mexico_City": "-06:00",
    "America/Los_Angeles": "-08:00",
    "America/Argentina/Buenos_Aires": "-03:00",
  };
  return offsetMap[timezone as Timezone] || "+00:00";
};

export const getTimezoneAbbreviation = (timezone: string): string => {
  const abbreviationMap: Record<Timezone, string> = {
    "Asia/Tokyo": "JST",
    "Asia/Dubai": "GST",
    "Asia/Seoul": "KST",
    "Asia/Manila": "PHT",
    "Asia/Kolkata": "IST",
    "Europe/Paris": "CET",
    "Africa/Cairo": "EET",
    "Asia/Bangkok": "ICT",
    "Asia/Jakarta": "WIB",
    "Europe/London": "GMT",
    "Europe/Berlin": "CET",
    "Asia/Shanghai": "CST",
    "Europe/Moscow": "MSK",
    "Asia/Singapore": "SGT",
    "America/Denver": "MST",
    "America/Toronto": "EST",
    "Europe/Istanbul": "TRT",
    "America/Chicago": "CST",
    "America/New_York": "EST",
    "America/Santiago": "CLT",
    "Asia/Ho_Chi_Minh": "ICT",
    "Pacific/Honolulu": "HST",
    "Australia/Sydney": "AEST",
    "America/Sao_Paulo": "BRT",
    "Pacific/Auckland": "NZST",
    "America/Anchorage": "AKST",
    "America/Mexico_City": "CST",
    "America/Los_Angeles": "PST",
    "Africa/Johannesburg": "SAST",
    "America/Argentina/Buenos_Aires": "ART",
  };
  return abbreviationMap[timezone as Timezone] || "UTC";
};

export const getTimezoneRegion = (timezone: string): string => {
  return timezone;
};

export const TIMEZONE_OPTIONS: TimezoneOptions[] = TIMEZONES_LIST.map(
  (timezone) => ({
    ...timezone,
    offset: getTimezoneOffset(timezone.value),
    region: getTimezoneRegion(timezone.value),
    abbreviation: getTimezoneAbbreviation(timezone.value),
  })
);

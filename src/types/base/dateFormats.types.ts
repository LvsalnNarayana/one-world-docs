// ISO Standard Formats
export const ISO_DATE_FORMAT = "YYYY-MM-DD" as const;
export const ISO_DATE_TIME_FORMAT = "YYYY-MM-DD HH:mm:ss" as const;
export const ISO_TIME_FORMAT = "HH:mm:ss" as const;
export const ISO_DATE_TIME_TZ_FORMAT = "YYYY-MM-DD HH:mm:ss Z" as const;

// Common Date Formats
export const US_DATE_FORMAT = "MM/DD/YYYY" as const;
export const EU_DATE_FORMAT = "DD/MM/YYYY" as const;
export const UK_DATE_FORMAT = "DD/MM/YYYY" as const;
export const CANADIAN_DATE_FORMAT = "DD/MM/YYYY" as const;
export const JAPANESE_DATE_FORMAT = "YYYY/MM/DD" as const;
export const GERMAN_DATE_FORMAT = "DD.MM.YYYY" as const;

// Display Formats
export const FULL_DATE_FORMAT = "dddd, MMMM Do, YYYY" as const;
export const LONG_DATE_FORMAT = "MMMM Do, YYYY" as const;
export const MEDIUM_DATE_FORMAT = "MMM DD, YYYY" as const;
export const SHORT_DATE_FORMAT = "MM/DD/YY" as const;
export const COMPACT_DATE_FORMAT = "M/D/YY" as const;

// Time Formats
export const TIME_12_FORMAT = "h:mm A" as const;
export const TIME_24_FORMAT = "HH:mm" as const;
export const TIME_12_SECONDS_FORMAT = "h:mm:ss A" as const;
export const TIME_24_SECONDS_FORMAT = "HH:mm:ss" as const;

// DateTime Combinations
export const DATETIME_12_FORMAT = "MM/DD/YYYY h:mm A" as const;
export const DATETIME_24_FORMAT = "MM/DD/YYYY HH:mm" as const;
export const FULL_DATETIME_FORMAT = "dddd, MMMM Do, YYYY [at] h:mm A" as const;
export const LONG_DATETIME_FORMAT = "MMMM Do, YYYY [at] h:mm A" as const;
export const MEDIUM_DATETIME_FORMAT = "MMM DD, YYYY h:mm A" as const;
export const SHORT_DATETIME_FORMAT = "MM/DD/YY h:mm A" as const;

// Calendar Specific Formats
export const CALENDAR_HEADER_FORMAT = "MMMM YYYY" as const;
export const CALENDAR_DAY_FORMAT = "D" as const;
export const CALENDAR_WEEK_FORMAT = "ddd" as const;
export const CALENDAR_MONTH_FORMAT = "MMM" as const;
export const CALENDAR_YEAR_FORMAT = "YYYY" as const;
export const CALENDAR_TODAY_FORMAT = "dddd, MMM Do" as const;

// Event Specific Formats
export const EVENT_DATE_FORMAT = "ddd, MMM DD" as const;
export const EVENT_TIME_FORMAT = "h:mm A" as const;
export const EVENT_DATETIME_FORMAT = "ddd, MMM DD [at] h:mm A" as const;
export const EVENT_DURATION_FORMAT = "h:mm A - h:mm A" as const;
export const EVENT_FULL_FORMAT =
  "dddd, MMMM Do, YYYY [from] h:mm A [to] h:mm A" as const;
export const EVENT_REMINDER_FORMAT = "MMM DD [at] h:mm A" as const;

// Social Media Formats
export const SOCIAL_RELATIVE_FORMAT = "relative" as const; // "2 hours ago", "yesterday"
export const SOCIAL_SHORT_FORMAT = "MMM DD" as const;
export const SOCIAL_TIMESTAMP_FORMAT = "h:mm A · MMM DD, YYYY" as const;
export const SOCIAL_POST_FORMAT = "MMM DD, YYYY" as const;
export const SOCIAL_COMMENT_FORMAT = "h:mm A" as const;

// Notification Formats
export const NOTIFICATION_TIME_FORMAT = "h:mm A" as const;
export const NOTIFICATION_DATE_FORMAT = "MMM DD" as const;
export const NOTIFICATION_DATETIME_FORMAT = "MMM DD [at] h:mm A" as const;
export const NOTIFICATION_RELATIVE_FORMAT = "relative" as const;

// Input Formats
export const INPUT_DATE_FORMAT = "YYYY-MM-DD" as const;
export const INPUT_TIME_FORMAT = "HH:mm" as const;
export const INPUT_DATETIME_FORMAT = "YYYY-MM-DDTHH:mm" as const;

// Export Formats
export const EXPORT_CSV_FORMAT = "YYYY-MM-DD HH:mm:ss" as const;
export const EXPORT_JSON_FORMAT = "YYYY-MM-DDTHH:mm:ss.SSSZ" as const;
export const EXPORT_XML_FORMAT = "YYYY-MM-DDTHH:mm:ssZ" as const;

// Regional Format Types
export type RegionalDateFormat =
  | typeof US_DATE_FORMAT
  | typeof EU_DATE_FORMAT
  | typeof UK_DATE_FORMAT
  | typeof CANADIAN_DATE_FORMAT
  | typeof JAPANESE_DATE_FORMAT
  | typeof GERMAN_DATE_FORMAT;

export type DisplayDateFormat =
  | typeof FULL_DATE_FORMAT
  | typeof LONG_DATE_FORMAT
  | typeof MEDIUM_DATE_FORMAT
  | typeof SHORT_DATE_FORMAT
  | typeof COMPACT_DATE_FORMAT;

export type TimeFormat =
  | typeof TIME_12_FORMAT
  | typeof TIME_24_FORMAT
  | typeof TIME_12_SECONDS_FORMAT
  | typeof TIME_24_SECONDS_FORMAT;

export type DateTimeFormat =
  | typeof DATETIME_12_FORMAT
  | typeof DATETIME_24_FORMAT
  | typeof FULL_DATETIME_FORMAT
  | typeof LONG_DATETIME_FORMAT
  | typeof MEDIUM_DATETIME_FORMAT
  | typeof SHORT_DATETIME_FORMAT;

export type CalendarFormat =
  | typeof CALENDAR_HEADER_FORMAT
  | typeof CALENDAR_DAY_FORMAT
  | typeof CALENDAR_WEEK_FORMAT
  | typeof CALENDAR_MONTH_FORMAT
  | typeof CALENDAR_YEAR_FORMAT
  | typeof CALENDAR_TODAY_FORMAT;

export type EventFormat =
  | typeof EVENT_DATE_FORMAT
  | typeof EVENT_TIME_FORMAT
  | typeof EVENT_DATETIME_FORMAT
  | typeof EVENT_DURATION_FORMAT
  | typeof EVENT_FULL_FORMAT
  | typeof EVENT_REMINDER_FORMAT;

export type SocialFormat =
  | typeof SOCIAL_RELATIVE_FORMAT
  | typeof SOCIAL_SHORT_FORMAT
  | typeof SOCIAL_TIMESTAMP_FORMAT
  | typeof SOCIAL_POST_FORMAT
  | typeof SOCIAL_COMMENT_FORMAT;

// Format Arrays for Selection
export const REGIONAL_FORMATS: {
  label: string;
  value: RegionalDateFormat;
  example: string;
}[] = [
  { label: "US Format", value: US_DATE_FORMAT, example: "12/31/2023" },
  { value: EU_DATE_FORMAT, example: "31/12/2023", label: "European Format" },
  { label: "UK Format", value: UK_DATE_FORMAT, example: "31/12/2023" },
  {
    example: "31/12/2023",
    label: "Canadian Format",
    value: CANADIAN_DATE_FORMAT,
  },
  {
    example: "2023/12/31",
    label: "Japanese Format",
    value: JAPANESE_DATE_FORMAT,
  },
  { example: "31.12.2023", label: "German Format", value: GERMAN_DATE_FORMAT },
];

export const TIME_FORMATS = [
  { label: "12 Hour", example: "2:30 PM", value: TIME_12_FORMAT },
  { label: "24 Hour", example: "14:30", value: TIME_24_FORMAT },
  {
    example: "2:30:45 PM",
    label: "12 Hour with Seconds",
    value: TIME_12_SECONDS_FORMAT,
  },
  {
    example: "14:30:45",
    label: "24 Hour with Seconds",
    value: TIME_24_SECONDS_FORMAT,
  },
];

export const DISPLAY_FORMATS = [
  {
    label: "Full",
    value: FULL_DATE_FORMAT,
    example: "Monday, December 31st, 2023",
  },
  { label: "Long", value: LONG_DATE_FORMAT, example: "December 31st, 2023" },
  { label: "Medium", example: "Dec 31, 2023", value: MEDIUM_DATE_FORMAT },
  { label: "Short", example: "12/31/23", value: SHORT_DATE_FORMAT },
  { label: "Compact", example: "12/31/23", value: COMPACT_DATE_FORMAT },
];

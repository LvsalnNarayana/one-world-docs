// External
import { faker } from "@faker-js/faker";


// Parent, Sibling, Index
import { type DayOfWeek, DAY_OF_WEEK_OPTIONS } from "../base/dayOfWeek.types";
import {
  TIMEZONE_OPTIONS,
  type TimezoneOptions,
} from "../base/timezones.types";
import {
  REGIONAL_FORMATS,
  type RegionalDateFormat,
} from "../base/dateFormats.types";

export interface CalendarPreferences {
  defaultTimezone: TimezoneOptions;
  weekStartsOn: "SUN" | "MON";
  timeFormat: "12h" | "24h";
  dateFormat: RegionalDateFormat;
  workingHours: {
    start: string;
    end: string;
    days: DayOfWeek[];
  };
  showDeclinedEvents: boolean;
  enableSmartSuggestions: boolean;
  enableConflictDetection: boolean;
}

export const generateCalendarPreference = (): CalendarPreferences => {
  return {
    showDeclinedEvents: faker.datatype.boolean(),
    enableSmartSuggestions: faker.datatype.boolean(),
    enableConflictDetection: faker.datatype.boolean(),
    timeFormat: faker.helpers.arrayElement(["12h", "24h"]),
    weekStartsOn: faker.helpers.arrayElement(["SUN", "MON"]),
    defaultTimezone:
      TIMEZONE_OPTIONS[faker.number.int(TIMEZONE_OPTIONS.length - 1)],
    dateFormat: faker.helpers.arrayElement(
      REGIONAL_FORMATS?.map((format) => format.value)
    ),
    workingHours: {
      end: faker.date.recent().toISOString(),
      start: faker.date.recent().toISOString(),
      days: faker.helpers.arrayElement([
        DAY_OF_WEEK_OPTIONS?.map((day) => day.value),
      ]),
    },
  };
};

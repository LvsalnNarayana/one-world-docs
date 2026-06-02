// External
import { faker } from "@faker-js/faker";


// Parent, Sibling, Index
import { type BaseEntity, generateBaseEntity } from "../base/base.types";
import {
  Monday,
  Sunday,
  type DayOfWeek,
  DAY_OF_WEEK_OPTIONS,
} from "../base/dayOfWeek.types";

const Daily = "DAILY" as const;
const Weekly = "WEEKLY" as const;
const Monthly = "MONTHLY" as const;
const Yearly = "YEARLY" as const;
const Custom = "CUSTOM" as const;

export type RecurrenceFrequency =
  | typeof Daily
  | typeof Weekly
  | typeof Monthly
  | typeof Yearly
  | typeof Custom;

// Enhanced Recurrence interface
export interface Recurrence extends BaseEntity {
  frequency: RecurrenceFrequency;
  interval: number;
  endType: "never" | "on" | "after";
  until: string;
  endDate: string | null;
  daysOfMonth: number[]; // For monthly recurrence
  daysOfWeek: DayOfWeek[]; // Fixed typo
  occurrenceCount: number;
  exceptions?: string[]; // Dates to exclude from recurrence
  bySetPos?: number[]; // For complex recurrence patterns
  weekStart?: typeof Sunday | typeof Monday; // Week start day for weekly recurrence
}

export const RECURRENCE_FREQUENCY_OPTIONS = [
  {
    value: Daily,
    label: "Daily",
  },
  {
    value: Weekly,
    label: "Weekly",
  },
  {
    value: Monthly,
    label: "Monthly",
  },
  {
    value: Yearly,
    label: "Yearly",
  },
  {
    value: Custom,
    label: "Custom",
  },
];

export const RECURRENCE_END_OPTIONS = [
  {
    label: "Never",
    value: "never",
  },
  {
    label: "On",
    value: "on",
  },
  {
    label: "After",
    value: "after",
  },
];

// Fixed and enhanced generateRecurrency function
export const generateRecurrency = (): Recurrence => {
  const frequency = faker.helpers.arrayElement([
    Daily,
    Weekly,
    Monthly,
    Yearly,
    Custom,
  ]);

  const endType = faker.helpers.arrayElement(["never", "on", "after"] as const);
  const interval = faker.number.int({ min: 1, max: 5 });

  // Generate appropriate daysOfWeek based on frequency
  const generateDaysOfWeek = (): DayOfWeek[] => {
    if (frequency === Weekly || frequency === Custom) {
      const allDays: DayOfWeek[] = DAY_OF_WEEK_OPTIONS.map(
        (option) => option.value
      );
      const numDays = faker.number.int({ min: 1, max: 3 });
      return faker.helpers.arrayElements(allDays, numDays);
    }
    return [];
  };

  // Generate appropriate daysOfMonth for monthly recurrence
  const generateDaysOfMonth = (): number[] => {
    if (frequency === Monthly) {
      const numDays = faker.number.int({ min: 1, max: 3 });
      return Array.from({ length: numDays }, () =>
        faker.number.int({ min: 1, max: 28 })
      ).sort((a, b) => a - b);
    }
    return [];
  };

  // Generate end date based on endType
  const generateEndDate = (): string | null => {
    if (endType === "on") {
      return faker.date.future({ years: 2 }).toISOString();
    }
    return null;
  };

  // Generate occurrence count based on endType
  const generateOccurrenceCount = (): number => {
    if (endType === "after") {
      return faker.number.int({ min: 5, max: 50 });
    }
    return 0; // 0 means unlimited for "never" and "on" end types
  };

  // Generate until date (always set for consistency)
  const generateUntilDate = (): string => {
    if (endType === "never") {
      // Set a far future date for "never" ending recurrence
      return faker.date.future({ years: 10 }).toISOString();
    } else if (endType === "on") {
      return generateEndDate() || faker.date.future({ years: 2 }).toISOString();
    } else {
      // For "after" type, calculate approximate end date based on frequency and count
      const occurrences = generateOccurrenceCount();
      let daysToAdd = 0;

      switch (frequency) {
        case Daily:
          daysToAdd = occurrences * interval;
          break;
        case Weekly:
          daysToAdd = occurrences * interval * 7;
          break;
        case Monthly:
          daysToAdd = occurrences * interval * 30;
          break;
        case Yearly:
          daysToAdd = occurrences * interval * 365;
          break;
        default:
          daysToAdd = occurrences * 7; // Default to weekly for custom
      }

      const endDate = new Date();
      endDate.setDate(endDate.getDate() + daysToAdd);
      return endDate.toISOString();
    }
  };

  // Generate exceptions (some random dates to exclude)
  const generateExceptions = (): string[] => {
    if (faker.datatype.boolean({ probability: 0.3 })) {
      // 30% chance of having exceptions
      const numExceptions = faker.number.int({ min: 1, max: 3 });
      return Array.from(
        { length: numExceptions },
        () => faker.date.future({ years: 1 }).toISOString().split("T")[0] // Date only
      );
    }
    return [];
  };

  // Generate bySetPos for complex patterns
  const generateBySetPos = (): number[] | undefined => {
    if (frequency === Monthly && faker.datatype.boolean({ probability: 0.4 })) {
      // For patterns like "first Monday", "last Friday", etc.
      return faker.helpers.arrayElements(
        [-1, 1, 2, 3, 4],
        faker.number.int({ min: 1, max: 2 })
      );
    }
    return undefined;
  };

  const daysOfWeek = generateDaysOfWeek();
  const daysOfMonth = generateDaysOfMonth();
  const endDate = generateEndDate();
  const occurrenceCount = generateOccurrenceCount();
  const until = generateUntilDate();
  const exceptions = generateExceptions();
  const bySetPos = generateBySetPos();

  return {
    ...generateBaseEntity(),
    until,
    endType,
    endDate,
    interval,
    bySetPos,
    frequency,
    daysOfWeek,
    exceptions,
    daysOfMonth,
    occurrenceCount,
    weekStart: faker.helpers.arrayElement([Sunday, Monday]),
  };
};

// Additional utility functions for recurrence generation

// Generate a simple daily recurrence
export const generateDailyRecurrence = (days: number = 30): Recurrence => {
  const endDate = new Date();
  endDate.setDate(endDate.getDate() + days);

  return {
    ...generateBaseEntity(),
    interval: 1,
    endType: "on",
    daysOfWeek: [],
    exceptions: [],
    daysOfMonth: [],
    frequency: Daily,
    weekStart: Monday,
    occurrenceCount: 0,
    until: endDate.toISOString(),
    endDate: endDate.toISOString(),
  };
};

// Generate a weekly recurrence for specific days
export const generateWeeklyRecurrence = (
  daysOfWeek: DayOfWeek[] = ["MONDAY", "WEDNESDAY", "FRIDAY"],
  weeks: number = 12
): Recurrence => {
  const endDate = new Date();
  endDate.setDate(endDate.getDate() + weeks * 7);

  return {
    ...generateBaseEntity(),
    daysOfWeek,
    interval: 1,
    endType: "on",
    exceptions: [],
    daysOfMonth: [],
    frequency: Weekly,
    weekStart: Monday,
    occurrenceCount: 0,
    until: endDate.toISOString(),
    endDate: endDate.toISOString(),
  };
};

// Generate a monthly recurrence
export const generateMonthlyRecurrence = (
  dayOfMonth: number = 15,
  months: number = 12
): Recurrence => {
  const endDate = new Date();
  endDate.setMonth(endDate.getMonth() + months);

  return {
    ...generateBaseEntity(),
    interval: 1,
    endType: "on",
    daysOfWeek: [],
    exceptions: [],
    weekStart: Monday,
    frequency: Monthly,
    occurrenceCount: 0,
    daysOfMonth: [dayOfMonth],
    until: endDate.toISOString(),
    endDate: endDate.toISOString(),
  };
};

// Generate a yearly recurrence
export const generateYearlyRecurrence = (years: number = 5): Recurrence => {
  const endDate = new Date();
  endDate.setFullYear(endDate.getFullYear() + years);

  return {
    ...generateBaseEntity(),
    interval: 1,
    endType: "on",
    daysOfWeek: [],
    exceptions: [],
    daysOfMonth: [],
    frequency: Yearly,
    weekStart: Monday,
    occurrenceCount: 0,
    until: endDate.toISOString(),
    endDate: endDate.toISOString(),
  };
};

// Generate recurrence with specific occurrence count
export const generateRecurrenceWithCount = (
  frequency: RecurrenceFrequency,
  count: number
): Recurrence => {
  let daysToAdd = 0;

  switch (frequency) {
    case Daily:
      daysToAdd = count;
      break;
    case Weekly:
      daysToAdd = count * 7;
      break;
    case Monthly:
      daysToAdd = count * 30;
      break;
    case Yearly:
      daysToAdd = count * 365;
      break;
    default:
      daysToAdd = count * 7;
  }

  const endDate = new Date();
  endDate.setDate(endDate.getDate() + daysToAdd);

  return {
    ...generateBaseEntity(),
    frequency,
    interval: 1,
    endDate: null,
    exceptions: [],
    endType: "after",
    weekStart: Monday,
    occurrenceCount: count,
    until: endDate.toISOString(),
    daysOfMonth:
      frequency === Monthly ? [faker.number.int({ min: 1, max: 28 })] : [],
    daysOfWeek:
      frequency === Weekly
        ? faker.helpers.arrayElements(
            [
              "MONDAY",
              "TUESDAY",
              "WEDNESDAY",
              "THURSDAY",
              "FRIDAY",
            ] as DayOfWeek[],
            2
          )
        : [],
  };
};

// Generate a never-ending recurrence
export const generateNeverEndingRecurrence = (
  frequency: RecurrenceFrequency = Weekly
): Recurrence => {
  const farFuture = new Date();
  farFuture.setFullYear(farFuture.getFullYear() + 10);

  return {
    ...generateBaseEntity(),
    frequency,
    interval: 1,
    endDate: null,
    exceptions: [],
    endType: "never",
    weekStart: Monday,
    occurrenceCount: 0,
    until: farFuture.toISOString(),
    daysOfMonth: frequency === Monthly ? [1, 15] : [],
    daysOfWeek: frequency === Weekly ? ["MONDAY", "WEDNESDAY", "FRIDAY"] : [],
  };
};

// Validate recurrence object
export const validateRecurrence = (recurrence: Recurrence): boolean => {
  // Basic validation
  if (!recurrence.id || !recurrence.frequency) {
    return false;
  }

  // Validate interval
  if (recurrence.interval < 1) {
    return false;
  }

  // Validate end type specific fields
  if (recurrence.endType === "on" && !recurrence.endDate) {
    return false;
  }

  if (recurrence.endType === "after" && recurrence.occurrenceCount < 1) {
    return false;
  }

  // Validate frequency specific fields
  if (recurrence.frequency === Weekly && recurrence.daysOfWeek.length === 0) {
    return false;
  }

  if (
    recurrence.frequency === Monthly &&
    recurrence.daysOfMonth.length === 0 &&
    !recurrence.bySetPos
  ) {
    return false;
  }

  return true;
};

// Generate multiple recurrence patterns for testing
export const generateRecurrencePatterns = (
  count: number = 10
): Recurrence[] => {
  return Array.from({ length: count }, () => generateRecurrency());
};

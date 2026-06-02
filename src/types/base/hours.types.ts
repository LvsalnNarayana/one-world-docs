export type TimeInterval = 15 | 30 | 60;

export interface TimeSlot {
  value: string;
  label: string;
  hour24: number;
  hour12: number;
  period: "AM" | "PM";
  minutes: number;
  totalMinutes: number;
}

export const PIXEL_RATIO_CONSTANTS = {
  BASE_SLOT_HEIGHT: 48,

  convertMinutesToPixels: (
    minutes: number,
    interval: "15min" | "30min" | "60min" = "15min"
  ) => {
    const config = PIXEL_RATIO_CONSTANTS.RATIOS[interval];
    return (minutes / config.minutes) * config.pixelHeight;
  },

  RATIOS: {
    "15min": {
      minutes: 15,
      pixelHeight: 48,
      pixelsPerMinute: 48 / 15,
    },
    "30min": {
      minutes: 30,
      pixelHeight: 48,
      pixelsPerMinute: 48 / 30,
    },
    "60min": {
      minutes: 60,
      pixelHeight: 48,
      pixelsPerMinute: 48 / 60,
    },
  },
};

export type TimePeriod = "AM" | "PM";

export interface TimeSlot {
  value: string;
  label: string;
  hour24: number;
  hour12: number;
  period: TimePeriod;
  minutes: number;
  totalMinutes: number;
}

export interface TimeSlotGenerationOptions {
  startHour?: number;
  endHour?: number;
  interval?: TimeInterval;
  includeEndTime?: boolean;
}

export function generateTimeSlots(
  options: TimeSlotGenerationOptions = {}
): TimeSlot[] {
  const {
    endHour = 24,
    startHour = 0,
    interval = 15,
    includeEndTime = false,
  } = options;

  if (startHour < 0 || startHour > 24) {
    throw new Error("Start hour must be between 0 and 24");
  }
  if (endHour < 0 || endHour > 24) {
    throw new Error("End hour must be between 0 and 24");
  }
  if (startHour > endHour) {
    throw new Error("Start hour must be less than or equal to end hour");
  }
  if (![15, 30, 60].includes(interval)) {
    throw new Error("Interval must be 15, 30, or 60 minutes");
  }

  const slots: TimeSlot[] = [];

  for (let hour = startHour; hour <= endHour; hour++) {
    for (let minute = 0; minute < 60; minute += interval) {
      if (hour === endHour && minute > 0 && !includeEndTime) break;

      const hour12 = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;

      const period: TimePeriod = hour < 12 ? "AM" : "PM";

      const slot: TimeSlot = {
        hour12,
        period,
        hour24: hour,
        minutes: minute,
        totalMinutes: hour * 60 + minute,
        label: `${hour12}:${minute.toString().padStart(2, "0")} ${period}`,
        value: `${hour.toString().padStart(2, "0")}:${minute
          .toString()
          .padStart(2, "0")}`,
      };

      slots.push(slot);
    }
  }

  return slots;
}

export const getCurrentTimePosition = () => {};

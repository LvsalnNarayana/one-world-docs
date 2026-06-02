// Parent, Sibling, Index
import type { CalendarViewType } from "./calendarViewType.types";

// User's calendar view preferences
export interface CalendarViewPreferences {
  defaultView: CalendarViewType;
  compactMode: boolean;
  showAllDayEvents: boolean;
  showEventDetails: boolean;
  colorBy: "calendar" | "category" | "priority" | "status";
  timeSlotDuration: 15 | 30 | 60; // minutes
  dayStartHour: number;
  dayEndHour: number;
  showTimeZone: boolean;
  showWeatherInfo: boolean;
  showLunarCalendar: boolean;
}

// Default calendar view preferences
export const defaultCalendarViewPreferences: CalendarViewPreferences = {
  dayEndHour: 12,
  dayStartHour: 12,
  compactMode: false,
  showTimeZone: true,
  colorBy: "calendar",
  defaultView: "month",
  timeSlotDuration: 30,
  showWeatherInfo: true,
  showAllDayEvents: true,
  showEventDetails: true,
  showLunarCalendar: false,
};

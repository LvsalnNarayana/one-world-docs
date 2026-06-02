// Calendar view types
export type CalendarViewType =
  | "day"
  | "week"
  | "month"
  | "year"
  | "agenda"
  | "timeline";

export const CALENDAR_VIEW_TYPE_OPTIONS: {
  label: string;
  value: CalendarViewType;
}[] = [
  {
    label: "Day",
    value: "day",
  },
  {
    label: "Week",
    value: "week",
  },
  {
    label: "Month",
    value: "month",
  },
  {
    label: "Year",
    value: "year",
  },
  {
    label: "Agenda",
    value: "agenda",
  },
  {
    label: "Timeline",
    value: "timeline",
  },
];

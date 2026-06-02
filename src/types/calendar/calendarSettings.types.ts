// External
import { faker } from "@faker-js/faker";


// Parent, Sibling, Index
import {
  type EventReminderNotificationSettings,
  generateEventReminderNotificationSettings,
} from "../event/eventReminderNotificationSettings.types";

export interface CalendarSettings {
  defaultEventDuration: number;
  defaultNotifications: EventReminderNotificationSettings[];
  autoAcceptInvites: boolean;
  defaultVisibility: "public" | "private" | "confidential";
  defaultEventColor: string;
  enableNotifications: boolean;
  defaultEventCategory: string;
  defaultEventReminder: number;
  defaultEventReminderTime: number;
}

export const generateCalendarSettings = (): CalendarSettings => {
  return {
    defaultEventColor: faker.color.rgb(),
    defaultEventCategory: faker.lorem.word(),
    autoAcceptInvites: faker.datatype.boolean(),
    enableNotifications: faker.datatype.boolean(),
    defaultEventReminder: faker.number.int({ min: 5, max: 120 }),
    defaultEventDuration: faker.number.int({ min: 30, max: 180 }),
    defaultEventReminderTime: faker.number.int({ min: 5, max: 60 }),
    defaultNotifications: [generateEventReminderNotificationSettings()],
    defaultVisibility: faker.helpers.arrayElement([
      "public",
      "private",
      "confidential",
    ]),
  };
};

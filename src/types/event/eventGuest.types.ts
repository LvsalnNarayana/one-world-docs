// External
import { faker } from "@faker-js/faker";


// Parent, Sibling, Index
import type { EventStatus } from "./event.types";
import {
  type UserReference,
  generateUserReference,
} from "../base/userReference.types";
import {
  type EventInteraction,
  generateEventInteractions,
} from "./eventInteraction.types";
import {
  type EventReminderNotificationSettings,
  generateEventReminderNotificationSettings,
} from "./eventReminderNotificationSettings.types";

export interface EventGuest extends UserReference {
  status: EventStatus;
  userId: string;
  isOptional?: boolean;
  isOrganizer: boolean;
  responseTime: string;
  interactions: EventInteraction[];
  reminders: EventReminderNotificationSettings[];
}

export const generateEventGuest = (): EventGuest => {
  return {
    ...generateUserReference(),
    isOrganizer: false,
    userId: faker.string.uuid(),
    isOptional: faker.datatype.boolean(),
    interactions: [generateEventInteractions()],
    responseTime: faker.date.recent().toISOString(),
    reminders: [generateEventReminderNotificationSettings()],
    status: faker.helpers.arrayElement([
      "tentative",
      "confirmed",
      "cancelled",
      "draft",
    ]),
  };
};

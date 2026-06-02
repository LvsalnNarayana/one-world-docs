// External
import { faker } from "@faker-js/faker";


// Parent, Sibling, Index
import type { EventReminderNotificationType } from "./event.types";

export interface EventReminderNotificationSettings {
  id: string;
  type: EventReminderNotificationType;
  timeBeforeEvent: number;
  isEnabled: boolean;
  customMessage?: string;
  recurring?: boolean;
}

export const generateEventReminderNotificationSettings =
  (): EventReminderNotificationSettings => {
    return {
      id: faker.string.uuid(),
      isEnabled: faker.datatype.boolean(),
      recurring: faker.datatype.boolean(),
      timeBeforeEvent: faker.number.int({ min: 5, max: 60 }),
      customMessage: faker.helpers.maybe(() => faker.lorem.sentence()),
      type: faker.helpers.arrayElement([
        "email",
        "push",
        "sms",
      ]) as EventReminderNotificationType,
    };
  };

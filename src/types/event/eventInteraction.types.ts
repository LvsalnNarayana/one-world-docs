// External
import { faker } from "@faker-js/faker";

// // User's event interaction history
export interface EventInteraction {
  eventId: string;
  userId: string;
  action:
    | "created"
    | "updated"
    | "deleted"
    | "accepted"
    | "declined"
    | "viewed"
    | "joined";
  timestamp: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  details?: Record<string, any>;
}

export const generateEventInteractions = (): EventInteraction => {
  return {
    userId: faker.string.uuid(),
    eventId: faker.string.uuid(),
    timestamp: faker.date.recent().toISOString(),
    details: {
      // Add any additional details specific to the action
    },
    action: faker.helpers.arrayElement([
      "created",
      "updated",
      "deleted",
      "accepted",
      "declined",
      "viewed",
      "joined",
    ]),
  };
};

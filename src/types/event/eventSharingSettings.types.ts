// External
import { faker } from "@faker-js/faker";

export interface EventSharingSettings {
  isPublic: boolean;
  shareableLink?: string;
  allowGuestInvites: boolean;
  allowGuestModifications: boolean;
  expiresAt?: string;
  accessLevel: "view" | "edit" | "admin";
}

export const generateEventSharingSettings = (): EventSharingSettings => {
  return {
    isPublic: faker.datatype.boolean(),
    shareableLink: faker.internet.url(),
    allowGuestInvites: faker.datatype.boolean(),
    expiresAt: faker.date.future().toISOString(),
    allowGuestModifications: faker.datatype.boolean(),
    accessLevel: faker.helpers.arrayElement(["view", "edit", "admin"]),
  };
};

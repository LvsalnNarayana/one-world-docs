// External
import { faker } from "@faker-js/faker";


// Parent, Sibling, Index
import {
  type UserReference,
  generateUserReference,
} from "../base/userReference.types";
import {
  type CalendarSettings,
  generateCalendarSettings,
} from "./calendarSettings.types";

// Calendar interface

export interface Calendar {
  id: string;
  name: string;
  description?: string;
  color: string;
  owner: UserReference;
  isDefault: boolean;
  isVisible: boolean;
  timezone: string;
  // Settings
  settings: CalendarSettings;

  // Metadata
  createdAt: string;
  updatedAt: string;
  totalEventCount: number;

  // Sharing
  isShared: boolean;
  isPublic: boolean;
  shareUrl?: string;
}

export const generateCalendar = (): Calendar => {
  return {
    id: faker.string.uuid(),
    color: faker.internet.color(),
    owner: generateUserReference(),
    shareUrl: faker.internet.url(),
    name: faker.commerce.productName(),
    isShared: faker.datatype.boolean(),
    isPublic: faker.datatype.boolean(),
    description: faker.lorem.sentence(),
    isDefault: faker.datatype.boolean(),
    isVisible: faker.datatype.boolean(),
    timezone: faker.location.timeZone(),
    settings: generateCalendarSettings(),
    createdAt: faker.date.past().toISOString(),
    updatedAt: faker.date.past().toISOString(),
    totalEventCount: faker.number.int({ min: 0, max: 100 }),
  };
};

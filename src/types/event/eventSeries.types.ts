// External
import { faker } from "@faker-js/faker";


// Parent, Sibling, Index
import type { Event } from "./event.types";
import type { BaseEntity } from "../base/base.types";
import { type Recurrence, generateRecurrency } from "./eventRecurrence.types";
import {
  type UserReference,
  generateUserReference,
} from "../base/userReference.types";

// Event series for managing recurring events

export interface EventSeries extends BaseEntity {
  title: string;
  description?: string;
  recurrence: Recurrence;
  events: Event[];
  createdBy: UserReference;
  isActive: boolean;
}

export const generateEventSeries = ():EventSeries => {
  return {
    id: faker.string.uuid(),
    events: [],
    title: faker.lorem.sentence(),
    recurrence: generateRecurrency(),
    createdBy: generateUserReference(),
    isActive: faker.datatype.boolean(),
    description: faker.lorem.paragraph(),
    createdAt: faker.date.past().toISOString(),
    updatedAt: faker.date.recent().toISOString(),
  };
};

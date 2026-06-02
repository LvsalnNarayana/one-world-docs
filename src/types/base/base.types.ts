// External
import { faker } from "@faker-js/faker";


// Parent, Sibling, Index
import type { Visibility } from "./visibility.types";

export interface BaseEntity {
  id: string;
  createdAt: string;
  updatedAt?: string;
}

export interface VisibilityMixin {
  visibility: Visibility;
}

export interface VerifiableMixin {
  verified: boolean;
  primary?: boolean;
}

export const generateBaseEntity = (): BaseEntity => {
  return {
    id: faker.string.uuid(),
    createdAt: faker.date.past().toISOString(),
    updatedAt: faker.date.past().toISOString(),
  };
};

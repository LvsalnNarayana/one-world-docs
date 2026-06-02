// External
import { faker } from "@faker-js/faker";


// Parent, Sibling, Index
import { type Visibility, VISIBILITY_OPTIONS } from "../base/visibility.types";
import {
  type BaseEntity,
  generateBaseEntity,
  type VerifiableMixin,
  type VisibilityMixin,
} from "../base/base.types";

export interface Email extends BaseEntity, VisibilityMixin, VerifiableMixin {
  email: string;
}

export interface Phone extends BaseEntity, VisibilityMixin, VerifiableMixin {
  phone: string;
  countryCode: string;
  country: string;
}

export interface Website extends BaseEntity, VisibilityMixin {
  url: string;
  title?: string;
}

export const generateEmail = (): Email => {
  return {
    ...generateBaseEntity(),
    email: faker.internet.email(),
    verified: faker.datatype.boolean(),
    visibility: faker.helpers.arrayElement(VISIBILITY_OPTIONS)
      .value as Visibility,
  };
};

export const generatePhone = (): Phone => {
  return {
    ...generateBaseEntity(),
    phone: faker.phone.number(),
    country: faker.location.country(),
    verified: faker.datatype.boolean(),
    countryCode: faker.location.countryCode(),
    visibility: faker.helpers.arrayElement(VISIBILITY_OPTIONS)
      .value as Visibility,
  };
};
export const generateWebsite = (): Website => {
  return {
    ...generateBaseEntity(),
    url: faker.internet.url(),
    visibility: faker.helpers.arrayElement(VISIBILITY_OPTIONS)
      .value as Visibility,
  };
};
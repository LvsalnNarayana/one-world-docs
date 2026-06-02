// External
import { faker } from "@faker-js/faker";


// Parent, Sibling, Index
import type { Coordinates } from "../place/place.types";
import { type BaseEntity, generateBaseEntity } from "../base/base.types";

export interface Sessions extends BaseEntity {
  sessionId: string;
  device: string;
  ipAddress: string;
  lastActive: string;
  location: Coordinates;
  isCurrent: boolean;
}

export const generateSession = (): Sessions => {
  return {
    ...generateBaseEntity(),
    sessionId: faker.string.uuid(),
    ipAddress: faker.internet.ip(),
    device: faker.internet.userAgent(),
    isCurrent: faker.datatype.boolean(),
    lastActive: faker.date.past().toISOString(),
    location: {
      latitude: faker.location.latitude(),
      longitude: faker.location.longitude(),
      accuracy: faker.number.int({ min: 1, max: 100 }),
    },
  };
};

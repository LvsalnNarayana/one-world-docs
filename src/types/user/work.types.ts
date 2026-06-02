// External
import { faker } from "@faker-js/faker";


// Parent, Sibling, Index
import { type Place, generatePlace } from "../place/place.types";
import { type Visibility, VISIBILITY_OPTIONS } from "../base/visibility.types";

export interface Work {
  id: string;
  current: boolean;
  company: string;
  visibility: Visibility;
  position: string;
  endDate: string;
  startDate: string;
  description: string;
  place: Place;
}

export const generateWork = (): Work => {
  return {
    id: faker.string.uuid(),
    place: generatePlace(),
    company: faker.company.name(),
    current: faker.datatype.boolean(),
    position: faker.person.jobTitle(),
    description: faker.lorem.paragraph(),
    endDate: faker.date.past().toISOString(),
    startDate: faker.date.past().toISOString(),
    visibility: faker.helpers.arrayElement(VISIBILITY_OPTIONS)
      ?.value as Visibility,
  };
};

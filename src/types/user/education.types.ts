// External
import { faker } from "@faker-js/faker";


// Parent, Sibling, Index
import { type Place, generatePlace } from "../place/place.types";
import { generateBaseEntity, type VisibilityMixin } from "../base/base.types";
import { type Visibility, VISIBILITY_OPTIONS } from "../base/visibility.types";

export interface Education extends VisibilityMixin {
  id: string;
  current: boolean;
  school: string;
  degree: string;
  endDate: string;
  startDate: string;
  description: string;
  place: Place;
}

export const generateEducation = (): Education => {
  return {
    ...generateBaseEntity(),
    place: generatePlace(),
    school: faker.company.name(),
    degree: faker.person.jobTitle(),
    current: faker.datatype.boolean(),
    description: faker.lorem.paragraph(),
    endDate: faker.date.past().toISOString(),
    startDate: faker.date.past().toISOString(),
    visibility: faker.helpers.arrayElement(VISIBILITY_OPTIONS)
      ?.value as Visibility,
  };
};

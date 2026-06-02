// External
import { faker } from "@faker-js/faker";


// Parent, Sibling, Index
import { type BaseEntity, generateBaseEntity } from "../base/base.types";
import { type StoryUserInterface, generateStoryUserInterface } from "./storyUser.types";

export interface Story extends BaseEntity {
  user: StoryUserInterface;
  mediaUrl: string;
  mediaType: "image" | "video";
  timestamp: Date;
  duration: number; // in seconds
  isViewed?: boolean;
}

export const generateStory = (): Story => {
  return {
    ...generateBaseEntity(),
    mediaType: "image",
    mediaUrl: faker.image.url(),
    timestamp: faker.date.recent(),
    user: generateStoryUserInterface(),
    isViewed: faker.datatype.boolean(),
    duration: faker.number.int({ min: 5, max: 30 }),
  };
};

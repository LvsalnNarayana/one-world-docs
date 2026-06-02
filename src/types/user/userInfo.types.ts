// External
import { faker } from "@faker-js/faker";


// Parent, Sibling, Index
import type { Gender } from "../base/gender.types";
import type { VisibilityMixin } from "../base/base.types";
import type { RelationshipStatus } from "../base/relationShipStatus.types";

export interface Birthdate extends VisibilityMixin {
  date: string; // ISO date string
}
export interface Hobbies extends VisibilityMixin {
  values: string[];
}
export interface Relationship extends VisibilityMixin {
  status: RelationshipStatus;
}

export interface Interests extends VisibilityMixin {
  values: string[];
}

export interface Languages extends VisibilityMixin {
  values: string[];
}
export interface UserInfo {
  gender: Gender;
  bio: string;
  birthdate: Birthdate;
  relationship: Relationship;
  hobbies: Hobbies;
  languages: Languages;
  interests: Interests;
}

export const generateUserInfo = (): UserInfo => {
  return {
    bio: faker.lorem.paragraph(),
    gender: faker.person.sex() as Gender,
    birthdate: {
      visibility: "public",
      date: faker.date.birthdate().toISOString(),
    },
    relationship: {
      visibility: "public",
      status: faker.helpers.arrayElement([
        "single",
        "in a relationship",
        "married",
        "divorced",
        "widowed",
      ]) as RelationshipStatus,
    },
    hobbies: {
      visibility: "public",
      values: faker.helpers.arrayElements([
        "Reading",
        "Writing",
        "Painting",
        "Photography",
        "Cooking",
        "Gardening",
        "Hiking",
        "Fishing",
        "Camping",
        "Traveling",
        "Sports",
        "Gaming",
        "Music",
        "Dancing",
        "Yoga",
        "Meditation",
        "Volunteering",
        "Charity",
        "Fashion",
        "Art",
      ]),
    },
    languages: {
      visibility: "public",
      values: faker.helpers.arrayElements([
        "English",
        "Spanish",
        "French",
        "German",
        "Italian",
        "Chinese",
        "Japanese",
        "Korean",
        "Russian",
        "Arabic",
        "Hindi",
        "Portuguese",
        "Dutch",
        "Swedish",
        "Norwegian",
        "Danish",
        "Finnish",
        "Greek",
        "Turkish",
        "Hebrew",
        "Polish",
      ]),
    },
    interests: {
      visibility: "public",
      values: faker.helpers.arrayElements([
        "Technology",
        "Science",
        "Art",
        "Music",
        "Sports",
        "Travel",
        "Food",
        "Fashion",
        "Books",
        "Movies",
        "TV",
        "Gaming",
        "Fitness",
        "Health",
        "Pets",
        "Parenting",
        "Finance",
        "Politics",
        "Environment",
        "History",
        "Philosophy",
        "Religion",
        "Psychology",
        "Education",
        "Business",
        "Marketing",
        "Design",
        "Photography",
        "Writing",
        "Film",
        "Theater",
        "Dance",
        "Comedy",
        "Fashion",
        "Beauty",
        "Interior Design",
        "Architecture",
        "Gardening",
        "Hiking",
        "Fishing",
        "Camping",
        "Traveling",
        "Sports",
        "Gaming",
      ]),
    },
  };
};

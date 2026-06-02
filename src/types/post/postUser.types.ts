// External
import { faker } from "@faker-js/faker";


// Parent, Sibling, Index
import type { ReactionType } from "./post.enums";
import { REACTIONS } from "../base/reaction.types";
import {
  type UserReference,
  generateUserReference,
} from "../base/userReference.types";

export type PostUserInterface = UserReference;

export interface PostAuthorInterface extends PostUserInterface {
  is_logged_in_user: boolean;
}

export interface ReactionUserInterface extends PostUserInterface {
  reaction_type: ReactionType;
  reacted_at: string;
}

export interface PostSubscriptionUser extends PostUserInterface {
  subscribed_at: string;
  is_subscribed: boolean;
}

export const generatePostAuthorInterface = (): PostAuthorInterface => {
  return {
    ...generateUserReference(),
    is_logged_in_user: faker.datatype.boolean(),
  };
};
export const generatePostSubscriptionUser = (): PostSubscriptionUser => {
  return {
    ...generatePostUserInterface(),
    is_subscribed: faker.datatype.boolean(),
    subscribed_at: faker.date.recent().toISOString(),
  };
};
export const generatePostUserInterface = (): PostUserInterface => {
  return {
    ...generateUserReference(),
  };
};

export const generateReactionUserInterface = (): ReactionUserInterface => {
  return {
    ...generatePostUserInterface(),
    reacted_at: faker.date.recent().toISOString(),
    reaction_type: faker.helpers.arrayElement(REACTIONS),
  };
};

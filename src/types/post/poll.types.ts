// External
import { faker } from "@faker-js/faker";


// Parent, Sibling, Index
import type { PostUserInterface } from "./postUser.types";
import { type BaseEntity, generateBaseEntity } from "../base/base.types";

export interface PollOption {
  id: string;
  text: string;
  vote_count: number;
  voters: PostUserInterface[];
  user_voted: boolean;
}

export interface PollData extends BaseEntity {
  question: string;
  options: PollOption[];
  total_votes: number;
  allow_multiple: boolean;
  expires_at?: string;
  is_expired: boolean;
  user_has_voted: boolean;
}
export const generatePollOption = (): PollOption => {
  return {
    id: faker.string.uuid(),
    voters: [],
    user_voted: false,
    text: faker.lorem.sentence(),
    vote_count: faker.number.int({ min: 0, max: 100 }),
  };
};

export const generatePoll = (): PollData => {
  return {
    ...generateBaseEntity(),
    question: faker.lorem.sentence(),
    is_expired: faker.datatype.boolean(),
    allow_multiple: faker.datatype.boolean(),
    user_has_voted: faker.datatype.boolean(),
    expires_at: faker.date.future().toISOString(),
    total_votes: faker.number.int({ min: 0, max: 100 }),
    options: Array.from(
      { length: faker.number.int({ min: 2, max: 5 }) },
      generatePollOption
    ),
  };
};

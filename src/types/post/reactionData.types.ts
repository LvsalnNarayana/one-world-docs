// External
import { faker } from "@faker-js/faker";


// Parent, Sibling, Index
import type { ReactionType } from "./post.enums";
import { REACTIONS } from "../base/reaction.types";
import {
  type ReactionUserInterface,
  generateReactionUserInterface,
} from "./postUser.types";

export interface ReactionData {
  has_reacted: boolean;
  user_reaction_type?: ReactionType | null;
  user_reacted_at?: string;
  total_count: number;
  reaction_counts: Record<ReactionType, number>;
  recent_reactions: ReactionUserInterface[];
  has_more_reactions: boolean;
}

export const generateReactionData = (): ReactionData => {
  return {
    has_reacted: faker.datatype.boolean(),
    has_more_reactions: faker.datatype.boolean(),
    user_reacted_at: faker.date.recent().toISOString(),
    total_count: faker.number.int({ min: 0, max: 100 }),
    user_reaction_type: faker.helpers.arrayElement(REACTIONS),
    recent_reactions: Array.from(
      { length: faker.number.int({ min: 0, max: 10 }) },
      generateReactionUserInterface
    ),
    reaction_counts: REACTIONS.reduce(
      (acc, reaction) => ({
        ...acc,
        [reaction]: faker.number.int({ min: 0, max: 100 }),
      }),
      {} as Record<ReactionType, number>
    ),
  };
};

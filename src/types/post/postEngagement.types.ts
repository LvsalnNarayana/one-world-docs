// External
import { faker } from "@faker-js/faker";


// Parent, Sibling, Index
import { type ReactionData, generateReactionData } from "./reactionData.types";
import {
  type PostUserInterface,
  generatePostUserInterface,
} from "./postUser.types";

export interface PostEngagement {
  reactions: ReactionData;
  shares: {
    count: number;
    recent_shares: PostUserInterface[];
    has_more_shares: boolean;
  };
  views: { count: number; unique_views: number; last_viewed_at?: string };
  comment_count: number;
  engagement_score?: number;
}

export const generatePostEngagement = (): PostEngagement => {
  return {
    reactions: generateReactionData(),
    comment_count: faker.number.int({ min: 0, max: 100 }),
    engagement_score: faker.number.float({ min: 0, max: 100 }),
    views: {
      count: faker.number.int({ min: 0, max: 100 }),
      last_viewed_at: faker.date.recent().toISOString(),
      unique_views: faker.number.int({ min: 0, max: 100 }),
    },
    shares: {
      has_more_shares: faker.datatype.boolean(),
      count: faker.number.int({ min: 0, max: 100 }),
      recent_shares: Array.from(
        { length: faker.number.int({ min: 0, max: 10 }) },
        () =>
          ({
            ...generatePostUserInterface(),
          } as PostUserInterface)
      ),
    },
  };
};

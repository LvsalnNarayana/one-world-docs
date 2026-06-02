// External
import { faker } from "@faker-js/faker";


// Parent, Sibling, Index
import { type BaseEntity, generateBaseEntity } from "../base/base.types";
import { type ReactionData, generateReactionData } from "./reactionData.types";
import {
  type PostUserInterface,
  generatePostUserInterface,
} from "./postUser.types";

export interface PostCommentReply extends BaseEntity {
  content: string;
  replied_at: string;
  user: PostUserInterface;
  mentions: PostUserInterface[];
  reactions: ReactionData;
  is_edited: boolean;
  edited_at?: string;
  status: { is_deleted: boolean; is_reported: boolean; is_hidden: boolean };
}

export const generatePostCommentReply = (): PostCommentReply => {
  return {
    ...generateBaseEntity(),
    content: faker.lorem.sentence(),
    reactions: generateReactionData(),
    is_edited: faker.datatype.boolean(),
    edited_at: faker.date.recent().toISOString(),
    replied_at: faker.date.recent().toISOString(),
    user: {
      ...generatePostUserInterface(),
    },
    status: {
      is_hidden: faker.datatype.boolean(),
      is_deleted: faker.datatype.boolean(),
      is_reported: faker.datatype.boolean(),
    },
    mentions: Array.from(
      { length: faker.number.int({ min: 0, max: 10 }) },
      () =>
        ({
          ...generatePostUserInterface(),
        } as PostUserInterface)
    ),
  };
};

// External
import { faker } from "@faker-js/faker";


// Parent, Sibling, Index
import { type BaseEntity, generateBaseEntity } from "../base/base.types";
import { type ReactionData, generateReactionData } from "./reactionData.types";
import {
  type PostUserInterface,
  generatePostUserInterface,
} from "./postUser.types";
import {
  type PostCommentReply,
  generatePostCommentReply,
} from "./postCommentReply.types";

export interface PostComment extends BaseEntity {
  content: string;
  commented_at: string;
  user: PostUserInterface;
  mentions: PostUserInterface[];
  reactions: ReactionData;
  replies: {
    items: PostCommentReply[];
    total_count: number;
    has_more: boolean;
  };
  is_edited: boolean;
  edited_at?: string;
  status: {
    is_deleted: boolean;
    is_reported: boolean;
    is_hidden: boolean;
    is_pinned: boolean;
  };
}

export const generatePostComment = (): PostComment => {
  return {
    ...generateBaseEntity(),
    content: faker.lorem.sentence(),
    reactions: generateReactionData(),
    is_edited: faker.datatype.boolean(),
    edited_at: faker.date.recent().toISOString(),
    commented_at: faker.date.recent().toISOString(),
    user: {
      ...generatePostUserInterface(),
    },
    mentions: Array.from(
      { length: faker.number.int({ min: 0, max: 10 }) },
      () =>
        ({
          ...generatePostUserInterface(),
        } as PostUserInterface)
    ),
    status: {
      is_hidden: faker.datatype.boolean(),
      is_pinned: faker.datatype.boolean(),
      is_deleted: faker.datatype.boolean(),
      is_reported: faker.datatype.boolean(),
    },
    replies: {
      has_more: faker.datatype.boolean(),
      total_count: faker.number.int({ min: 0, max: 100 }),
      items: Array.from(
        { length: faker.number.int({ min: 0, max: 10 }) },
        () => ({
          ...generatePostCommentReply(),
        })
      ),
    },
  };
};

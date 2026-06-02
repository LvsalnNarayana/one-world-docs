// External
import { faker } from "@faker-js/faker";


// Parent, Sibling, Index
import type { NotificationType } from "./notification.constants";
import { type BaseEntity, generateBaseEntity } from "../base/base.types";

export interface Notification extends BaseEntity {
  read: boolean;
  type: NotificationType;
  content: string;
}

export const generateNotification = (): Notification => {
  return {
    ...generateBaseEntity(),
    read: faker.datatype.boolean(),
    content: faker.lorem.sentence(),
    type: faker.helpers.arrayElement([
      "post_like",
      "post_reaction",
      "post_comment",
      "post_comment_reaction",
      "post_comment_reply",
      "post_comment_reply_reaction",
      "post_report",
      "message",
      "message_reaction",
      "friend_request",
      "friend_request_accepted",
      "group",
      "group_invite",
      "group_join_request",
      "group_kick",
      "group_leave",
      "group_promote",
      "group_demote",
      "event",
      "event_invite",
      "event_leave",
      "event_kick",
      "event_promote",
      "doc_shared",
      "doc_comment",
    ]),
  };
};

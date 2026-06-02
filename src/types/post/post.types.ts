// External
import { faker } from "@faker-js/faker";


// Parent, Sibling, Index
import type { PostStatus } from "./post.enums";
import { generatePoll, type PollData } from "./poll.types";
import type { TimelineTarget } from "./postTimeline.types";
import { type Place, generatePlace } from "../place/place.types";
import { type Event, generateEvent } from "../event/event.types";
import { type Feeling, FEELINGS_LIST } from "../base/feelings.type";
import { type PostMedia, generatePostMedia } from "./postMedia.types";
import { type Website, generateWebsite } from "../user/userData.types";
import { type PostComment, generatePostComment } from "./postComment.types";
import { type Visibility, VISIBILITY_OPTIONS } from "../base/visibility.types";
import {
  type PostEngagement,
  generatePostEngagement,
} from "./postEngagement.types";
import {
  type UserReference,
  generateUserReference,
} from "../base/userReference.types";
import {
  type PostSubscriptions,
  generatePostSubscriptions,
} from "./postSubscriptions.types";
import {
  type BaseEntity,
  generateBaseEntity,
  type VisibilityMixin,
} from "../base/base.types";
import {
  type PostUserInterface,
  type PostAuthorInterface,
  generatePostUserInterface,
  generatePostAuthorInterface,
} from "./postUser.types";

export interface PostInterface extends BaseEntity {
  content: {
    text?: string;
    media: PostMedia[];
    poll?: PollData;
    event?: Event;
    link?: Website;
  };
  feeling: {
    feeling: Feeling;
    image: string;
  };
  publishing: {
    published_at: string;
    privacy: VisibilityMixin;
    allowed_users?: UserReference[];
    excluded_users?: UserReference[];
    allow_comments: boolean;
    allow_reactions: boolean;
    allow_sharing: boolean;
  };
  metadata: {
    hashtags: string[];
    location?: Place;
    tagged_users: PostUserInterface[];
    mentioned_users: PostUserInterface[];
    language?: string;
    content_warning?: string;
  };
  author: PostAuthorInterface;
  engagement: PostEngagement;
  comments: { items: PostComment[]; total_count: number; has_more: boolean };
  status: {
    current_status: PostStatus;
    is_draft: boolean;
    is_published: boolean;
    is_archived: boolean;
    is_deleted: boolean;
    is_reported: boolean;
    is_hidden: boolean;
    is_pinned: boolean;
    is_edited: boolean;
    edited_at?: string;
    has_comments: boolean;
    has_been_shared: boolean;
    user_has_interacted: boolean;
    is_tagged: boolean;
  };
  timeline?: TimelineTarget;
  subscriptions?: PostSubscriptions;
  analytics?: {
    views: { total: number; unique: number; by_day: Record<string, number> };
    engagement: {
      rate: number;
      peak_time: string;
      demographics: Record<string, number>;
    };
    reach: { organic: number; viral: number; total: number };
  };
}

export const generatePost = (): PostInterface => {
  return {
    ...generateBaseEntity(),
    engagement: generatePostEngagement(),
    author: generatePostAuthorInterface(),
    subscriptions: generatePostSubscriptions(),
    feeling: {
      image: faker.image.url(),
      feeling: faker.helpers.arrayElement(FEELINGS_LIST),
    },
    content: {
      poll: generatePoll(),
      event: generateEvent(),
      link: generateWebsite(),
      text: faker.lorem.sentence(),
      media: [generatePostMedia()],
    },
    comments: {
      total_count: faker.number.int(),
      has_more: faker.datatype.boolean(),
      items: Array.from({ length: faker.number.int(10) }, generatePostComment),
    },
    metadata: {
      content_warning: faker.lorem.sentence(),
      hashtags: faker.lorem.words(3).split(" "),
      tagged_users: [generatePostUserInterface()],
      mentioned_users: [generatePostUserInterface()],
      language: faker.helpers.arrayElement(["en", "fr", "es", "de", "it"]),
      location: faker.helpers.arrayElement([null, generatePlace()]) as Place,
    },
    status: {
      is_hidden: false,
      is_draft: false,
      is_tagged: true,
      is_pinned: false,
      is_edited: false,
      is_deleted: false,
      is_published: true,
      is_archived: false,
      is_reported: false,
      has_comments: true,
      has_been_shared: true,
      user_has_interacted: true,
      current_status: "published",
      edited_at: faker.date.recent().toISOString(),
    },
    publishing: {
      allow_sharing: faker.datatype.boolean(),
      allowed_users: [generateUserReference()],
      allow_comments: faker.datatype.boolean(),
      excluded_users: [generateUserReference()],
      allow_reactions: faker.datatype.boolean(),
      published_at: faker.date.recent().toISOString(),
      privacy: {
        visibility: faker.helpers.arrayElement(
          VISIBILITY_OPTIONS?.map((option) => option.value)
        ) as Visibility,
      },
    },
  };
};

export const generateMultiplePosts = (count: number): PostInterface[] => {
  return Array.from({ length: count }, generatePost);
};

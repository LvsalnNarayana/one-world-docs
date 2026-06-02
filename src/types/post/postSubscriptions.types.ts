// Parent, Sibling, Index
import {
  type PostSubscriptionUser,
  generatePostSubscriptionUser,
} from "./postUser.types";

export interface PostSubscriptions {
  subscribers: PostSubscriptionUser[];
  subscriber_count: number;
  user_subscribed: boolean;
  preferences: {
    notify_on_comments: boolean;
    notify_on_reactions: boolean;
    notify_on_shares: boolean;
    notify_on_mentions: boolean;
  };
}

export const generatePostSubscriptions = (): PostSubscriptions => {
  return {
    subscriber_count: 10,
    user_subscribed: true,
    preferences: {
      notify_on_shares: true,
      notify_on_comments: true,
      notify_on_mentions: true,
      notify_on_reactions: true,
    },
    subscribers: Array.from(
      { length: 10 },
      () =>
        ({
          ...generatePostSubscriptionUser(),
        } as PostSubscriptionUser)
    ),
  };
};

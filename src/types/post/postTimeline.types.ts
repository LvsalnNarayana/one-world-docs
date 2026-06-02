// Parent, Sibling, Index
import type { PostUserInterface } from "./postUser.types";

export interface TimelineTarget {
  timeline_owner: PostUserInterface;
  is_wall_post: boolean;
  is_approved: boolean;
  approved_at?: string;
  can_moderate: boolean;
  timeline_visibility: {
    visible_to_timeline_friends: boolean;
    visible_to_author_friends: boolean;
    custom_visibility?: string[];
  };
}
type WallPostPermission =
  | "everyone"
  | "friends"
  | "friends_of_friends"
  | "nobody";

export interface WallPostSettings {
  allow_wall_posts: boolean;
  wall_post_permission: WallPostPermission;
  require_approval: boolean;
  notify_on_wall_posts: boolean;
}

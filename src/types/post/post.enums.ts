// Parent, Sibling, Index
import type { Visibility } from "../base/visibility.types";
import type {
  ANGRY,
  CELEBRATE,
  HAHA,
  LIKE,
  LOVE,
  SAD,
  WOW,
} from "../base/reaction.types";

export type ReactionType =
  | typeof WOW
  | typeof LIKE
  | typeof LOVE
  | typeof HAHA
  | typeof SAD
  | typeof ANGRY
  | typeof CELEBRATE;

export type PostPrivacy = Visibility | "custom";

export type PostStatus =
  | "draft"
  | "published"
  | "archived"
  | "deleted"
  | "reported"
  | "hidden";

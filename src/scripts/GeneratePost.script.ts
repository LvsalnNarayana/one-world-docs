export { generatePost } from "../types/post/post.types";
export type { PostInterface } from "../types/post/post.types";

// Parent, Sibling, Index
import { generatePost } from "../types/post/post.types";
import type { PostInterface } from "../types/post/post.types";

export const generatePosts = (count: number): PostInterface[] =>
  Array.from({ length: count }, generatePost);

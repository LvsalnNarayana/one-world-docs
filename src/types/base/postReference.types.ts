// External
import { faker } from "@faker-js/faker";


// Parent, Sibling, Index
import {
  type PostAuthorInterface,
  generatePostAuthorInterface,
} from "../post/postUser.types";

export interface PostReference {
  postId: string;
  author: PostAuthorInterface;
}

export const generatePostReference = () => {
  return {
    postId: faker.string.uuid(),
    author: generatePostAuthorInterface(),
  };
};

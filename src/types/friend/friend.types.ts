// External
import { faker } from "@faker-js/faker";


// Parent, Sibling, Index
import {
  type UserReference,
  generateUserReference,
} from "../base/userReference.types";

export interface FriendRequest extends UserReference {
  requestedAt: string;
  status: "requested" | "accepted" | "declined" | "blocked" | "request_sent";
}

export interface Friend extends UserReference {
  friendsSince: string;
}

export const generateFriendRequest = (): FriendRequest => {
  return {
    ...generateUserReference(),
    requestedAt: faker.date.past().toISOString(),
    status: faker.helpers.arrayElement([
      "requested",
      "accepted",
      "declined",
      "blocked",
      "request_sent",
    ]),
  };
};

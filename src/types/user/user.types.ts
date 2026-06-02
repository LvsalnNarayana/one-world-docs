// External
import { faker } from "@faker-js/faker";


// Parent, Sibling, Index
import { type Work, generateWork } from "./work.types";
import { type Group, generateGroup } from "../group/group.types";
import type { PostReference } from "../base/postReference.types";
import { type Event, generateEvent } from "../event/event.types";
import { type UserInfo, generateUserInfo } from "./userInfo.types";
import { type Education, generateEducation } from "./education.types";
import type { Notification } from "../notification/notification.types";
import { type BaseEntity, generateBaseEntity } from "../base/base.types";
import { type UserPlace, generateUserPlace } from "../place/place.types";
import { type UserRole, USER_ROLES_OPTIONS } from "../base/userRole.types";
import {
  type AccountSettings,
  generateAccountSettings,
} from "./accountSettings.types";
import {
  type PrivacySettings,
  generatePrivacySettings,
} from "./privacySettings.types";
import {
  type UserReference,
  generateUserReference,
} from "../base/userReference.types";
import {
  type Friend,
  type FriendRequest,
  generateFriendRequest,
} from "../friend/friend.types";
import {
  type Email,
  type Phone,
  type Website,
  generateEmail,
  generatePhone,
  generateWebsite,
} from "./userData.types";

export type { Email, Phone, Website } from "./userData.types";
export type { Friend, FriendRequest } from "../friend/friend.types";
export type { UserReference } from "../base/userReference.types";
export type { Event } from "../event/event.types";
export type { PrivacySettings } from "./privacySettings.types";

export type PostSubscription = PostReference;

export interface User extends BaseEntity {
  username: string;
  role: UserRole;
  firstName: string;
  lastName: string;
  email: Email[];
  phone: Phone[];
  info: UserInfo;
  friends: Friend[];
  friendRequests: FriendRequest[];
  blockedUsers: UserReference[];
  posts: string[];
  websites: Website[];
  postSubscriptions: PostSubscription[];
  events: Event[];
  workHistory: Work[];
  education: Education[];
  places: UserPlace[];
  groups: Group[];
  notifications: Notification[];
  privacySettings: PrivacySettings;
  accountSettings: AccountSettings;
  isActive: boolean;
  isVerified: boolean;
  isDeleted: boolean;
  isBanned: boolean;
  sessions: string[];
  lastActive: string;
}

export const generateUser = (): User => {
  return {
    ...generateBaseEntity(),
    notifications: [],
    postSubscriptions: [],
    email: [generateEmail()],
    phone: [generatePhone()],
    info: generateUserInfo(),
    events: [generateEvent()],
    groups: [generateGroup()],
    posts: [faker.string.uuid()],
    websites: [generateWebsite()],
    workHistory: [generateWork()],
    places: [generateUserPlace()],
    sessions: [faker.string.uuid()],
    education: [generateEducation()],
    lastName: faker.person.lastName(),
    isActive: faker.datatype.boolean(),
    isBanned: faker.datatype.boolean(),
    username: faker.internet.username(),
    firstName: faker.person.firstName(),
    isDeleted: faker.datatype.boolean(),
    isVerified: faker.datatype.boolean(),
    blockedUsers: [generateUserReference()],
    friendRequests: [generateFriendRequest()],
    privacySettings: generatePrivacySettings(),
    accountSettings: generateAccountSettings(),
    lastActive: faker.date.past().toISOString(),
    role: faker.helpers.arrayElement(
      USER_ROLES_OPTIONS?.map((option) => option.value)
    ) as UserRole,
    friends: [
      {
        ...generateUserReference(),
        friendship_status: "friends",
        friendsSince: faker.date.past().toISOString(),
        mutualFriendsCount: faker.number.int({ min: 0, max: 100 }),
      },
    ],
  };
};

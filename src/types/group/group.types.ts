// External
import { faker } from "@faker-js/faker";


// Parent, Sibling, Index
import type { UserReference } from "../base/userReference.types";
import type { FriendshipStatus } from "../base/friendshipStatus.types";
import { type BaseEntity, generateBaseEntity } from "../base/base.types";
import { type Visibility, VISIBILITY_OPTIONS } from "../base/visibility.types";

// Group Categories
export const GROUP_CATEGORIES = [
  "Technology",
  "Sports",
  "Music",
  "Art",
  "Business",
  "Education",
  "Gaming",
  "Travel",
  "Food",
  "Health",
  "Other",
] as const;

export type GroupCategory = (typeof GROUP_CATEGORIES)[number];

// Privacy Options
export const PRIVACY_OPTIONS = ["private", "public", "restricted"] as const;
export type GroupPrivacy = (typeof PRIVACY_OPTIONS)[number];

// User Roles
export const USER_ROLES = ["Member", "Admin", "Moderator", "Owner"] as const;
export type UserRole = (typeof USER_ROLES)[number];

// Activity Status
export const ACTIVITY_STATUSES = ["active", "inactive", "archived"] as const;
export type ActivityStatus = (typeof ACTIVITY_STATUSES)[number];

// Verification Status
export const VERIFICATION_STATUSES = [
  "verified",
  "unverified",
  "pending",
] as const;
export type VerificationStatus = (typeof VERIFICATION_STATUSES)[number];

export interface Group extends BaseEntity {
  id: string;
  name: string;
  description: string;
  icon: string;
  coverImage?: string;
  role: UserRole;
  privacy: GroupPrivacy;
  visibility: Visibility;
  category: GroupCategory;
  tags: string[];
  location?: {
    city: string;
    country: string;
    coordinates?: {
      lat: number;
      lng: number;
    };
  };
  members_count: number;
  max_members_count: number;
  pending_requests_count: number;
  joined_at: string;
  created_at: string;
  activity_status: ActivityStatus;
  last_activity: string;
  owner: UserReference;
  admins: UserReference[];
  moderators: UserReference[];
  rules: string[];
  links: {
    website?: string;
    social_media?: {
      facebook?: string;
      twitter?: string;
      instagram?: string;
      linkedin?: string;
    };
  };
  settings: {
    allow_member_posts: boolean;
    require_approval_for_posts: boolean;
    allow_member_invites: boolean;
    show_member_list: boolean;
    allow_discussions: boolean;
  };
  stats: {
    posts_count: number;
    events_count: number;
    weekly_active_members: number;
    growth_rate: number;
  };
  verification_status: VerificationStatus;
  featured: boolean;
  trending_score: number;
}

export const generateGroup = (): Group => {
  const membersCount = faker.number.int({ min: 10, max: 50000 });
  const maxMembersCount = faker.number.int({ max: 100000, min: membersCount });

  return {
    ...generateBaseEntity(),
    icon: faker.image.avatar(),
    members_count: membersCount,
    max_members_count: maxMembersCount,
    featured: faker.datatype.boolean(),
    joined_at: faker.date.past().toISOString(),
    role: faker.helpers.arrayElement(USER_ROLES),
    last_activity: faker.date.recent().toISOString(),
    privacy: faker.helpers.arrayElement(PRIVACY_OPTIONS),
    description: faker.lorem.paragraph({ min: 2, max: 4 }),
    category: faker.helpers.arrayElement(GROUP_CATEGORIES),
    created_at: faker.date.past({ years: 3 }).toISOString(),
    coverImage: faker.image.url({ width: 1200, height: 400 }),
    pending_requests_count: faker.number.int({ min: 0, max: 100 }),
    activity_status: faker.helpers.arrayElement(ACTIVITY_STATUSES),
    verification_status: faker.helpers.arrayElement(VERIFICATION_STATUSES),
    trending_score: faker.number.float({ min: 0, max: 100, fractionDigits: 2 }),
    rules: faker.helpers.multiple(() => faker.lorem.sentence(), {
      count: { min: 3, max: 8 },
    }),
    visibility: faker.helpers.arrayElement(
      VISIBILITY_OPTIONS?.map(({ value }) => value)
    ) as Visibility,
    name:
      faker.company.name() +
      " " +
      faker.helpers.arrayElement([
        "Community",
        "Group",
        "Club",
        "Society",
        "Network",
      ]),
    location: faker.datatype.boolean()
      ? {
          city: faker.location.city(),
          country: faker.location.country(),
          coordinates: {
            lat: faker.location.latitude(),
            lng: faker.location.longitude(),
          },
        }
      : undefined,
    settings: {
      show_member_list: faker.datatype.boolean(),
      allow_discussions: faker.datatype.boolean(),
      allow_member_posts: faker.datatype.boolean(),
      allow_member_invites: faker.datatype.boolean(),
      require_approval_for_posts: faker.datatype.boolean(),
    },
    stats: {
      events_count: faker.number.int({ min: 0, max: 500 }),
      posts_count: faker.number.int({ min: 0, max: 10000 }),
      weekly_active_members: faker.number.int({ min: 0, max: membersCount }),
      growth_rate: faker.number.float({ max: 50, min: -10, fractionDigits: 2 }),
    },
    tags: faker.helpers.arrayElements(
      [
        "community",
        "networking",
        "learning",
        "events",
        "discussion",
        "professional",
        "hobby",
        "local",
        "global",
        "beginner",
        "advanced",
      ],
      { min: 2, max: 5 }
    ),
    owner: {
      id: faker.string.uuid(),
      lastName: faker.person.lastName(),
      username: faker.internet.userName(),
      firstName: faker.person.firstName(),
      mutualFriendsCount: faker.number.int({ min: 0, max: 50 }),
      friendship_status: faker.helpers.arrayElement([
        "friends",
        "pending",
        "blocked",
      ]) as FriendshipStatus,
    },
    links: {
      website: faker.datatype.boolean() ? faker.internet.url() : undefined,
      social_media: {
        twitter: faker.datatype.boolean() ? faker.internet.url() : undefined,
        facebook: faker.datatype.boolean() ? faker.internet.url() : undefined,
        linkedin: faker.datatype.boolean() ? faker.internet.url() : undefined,
        instagram: faker.datatype.boolean() ? faker.internet.url() : undefined,
      },
    },
    admins: faker.helpers.multiple(
      () => ({
        id: faker.string.uuid(),
        lastName: faker.person.lastName(),
        username: faker.internet.userName(),
        firstName: faker.person.firstName(),
        mutualFriendsCount: faker.number.int({ min: 0, max: 50 }),
        friendship_status: faker.helpers.arrayElement([
          "friends",
          "pending",
          "blocked",
        ]) as FriendshipStatus,
      }),
      { count: { min: 1, max: 3 } }
    ),
    moderators: faker.helpers.multiple(
      () => ({
        id: faker.string.uuid(),
        lastName: faker.person.lastName(),
        username: faker.internet.userName(),
        firstName: faker.person.firstName(),
        mutualFriendsCount: faker.number.int({ min: 0, max: 50 }),
        friendship_status: faker.helpers.arrayElement([
          "friends",
          "pending",
          "blocked",
        ]) as FriendshipStatus,
      }),
      { count: { min: 0, max: 5 } }
    ),
  };
};

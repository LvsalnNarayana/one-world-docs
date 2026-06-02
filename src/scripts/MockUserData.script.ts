// Parent, Sibling, Index
import type { Work } from "../types/user/work.types";
import type { Event } from "../types/event/event.types";
import type { Group } from "../types/group/group.types";
import { generateEvent } from "../types/event/event.types";
import { generateGroup } from "../types/group/group.types";
import type { UserRole } from "../types/base/userRole.types";
import type { UserInfo } from "../types/user/userInfo.types";
import type { Education } from "../types/user/education.types";
import { generateUserPlace } from "../types/place/place.types";
import type { UserReference } from "../types/base/userReference.types";
import type { Email, Phone, Website } from "../types/user/userData.types";
import type { Friend, FriendRequest } from "../types/friend/friend.types";
import { generatePostReference } from "../types/base/postReference.types";
import type { PrivacySettings } from "../types/user/privacySettings.types";
import type { AccountSettings } from "../types/user/accountSettings.types";
import type {
  User,
  PostSubscription,
} from "../types/user/user.types";
import type { Notification } from "../types/notification/notification.types";
import type { Place, Address, Coordinates } from "../types/place/place.types";
import { generateNotification } from "../types/notification/notification.types";

// Helper function to generate random IDs
const generateId = (): string => Math.random().toString(36).substr(2, 9);

// Helper function to generate random dates
const generateRandomDate = (daysBack: number = 365): string => {
  const date = new Date();
  date.setDate(date.getDate() - Math.floor(Math.random() * daysBack));
  return date.toISOString();
};

// Helper function to generate random usernames
const generateUsername = (): string => {
  const adjectives = [
    "cool",
    "smart",
    "funny",
    "awesome",
    "creative",
    "bright",
    "amazing",
    "stellar",
    "dynamic",
    "vibrant",
  ];
  const nouns = [
    "user",
    "coder",
    "dev",
    "ninja",
    "guru",
    "master",
    "pro",
    "ace",
    "star",
    "hero",
  ];
  const randomNum = Math.floor(Math.random() * 1000);
  return `${adjectives[Math.floor(Math.random() * adjectives.length)]}${
    nouns[Math.floor(Math.random() * nouns.length)]
  }${randomNum}`;
};

// Helper function to generate random names
const generateFirstName = (): string => {
  const names = [
    "John",
    "Jane",
    "Mike",
    "Sarah",
    "David",
    "Emily",
    "Chris",
    "Lisa",
    "Alex",
    "Maria",
    "James",
    "Anna",
    "Robert",
    "Emma",
    "Michael",
    "Olivia",
    "William",
    "Sophia",
    "Daniel",
    "Isabella",
    "Matthew",
    "Mia",
    "Andrew",
    "Charlotte",
  ];
  return names[Math.floor(Math.random() * names.length)];
};

const generateLastName = (): string => {
  const names = [
    "Smith",
    "Johnson",
    "Williams",
    "Brown",
    "Jones",
    "Garcia",
    "Miller",
    "Davis",
    "Rodriguez",
    "Martinez",
    "Hernandez",
    "Lopez",
    "Gonzalez",
    "Wilson",
    "Anderson",
    "Thomas",
    "Taylor",
    "Moore",
    "Jackson",
    "Martin",
    "Lee",
    "Perez",
    "Thompson",
  ];
  return names[Math.floor(Math.random() * names.length)];
};

// Generate mock coordinates
const generateMockCoordinates = (): Coordinates => ({
  latitude: (Math.random() - 0.5) * 180,
  longitude: (Math.random() - 0.5) * 360,
  accuracy: Math.floor(Math.random() * 100) + 1,
});

// Generate mock address
const generateMockAddress = (): Address => {
  const cities = [
    "New York",
    "Los Angeles",
    "Chicago",
    "Houston",
    "Phoenix",
    "Philadelphia",
    "San Antonio",
    "San Diego",
  ];
  const states = ["NY", "CA", "IL", "TX", "AZ", "PA", "TX", "CA"];
  const countries = ["United States", "Canada", "United Kingdom", "Australia"];
  const countryCodes = ["US", "CA", "GB", "AU"];

  const cityIndex = Math.floor(Math.random() * cities.length);
  const countryIndex = Math.floor(Math.random() * countries.length);

  return {
    city: cities[cityIndex],
    state: states[cityIndex],
    country: countries[countryIndex],
    countryCode: countryCodes[countryIndex],
    postalCode: `${Math.floor(Math.random() * 90000) + 10000}`,
    street: `${Math.floor(Math.random() * 9999) + 1} ${
      ["Main", "Oak", "Pine", "Maple", "Cedar"][Math.floor(Math.random() * 5)]
    } St`,
  };
};

// Generate mock place
const generateMockPlace = (): Place => {
  const placeNames = [
    "Central Park",
    "Downtown Office",
    "University Campus",
    "Shopping Mall",
    "Coffee Shop",
    "Gym",
    "Library",
  ];
  const name = placeNames[Math.floor(Math.random() * placeNames.length)];
  const address = generateMockAddress();

  return {
    id: generateId(),
    name,
    address,
    timezone: "America/New_York",
    isActive: Math.random() > 0.1,
    createdAt: generateRandomDate(),
    updatedAt: generateRandomDate(),
    coordinates: generateMockCoordinates(),
    placeTag: `${name.toLowerCase().replace(/\s+/g, "-")}-${address.city
      .toLowerCase()
      .replace(/\s+/g, "-")}`,
  };
};

// Mock data generators for nested interfaces
const generateMockEmail = (): Email => ({
  id: generateId(),
  primary: Math.random() > 0.5,
  verified: Math.random() > 0.5,
  createdAt: generateRandomDate(),
  updatedAt: generateRandomDate(),
  email: `${generateUsername()}@example.com`,
  visibility: ["public", "friends", "only_me"][
    Math.floor(Math.random() * 3)
  ] as any,
});

const generateMockPhone = (): Phone => ({
  id: generateId(),
  country: "US",
  countryCode: "+1",
  primary: Math.random() > 0.5,
  verified: Math.random() > 0.5,
  createdAt: generateRandomDate(),
  updatedAt: generateRandomDate(),
  phone: `${Math.floor(Math.random() * 9000000000) + 1000000000}`,
  visibility: ["public", "friends", "only_me"][
    Math.floor(Math.random() * 3)
  ] as any,
});

const generateMockUserReference = (): UserReference => ({
  id: generateId(),
  username: generateUsername(),
  lastName: generateLastName(),
  friendship_status: "friends",
  firstName: generateFirstName(),
  mutualFriendsCount: Math.floor(Math.random() * 50),
});

const generateMockFriend = (): Friend => ({
  ...generateMockUserReference(),
  friendsSince: generateRandomDate(1000),
  mutualFriendsCount: Math.floor(Math.random() * 50),
});

const generateMockFriendRequest = (): FriendRequest => ({
  ...generateMockUserReference(),
  requestedAt: generateRandomDate(30),
  mutualFriendsCount: Math.floor(Math.random() * 20),
  status: ["requested", "accepted", "declined", "blocked", "request_sent"][
    Math.floor(Math.random() * 5)
  ] as any,
});

const generateMockWebsite = (): Website => ({
  id: generateId(),
  createdAt: generateRandomDate(),
  updatedAt: generateRandomDate(),
  title: `${generateFirstName()}'s Portfolio`,
  url: `https://www.${generateUsername()}.com`,
  visibility: ["public", "friends", "only_me"][
    Math.floor(Math.random() * 3)
  ] as any,
});

const generateMockPostSubscription = (): PostSubscription =>
  generatePostReference();

const generateMockEvent = (): Event => generateEvent();

const generateMockPrivacySettings = (): PrivacySettings => ({
  messagePrivacy: ["public", "friends", "only_me"][
    Math.floor(Math.random() * 3)
  ] as any,
  profileVisibility: ["public", "friends", "only_me"][
    Math.floor(Math.random() * 3)
  ] as any,
  timelinePostPrivacy: ["public", "friends", "only_me"][
    Math.floor(Math.random() * 3)
  ] as any,
});

const generateMockAccountSettings = (): AccountSettings => ({
  language: "en",
  timezone: "America/New_York",
  smsNotifications: Math.random() > 0.5,
  twoFactorEnabled: Math.random() > 0.5,
  emailNotifications: Math.random() > 0.5,
});

// Generate mock notification with proper structure
const generateMockNotification = (): Notification => generateNotification();

// Generate mock work with proper structure
const generateMockWork = (): Work => {
  const companies = [
    "Google",
    "Microsoft",
    "Apple",
    "Amazon",
    "Meta",
    "Netflix",
    "Tesla",
    "Spotify",
    "Uber",
    "Airbnb",
  ];
  const positions = [
    "Software Engineer",
    "Senior Developer",
    "Product Manager",
    "Data Scientist",
    "UX Designer",
    "DevOps Engineer",
  ];
  const isCurrent = Math.random() > 0.7;
  const startDate = generateRandomDate(2000);

  return {
    id: generateId(),
    startDate,
    current: isCurrent,
    place: generateMockPlace(),
    endDate: isCurrent ? "" : generateRandomDate(100),
    company: companies[Math.floor(Math.random() * companies.length)],
    position: positions[Math.floor(Math.random() * positions.length)],
    visibility: ["public", "friends", "only_me"][
      Math.floor(Math.random() * 3)
    ] as any,
    description: `Working as a ${
      positions[Math.floor(Math.random() * positions.length)]
    } with focus on innovative solutions and team collaboration.`,
  };
};

// Generate mock education with proper structure
const generateMockEducation = (): Education => {
  const schools = [
    "Harvard University",
    "MIT",
    "Stanford University",
    "UC Berkeley",
    "Yale University",
    "Princeton University",
  ];
  const degrees = [
    "Bachelor of Science",
    "Master of Science",
    "Bachelor of Arts",
    "Master of Arts",
    "PhD",
    "Associate Degree",
  ];
  const isCurrent = Math.random() > 0.8;
  const startDate = generateRandomDate(3000);

  return {
    id: generateId(),
    startDate,
    current: isCurrent,
    place: generateMockPlace(),
    endDate: isCurrent ? "" : generateRandomDate(500),
    school: schools[Math.floor(Math.random() * schools.length)],
    degree: degrees[Math.floor(Math.random() * degrees.length)],
    visibility: ["public", "friends", "only_me"][
      Math.floor(Math.random() * 3)
    ] as Education["visibility"],
    description: `Studied ${
      degrees[Math.floor(Math.random() * degrees.length)]
    } with focus on computer science and technology.`,
  };
};

// Generate mock group with proper structure
const generateMockGroup = (): Group => generateGroup();

// Mock generators for UserInfo (basic implementation - adjust based on actual interface)
const generateMockUserInfo = (): UserInfo =>
  ({
    gender: "female",
    bio: "This is a mock bio.",
    relationship: {
      status: "Single",
      visibility: "public",
    },
    birthdate: {
      visibility: "public",
      date: generateRandomDate(18),
    },
    hobbies: {
      visibility: "public",
      values: ["Reading", "Painting"],
    },
    languages: {
      visibility: "public",
      values: ["English", "Spanish"],
    },
    interests: {
      visibility: "public",
      values: ["Travel", "Photography"],
    },
  } as UserInfo);

/**
 * Generates mock data for a User interface
 * @param overrides - Optional partial User object to override default values
 * @returns Complete User object with mock data
 */
export const generateMockUser = (overrides?: Partial<User>): User => {
  const firstName = generateFirstName();
  const lastName = generateLastName();
  const username = generateUsername();

  const mockUser: User = {
    id: generateId(),
    username,
    lastName,
    firstName,
    role: "user" as UserRole,
    info: generateMockUserInfo(),
    isActive: Math.random() > 0.1,
    isDeleted: Math.random() > 0.9,
    isBanned: Math.random() > 0.95,
    createdAt: generateRandomDate(),
    updatedAt: generateRandomDate(),
    isVerified: Math.random() > 0.3,
    lastActive: generateRandomDate(7),
    privacySettings: generateMockPrivacySettings(),
    accountSettings: generateMockAccountSettings(),
    posts: Array.from({ length: Math.floor(Math.random() * 50) + 10 }, () =>
      generateId()
    ),
    events: Array.from(
      { length: Math.floor(Math.random() * 5) },
      generateMockEvent
    ),
    places: Array.from(
      { length: Math.floor(Math.random() * 5) },
      generateUserPlace
    ),
    groups: Array.from(
      { length: Math.floor(Math.random() * 8) },
      generateMockGroup
    ),
    sessions: Array.from({ length: Math.floor(Math.random() * 3) + 1 }, () =>
      generateId()
    ),
    email: Array.from(
      { length: Math.floor(Math.random() * 3) + 1 },
      generateMockEmail
    ),
    phone: Array.from(
      { length: Math.floor(Math.random() * 2) + 1 },
      generateMockPhone
    ),
    websites: Array.from(
      { length: Math.floor(Math.random() * 3) },
      generateMockWebsite
    ),
    friends: Array.from(
      { length: Math.floor(Math.random() * 20) + 5 },
      generateMockFriend
    ),
    workHistory: Array.from(
      { length: Math.floor(Math.random() * 3) + 1 },
      generateMockWork
    ),
    education: Array.from(
      { length: Math.floor(Math.random() * 2) + 1 },
      generateMockEducation
    ),
    blockedUsers: Array.from(
      { length: Math.floor(Math.random() * 3) },
      generateMockUserReference
    ),
    friendRequests: Array.from(
      { length: Math.floor(Math.random() * 5) },
      generateMockFriendRequest
    ),
    notifications: Array.from(
      { length: Math.floor(Math.random() * 15) + 5 },
      generateMockNotification
    ),
    postSubscriptions: Array.from(
      { length: Math.floor(Math.random() * 10) },
      generateMockPostSubscription
    ),
  };

  return { ...mockUser, ...overrides };
};

/**
 * Generates an array of mock users
 * @param count - Number of users to generate
 * @returns Array of User objects with mock data
 */
export const generateMockUsers = (count: number): User[] => {
  return Array.from({ length: count }, () => generateMockUser());
};

/**
 * Generates a mock user with specific characteristics
 * @param type - Type of user to generate ('active', 'new', 'inactive', 'verified')
 * @returns User object with mock data matching the specified type
 */
export const generateMockUserByType = (
  type: "active" | "new" | "inactive" | "verified"
): User => {
  const baseUser = generateMockUser();

  switch (type) {
    case "active":
      return generateMockUser({
        ...baseUser,
        isActive: true,
        lastActive: generateRandomDate(1),
        posts: Array.from(
          { length: Math.floor(Math.random() * 100) + 50 },
          () => generateId()
        ),
        friends: Array.from(
          { length: Math.floor(Math.random() * 50) + 20 },
          generateMockFriend
        ),
        notifications: Array.from(
          { length: Math.floor(Math.random() * 25) + 10 },
          generateMockNotification
        ),
      });

    case "new":
      return generateMockUser({
        ...baseUser,
        workHistory: [],
        isVerified: false,
        createdAt: generateRandomDate(7),
        posts: Array.from({ length: Math.floor(Math.random() * 5) }, () =>
          generateId()
        ),
        friends: Array.from(
          { length: Math.floor(Math.random() * 5) },
          generateMockFriend
        ),
        education: Array.from(
          { length: Math.floor(Math.random() * 1) + 1 },
          generateMockEducation
        ),
        notifications: Array.from(
          { length: Math.floor(Math.random() * 5) + 1 },
          generateMockNotification
        ),
      });

    case "inactive":
      return generateMockUser({
        ...baseUser,
        isActive: false,
        lastActive: generateRandomDate(90),
        notifications: Array.from(
          { length: Math.floor(Math.random() * 30) + 20 },
          () => ({ ...generateMockNotification(), read: false })
        ),
      });

    case "verified":
      return generateMockUser({
        ...baseUser,
        isVerified: true,
        accountSettings: {
          ...generateMockAccountSettings(),
          twoFactorEnabled: true,
        },
        email: [
          {
            ...generateMockEmail(),
            verified: true,
            primary: false,
          },
        ],
        phone: [
          {
            ...generateMockPhone(),
            verified: true,
            primary: false,
          },
        ],
      });

    default:
      return baseUser;
  }
};

/**
 * Generates a mock user with custom profile data
 * @param profileType - Type of profile ('student', 'professional', 'entrepreneur', 'freelancer')
 * @returns User object with mock data matching the specified profile type
 */
export const generateMockUserByProfile = (
  profileType: "student" | "professional" | "entrepreneur" | "freelancer"
): User => {
  const baseUser = generateMockUser();

  switch (profileType) {
    case "student":
      return generateMockUser({
        ...baseUser,
        education: Array.from(
          { length: Math.floor(Math.random() * 2) + 1 },
          () => ({ ...generateMockEducation(), current: true })
        ),
        workHistory: Array.from(
          { length: Math.floor(Math.random() * 2) },
          () => ({
            ...generateMockWork(),
            position: ["Intern", "Part-time Assistant", "Research Assistant"][
              Math.floor(Math.random() * 3)
            ],
          })
        ),
        groups: Array.from(
          { length: Math.floor(Math.random() * 5) + 3 },
          () => ({
            ...generateMockGroup(),
            name: [
              "Study Group",
              "University Club",
              "Academic Society",
              "Student Union",
            ][Math.floor(Math.random() * 4)],
          })
        ),
      });

    case "professional":
      return generateMockUser({
        ...baseUser,
        isVerified: true,
        workHistory: Array.from(
          { length: Math.floor(Math.random() * 4) + 2 },
          generateMockWork
        ),
        education: Array.from(
          { length: Math.floor(Math.random() * 3) + 1 },
          generateMockEducation
        ),
        websites: Array.from(
          { length: Math.floor(Math.random() * 2) + 1 },
          () => ({
            ...generateMockWebsite(),
            title: "Professional Portfolio",
          })
        ),
      });

    case "entrepreneur":
      return generateMockUser({
        ...baseUser,
        websites: Array.from(
          { length: Math.floor(Math.random() * 3) + 1 },
          generateMockWebsite
        ),
        groups: Array.from(
          { length: Math.floor(Math.random() * 6) + 2 },
          () => ({
            ...generateMockGroup(),
            role: ["Admin", "Moderator"][Math.floor(Math.random() * 2)] as any,
            name: [
              "Entrepreneurs Network",
              "Business Leaders",
              "Startup Community",
            ][Math.floor(Math.random() * 3)],
          })
        ),
        workHistory: Array.from(
          { length: Math.floor(Math.random() * 3) + 1 },
          () => ({
            ...generateMockWork(),
            position: ["Founder", "CEO", "Co-founder", "Business Owner"][
              Math.floor(Math.random() * 4)
            ],
            company: [
              "Startup Inc",
              "Innovation Labs",
              "Tech Ventures",
              "Digital Solutions",
            ][Math.floor(Math.random() * 4)],
          })
        ),
      });

    case "freelancer":
      return generateMockUser({
        ...baseUser,
        websites: Array.from(
          { length: Math.floor(Math.random() * 2) + 1 },
          () => ({
            ...generateMockWebsite(),
            title: "Portfolio & Services",
          })
        ),
        workHistory: Array.from(
          { length: Math.floor(Math.random() * 5) + 2 },
          () => ({
            ...generateMockWork(),
            current: Math.random() > 0.3,
            position: [
              "Freelance Designer",
              "Independent Consultant",
              "Contract Developer",
              "Freelance Writer",
            ][Math.floor(Math.random() * 4)],
          })
        ),
      });

    default:
      return baseUser;
  }
};

// Export individual generators for reuse
export {
  generateMockEmail,
  generateMockPhone,
  generateMockUserReference,
  generateMockFriend,
  generateMockFriendRequest,
  generateMockWebsite,
  generateMockEvent,
  generateMockPrivacySettings,
  generateMockAccountSettings,
  generateMockNotification,
  generateMockWork,
  generateMockEducation,
  generateMockGroup,
  generateMockPlace,
  generateMockUserInfo,
  generateId,
  generateRandomDate,
  generateUsername,
  generateFirstName,
  generateLastName,
};

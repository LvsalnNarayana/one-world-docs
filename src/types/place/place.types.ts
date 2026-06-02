// =============================================================================
// BASE PLACE TYPES
// =============================================================================

// External
import { faker } from "@faker-js/faker";


// Parent, Sibling, Index
import {
  type BaseEntity,
  generateBaseEntity,
  type VisibilityMixin,
} from "../base/base.types";

export interface Coordinates {
  latitude: number;
  longitude: number;
  accuracy?: number; // GPS accuracy in meters
}

export interface Address {
  street?: string;
  city: string;
  state: string;
  country: string;
  postalCode?: string;
  countryCode: string; // ISO 3166-1 alpha-2 code (e.g., "US", "IN")
}

// =============================================================================
// PLACE INTERFACE
// =============================================================================

export interface Place extends BaseEntity {
  name?: string; // Display name (e.g., "Central Park", "Home", "Office")
  placeTag: string; // Unique readable tag (e.g., "central-park-nyc", "home-mumbai")

  // Location data
  address: Address;
  coordinates: Coordinates;
  timezone?: string; // IANA timezone (e.g., "America/New_York")
  isActive: boolean;
}

// =============================================================================
// PLACE TYPES & CATEGORIES
// =============================================================================

export type PlaceType =
  | "home"
  | "work"
  | "school"
  | "restaurant"
  | "hotel"
  | "landmark"
  | "park"
  | "hospital"
  | "airport"
  | "station"
  | "shopping"
  | "entertainment"
  | "other";

// =============================================================================
// USER-SPECIFIC PLACE ASSOCIATIONS
// =============================================================================

export interface UserPlace extends BaseEntity, VisibilityMixin {
  placeId: string; // References Place.id
  userId: string;
  placeType: PlaceType;
  isCurrent: boolean;
  isHometown?: boolean;
  isFavorite?: boolean;
  notes?: string;
}

// =============================================================================
// UTILITY INTERFACES
// =============================================================================

export interface PlaceSearchResult extends Place {
  distance?: number; // Distance from search point in kilometers
  relevanceScore?: number;
}

export interface PlaceStats {
  totalUsers: number;
  currentUsers: number;
  checkinsCount: number;
}

export interface PlaceWithStats extends Place {
  stats: PlaceStats;
}

// =============================================================================
// CONSTANTS
// =============================================================================

export const PLACE_TYPES = [
  { label: "Home", value: "home" as const },
  { label: "Work", value: "work" as const },
  { label: "School", value: "school" as const },
  { label: "Restaurant", value: "restaurant" as const },
  { label: "Hotel", value: "hotel" as const },
  { label: "Landmark", value: "landmark" as const },
  { label: "Park", value: "park" as const },
  { label: "Hospital", value: "hospital" as const },
  { label: "Airport", value: "airport" as const },
  { label: "Station", value: "station" as const },
  { label: "Shopping", value: "shopping" as const },
  { label: "Entertainment", value: "entertainment" as const },
  { label: "Other", value: "other" as const },
];

// =============================================================================
// UTILITY FUNCTIONS
// =============================================================================

export const generatePlaceTag = (
  city: string,
  state: string,
  country: string,
  name?: string
): string => {
  const parts = [name, city, state, country].filter(Boolean);
  return parts
    .join("-")
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, "")
    .replace(/-+/g, "-")
    .trim();
};

export const formatPlaceDisplay = (place: Place): string => {
  const { name, address } = place;
  if (name) {
    return `${name}, ${address.city}, ${address.state}`;
  }
  return `${address.city}, ${address.state}, ${address.country}`;
};

export const generatePlace = (): Place => {
  const name = faker.location.streetAddress();
  const city = faker.location.city();
  const state = faker.location.state();
  const country = faker.location.country();
  const coordinates = {
    latitude: faker.location.latitude(),
    longitude: faker.location.longitude(),
  };
  const timezone = faker.location.timeZone();
  const isActive = faker.datatype.boolean();
  const placeTag = generatePlaceTag(city, state, country, name);
  const address = {
    city,
    state,
    country,
    postalCode: faker.location.zipCode(),
    street: faker.location.streetAddress(),
    countryCode: faker.location.countryCode(),
  };
  return {
    ...generateBaseEntity(),
    name,
    address,
    placeTag,
    timezone,
    isActive,
    coordinates,
  };
};

export const generateUserPlace = (): UserPlace => {
  const place = generatePlace();
  const userId = faker.string.uuid();
  const placeType = faker.helpers.arrayElement(PLACE_TYPES).value;
  const isCurrent = faker.datatype.boolean();
  const isHometown = faker.datatype.boolean();
  const isFavorite = faker.datatype.boolean();
  const notes = faker.lorem.sentence();
  return {
    ...generateBaseEntity(),
    notes,
    userId,
    placeType,
    isCurrent,
    isHometown,
    isFavorite,
    placeId: place.id,
    visibility: "public",
  };
};

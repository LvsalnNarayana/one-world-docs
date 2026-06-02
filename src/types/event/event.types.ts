// External
import { faker } from "@faker-js/faker";


// Parent, Sibling, Index
import { type Place, generatePlace } from "../place/place.types";
import { type EventGuest, generateEventGuest } from "./eventGuest.types";
import { type BaseEntity, generateBaseEntity } from "../base/base.types";
import { type Recurrence, generateRecurrency } from "./eventRecurrence.types";
import { type Visibility, VISIBILITY_OPTIONS } from "../base/visibility.types";
import {
  TIMEZONE_OPTIONS,
  type TimezoneOptions,
} from "../base/timezones.types";
import {
  type EventAnalytics,
  generateEventAnalytics,
} from "./eventAnalytics.types";
import {
  type EventOrganizer,
  generateEventOrganizer,
} from "./eventOrganizer.types";
import {
  type EventAttachment,
  generateEventAttachment,
} from "./eventAttachment.types";
import {
  type UserReference,
  generateUserReference,
} from "../base/userReference.types";
import {
  type EventGuestPermissions,
  generateEventGuestPermissions,
} from "./eventGuestPermissions.types";
import {
  type EventReminderNotificationSettings,
  generateEventReminderNotificationSettings,
} from "./eventReminderNotificationSettings.types";

export type EventStatus = "tentative" | "confirmed" | "cancelled" | "draft";

export const EVENT_STATUS_OPTIONS: EventStatus[] = [
  "tentative",
  "confirmed",
  "cancelled",
  "draft",
];

export type EventPriority = "low" | "normal" | "high" | "urgent";
export const EVENT_PRIORITY_OPTIONS: EventPriority[] = [
  "low",
  "normal",
  "high",
  "urgent",
];

export type EventType =
  | "meeting"
  | "appointment"
  | "reminder"
  | "task"
  | "birthday"
  | "holiday"
  | "personal"
  | "work"
  | "travel"
  | "health"
  | "education"
  | "social"
  | "custom";
export const EVENT_TYPE_OPTIONS: EventType[] = [
  "meeting",
  "appointment",
  "reminder",
  "task",
  "birthday",
  "holiday",
  "personal",
  "work",
  "travel",
  "health",
  "education",
  "social",
  "custom",
];

export type EventReminderNotificationType =
  | "email"
  | "sms"
  | "push"
  | "desktop";

export const EVENT_REMINDER_NOTIFICATION_TYPE_OPTIONS: EventReminderNotificationType[] =
  ["email", "sms", "push", "desktop"];

export interface Event extends BaseEntity {
  eventId: string;
  title: string;
  description?: string;

  startTime: string;
  endTime: string;
  timezone: TimezoneOptions;
  isAllDay?: boolean;

  status: {
    isOpen: boolean;
    isCompleted: boolean;
    isCancelled: boolean;
    isDeleted: boolean;
    isArchived: boolean;
    isPrivate: boolean;
    isShared: boolean;
    isPublished: boolean;
    isDraft: boolean;
    isScheduled: boolean;
    isPast: boolean;
    isFuture: boolean;
    isToday: boolean;
    isTomorrow: boolean;
    isThisWeek: boolean;
    isThisMonth: boolean;
    isThisYear: boolean;
  };
  visibility: Visibility;
  priority?: EventPriority;
  eventType: EventType;

  recurrence?: Recurrence;
  seriesId?: string;
  isRecurring?: boolean;

  location?: Place;
  isOnline?: boolean;

  organizer: EventOrganizer;
  guests: EventGuest[];
  guestCount: number;
  maxAttendees?: number;

  guestPermissions: EventGuestPermissions;
  attachments?: EventAttachment[];
  reminders: EventReminderNotificationSettings[];

  eventColor: string;
  categories: string[];
  tags?: string[];

  analytics?: EventAnalytics;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  customFields?: Record<string, any>;
  lastModifiedBy: UserReference;
}

export const generateEvent = (): Event => {
  return {
    ...generateBaseEntity(),
    customFields: {},
    location: generatePlace(),
    tags: [faker.lorem.word()],
    eventId: faker.string.uuid(),
    title: faker.lorem.sentence(),
    seriesId: faker.string.uuid(),
    eventColor: faker.color.rgb(),
    guests: [generateEventGuest()],
    recurrence: generateRecurrency(),
    categories: [faker.lorem.word()],
    isAllDay: faker.datatype.boolean(),
    isOnline: faker.datatype.boolean(),
    organizer: generateEventOrganizer(),
    analytics: generateEventAnalytics(),
    description: faker.lorem.paragraph(),
    isRecurring: faker.datatype.boolean(),
    lastModifiedBy: generateUserReference(),
    attachments: [generateEventAttachment()],
    guestPermissions: generateEventGuestPermissions(),
    timezone: faker.helpers.arrayElement(TIMEZONE_OPTIONS),
    reminders: [generateEventReminderNotificationSettings()],
    eventType: faker.helpers.arrayElement(EVENT_TYPE_OPTIONS),
    priority: faker.helpers.arrayElement(EVENT_PRIORITY_OPTIONS),
    guestCount: faker.number.int({
      min: 1,
      max: 10,
    }),
    maxAttendees: faker.number.int({
      min: 1,
      max: 10,
    }),
    visibility: faker.helpers.arrayElement(
      VISIBILITY_OPTIONS?.map((option) => option.value)
    ) as Visibility,
    endTime: new Date(
      new Date().setHours(
        faker?.number?.int({
          min: 9,
          max: 18,
        })
      )
    ).toISOString(),
    startTime: new Date(
      new Date().setHours(
        faker?.number?.int({
          min: 9,
          max: 18,
        })
      )
    ).toISOString(),
    status: {
      isOpen: faker.datatype.boolean(),
      isPast: faker.datatype.boolean(),
      isDraft: faker.datatype.boolean(),
      isToday: faker.datatype.boolean(),
      isShared: faker.datatype.boolean(),
      isFuture: faker.datatype.boolean(),
      isDeleted: faker.datatype.boolean(),
      isPrivate: faker.datatype.boolean(),
      isArchived: faker.datatype.boolean(),
      isTomorrow: faker.datatype.boolean(),
      isThisWeek: faker.datatype.boolean(),
      isThisYear: faker.datatype.boolean(),
      isCompleted: faker.datatype.boolean(),
      isCancelled: faker.datatype.boolean(),
      isPublished: faker.datatype.boolean(),
      isScheduled: faker.datatype.boolean(),
      isThisMonth: faker.datatype.boolean(),
    },
  };
};

// Parent, Sibling, Index
import type { UserReference } from "../base/userReference.types";
import type { EventType, EventStatus, EventPriority } from "./event.types";

export interface EventSearchCriteria {
  query?: string;
  dateRange?: {
    start: string;
    end: string;
  };
  categories?: string[];
  eventTypes?: EventType[];
  statuses?: EventStatus[];
  priorities?: EventPriority[];
  attendees?: string[];
  locations?: string[];
  hasAttachments?: boolean;
  isRecurring?: boolean;
}

export interface EventSearchResult {
  events: Event[];
  totalCount: number;
  facets: {
    categories: { name: string; count: number }[];
    eventTypes: { type: EventType; count: number }[];
    attendees: { user: UserReference; count: number }[];
  };
}

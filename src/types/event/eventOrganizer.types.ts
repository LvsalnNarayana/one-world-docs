// Parent, Sibling, Index
import { type EventGuest, generateEventGuest } from "./eventGuest.types";
// Event organizer with enhanced details

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface EventOrganizer extends Omit<EventGuest, "responseTime"> {}

export const generateEventOrganizer = (): EventOrganizer => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { responseTime, ...guest } = generateEventGuest();
  return {
    ...guest,
  };
};

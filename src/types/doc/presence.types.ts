import type { UserSummary } from "./doc.types";

export interface CursorPosition {
  x: number;
  y: number;
  offset: number;
}

export interface PresenceUser {
  user: UserSummary;
  color: string;
  cursorPosition: CursorPosition | null;
  lastActiveAt: string;
}

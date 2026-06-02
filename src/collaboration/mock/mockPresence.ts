import { generateMockUser } from "../../generators/generateMockDoc";
import type { PresenceUser } from "../../types/doc/presence.types";

const COLORS = ["#e53935", "#8e24aa", "#43a047", "#fb8c00", "#1e88e5"];

/** Cursor positions relative to the white page (top content area) */
export function createMockPresenceUsers(count = 3): PresenceUser[] {
  return Array.from({ length: count }, (_, i) => ({
    user: generateMockUser(),
    color: COLORS[i % COLORS.length],
    cursorPosition: {
      x: 16 + i * 72,
      y: 24 + i * 22,
      offset: 10 + i * 5,
    },
    lastActiveAt: new Date().toISOString(),
  }));
}

export function jitterPresence(users: PresenceUser[]): PresenceUser[] {
  return users.map((u) => ({
    ...u,
    cursorPosition: u.cursorPosition
      ? {
          ...u.cursorPosition,
          y: Math.max(
            20,
            Math.min(160, u.cursorPosition.y + (Math.random() - 0.5) * 16)
          ),
        }
      : null,
    lastActiveAt: new Date().toISOString(),
  }));
}

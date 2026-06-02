export type DocPermission = "owner" | "editor" | "commenter" | "viewer";
export type DocOrientation = "portrait" | "landscape";
export type DocMarginPreset = "normal" | "narrow" | "wide" | "custom";

import type { CommentThread } from "./comment.types";

export interface UserSummary {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
}

export interface DocPageSetup {
  orientation: DocOrientation;
  marginPreset: DocMarginPreset;
  margins: { top: number; bottom: number; left: number; right: number };
  backgroundColor: string;
}

export interface DocSummary {
  id: string;
  title: string;
  author: UserSummary;
  collaborators: UserSummary[];
  lastModified: string;
  lastOpenedAt: string;
  isStarred: boolean;
  isTrashed: boolean;
  permission: DocPermission;
  previewMarkdown: string;
}

export interface DocRecord extends DocSummary {
  editorStateJson: string | null;
  commentThreads: CommentThread[];
  /** Who last edited the document content (for API persistence / auditing) */
  lastEditorUserId?: string | null;
  /** Logical editing session id (per browser session/tab) */
  lastEditorSessionId?: string | null;
  createdAt: string;
  updatedAt: string;
  pageSetup: DocPageSetup;
  wordCount: number;
}

export const DEFAULT_PAGE_SETUP: DocPageSetup = {
  orientation: "portrait",
  marginPreset: "normal",
  margins: { top: 56, bottom: 56, left: 56, right: 56 },
  backgroundColor: "#ffffff",
};

export function getUserDisplayName(user: UserSummary): string {
  const name = `${user.firstName} ${user.lastName}`.trim();
  return name || user.username;
}

export function formatRelativeTime(iso: string): string {
  const date = new Date(iso);
  const diffMs = Date.now() - date.getTime();
  const hours = Math.floor(diffMs / (1000 * 60 * 60));
  if (hours < 1) return "Just now";
  if (hours < 24) return `${hours} hour${hours === 1 ? "" : "s"} ago`;
  const days = Math.floor(hours / 24);
  if (days === 1) return "Yesterday";
  if (days < 7) return `${days} days ago`;
  return date.toLocaleDateString();
}

/** Map legacy user-group shape to UserSummary */
export function toUserSummary(user: {
  id: string;
  username: string;
  firstname?: string;
  firstName?: string;
  lastname?: string;
  lastName?: string;
}): UserSummary {
  return {
    id: user.id,
    username: user.username,
    firstName: user.firstName ?? user.firstname ?? "",
    lastName: user.lastName ?? user.lastname ?? "",
  };
}

import type { UserSummary } from "./doc.types";

export interface CommentAnchor {
  lexicalKey: string;
  quotedText: string;
}

export interface CommentEntry {
  id: string;
  threadId: string;
  author: UserSummary;
  text: string;
  createdAt: string;
  isEdited: boolean;
}

export interface CommentThread {
  id: string;
  docId: string;
  anchor: CommentAnchor;
  entries: CommentEntry[];
  isResolved: boolean;
  createdAt: string;
}

import type { UserSummary } from "./doc.types";

export interface RevisionMeta {
  id: string;
  docId: string;
  label: string | null;
  author: UserSummary;
  createdAt: string;
}

export interface RevisionSnapshot extends RevisionMeta {
  editorStateJson: string;
}

import { faker } from "@faker-js/faker";

import { generateMockUserReference } from "../scripts/MockUserData.script";
import type { DocRecord, DocSummary, UserSummary } from "../types/doc/doc.types";
import { DEFAULT_PAGE_SETUP } from "../types/doc/doc.types";

const docTitles = [
  "Project Proposal",
  "Marketing Strategy",
  "Budget Planning",
  "Team Meeting Notes",
  "Product Roadmap",
  "Q4 Review",
  "Design Spec",
  "API Documentation",
];

const previewSnippets = [
  "# Project Proposal\n\n*This document outlines the key objectives and timeline for our upcoming project initiative.*\n\n## Overview\nWe are proposing a comprehensive solution that will streamline our workflow and improve team collaboration.",
  "# Marketing Strategy\n\n## Goals\n- Increase brand awareness\n- Grow social engagement\n- Launch Q3 campaign",
  "# Budget Planning\n\n## Summary\nAllocated resources across engineering, design, and operations for the next quarter.",
];

export const toUserSummary = (ref: {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
}): UserSummary => ({
  id: ref.id,
  username: ref.username,
  firstName: ref.firstName,
  lastName: ref.lastName,
});

export const generateMockUser = (): UserSummary =>
  toUserSummary(generateMockUserReference());

export const generateMockDocSummary = (
  overrides?: Partial<DocSummary>
): DocSummary => {
  const title = overrides?.title ?? faker.helpers.arrayElement(docTitles);
  const author = overrides?.author ?? generateMockUser();
  const daysAgo = faker.number.int({ min: 0, max: 14 });
  const lastModified = new Date(
    Date.now() - daysAgo * 24 * 60 * 60 * 1000
  ).toISOString();

  return {
    id: faker.string.uuid(),
    title,
    author,
    collaborators: Array.from(
      { length: faker.number.int({ min: 1, max: 4 }) },
      generateMockUser
    ),
    lastModified,
    lastOpenedAt: lastModified,
    isStarred: faker.datatype.boolean({ probability: 0.2 }),
    isTrashed: false,
    permission: faker.helpers.arrayElement([
      "owner",
      "editor",
      "viewer",
    ] as const),
    previewMarkdown:
      overrides?.previewMarkdown ??
      faker.helpers.arrayElement(previewSnippets),
    ...overrides,
  };
};

export const generateMockDoc = (overrides?: Partial<DocRecord>): DocRecord => {
  const summary = generateMockDocSummary(overrides);
  const now = new Date().toISOString();
  return {
    ...summary,
    createdAt: overrides?.createdAt ?? now,
    updatedAt: overrides?.updatedAt ?? now,
    editorStateJson: overrides?.editorStateJson ?? null,
    commentThreads: overrides?.commentThreads ?? [],
    lastEditorUserId: overrides?.lastEditorUserId ?? null,
    lastEditorSessionId: overrides?.lastEditorSessionId ?? null,
    pageSetup: overrides?.pageSetup ?? { ...DEFAULT_PAGE_SETUP },
    wordCount: overrides?.wordCount ?? 0,
    ...overrides,
  };
};

export const generateMockDocs = (count: number): DocRecord[] =>
  Array.from({ length: count }, () => generateMockDoc());

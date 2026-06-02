import { faker } from "@faker-js/faker";

import { generateMockUser } from "../../generators/generateMockDoc";
import type { CommentThread } from "../../types/doc/comment.types";

const QUOTES = [
  "This section needs more detail on the timeline.",
  "Can we clarify the budget assumptions here?",
  "Great overview — consider adding metrics.",
];

export function createMockCommentThreads(
  docId: string,
  count = 3
): CommentThread[] {
  return Array.from({ length: count }, () => {
    const author = generateMockUser();
    const threadId = faker.string.uuid();
    const now = new Date().toISOString();
    return {
      id: threadId,
      docId,
      anchor: {
        lexicalKey: faker.string.alphanumeric(8),
        quotedText: faker.helpers.arrayElement(QUOTES),
      },
      isResolved: false,
      createdAt: now,
      entries: [
        {
          id: faker.string.uuid(),
          threadId,
          author,
          text: faker.lorem.sentence(),
          createdAt: now,
          isEdited: false,
        },
      ],
    };
  });
}

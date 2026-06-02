// External
import { faker } from "@faker-js/faker";


// Parent, Sibling, Index
import {
  type UserReference,
  generateUserReference,
} from "../base/userReference.types";

// Enhanced attachment interface

export interface EventAttachment {
  id: string;
  name: string;
  url: string;
  type: "file" | "image" | "document";
  size?: number; // in bytes
  mimeType?: string;
  uploadedBy: UserReference;
  uploadedAt: string;
}

export const generateEventAttachment = (): EventAttachment => {
  return {
    id: faker.string.uuid(),
    url: faker.internet.url(),
    name: faker.system.fileName(),
    mimeType: faker.system.mimeType(),
    uploadedBy: generateUserReference(),
    uploadedAt: faker.date.past().toISOString(),
    size: faker.number.int({ min: 100, max: 1000000 }),
    type: faker.helpers.arrayElement(["file", "image", "document"]),
  };
};

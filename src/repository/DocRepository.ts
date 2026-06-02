import type { DocRecord, DocSummary } from "../types/doc/doc.types";

/**
 * Persistence boundary for documents.
 * Phase 1: LocalMockDocRepository (localStorage).
 * Phase 2: HttpDocRepository → REST/GraphQL backend.
 */
export interface DocRepository {
  list(): Promise<DocSummary[]>;
  getById(id: string): Promise<DocRecord | null>;
  save(doc: DocRecord): Promise<DocRecord>;
  delete(id: string): Promise<void>;
  search(query: string): Promise<DocSummary[]>;
  createBlank(title?: string): Promise<DocRecord>;
  duplicate(id: string): Promise<DocRecord | null>;
}

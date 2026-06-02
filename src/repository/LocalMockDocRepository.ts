import { mockDocLibrary } from "../data/mockDocs";
import { generateMockDoc } from "../generators/generateMockDoc";
import type { DocRecord, DocSummary } from "../types/doc/doc.types";
import { getUserDisplayName } from "../types/doc/doc.types";
import type { DocRepository } from "./DocRepository";

const STORAGE_KEY = "owdocs_v1";

function shouldForceBlankEditor(doc: DocRecord): boolean {
  return doc.title.trim().toLowerCase() === "bkabk doc";
}

function normalizeDoc(doc: DocRecord): DocRecord {
  const forceBlank = shouldForceBlankEditor(doc);
  return {
    ...doc,
    editorStateJson: forceBlank ? null : doc.editorStateJson ?? null,
    previewMarkdown: forceBlank ? "" : doc.previewMarkdown,
    commentThreads: doc.commentThreads ?? [],
    lastEditorUserId: doc.lastEditorUserId ?? null,
    lastEditorSessionId: doc.lastEditorSessionId ?? null,
  };
}

function loadStore(): Map<string, DocRecord> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const records = (JSON.parse(raw) as DocRecord[]).map(normalizeDoc);
      return new Map(records.map((d) => [d.id, d]));
    }
  } catch (e) {
    console.warn("Failed to load docs from localStorage", e);
  }
  return new Map(mockDocLibrary.map((d) => [d.id, normalizeDoc(d)]));
}

function persistStore(store: Map<string, DocRecord>): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(store.values())));
}

let store = loadStore();

function notTrashed(d: DocRecord | DocSummary): boolean {
  return !d.isTrashed;
}

export const localMockDocRepository: DocRepository = {
  async list(): Promise<DocSummary[]> {
    return Array.from(store.values())
      .filter(notTrashed)
      .sort(
        (a, b) =>
          new Date(b.lastOpenedAt).getTime() -
          new Date(a.lastOpenedAt).getTime()
      );
  },

  async getById(id: string): Promise<DocRecord | null> {
    const doc = store.get(id) ?? null;
    if (doc && !doc.isTrashed) {
      const updated = normalizeDoc({
        ...doc,
        lastOpenedAt: new Date().toISOString(),
      });
      store.set(id, updated);
      persistStore(store);
      return updated;
    }
    return doc ? normalizeDoc(doc) : null;
  },

  async save(doc: DocRecord): Promise<DocRecord> {
    const updated = normalizeDoc({
      ...doc,
      updatedAt: new Date().toISOString(),
    });
    store.set(doc.id, updated);
    persistStore(store);
    return updated;
  },

  async delete(id: string): Promise<void> {
    const doc = store.get(id);
    if (doc) {
      store.set(id, { ...doc, isTrashed: true, updatedAt: new Date().toISOString() });
      persistStore(store);
    }
  },

  async search(query: string): Promise<DocSummary[]> {
    const q = query.trim().toLowerCase();
    if (!q) return this.list();
    return Array.from(store.values()).filter(
      (d) =>
        notTrashed(d) &&
        (d.title.toLowerCase().includes(q) ||
          getUserDisplayName(d.author).toLowerCase().includes(q) ||
          d.previewMarkdown.toLowerCase().includes(q))
    );
  },

  async createBlank(title = "Untitled document"): Promise<DocRecord> {
    const doc = generateMockDoc({
      title,
      previewMarkdown: "",
      editorStateJson: null,
      wordCount: 0,
    });
    store.set(doc.id, doc);
    persistStore(store);
    return doc;
  },

  async duplicate(id: string): Promise<DocRecord | null> {
    const source = store.get(id);
    if (!source) return null;
    const copy = generateMockDoc({
      title: `Copy of ${source.title}`,
      editorStateJson: source.editorStateJson,
      previewMarkdown: source.previewMarkdown,
      pageSetup: { ...source.pageSetup },
      wordCount: source.wordCount,
      isStarred: false,
    });
    store.set(copy.id, copy);
    persistStore(store);
    return copy;
  },
};

export function resetDocStore(): void {
  store = new Map(mockDocLibrary.map((d) => [d.id, d]));
  persistStore(store);
}

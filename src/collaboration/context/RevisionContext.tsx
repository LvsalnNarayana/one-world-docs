import { faker } from "@faker-js/faker";
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";

import { useAuth } from "../../docs/context/AuthContext";
import type { RevisionSnapshot } from "../../types/doc/revision.types";

interface RevisionContextValue {
  revisions: RevisionSnapshot[];
  saveRevision: (editorStateJson: string, label?: string) => void;
  restoreRevision: (id: string) => RevisionSnapshot | null;
  previewRevision: RevisionSnapshot | null;
  previewRevisionById: (id: string) => void;
  exitPreview: () => void;
}

const RevisionContext = createContext<RevisionContextValue | undefined>(
  undefined
);

const REVISION_INTERVAL_MS = 5 * 60 * 1000;

export function RevisionProvider({
  docId,
  children,
}: {
  docId: string;
  children: ReactNode;
}) {
  const { currentUser } = useAuth();
  const [revisions, setRevisions] = useState<RevisionSnapshot[]>([]);
  const [previewRevision, setPreviewRevision] =
    useState<RevisionSnapshot | null>(null);
  const lastSnapshotAt = useRef(0);

  const saveRevision = useCallback(
    (editorStateJson: string, label?: string) => {
      const now = Date.now();
      if (
        now - lastSnapshotAt.current < REVISION_INTERVAL_MS &&
        revisions.length > 0
      ) {
        return;
      }
      lastSnapshotAt.current = now;
      const snapshot: RevisionSnapshot = {
        id: faker.string.uuid(),
        docId,
        label: label ?? null,
        author: currentUser,
        createdAt: new Date().toISOString(),
        editorStateJson,
      };
      setRevisions((prev) => [snapshot, ...prev].slice(0, 50));
    },
    [currentUser, docId, revisions.length]
  );

  const restoreRevision = useCallback(
    (id: string) => {
      const rev = revisions.find((r) => r.id === id) ?? null;
      setPreviewRevision(null);
      return rev;
    },
    [revisions]
  );

  const previewRevisionById = useCallback(
    (id: string) => {
      const rev = revisions.find((r) => r.id === id) ?? null;
      setPreviewRevision(rev);
    },
    [revisions]
  );

  const exitPreview = useCallback(() => setPreviewRevision(null), []);

  const value = useMemo(
    () => ({
      revisions,
      saveRevision,
      restoreRevision,
      previewRevision,
      previewRevisionById,
      exitPreview,
    }),
    [
      revisions,
      saveRevision,
      restoreRevision,
      previewRevision,
      previewRevisionById,
      exitPreview,
    ]
  );

  return (
    <RevisionContext.Provider value={value}>
      {children}
    </RevisionContext.Provider>
  );
}

export function useRevisions(): RevisionContextValue {
  const ctx = useContext(RevisionContext);
  if (!ctx) throw new Error("useRevisions must be used within RevisionProvider");
  return ctx;
}

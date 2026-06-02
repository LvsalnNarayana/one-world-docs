import { faker } from "@faker-js/faker";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";

import { useAuth } from "../../docs/context/AuthContext";
import { useEditorDoc } from "../../docs/context/EditorDocContext";
import type {
  CommentAnchor,
  CommentThread,
} from "../../types/doc/comment.types";

type CommentMarkActions = {
  unwrap: (markId: string) => void;
};

interface CommentContextValue {
  threads: CommentThread[];
  addThread: (anchor: CommentAnchor, text: string, threadId?: string) => void;
  addReply: (threadId: string, text: string) => void;
  resolveThread: (threadId: string) => void;
  deleteThread: (threadId: string) => void;
  activeThreadId: string | null;
  setActiveThreadId: (id: string | null) => void;
  registerMarkActions: (actions: CommentMarkActions | null) => void;
}

const CommentContext = createContext<CommentContextValue | undefined>(
  undefined
);

const PERSIST_DEBOUNCE_MS = 600;

export function CommentProvider({
  docId,
  children,
}: {
  docId: string;
  children: ReactNode;
}) {
  const { currentUser } = useAuth();
  const { doc, updateDoc, saveDoc } = useEditorDoc();
  const [threads, setThreads] = useState<CommentThread[]>(
    () => doc.commentThreads ?? []
  );
  const [activeThreadId, setActiveThreadId] = useState<string | null>(null);
  const markActionsRef = useRef<CommentMarkActions | null>(null);
  const persistTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setThreads(doc.commentThreads ?? []);
    setActiveThreadId(null);
  }, [doc.id]);

  const registerMarkActions = useCallback(
    (actions: CommentMarkActions | null) => {
      markActionsRef.current = actions;
    },
    []
  );

  const schedulePersist = useCallback(
    (next: CommentThread[]) => {
      updateDoc({ commentThreads: next });
      if (persistTimerRef.current) clearTimeout(persistTimerRef.current);
      persistTimerRef.current = setTimeout(() => {
        void saveDoc({ commentThreads: next });
      }, PERSIST_DEBOUNCE_MS);
    },
    [updateDoc, saveDoc]
  );

  const addThread = useCallback(
    (anchor: CommentAnchor, text: string, threadId?: string) => {
      const id = threadId ?? faker.string.uuid();
      const now = new Date().toISOString();
      const thread: CommentThread = {
        id,
        docId,
        anchor,
        isResolved: false,
        createdAt: now,
        entries: [
          {
            id: faker.string.uuid(),
            threadId: id,
            author: currentUser,
            text,
            createdAt: now,
            isEdited: false,
          },
        ],
      };
      setThreads((prev) => {
        const next = [thread, ...prev];
        schedulePersist(next);
        return next;
      });
      setActiveThreadId(id);
    },
    [currentUser, docId, schedulePersist]
  );

  const addReply = useCallback(
    (threadId: string, text: string) => {
      const now = new Date().toISOString();
      setThreads((prev) => {
        const next = prev.map((t) =>
          t.id === threadId
            ? {
                ...t,
                entries: [
                  ...t.entries,
                  {
                    id: faker.string.uuid(),
                    threadId,
                    author: currentUser,
                    text,
                    createdAt: now,
                    isEdited: false,
                  },
                ],
              }
            : t
        );
        schedulePersist(next);
        return next;
      });
    },
    [currentUser, schedulePersist]
  );

  const resolveThread = useCallback(
    (threadId: string) => {
      setThreads((prev) => {
        const target = prev.find((t) => t.id === threadId);
        if (target?.anchor.lexicalKey) {
          markActionsRef.current?.unwrap(target.anchor.lexicalKey);
        }
        const next = prev.map((t) =>
          t.id === threadId ? { ...t, isResolved: true } : t
        );
        schedulePersist(next);
        return next;
      });
      setActiveThreadId(null);
    },
    [schedulePersist]
  );

  const deleteThread = useCallback(
    (threadId: string) => {
      setThreads((prev) => {
        const target = prev.find((t) => t.id === threadId);
        if (target?.anchor.lexicalKey) {
          markActionsRef.current?.unwrap(target.anchor.lexicalKey);
        }
        const next = prev.filter((t) => t.id !== threadId);
        schedulePersist(next);
        return next;
      });
      setActiveThreadId(null);
    },
    [schedulePersist]
  );

  const value = useMemo(
    () => ({
      threads,
      addThread,
      addReply,
      resolveThread,
      deleteThread,
      activeThreadId,
      setActiveThreadId,
      registerMarkActions,
    }),
    [
      threads,
      addThread,
      addReply,
      resolveThread,
      deleteThread,
      activeThreadId,
      registerMarkActions,
    ]
  );

  return (
    <CommentContext.Provider value={value}>{children}</CommentContext.Provider>
  );
}

export function useComments(): CommentContextValue {
  const ctx = useContext(CommentContext);
  if (!ctx) throw new Error("useComments must be used within CommentProvider");
  return ctx;
}

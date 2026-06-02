import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import { localMockDocRepository } from "../../repository/LocalMockDocRepository";
import type { DocRecord } from "../../types/doc/doc.types";

export type AutoSaveStatus = "idle" | "saving" | "saved" | "error";

interface EditorDocContextValue {
  doc: DocRecord;
  updateDoc: (patch: Partial<DocRecord>) => void;
  saveDoc: (patch?: Partial<DocRecord>) => Promise<DocRecord>;
  saveStatus: AutoSaveStatus;
  setSaveStatus: (s: AutoSaveStatus) => void;
  readOnly: boolean;
  setReadOnly: (v: boolean) => void;
}

const EditorDocContext = createContext<EditorDocContextValue | undefined>(
  undefined
);

export function EditorDocProvider({
  doc: initialDoc,
  children,
}: {
  doc: DocRecord;
  children: ReactNode;
}) {
  const [doc, setDoc] = useState(initialDoc);
  const [saveStatus, setSaveStatus] = useState<AutoSaveStatus>("saved");
  const [readOnly, setReadOnly] = useState(false);

  const updateDoc = useCallback((patch: Partial<DocRecord>) => {
    setDoc((prev) => ({ ...prev, ...patch }));
  }, []);

  const saveDoc = useCallback(
    async (patch?: Partial<DocRecord>) => {
      setSaveStatus("saving");
      try {
        const merged = { ...doc, ...patch };
        const saved = await localMockDocRepository.save(merged);
        setDoc(saved);
        setSaveStatus("saved");
        return saved;
      } catch {
        setSaveStatus("error");
        throw new Error("Save failed");
      }
    },
    [doc]
  );

  const value = useMemo(
    () => ({
      doc,
      updateDoc,
      saveDoc,
      saveStatus,
      setSaveStatus,
      readOnly,
      setReadOnly,
    }),
    [doc, updateDoc, saveDoc, saveStatus, readOnly]
  );

  return (
    <EditorDocContext.Provider value={value}>
      {children}
    </EditorDocContext.Provider>
  );
}

export function useEditorDoc(): EditorDocContextValue {
  const ctx = useContext(EditorDocContext);
  if (!ctx) throw new Error("useEditorDoc must be used within EditorDocProvider");
  return ctx;
}

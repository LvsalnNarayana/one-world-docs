import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export interface OutlineEntry {
  id: string;
  text: string;
  level: number;
  key: string;
}

interface OutlineContextValue {
  entries: OutlineEntry[];
  setEntries: (entries: OutlineEntry[]) => void;
}

const OutlineContext = createContext<OutlineContextValue | undefined>(undefined);

export function OutlineProvider({ children }: { children: ReactNode }) {
  const [entries, setEntries] = useState<OutlineEntry[]>([]);
  const value = useMemo(() => ({ entries, setEntries }), [entries]);
  return (
    <OutlineContext.Provider value={value}>{children}</OutlineContext.Provider>
  );
}

export function useOutline(): OutlineContextValue {
  const ctx = useContext(OutlineContext);
  if (!ctx) throw new Error("useOutline must be used within OutlineProvider");
  return ctx;
}

import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export interface WordCountStats {
  words: number;
  characters: number;
  charactersNoSpaces: number;
  pages: number;
}

const defaultStats: WordCountStats = {
  words: 0,
  characters: 0,
  charactersNoSpaces: 0,
  pages: 1,
};

interface WordCountContextValue {
  stats: WordCountStats;
  setStats: (stats: WordCountStats) => void;
}

const WordCountContext = createContext<WordCountContextValue | undefined>(
  undefined
);

export function WordCountProvider({ children }: { children: ReactNode }) {
  const [stats, setStats] = useState<WordCountStats>(defaultStats);
  const value = useMemo(() => ({ stats, setStats }), [stats]);
  return (
    <WordCountContext.Provider value={value}>
      {children}
    </WordCountContext.Provider>
  );
}

export function useWordCountStats(): WordCountContextValue {
  const ctx = useContext(WordCountContext);
  if (!ctx) {
    throw new Error("useWordCountStats must be used within WordCountProvider");
  }
  return ctx;
}

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";

export interface FindReplaceHandlers {
  findNext: () => void;
  findPrev: () => void;
  replaceOne: () => void;
  replaceAll: () => void;
  setQuery: (q: string) => void;
}

interface FindReplaceContextValue {
  isOpen: boolean;
  showReplace: boolean;
  query: string;
  replaceWith: string;
  matchCount: number;
  currentMatch: number;
  setQuery: (q: string) => void;
  setReplaceWith: (r: string) => void;
  setMatchCount: (n: number) => void;
  setCurrentMatch: (n: number) => void;
  openFindBar: (withReplace?: boolean) => void;
  closeFindBar: () => void;
  findNext: () => void;
  findPrev: () => void;
  replaceOne: () => void;
  replaceAll: () => void;
  registerHandlers: (handlers: FindReplaceHandlers | null) => void;
}

const FindReplaceContext = createContext<FindReplaceContextValue | undefined>(
  undefined
);

export function FindReplaceProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [showReplace, setShowReplace] = useState(false);
  const [query, setQueryState] = useState("");
  const [replaceWith, setReplaceWith] = useState("");
  const [matchCount, setMatchCount] = useState(0);
  const [currentMatch, setCurrentMatch] = useState(0);
  const handlersRef = useRef<FindReplaceHandlers | null>(null);

  const registerHandlers = useCallback((handlers: FindReplaceHandlers | null) => {
    handlersRef.current = handlers;
  }, []);

  const setQuery = useCallback((q: string) => {
    setQueryState(q);
    handlersRef.current?.setQuery(q);
  }, []);

  const openFindBar = useCallback((withReplace = false) => {
    setIsOpen(true);
    setShowReplace(withReplace);
  }, []);

  const closeFindBar = useCallback(() => {
    setIsOpen(false);
    setQueryState("");
    setMatchCount(0);
    setCurrentMatch(0);
  }, []);

  const findNext = useCallback(() => handlersRef.current?.findNext(), []);
  const findPrev = useCallback(() => handlersRef.current?.findPrev(), []);
  const replaceOne = useCallback(() => handlersRef.current?.replaceOne(), []);
  const replaceAll = useCallback(() => handlersRef.current?.replaceAll(), []);

  const value = useMemo(
    () => ({
      isOpen,
      showReplace,
      query,
      replaceWith,
      matchCount,
      currentMatch,
      setQuery,
      setReplaceWith,
      setMatchCount,
      setCurrentMatch,
      openFindBar,
      closeFindBar,
      findNext,
      findPrev,
      replaceOne,
      replaceAll,
      registerHandlers,
    }),
    [
      isOpen,
      showReplace,
      query,
      replaceWith,
      matchCount,
      currentMatch,
      setQuery,
      openFindBar,
      closeFindBar,
      findNext,
      findPrev,
      replaceOne,
      replaceAll,
      registerHandlers,
    ]
  );

  return (
    <FindReplaceContext.Provider value={value}>
      {children}
    </FindReplaceContext.Provider>
  );
}

export function useFindReplace(): FindReplaceContextValue {
  const ctx = useContext(FindReplaceContext);
  if (!ctx) {
    throw new Error("useFindReplace must be used within FindReplaceProvider");
  }
  return ctx;
}

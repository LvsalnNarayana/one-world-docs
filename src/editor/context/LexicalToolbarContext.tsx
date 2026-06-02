import { createContext, useContext, type ReactNode } from "react";

import { useLexicalToolbar } from "../hooks/useLexicalToolbar";

type LexicalToolbarContextValue = ReturnType<typeof useLexicalToolbar>;

const LexicalToolbarContext = createContext<LexicalToolbarContextValue | null>(
  null
);

export function LexicalToolbarProvider({ children }: { children: ReactNode }) {
  const value = useLexicalToolbar();
  return (
    <LexicalToolbarContext.Provider value={value}>
      {children}
    </LexicalToolbarContext.Provider>
  );
}

export function useLexicalToolbarContext(): LexicalToolbarContextValue {
  const ctx = useContext(LexicalToolbarContext);
  if (!ctx) {
    throw new Error(
      "useLexicalToolbarContext must be used within LexicalToolbarProvider"
    );
  }
  return ctx;
}

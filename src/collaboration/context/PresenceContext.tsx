import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import { useAuth } from "../../docs/context/AuthContext";
import type { PresenceUser } from "../../types/doc/presence.types";
import type { UserSummary } from "../../types/doc/doc.types";
import {
  createMockPresenceUsers,
  jitterPresence,
} from "../mock/mockPresence";

interface PresenceContextValue {
  activeUsers: PresenceUser[];
  myUser: UserSummary;
}

const PresenceContext = createContext<PresenceContextValue | undefined>(
  undefined
);

export function PresenceProvider({
  children,
}: {
  docId?: string;
  children: ReactNode;
}) {
  const { currentUser } = useAuth();
  const [activeUsers, setActiveUsers] = useState(() =>
    createMockPresenceUsers(3)
  );

  useEffect(() => {
    const id = window.setInterval(() => {
      setActiveUsers((prev) => jitterPresence(prev));
    }, 3000);
    return () => clearInterval(id);
  }, []);

  const value = useMemo(
    () => ({ activeUsers, myUser: currentUser }),
    [activeUsers, currentUser]
  );

  return (
    <PresenceContext.Provider value={value}>{children}</PresenceContext.Provider>
  );
}

export function usePresence(): PresenceContextValue {
  const ctx = useContext(PresenceContext);
  if (!ctx) throw new Error("usePresence must be used within PresenceProvider");
  return ctx;
}

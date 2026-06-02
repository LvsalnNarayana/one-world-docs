import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import { generateMockUser } from "../../generators/generateMockDoc";
import type { DocPermission, UserSummary } from "../../types/doc/doc.types";

interface AuthContextValue {
  currentUser: UserSummary;
  docPermission: DocPermission;
  setDocPermission: (p: DocPermission) => void;
  canEdit: boolean;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const currentUser = useMemo(() => generateMockUser(), []);
  const [docPermission, setDocPermission] = useState<DocPermission>("owner");

  const value = useMemo(
    () => ({
      currentUser,
      docPermission,
      setDocPermission,
      canEdit: docPermission === "owner" || docPermission === "editor",
    }),
    [currentUser, docPermission]
  );

  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}

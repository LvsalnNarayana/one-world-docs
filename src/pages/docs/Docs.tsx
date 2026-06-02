import type { JSX } from "react";
import { Outlet } from "react-router";

import { AuthProvider } from "../../docs/context/AuthContext";
import { DocConfigProvider } from "../../docs/context/DocsConfigContext";

const Docs = (): JSX.Element => {
  return (
    <AuthProvider>
      <DocConfigProvider>
        <Outlet />
      </DocConfigProvider>
    </AuthProvider>
  );
};

export default Docs;

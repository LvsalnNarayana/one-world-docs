import { Navigate, Route, Routes } from "react-router";

import Docs from "./pages/docs/Docs";
import DocList from "./pages/docs/DocList";
import DocEditor from "./pages/docs/DocEditor";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/docs" replace />} />
      <Route path="/docs" element={<Docs />}>
        <Route index element={<DocList />} />
        <Route path="editor/:docId" element={<DocEditor />} />
      </Route>
      <Route path="*" element={<Navigate to="/docs" replace />} />
    </Routes>
  );
}

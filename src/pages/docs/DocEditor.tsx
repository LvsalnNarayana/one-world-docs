import { useEffect, useState, type JSX } from "react";
import { Navigate, useParams } from "react-router";

import { CommentProvider } from "../../collaboration/context/CommentContext";
import { PresenceProvider } from "../../collaboration/context/PresenceContext";
import { RevisionProvider } from "../../collaboration/context/RevisionContext";
import EditorLayout from "../../docs/components/EditorLayout";
import { EditorDocProvider } from "../../docs/context/EditorDocContext";
import { localMockDocRepository } from "../../repository/LocalMockDocRepository";
import PageLoader from "../../shared/PageLoader";
import type { DocRecord } from "../../types/doc/doc.types";
import { useAuth } from "../../docs/context/AuthContext";

const DocEditor = (): JSX.Element => {
  const { docId } = useParams<{ docId: string }>();
  const { setDocPermission } = useAuth();
  const [doc, setDoc] = useState<DocRecord | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!docId) return;
    setLoading(true);
    localMockDocRepository
      .getById(docId)
      .then((record) => {
        setDoc(record);
        if (record) setDocPermission(record.permission);
      })
      .finally(() => setLoading(false));
  }, [docId, setDocPermission]);

  if (!docId) return <Navigate to="/docs" replace />;
  if (loading) return <PageLoader />;
  if (!doc) return <Navigate to="/docs" replace />;

  return (
    <PresenceProvider docId={docId}>
      <RevisionProvider docId={docId}>
        <EditorDocProvider doc={doc}>
          <CommentProvider docId={docId}>
            <EditorLayout />
          </CommentProvider>
        </EditorDocProvider>
      </RevisionProvider>
    </PresenceProvider>
  );
};

export default DocEditor;

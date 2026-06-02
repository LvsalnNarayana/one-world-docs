import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import type { EditorState } from "lexical";
import { useCallback, useRef } from "react";

import { useRevisions } from "../../collaboration/context/RevisionContext";
import { useAuth } from "../../docs/context/AuthContext";
import { useEditorDoc } from "../../docs/context/EditorDocContext";
import { getOrCreateEditorSessionId } from "../../shared/editorSession";

const DEBOUNCE_MS = 1500;

export default function AutoSavePlugin() {
  const [editor] = useLexicalComposerContext();
  const { saveDoc, setSaveStatus, readOnly } = useEditorDoc();
  const { currentUser } = useAuth();
  const { saveRevision } = useRevisions();
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const persist = useCallback(
    (editorState: EditorState) => {
      if (readOnly) return;
      if (timerRef.current) clearTimeout(timerRef.current);
      setSaveStatus("saving");
      timerRef.current = setTimeout(() => {
        const json = JSON.stringify(editorState.toJSON());
        const sessionId = getOrCreateEditorSessionId();
        void saveDoc({
          editorStateJson: json,
          lastEditorUserId: currentUser.id,
          lastEditorSessionId: sessionId,
        }).then(() => {
          saveRevision(json);
        });
      }, DEBOUNCE_MS);
    },
    [editor, readOnly, saveDoc, setSaveStatus, saveRevision, currentUser]
  );

  return (
    <OnChangePlugin
      onChange={(editorState) => {
        persist(editorState);
      }}
    />
  );
}

import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useEffect } from "react";

import { useRevisions } from "../../collaboration/context/RevisionContext";
import { useEditorDoc } from "../context/EditorDocContext";

/** Applies version preview / restore to the Lexical editor */
export default function EditorRevisionBridge({
  onRestoreReady,
}: {
  onRestoreReady: (restore: (json: string) => void) => void;
}) {
  const [editor] = useLexicalComposerContext();
  const { previewRevision, exitPreview } = useRevisions();
  const { setReadOnly } = useEditorDoc();

  useEffect(() => {
    onRestoreReady((json: string) => {
      const state = editor.parseEditorState(json);
      editor.setEditorState(state);
      editor.setEditable(true);
      setReadOnly(false);
      exitPreview();
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps -- register restore once per editor
  }, [editor]);

  useEffect(() => {
    if (previewRevision?.editorStateJson) {
      const state = editor.parseEditorState(previewRevision.editorStateJson);
      editor.setEditorState(state);
      editor.setEditable(false);
      setReadOnly(true);
    }
  }, [previewRevision, editor, setReadOnly]);

  return null;
}

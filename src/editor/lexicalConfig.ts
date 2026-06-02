import { type InitialConfigType } from "@lexical/react/LexicalComposer";
import { $createParagraphNode, $getRoot } from "lexical";

import { docsEditorNodes } from "./docsNodes";
import { editorTheme } from "./theme/editorTheme";

/** Empty document — placeholder is shown by RichTextPlugin when empty */
function $initEmptyEditor() {
  const root = $getRoot();
  if (root.getFirstChild() !== null) {
    return;
  }
  root.append($createParagraphNode());
}

function resolveEditorState(editorStateJson?: string | null) {
  if (!editorStateJson || editorStateJson === "null") {
    return $initEmptyEditor;
  }
  try {
    const parsed = JSON.parse(editorStateJson) as { root?: { children?: unknown[] } };
    const children = parsed?.root?.children;
    if (Array.isArray(children) && children.length > 0) {
      return editorStateJson;
    }
    return $initEmptyEditor;
  } catch {
    console.warn("Invalid editorStateJson; using empty document.");
    return $initEmptyEditor;
  }
}

export function createLexicalConfig(
  editorStateJson?: string | null,
  editable = true
): InitialConfigType {
  return {
    namespace: "OneWorldDocs",
    theme: editorTheme,
    nodes: docsEditorNodes,
    editable,
    onError(error: Error) {
      console.error(error);
      throw error;
    },
    editorState: resolveEditorState(editorStateJson),
  };
}

/** @deprecated Use createLexicalConfig(doc.editorStateJson) */
export const lexicalInitialConfig: InitialConfigType =
  createLexicalConfig(null);

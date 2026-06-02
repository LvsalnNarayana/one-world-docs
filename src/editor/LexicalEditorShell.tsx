import { LexicalComposer } from "@lexical/react/LexicalComposer";
import type { JSX, ReactNode } from "react";

import "./editor.css";
import "./playground/nodes/PollNode.css";
import "./playground/nodes/PageBreakNode/index.css";
import { FindReplaceProvider } from "./context/FindReplaceContext";
import { LexicalToolbarProvider } from "./context/LexicalToolbarContext";
import { OutlineProvider } from "./context/OutlineContext";
import { WordCountProvider } from "./context/WordCountContext";
import { createLexicalConfig } from "./lexicalConfig";

type Props = {
  children: ReactNode;
  editorStateJson?: string | null;
  editable?: boolean;
};

export default function LexicalEditorShell({
  children,
  editorStateJson = null,
  editable = true,
}: Props): JSX.Element {
  const initialConfig = createLexicalConfig(editorStateJson, editable);

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <LexicalToolbarProvider>
        <FindReplaceProvider>
          <OutlineProvider>
            <WordCountProvider>{children}</WordCountProvider>
          </OutlineProvider>
        </FindReplaceProvider>
      </LexicalToolbarProvider>
    </LexicalComposer>
  );
}

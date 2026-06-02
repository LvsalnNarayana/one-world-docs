import { ContentEditable as LexicalContentEditable } from "@lexical/react/LexicalContentEditable";
import type { JSX } from "react";

export default function ContentEditable(): JSX.Element {
  return (
    <div className="ow-docs-editor-root">
      <LexicalContentEditable className="ow-docs-content-editable" />
    </div>
  );
}

import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $isHeadingNode } from "@lexical/rich-text";
import { $getRoot } from "lexical";
import { useEffect } from "react";

import { useOutline, type OutlineEntry } from "../context/OutlineContext";

export default function OutlinePlugin() {
  const [editor] = useLexicalComposerContext();
  const { setEntries } = useOutline();

  useEffect(() => {
    return editor.registerUpdateListener(({ editorState }) => {
      editorState.read(() => {
        const root = $getRoot();
        const entries: OutlineEntry[] = [];
        const children = root.getChildren();
        children.forEach((node) => {
          if ($isHeadingNode(node)) {
            const tag = node.getTag();
            const level = parseInt(tag.replace("h", ""), 10) || 1;
            entries.push({
              id: node.getKey(),
              key: node.getKey(),
              text: node.getTextContent(),
              level,
            });
          }
        });
        setEntries(entries);
      });
    });
  }, [editor, setEntries]);

  return null;
}

import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $getRoot } from "lexical";
import { useEffect } from "react";

import { useWordCountStats } from "../context/WordCountContext";

function computeStats(text: string) {
  const characters = text.length;
  const charactersNoSpaces = text.replace(/\s/g, "").length;
  const words = text.trim() ? text.trim().split(/\s+/).length : 0;
  const pages = Math.max(1, Math.ceil(words / 300));
  return { words, characters, charactersNoSpaces, pages };
}

export default function WordCountPlugin() {
  const [editor] = useLexicalComposerContext();
  const { setStats } = useWordCountStats();

  useEffect(() => {
    return editor.registerUpdateListener(({ editorState }) => {
      editorState.read(() => {
        const text = $getRoot().getTextContent();
        setStats(computeStats(text));
      });
    });
  }, [editor, setStats]);

  return null;
}

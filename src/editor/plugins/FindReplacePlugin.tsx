import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $getNodeByKey, $getRoot, $isTextNode } from "lexical";
import { useEffect, useRef } from "react";

import { useFindReplace } from "../context/FindReplaceContext";

type TextMatch = { key: string; start: number; end: number };

function findMatches(text: string, query: string): { start: number; end: number }[] {
  if (!query) return [];
  const matches: { start: number; end: number }[] = [];
  const lower = text.toLowerCase();
  const q = query.toLowerCase();
  let idx = 0;
  while (idx < lower.length) {
    const found = lower.indexOf(q, idx);
    if (found === -1) break;
    matches.push({ start: found, end: found + q.length });
    idx = found + 1;
  }
  return matches;
}

export default function FindReplacePlugin() {
  const [editor] = useLexicalComposerContext();
  const {
    registerHandlers,
    setMatchCount,
    setCurrentMatch,
    replaceWith,
  } = useFindReplace();
  const matchesRef = useRef<TextMatch[]>([]);
  const indexRef = useRef(0);
  const queryRef = useRef("");

  useEffect(() => {
    const collectMatches = (q: string) => {
      queryRef.current = q;
      const all: TextMatch[] = [];
      editor.getEditorState().read(() => {
        const root = $getRoot();
        const walk = (node: ReturnType<typeof $getRoot>) => {
          const children = node.getChildren();
          for (const child of children) {
            if ($isTextNode(child)) {
              const text = child.getTextContent();
              for (const m of findMatches(text, q)) {
                all.push({
                  key: child.getKey(),
                  start: m.start,
                  end: m.end,
                });
              }
            } else if ("getChildren" in child) {
              walk(child as ReturnType<typeof $getRoot>);
            }
          }
        };
        walk(root);
      });
      matchesRef.current = all;
      setMatchCount(all.length);
      indexRef.current = all.length > 0 ? 0 : -1;
      setCurrentMatch(all.length > 0 ? 1 : 0);
    };

    const goTo = (delta: number) => {
      const matches = matchesRef.current;
      if (!matches.length) return;
      indexRef.current =
        (indexRef.current + delta + matches.length) % matches.length;
      setCurrentMatch(indexRef.current + 1);
    };

    const replaceOne = () => {
      const matches = matchesRef.current;
      if (!matches.length || indexRef.current < 0) return;
      const match = matches[indexRef.current];
      editor.update(() => {
        const node = $getNodeByKey(match.key);
        if (node && $isTextNode(node)) {
          const text = node.getTextContent();
          const next =
            text.slice(0, match.start) +
            replaceWith +
            text.slice(match.end);
          node.setTextContent(next);
        }
      });
      collectMatches(queryRef.current);
    };

    const replaceAll = () => {
      if (!queryRef.current) return;
      editor.update(() => {
        const root = $getRoot();
        const visit = (parent: typeof root) => {
          for (const child of parent.getChildren()) {
            if ($isTextNode(child)) {
              const text = child.getTextContent();
              if (text.toLowerCase().includes(queryRef.current.toLowerCase())) {
                const re = new RegExp(
                  queryRef.current.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"),
                  "gi"
                );
                child.setTextContent(text.replace(re, replaceWith));
              }
            } else if ("getChildren" in child) {
              visit(child as typeof root);
            }
          }
        };
        visit(root);
      });
      collectMatches(queryRef.current);
    };

    registerHandlers({
      setQuery: collectMatches,
      findNext: () => goTo(1),
      findPrev: () => goTo(-1),
      replaceOne,
      replaceAll,
    });

    return () => registerHandlers(null);
  }, [
    editor,
    registerHandlers,
    setMatchCount,
    setCurrentMatch,
    replaceWith,
  ]);

  return null;
}

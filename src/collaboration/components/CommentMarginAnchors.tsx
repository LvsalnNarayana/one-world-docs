import { $isMarkNode, MarkNode } from "@lexical/mark";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { Box } from "@mui/material";
import { $nodesOfType } from "lexical";
import { useCallback, useEffect, useState, type JSX } from "react";

import UserAvatar from "../../shared/UserAvatar";
import { getUserDisplayName } from "../../types/doc/doc.types";
import { useComments } from "../context/CommentContext";

type AnchorPin = {
  threadId: string;
  top: number;
  username: string;
  label: string;
};

export default function CommentMarginAnchors(): JSX.Element | null {
  const [editor] = useLexicalComposerContext();
  const { threads, setActiveThreadId } = useComments();
  const [pins, setPins] = useState<AnchorPin[]>([]);

  const updatePins = useCallback(() => {
    const openThreads = threads.filter((t) => !t.isResolved);
    if (openThreads.length === 0) {
      setPins([]);
      return;
    }

    const rootEl = editor.getRootElement();
    const pageInner = rootEl?.closest(".ow-docs-page-inner");
    if (!rootEl || !pageInner) {
      setPins([]);
      return;
    }

    const pageRect = pageInner.getBoundingClientRect();
    const next: AnchorPin[] = [];

    editor.getEditorState().read(() => {
      const marks = $nodesOfType(MarkNode);
      for (const thread of openThreads) {
        const mark = marks.find(
          (m) =>
            $isMarkNode(m) && m.getIDs().includes(thread.anchor.lexicalKey)
        );
        if (!mark) continue;

        const dom = editor.getElementByKey(mark.getKey());
        if (!dom) continue;

        const rect = dom.getBoundingClientRect();
        const author = thread.entries[0]?.author;
        next.push({
          threadId: thread.id,
          top: rect.top - pageRect.top + rect.height / 2 - 12,
          username: author?.username ?? "user",
          label: author ? getUserDisplayName(author) : "Comment",
        });
      }
    });

    setPins(next);
  }, [editor, threads]);

  useEffect(() => {
    updatePins();
    return editor.registerUpdateListener(() => updatePins());
  }, [editor, updatePins]);

  useEffect(() => {
    const onResize = () => updatePins();
    window.addEventListener("resize", onResize);
    const pageInner = editor.getRootElement()?.closest(".ow-docs-page-inner");
    const scrollParent = pageInner?.closest(".ow-docs-canvas-scroll");
    scrollParent?.addEventListener("scroll", onResize, { passive: true });
    return () => {
      window.removeEventListener("resize", onResize);
      scrollParent?.removeEventListener("scroll", onResize);
    };
  }, [editor, updatePins]);

  if (pins.length === 0) return null;

  return (
    <Box className="ow-docs-comment-anchors" aria-hidden={false}>
      {pins.map((pin) => (
        <Box
          key={pin.threadId}
          className="ow-docs-comment-anchor-pin"
          title={pin.label}
          sx={{ top: `${Math.max(0, pin.top)}px` }}
          onClick={() => setActiveThreadId(pin.threadId)}
        >
          <UserAvatar width={24} height={24} username={pin.username} />
        </Box>
      ))}
    </Box>
  );
}

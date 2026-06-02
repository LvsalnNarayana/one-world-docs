import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $getNodeByKey, $getRoot, type LexicalEditor, type LexicalNode } from "lexical";
import { useEffect, useRef, type JSX } from "react";

import {
  $createPageFlowSpacerNode,
  $isPageFlowSpacerNode,
  PageFlowSpacerNode,
} from "../nodes/PageFlowSpacerNode";
import { $isPageBreakNode } from "../playground/nodes/PageBreakNode/index";

type Props = {
  usablePageHeightPx: number;
  onPageCountChange?: (count: number) => void;
};

function getBlockHeight(editor: LexicalEditor, node: LexicalNode): number {
  const dom = editor.getElementByKey(node.getKey());
  if (!dom) {
    return 0;
  }
  return dom.getBoundingClientRect().height;
}

function countPages(editor: LexicalEditor): number {
  let pages = 1;
  editor.getEditorState().read(() => {
    for (const child of $getRoot().getChildren()) {
      if ($isPageFlowSpacerNode(child) || $isPageBreakNode(child)) {
        pages += 1;
      }
    }
  });
  return pages;
}

function reconcilePageFlow(
  editor: LexicalEditor,
  usablePageHeightPx: number
): void {
  editor.update(
    () => {
      const root = $getRoot();
      for (const child of [...root.getChildren()]) {
        if ($isPageFlowSpacerNode(child)) {
          child.remove();
        }
      }
    },
    { discrete: true }
  );

  editor.update(
    () => {
      const root = $getRoot();
      let usedOnPage = 0;
      const insertBeforeKeys: string[] = [];

      for (const child of root.getChildren()) {
        if ($isPageFlowSpacerNode(child)) {
          continue;
        }

        if ($isPageBreakNode(child)) {
          usedOnPage = 0;
          continue;
        }

        const blockHeight = getBlockHeight(editor, child);
        if (blockHeight <= 0) {
          continue;
        }

        if (usedOnPage > 0 && usedOnPage + blockHeight > usablePageHeightPx) {
          insertBeforeKeys.push(child.getKey());
          usedOnPage = blockHeight;
        } else {
          usedOnPage += blockHeight;
        }
      }

      for (const key of insertBeforeKeys) {
        const node = $getNodeByKey(key);
        if (!node) {
          continue;
        }
        node.insertBefore($createPageFlowSpacerNode());
      }
    },
    { discrete: true }
  );
}

export default function MultiPageFlowPlugin({
  usablePageHeightPx,
  onPageCountChange,
}: Props): JSX.Element | null {
  const [editor] = useLexicalComposerContext();
  const rafRef = useRef(0);

  useEffect(() => {
    if (usablePageHeightPx <= 0) {
      return;
    }

    if (!editor.hasNodes([PageFlowSpacerNode])) {
      console.error(
        "MultiPageFlowPlugin: PageFlowSpacerNode is not registered on editor"
      );
      return;
    }

    let cancelled = false;

    const run = () => {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        if (cancelled) {
          return;
        }
        reconcilePageFlow(editor, usablePageHeightPx);
        rafRef.current = requestAnimationFrame(() => {
          if (cancelled) {
            return;
          }
          onPageCountChange?.(countPages(editor));
        });
      });
    };

    run();
    return editor.registerUpdateListener(() => {
      run();
    });
  }, [editor, onPageCountChange, usablePageHeightPx]);

  useEffect(() => {
    const rootEl = editor.getRootElement();
    if (!rootEl || usablePageHeightPx <= 0) {
      return;
    }
    const observer = new ResizeObserver(() => {
      reconcilePageFlow(editor, usablePageHeightPx);
      onPageCountChange?.(countPages(editor));
    });
    observer.observe(rootEl);
    return () => observer.disconnect();
  }, [editor, onPageCountChange, usablePageHeightPx]);

  return null;
}

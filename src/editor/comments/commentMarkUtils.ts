import {
  $isMarkNode,
  $unwrapMarkNode,
  $wrapSelectionInMarkNode,
  MarkNode,
} from "@lexical/mark";
import {
  $createRangeSelection,
  $getSelection,
  $isRangeSelection,
  $nodesOfType,
  $setSelection,
  type LexicalEditor,
  type RangeSelection,
} from "lexical";

export type SelectionSnapshot = {
  anchor: { key: string; offset: number; type: "text" | "element" };
  focus: { key: string; offset: number; type: "text" | "element" };
  quotedText: string;
};

export function captureSelectionSnapshot(
  editor: LexicalEditor
): SelectionSnapshot | null {
  let snapshot: SelectionSnapshot | null = null;
  editor.getEditorState().read(() => {
    const selection = $getSelection();
    if (!$isRangeSelection(selection) || selection.isCollapsed()) return;
    snapshot = {
      anchor: {
        key: selection.anchor.key,
        offset: selection.anchor.offset,
        type: selection.anchor.type,
      },
      focus: {
        key: selection.focus.key,
        offset: selection.focus.offset,
        type: selection.focus.type,
      },
      quotedText: selection.getTextContent(),
    };
  });
  return snapshot;
}

function restoreSelection(snapshot: SelectionSnapshot): RangeSelection {
  const selection = $createRangeSelection();
  selection.anchor.set(
    snapshot.anchor.key,
    snapshot.anchor.offset,
    snapshot.anchor.type
  );
  selection.focus.set(
    snapshot.focus.key,
    snapshot.focus.offset,
    snapshot.focus.type
  );
  $setSelection(selection);
  return selection;
}

export function wrapSnapshotAsComment(
  editor: LexicalEditor,
  snapshot: SelectionSnapshot,
  markId: string
) {
  editor.update(() => {
    const selection = restoreSelection(snapshot);
    $wrapSelectionInMarkNode(selection, selection.isBackward(), markId);
  });
}

export function unwrapCommentMark(editor: LexicalEditor, markId: string) {
  editor.update(() => {
    const marks = $nodesOfType(MarkNode);
    for (const mark of marks) {
      if ($isMarkNode(mark) && mark.getIDs().includes(markId)) {
        $unwrapMarkNode(mark);
      }
    }
  });
}

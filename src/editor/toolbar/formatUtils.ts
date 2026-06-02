import { $createCodeNode } from "@lexical/code";
import {
  INSERT_CHECK_LIST_COMMAND,
  INSERT_ORDERED_LIST_COMMAND,
  INSERT_UNORDERED_LIST_COMMAND,
} from "@lexical/list";
import {
  $createHeadingNode,
  $createQuoteNode,
  type HeadingTagType,
} from "@lexical/rich-text";
import { $patchStyleText, $setBlocksType } from "@lexical/selection";
import { $findMatchingParent } from "@lexical/utils";
import {
  $createParagraphNode,
  $getSelection,
  $isElementNode,
  $isRangeSelection,
  type LexicalEditor,
  type ElementNode,
} from "lexical";

export type BlockType =
  | "paragraph"
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "quote"
  | "bullet"
  | "number"
  | "check"
  | "code";

export const formatParagraph = (editor: LexicalEditor) => {
  editor.update(() => {
    const selection = $getSelection();
    $setBlocksType(selection, () => $createParagraphNode());
  });
};

export const formatHeading = (
  editor: LexicalEditor,
  blockType: BlockType,
  headingSize: HeadingTagType
) => {
  if (blockType !== headingSize) {
    editor.update(() => {
      const selection = $getSelection();
      $setBlocksType(selection, () => $createHeadingNode(headingSize));
    });
  }
};

export const formatBulletList = (editor: LexicalEditor, blockType: BlockType) => {
  if (blockType !== "bullet") {
    editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined);
  } else {
    formatParagraph(editor);
  }
};

export const formatNumberedList = (
  editor: LexicalEditor,
  blockType: BlockType
) => {
  if (blockType !== "number") {
    editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined);
  } else {
    formatParagraph(editor);
  }
};

export const formatCheckList = (editor: LexicalEditor, blockType: BlockType) => {
  if (blockType !== "check") {
    editor.dispatchCommand(INSERT_CHECK_LIST_COMMAND, undefined);
  } else {
    formatParagraph(editor);
  }
};

export const formatQuote = (editor: LexicalEditor, blockType: BlockType) => {
  if (blockType !== "quote") {
    editor.update(() => {
      const selection = $getSelection();
      $setBlocksType(selection, () => $createQuoteNode());
    });
  }
};

export const formatCode = (editor: LexicalEditor, blockType: BlockType) => {
  if (blockType !== "code") {
    editor.update(() => {
      const selection = $getSelection();
      if (selection) {
        $setBlocksType(selection, () => $createCodeNode());
      }
    });
  }
};

export const applyFontFamily = (editor: LexicalEditor, fontFamily: string) => {
  editor.update(() => {
    const selection = $getSelection();
    if (selection) {
      $patchStyleText(selection, { "font-family": fontFamily });
    }
  });
};

export const applyFontSize = (editor: LexicalEditor, fontSizePx: number) => {
  editor.update(() => {
    const selection = $getSelection();
    if (selection) {
      $patchStyleText(selection, { "font-size": `${fontSizePx}px` });
    }
  });
};

export const applyTextColor = (editor: LexicalEditor, color: string) => {
  editor.update(() => {
    const selection = $getSelection();
    if (selection) {
      $patchStyleText(selection, { color });
    }
  });
};

export const applyBackgroundColor = (
  editor: LexicalEditor,
  backgroundColor: string
) => {
  editor.update(() => {
    const selection = $getSelection();
    if (selection) {
      $patchStyleText(selection, { "background-color": backgroundColor });
    }
  });
};

function patchBlockStyle(
  block: ElementNode,
  property: string,
  value: string
): void {
  const rules = (block.getStyle() || "")
    .split(";")
    .map((r) => r.trim())
    .filter(Boolean)
    .filter((r) => !r.startsWith(property));
  rules.push(`${property}: ${value}`);
  block.setStyle(rules.join("; "));
}

function getBlocksInSelection(): ElementNode[] {
  const selection = $getSelection();
  if (!$isRangeSelection(selection)) return [];
  const blocks: ElementNode[] = [];
  const seen = new Set<string>();
  for (const node of selection.getNodes()) {
    const block = $findMatchingParent(node, (n) => {
      const parent = n.getParent();
      return parent !== null && parent.getType() === "root";
    });
    if (block && $isElementNode(block) && !seen.has(block.getKey())) {
      seen.add(block.getKey());
      blocks.push(block);
    }
  }
  return blocks;
}

export const applyLineHeight = (editor: LexicalEditor, lineHeight: string) => {
  editor.update(() => {
    const blocks = getBlocksInSelection();
    if (blocks.length === 0) {
      const selection = $getSelection();
      if (selection) {
        $patchStyleText(selection, { "line-height": lineHeight });
      }
      return;
    }
    for (const block of blocks) {
      patchBlockStyle(block, "line-height", lineHeight);
    }
  });
};

export const applyParagraphSpacingAfter = (
  editor: LexicalEditor,
  spacing: string
) => {
  editor.update(() => {
    for (const block of getBlocksInSelection()) {
      patchBlockStyle(block, "margin-bottom", spacing);
    }
  });
};

export const indentBlocks = (editor: LexicalEditor) => {
  editor.update(() => {
    for (const block of getBlocksInSelection()) {
      block.setIndent(block.getIndent() + 1);
    }
  });
};

export const outdentBlocks = (editor: LexicalEditor) => {
  editor.update(() => {
    for (const block of getBlocksInSelection()) {
      block.setIndent(Math.max(0, block.getIndent() - 1));
    }
  });
};

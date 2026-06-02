import { TOGGLE_LINK_COMMAND } from "@lexical/link";
import { $isListNode, ListNode } from "@lexical/list";
import { INSERT_HORIZONTAL_RULE_COMMAND } from "@lexical/react/LexicalHorizontalRuleNode";
import { INSERT_PAGE_BREAK } from "../playground/plugins/PageBreakPlugin/index";
import {
  $isHeadingNode,
  $isQuoteNode,
  type HeadingTagType,
} from "@lexical/rich-text";
import { $patchStyleText, $setBlocksType } from "@lexical/selection";
import { $isTableSelection } from "@lexical/table";
import { $findMatchingParent } from "@lexical/utils";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import {
  $createParagraphNode,
  $getSelection,
  $isRangeSelection,
  $isRootOrShadowRoot,
  CAN_REDO_COMMAND,
  CAN_UNDO_COMMAND,
  COMMAND_PRIORITY_LOW,
  FORMAT_ELEMENT_COMMAND,
  FORMAT_TEXT_COMMAND,
  REDO_COMMAND,
  SELECTION_CHANGE_COMMAND,
  UNDO_COMMAND,
  type ElementFormatType,
  type TextFormatType,
} from "lexical";
import { useCallback, useEffect, useState } from "react";

import {
  applyBackgroundColor,
  applyFontFamily,
  applyFontSize,
  applyLineHeight,
  applyParagraphSpacingAfter,
  applyTextColor,
  formatBulletList,
  formatCheckList,
  formatCode,
  formatHeading,
  formatNumberedList,
  formatParagraph,
  formatQuote,
  indentBlocks,
  outdentBlocks,
  type BlockType,
} from "../toolbar/formatUtils";

export type ToolbarFormatState = {
  blockType: BlockType;
  blockTypeLabel: string;
  isBold: boolean;
  isItalic: boolean;
  isUnderline: boolean;
  isStrikethrough: boolean;
  isCode: boolean;
  isSubscript: boolean;
  isSuperscript: boolean;
  canUndo: boolean;
  canRedo: boolean;
  fontSize: string;
};

const blockTypeToLabel: Record<BlockType, string> = {
  paragraph: "Normal Text",
  h1: "Heading 1",
  h2: "Heading 2",
  h3: "Heading 3",
  h4: "Heading 4",
  h5: "Heading 5",
  h6: "Heading 6",
  quote: "Quote",
  bullet: "Bulleted List",
  number: "Numbered List",
  check: "To-do List",
  code: "Code",
};

export function useLexicalToolbar() {
  const [editor] = useLexicalComposerContext();
  const [formatState, setFormatState] = useState<ToolbarFormatState>({
    blockType: "paragraph",
    blockTypeLabel: "Normal Text",
    isBold: false,
    isItalic: false,
    isUnderline: false,
    isStrikethrough: false,
    isCode: false,
    isSubscript: false,
    isSuperscript: false,
    canUndo: false,
    canRedo: false,
    fontSize: "15",
  });

  const updateToolbar = useCallback(() => {
    editor.getEditorState().read(() => {
      const selection = $getSelection();
      if (!$isRangeSelection(selection) || $isTableSelection(selection)) {
        return;
      }

      const anchorNode = selection.anchor.getNode();
      let blockType: BlockType = "paragraph";
      const element =
        anchorNode.getKey() === "root"
          ? anchorNode
          : $findMatchingParent(anchorNode, (node) => {
              const parent = node.getParent();
              return parent !== null && $isRootOrShadowRoot(parent);
            });

      if (element) {
        if ($isHeadingNode(element)) {
          blockType = element.getTag();
        } else if ($isQuoteNode(element)) {
          blockType = "quote";
        } else if (element.getType() === "code") {
          blockType = "code";
        } else if ($isListNode(element)) {
          const listType = (element as ListNode).getListType();
          blockType =
            listType === "bullet"
              ? "bullet"
              : listType === "number"
                ? "number"
                : "check";
        }
      }

      setFormatState((prev) => ({
        ...prev,
        blockType,
        blockTypeLabel: blockTypeToLabel[blockType],
        isBold: selection.hasFormat("bold"),
        isItalic: selection.hasFormat("italic"),
        isUnderline: selection.hasFormat("underline"),
        isStrikethrough: selection.hasFormat("strikethrough"),
        isCode: selection.hasFormat("code"),
        isSubscript: selection.hasFormat("subscript"),
        isSuperscript: selection.hasFormat("superscript"),
        fontSize: "15",
      }));
    });
  }, [editor]);

  useEffect(() => {
    return editor.registerCommand(
      SELECTION_CHANGE_COMMAND,
      () => {
        updateToolbar();
        return false;
      },
      COMMAND_PRIORITY_LOW
    );
  }, [editor, updateToolbar]);

  useEffect(() => {
    return editor.registerCommand(
      CAN_UNDO_COMMAND,
      (payload) => {
        setFormatState((prev) => ({ ...prev, canUndo: payload }));
        return false;
      },
      COMMAND_PRIORITY_LOW
    );
  }, [editor]);

  useEffect(() => {
    return editor.registerCommand(
      CAN_REDO_COMMAND,
      (payload) => {
        setFormatState((prev) => ({ ...prev, canRedo: payload }));
        return false;
      },
      COMMAND_PRIORITY_LOW
    );
  }, [editor]);

  useEffect(() => {
    return editor.registerUpdateListener(({ editorState }) => {
      editorState.read(() => updateToolbar());
    });
  }, [editor, updateToolbar]);

  const undo = () => {
    editor.focus();
    editor.dispatchCommand(UNDO_COMMAND, undefined);
  };

  const redo = () => {
    editor.focus();
    editor.dispatchCommand(REDO_COMMAND, undefined);
  };

  const toggleFormat = (format: TextFormatType) => {
    editor.focus(() => {
      editor.dispatchCommand(FORMAT_TEXT_COMMAND, format);
    });
  };

  const toggleInlineCode = () => {
    editor.focus(() => {
      editor.dispatchCommand(FORMAT_TEXT_COMMAND, "code");
    });
  };

  const setElementFormat = (format: ElementFormatType) => {
    editor.focus();
    editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, format);
  };

  const setBlockStyle = (label: string) => {
    const blockType = formatState.blockType;
    editor.focus();
    switch (label) {
      case "Normal Text":
        formatParagraph(editor);
        break;
      case "Heading 1":
        formatHeading(editor, blockType, "h1");
        break;
      case "Heading 2":
        formatHeading(editor, blockType, "h2");
        break;
      case "Heading 3":
        formatHeading(editor, blockType, "h3");
        break;
      case "Heading 4":
        formatHeading(editor, blockType, "h4" as HeadingTagType);
        break;
      case "Heading 5":
        formatHeading(editor, blockType, "h5" as HeadingTagType);
        break;
      case "Heading 6":
        formatHeading(editor, blockType, "h6" as HeadingTagType);
        break;
      case "Quote":
        formatQuote(editor, blockType);
        break;
      case "Bulleted List":
        formatBulletList(editor, blockType);
        break;
      case "Numbered List":
        formatNumberedList(editor, blockType);
        break;
      case "To-do List":
        formatCheckList(editor, blockType);
        break;
      case "Code":
        formatCode(editor, blockType);
        break;
      default:
        break;
    }
  };

  const insertHorizontalRule = () => {
    editor.focus();
    editor.dispatchCommand(INSERT_HORIZONTAL_RULE_COMMAND, undefined);
  };

  const insertPageBreak = () => {
    editor.focus();
    editor.dispatchCommand(INSERT_PAGE_BREAK, undefined);
  };

  const toggleLink = () => {
    const url = window.prompt("Enter URL (leave empty to remove link)", "https://");
    if (url === null) return;
    editor.focus();
    editor.dispatchCommand(TOGGLE_LINK_COMMAND, url === "" ? null : url);
  };

  const indent = () => {
    editor.focus();
    indentBlocks(editor);
  };

  const outdent = () => {
    editor.focus();
    outdentBlocks(editor);
  };

  const clearFormatting = () => {
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        $setBlocksType(selection, () => $createParagraphNode());
        $patchStyleText(selection, {
          "font-size": null,
          "font-family": null,
          color: null,
          "background-color": null,
        });
        const formats: TextFormatType[] = [
          "bold",
          "italic",
          "underline",
          "strikethrough",
          "code",
          "subscript",
          "superscript",
        ];
        for (const f of formats) {
          if (selection.hasFormat(f)) {
            selection.toggleFormat(f);
          }
        }
      }
    });
  };

  return {
    editor,
    formatState,
    undo,
    redo,
    toggleFormat,
    setElementFormat,
    setBlockStyle,
    insertHorizontalRule,
    insertPageBreak,
    toggleLink,
    indent,
    outdent,
    clearFormatting,
    applyFontFamily: (fontFamily: string) => {
      editor.focus();
      applyFontFamily(editor, fontFamily);
    },
    applyFontSize: (fontSizePx: number) => {
      editor.focus();
      applyFontSize(editor, fontSizePx);
    },
    applyTextColor: (color: string) => {
      editor.focus();
      applyTextColor(editor, color);
    },
    applyBackgroundColor: (color: string) => {
      editor.focus();
      applyBackgroundColor(editor, color);
    },
    applyLineHeight: (lineHeight: string) => {
      editor.focus();
      applyLineHeight(editor, lineHeight);
    },
    applyParagraphSpacingAfter: (spacing: string) => {
      editor.focus();
      applyParagraphSpacingAfter(editor, spacing);
    },
    toggleInlineCode,
  };
}

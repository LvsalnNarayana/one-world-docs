import { MarkNode } from "@lexical/mark";
import { CodeNode } from "@lexical/code";
import { HashtagNode } from "@lexical/hashtag";
import { AutoLinkNode, LinkNode } from "@lexical/link";
import { ListItemNode, ListNode } from "@lexical/list";
import { HorizontalRuleNode } from "@lexical/react/LexicalHorizontalRuleNode";
import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import { TableCellNode, TableNode, TableRowNode } from "@lexical/table";
import type { Klass, LexicalNode } from "lexical";

import { PageBreakNode } from "./playground/nodes/PageBreakNode/index";
import { LayoutContainerNode } from "./playground/nodes/LayoutContainerNode";
import { LayoutItemNode } from "./playground/nodes/LayoutItemNode";
import { PollNode } from "./playground/nodes/PollNode";
import { YouTubeNode } from "./playground/nodes/YouTubeNode";
import { PageFlowSpacerNode } from "./nodes/PageFlowSpacerNode";
import { SimpleImageNode } from "./nodes/SimpleImageNode";

export const docsEditorNodes: Array<Klass<LexicalNode>> = [
  MarkNode,
  HeadingNode,
  QuoteNode,
  ListNode,
  ListItemNode,
  CodeNode,
  LinkNode,
  AutoLinkNode,
  HashtagNode,
  HorizontalRuleNode,
  PageBreakNode,
  PageFlowSpacerNode,
  SimpleImageNode,
  PollNode,
  LayoutContainerNode,
  LayoutItemNode,
  TableNode,
  TableCellNode,
  TableRowNode,
  YouTubeNode,
];

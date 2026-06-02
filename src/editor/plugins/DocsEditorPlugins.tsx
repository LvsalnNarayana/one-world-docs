import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import { ClickableLinkPlugin } from "@lexical/react/LexicalClickableLinkPlugin";
import { CheckListPlugin } from "@lexical/react/LexicalCheckListPlugin";
import { HashtagPlugin } from "@lexical/react/LexicalHashtagPlugin";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { HorizontalRulePlugin } from "@lexical/react/LexicalHorizontalRulePlugin";
import { LinkPlugin } from "@lexical/react/LexicalLinkPlugin";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { MarkdownShortcutPlugin } from "@lexical/react/LexicalMarkdownShortcutPlugin";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { TabIndentationPlugin } from "@lexical/react/LexicalTabIndentationPlugin";
import { TablePlugin } from "@lexical/react/LexicalTablePlugin";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { TRANSFORMERS } from "@lexical/markdown";
import type { JSX } from "react";

import PageBreakPlugin from "../playground/plugins/PageBreakPlugin/index";
import { LayoutPlugin } from "../playground/plugins/LayoutPlugin/LayoutPlugin";
import PollPlugin from "../playground/plugins/PollPlugin";
import YouTubePlugin from "../playground/plugins/YouTubePlugin";
import ContentEditable from "../ui/ContentEditable";
import EditorPlaceholder from "../ui/EditorPlaceholder";
import AutoSavePlugin from "./AutoSavePlugin";
import FindReplacePlugin from "./FindReplacePlugin";
import OutlinePlugin from "./OutlinePlugin";
import SimpleImagePlugin from "./SimpleImagePlugin";
import WordCountPlugin from "./WordCountPlugin";
import CommentMarkBridge from "./CommentMarkBridge";

export default function DocsEditorPlugins(): JSX.Element {
  return (
    <>
      <RichTextPlugin
        contentEditable={<ContentEditable />}
        placeholder={<EditorPlaceholder />}
        ErrorBoundary={LexicalErrorBoundary}
      />
      <HistoryPlugin />
      <ListPlugin />
      <CheckListPlugin />
      <LinkPlugin />
      <ClickableLinkPlugin newTab />
      <HashtagPlugin />
      <HorizontalRulePlugin />
      <PageBreakPlugin />
      <SimpleImagePlugin />
      <PollPlugin />
      <LayoutPlugin />
      <YouTubePlugin />
      <TablePlugin hasCellMerge hasCellBackgroundColor hasHorizontalScroll />
      <TabIndentationPlugin maxIndent={7} />
      <MarkdownShortcutPlugin transformers={TRANSFORMERS} />
      <AutoFocusPlugin />
      <AutoSavePlugin />
      <FindReplacePlugin />
      <WordCountPlugin />
      <OutlinePlugin />
      <CommentMarkBridge />
    </>
  );
}

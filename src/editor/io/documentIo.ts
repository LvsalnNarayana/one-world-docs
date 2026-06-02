import { $generateHtmlFromNodes, $generateNodesFromDOM } from "@lexical/html";
import mammoth from "mammoth";
import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  HeadingLevel,
  type IParagraphOptions,
} from "docx";
import { saveAs } from "file-saver";
import {
  $createParagraphNode,
  $getRoot,
  $isElementNode,
  $isParagraphNode,
  $isTextNode,
  type LexicalEditor,
  type LexicalNode,
} from "lexical";
import { $isHeadingNode } from "@lexical/rich-text";

function nodeToDocxParagraphs(node: LexicalNode): IParagraphOptions[] {
  if ($isParagraphNode(node)) {
    const text = node.getTextContent();
    return [
      {
        children: [new TextRun({ text: text || " " })],
        spacing: { after: 120 },
      },
    ];
  }

  if ($isHeadingNode(node)) {
    const tag = node.getTag();
    const levelMap = {
      h1: HeadingLevel.HEADING_1,
      h2: HeadingLevel.HEADING_2,
      h3: HeadingLevel.HEADING_3,
      h4: HeadingLevel.HEADING_4,
      h5: HeadingLevel.HEADING_5,
      h6: HeadingLevel.HEADING_6,
    } as const;
    return [
      {
        heading: levelMap[tag] ?? HeadingLevel.HEADING_1,
        children: [new TextRun({ text: node.getTextContent(), bold: true })],
        spacing: { after: 160 },
      },
    ];
  }

  if ($isElementNode(node)) {
    return node.getChildren().flatMap((child) => nodeToDocxParagraphs(child));
  }

  if ($isTextNode(node)) {
    const text = node.getTextContent();
    if (!text) return [];
    return [
      {
        children: [
          new TextRun({
            text,
            bold: node.hasFormat("bold"),
            italics: node.hasFormat("italic"),
            underline: node.hasFormat("underline") ? {} : undefined,
            strike: node.hasFormat("strikethrough"),
          }),
        ],
      },
    ];
  }

  return [];
}

export async function importDocxIntoEditor(
  editor: LexicalEditor,
  file: File
): Promise<void> {
  const arrayBuffer = await file.arrayBuffer();
  const { value: html } = await mammoth.convertToHtml({ arrayBuffer });
  const dom = new DOMParser().parseFromString(html, "text/html");

  editor.update(() => {
    const root = $getRoot();
    root.clear();
    const nodes = $generateNodesFromDOM(editor, dom);
    if (nodes.length === 0) {
      root.append($createParagraphNode());
      return;
    }
    root.append(...nodes);
  });
}

export async function exportDocAsDocx(
  editor: LexicalEditor,
  title: string
): Promise<void> {
  const paragraphs: Paragraph[] = [];

  editor.getEditorState().read(() => {
    const root = $getRoot();
    for (const child of root.getChildren()) {
      for (const opts of nodeToDocxParagraphs(child)) {
        paragraphs.push(new Paragraph(opts));
      }
    }
  });

  if (paragraphs.length === 0) {
    paragraphs.push(new Paragraph({ children: [new TextRun("")] }));
  }

  const doc = new Document({
    title,
    sections: [{ children: paragraphs }],
  });
  const blob = await Packer.toBlob(doc);
  saveAs(blob, `${sanitizeFilename(title)}.docx`);
}

export function exportDocAsHtml(editor: LexicalEditor, title: string): void {
  let html = "";
  editor.getEditorState().read(() => {
    html = $generateHtmlFromNodes(editor, null);
  });
  const wrapped = `<!DOCTYPE html><html><head><meta charset="utf-8"><title>${title}</title></head><body>${html}</body></html>`;
  saveAs(
    new Blob([wrapped], { type: "text/html;charset=utf-8" }),
    `${sanitizeFilename(title)}.html`
  );
}

export function exportDocAsPlainText(editor: LexicalEditor, title: string): void {
  let text = "";
  editor.getEditorState().read(() => {
    text = $getRoot().getTextContent();
  });
  saveAs(
    new Blob([text], { type: "text/plain;charset=utf-8" }),
    `${sanitizeFilename(title)}.txt`
  );
}

export function printDocument(): void {
  window.print();
}

function sanitizeFilename(name: string): string {
  return (name.trim() || "document").replace(/[<>:"/\\|?*]+/g, "_");
}

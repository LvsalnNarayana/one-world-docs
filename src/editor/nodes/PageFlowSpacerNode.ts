import {
  DOMConversionMap,
  DOMExportOutput,
  ElementNode,
  LexicalNode,
  SerializedElementNode,
  type EditorConfig,
} from "lexical";

export type SerializedPageFlowSpacerNode = SerializedElementNode;

export class PageFlowSpacerNode extends ElementNode {
  static getType(): string {
    return "page-flow-spacer";
  }

  static clone(node: PageFlowSpacerNode): PageFlowSpacerNode {
    return new PageFlowSpacerNode(node.__key);
  }

  createDOM(_config: EditorConfig): HTMLElement {
    const el = document.createElement("div");
    el.className = "ow-docs-page-flow-spacer";
    el.setAttribute("data-ow-page-flow-spacer", "true");
    el.setAttribute("contenteditable", "false");
    return el;
  }

  updateDOM(): boolean {
    return false;
  }

  static importDOM(): DOMConversionMap | null {
    return {
      div: (domNode: HTMLElement) => {
        if (!domNode.hasAttribute("data-ow-page-flow-spacer")) {
          return null;
        }
        return {
          conversion: () => ({ node: $createPageFlowSpacerNode() }),
          priority: 2,
        };
      },
    };
  }

  exportDOM(): DOMExportOutput {
    const element = document.createElement("div");
    element.setAttribute("data-ow-page-flow-spacer", "true");
    element.className = "ow-docs-page-flow-spacer";
    return { element };
  }

  isInline(): boolean {
    return false;
  }

  canBeEmpty(): boolean {
    return true;
  }

  collapseAtStart(): boolean {
    return true;
  }

  isIsolated(): boolean {
    return true;
  }

  isKeyboardSelectable(): boolean {
    return false;
  }
}

export function $createPageFlowSpacerNode(): PageFlowSpacerNode {
  return new PageFlowSpacerNode();
}

export function $isPageFlowSpacerNode(
  node: LexicalNode | null | undefined
): node is PageFlowSpacerNode {
  return node instanceof PageFlowSpacerNode;
}

import type {
  DOMConversionMap,
  EditorConfig,
  LexicalNode,
  NodeKey,
  SerializedLexicalNode,
  Spread,
} from "lexical";
import type { JSX } from "react";
import {
  $applyNodeReplacement,
  DecoratorNode,
} from "lexical";

export interface ImagePayload {
  altText: string;
  src: string;
  width?: number;
  height?: number;
  maxWidth?: number;
}

export type SerializedSimpleImageNode = Spread<
  {
    altText: string;
    height?: number;
    maxWidth: number;
    src: string;
    width?: number;
  },
  SerializedLexicalNode
>;

function ImageView({
  src,
  altText,
  width,
  height,
  maxWidth,
}: {
  src: string;
  altText: string;
  width?: number;
  height?: number;
  maxWidth: number;
}): JSX.Element {
  return (
    <img
      src={src}
      alt={altText}
      style={{
        maxWidth,
        width: width ?? "auto",
        height: height ?? "auto",
        display: "block",
        margin: "12px 0",
      }}
      draggable={false}
    />
  );
}

export class SimpleImageNode extends DecoratorNode<JSX.Element> {
  __src: string;
  __altText: string;
  __width?: number;
  __height?: number;
  __maxWidth: number;

  static getType(): string {
    return "ow-image";
  }

  static clone(node: SimpleImageNode): SimpleImageNode {
    return new SimpleImageNode(
      node.__src,
      node.__altText,
      node.__maxWidth,
      node.__width,
      node.__height,
      node.__key
    );
  }

  static importJSON(serialized: SerializedSimpleImageNode): SimpleImageNode {
    return $createSimpleImageNode(serialized);
  }

  static importDOM(): DOMConversionMap | null {
    return {
      img: () => ({
        conversion: (domNode: Node) => {
          const img = domNode as HTMLImageElement;
          if (!img.src || img.src.startsWith("file:///")) {
            return null;
          }
          return {
            node: $createSimpleImageNode({
              src: img.src,
              altText: img.alt || "",
              width: img.width,
              height: img.height,
            }),
          };
        },
        priority: 0,
      }),
    };
  }

  constructor(
    src: string,
    altText: string,
    maxWidth: number,
    width?: number,
    height?: number,
    key?: NodeKey
  ) {
    super(key);
    this.__src = src;
    this.__altText = altText;
    this.__maxWidth = maxWidth;
    this.__width = width;
    this.__height = height;
  }

  exportJSON(): SerializedSimpleImageNode {
    return {
      ...super.exportJSON(),
      altText: this.__altText,
      height: this.__height,
      maxWidth: this.__maxWidth,
      src: this.__src,
      type: "ow-image",
      version: 1,
      width: this.__width,
    };
  }

  createDOM(config: EditorConfig): HTMLElement {
    const span = document.createElement("span");
    const className = config.theme.image;
    if (className) {
      span.className = className;
    }
    return span;
  }

  updateDOM(): false {
    return false;
  }

  decorate(): JSX.Element {
    return (
      <ImageView
        src={this.__src}
        altText={this.__altText}
        width={this.__width}
        height={this.__height}
        maxWidth={this.__maxWidth}
      />
    );
  }
}

export function $createSimpleImageNode(payload: ImagePayload): SimpleImageNode {
  return $applyNodeReplacement(
    new SimpleImageNode(
      payload.src,
      payload.altText,
      payload.maxWidth ?? 500,
      payload.width,
      payload.height
    )
  );
}

export function $isSimpleImageNode(
  node: LexicalNode | null | undefined
): node is SimpleImageNode {
  return node instanceof SimpleImageNode;
}

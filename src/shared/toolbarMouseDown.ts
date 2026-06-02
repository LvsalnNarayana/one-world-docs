import type { MouseEvent } from "react";

/** Keeps Lexical selection/focus when clicking toolbar controls */
export function preventEditorBlur(e: MouseEvent) {
  e.preventDefault();
}

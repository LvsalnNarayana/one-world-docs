import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useEffect, type JSX } from "react";

import { unwrapCommentMark } from "../comments/commentMarkUtils";
import { useComments } from "../../collaboration/context/CommentContext";

export default function CommentMarkBridge(): JSX.Element | null {
  const [editor] = useLexicalComposerContext();
  const { registerMarkActions } = useComments();

  useEffect(() => {
    registerMarkActions({
      unwrap: (markId) => unwrapCommentMark(editor, markId),
    });
    return () => registerMarkActions(null);
  }, [editor, registerMarkActions]);

  return null;
}

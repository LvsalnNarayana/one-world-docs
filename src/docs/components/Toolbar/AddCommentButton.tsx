import ModeCommentOutlinedIcon from "@mui/icons-material/ModeCommentOutlined";
import { IconButton, Tooltip } from "@mui/material";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";

import { useComments } from "../../../collaboration/context/CommentContext";
import {
  captureSelectionSnapshot,
  wrapSnapshotAsComment,
} from "../../../editor/comments/commentMarkUtils";
import { preventEditorBlur } from "../../../shared/toolbarMouseDown";

export default function AddCommentButton() {
  const [editor] = useLexicalComposerContext();
  const { addThread } = useComments();

  const onAdd = () => {
    const snapshot = captureSelectionSnapshot(editor);
    if (!snapshot) {
      window.alert("Select text in the document to comment on.");
      return;
    }

    const commentText = window.prompt("Add comment", "");
    if (!commentText?.trim()) return;

    const threadId = crypto.randomUUID();
    wrapSnapshotAsComment(editor, snapshot, threadId);
    addThread(
      { lexicalKey: threadId, quotedText: snapshot.quotedText },
      commentText.trim(),
      threadId
    );
  };

  return (
    <Tooltip title="Add comment">
      <IconButton size="small" onMouseDown={preventEditorBlur} onClick={onAdd}>
        <ModeCommentOutlinedIcon fontSize="small" />
      </IconButton>
    </Tooltip>
  );
}

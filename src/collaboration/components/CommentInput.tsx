import { useState } from "react";
import { Button, Stack, TextField } from "@mui/material";

interface CommentInputProps {
  placeholder?: string;
  onSubmit: (text: string) => void;
  autoFocus?: boolean;
}

export default function CommentInput({
  placeholder = "Add a comment…",
  onSubmit,
  autoFocus,
}: CommentInputProps) {
  const [text, setText] = useState("");

  const submit = () => {
    const trimmed = text.trim();
    if (!trimmed) return;
    onSubmit(trimmed);
    setText("");
  };

  return (
    <Stack direction="row" spacing={1} alignItems="flex-end">
      <TextField
        size="small"
        fullWidth
        multiline
        maxRows={4}
        placeholder={placeholder}
        value={text}
        autoFocus={autoFocus}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
            e.preventDefault();
            submit();
          }
        }}
      />
      <Button variant="contained" size="small" onClick={submit} disabled={!text.trim()}>
        Post
      </Button>
    </Stack>
  );
}

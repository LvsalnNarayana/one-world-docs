import {
  createContext,
  useCallback,
  useContext,
  useState,
  type ReactNode,
} from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Stack,
  TextField,
} from "@mui/material";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { INSERT_TABLE_COMMAND } from "@lexical/table";

import { INSERT_LAYOUT_COMMAND } from "../playground/plugins/LayoutPlugin/LayoutPlugin";
import { INSERT_POLL_COMMAND } from "../playground/plugins/PollPlugin";
import { INSERT_YOUTUBE_COMMAND } from "../playground/plugins/YouTubePlugin";
import { INSERT_IMAGE_COMMAND } from "../plugins/SimpleImagePlugin";

export type InsertDialogType =
  | "image"
  | "gif"
  | "poll"
  | "table"
  | "layout"
  | "youtube"
  | "embed"
  | null;

type InsertDialogContextValue = {
  openDialog: (type: Exclude<InsertDialogType, null>) => void;
};

const InsertDialogContext = createContext<InsertDialogContextValue | null>(null);

const LAYOUT_OPTIONS = [
  { label: "2 columns (equal)", value: "1fr 1fr" },
  { label: "2 columns (25% / 75%)", value: "1fr 3fr" },
  { label: "3 columns (equal)", value: "1fr 1fr 1fr" },
];

function extractYoutubeId(url: string): string | null {
  const match =
    /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/.exec(url);
  const id = match?.[2];
  return id && id.length === 11 ? id : null;
}

export function InsertDialogProvider({ children }: { children: ReactNode }) {
  const [editor] = useLexicalComposerContext();
  const [dialogType, setDialogType] = useState<InsertDialogType>(null);
  const [imageUrl, setImageUrl] = useState("");
  const [imageAlt, setImageAlt] = useState("");
  const [pollQuestion, setPollQuestion] = useState("");
  const [tableRows, setTableRows] = useState("3");
  const [tableCols, setTableCols] = useState("3");
  const [layout, setLayout] = useState(LAYOUT_OPTIONS[0].value);
  const [videoUrl, setVideoUrl] = useState("");
  const [embedUrl, setEmbedUrl] = useState("");

  const openDialog = useCallback((type: Exclude<InsertDialogType, null>) => {
    setDialogType(type);
  }, []);

  const close = () => {
    setDialogType(null);
    setImageUrl("");
    setImageAlt("");
    setPollQuestion("");
    setVideoUrl("");
    setEmbedUrl("");
  };

  const insertImage = (src: string, altText: string) => {
    editor.dispatchCommand(INSERT_IMAGE_COMMAND, {
      src,
      altText,
      maxWidth: 500,
    });
    close();
  };

  return (
    <InsertDialogContext.Provider value={{ openDialog }}>
      {children}

      <Dialog
        open={dialogType === "image" || dialogType === "gif"}
        onClose={close}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          {dialogType === "gif" ? "Insert GIF" : "Insert image"}
        </DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 1 }}>
            <TextField
              label="URL"
              fullWidth
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="https://..."
            />
            <TextField
              label="Alt text"
              fullWidth
              value={imageAlt}
              onChange={(e) => setImageAlt(e.target.value)}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={close}>Cancel</Button>
          <Button
            variant="contained"
            disabled={!imageUrl.trim()}
            onClick={() =>
              insertImage(
                imageUrl.trim(),
                imageAlt || (dialogType === "gif" ? "GIF" : "Image")
              )
            }
          >
            Insert
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={dialogType === "poll"} onClose={close} maxWidth="sm" fullWidth>
        <DialogTitle>Insert poll</DialogTitle>
        <DialogContent>
          <TextField
            label="Question"
            fullWidth
            sx={{ mt: 1 }}
            value={pollQuestion}
            onChange={(e) => setPollQuestion(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={close}>Cancel</Button>
          <Button
            variant="contained"
            disabled={!pollQuestion.trim()}
            onClick={() => {
              editor.dispatchCommand(INSERT_POLL_COMMAND, pollQuestion.trim());
              close();
            }}
          >
            Insert
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={dialogType === "table"} onClose={close} maxWidth="xs" fullWidth>
        <DialogTitle>Insert table</DialogTitle>
        <DialogContent>
          <Stack direction="row" spacing={2} sx={{ mt: 1 }}>
            <TextField
              label="Rows"
              type="number"
              value={tableRows}
              onChange={(e) => setTableRows(e.target.value)}
            />
            <TextField
              label="Columns"
              type="number"
              value={tableCols}
              onChange={(e) => setTableCols(e.target.value)}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={close}>Cancel</Button>
          <Button
            variant="contained"
            onClick={() => {
              editor.dispatchCommand(INSERT_TABLE_COMMAND, {
                columns: tableCols,
                rows: tableRows,
                includeHeaders: true,
              });
              close();
            }}
          >
            Insert
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={dialogType === "layout"} onClose={close} maxWidth="sm" fullWidth>
        <DialogTitle>Column layout</DialogTitle>
        <DialogContent>
          <TextField
            select
            fullWidth
            label="Layout"
            sx={{ mt: 1 }}
            value={layout}
            onChange={(e) => setLayout(e.target.value)}
          >
            {LAYOUT_OPTIONS.map((opt) => (
              <MenuItem key={opt.value} value={opt.value}>
                {opt.label}
              </MenuItem>
            ))}
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={close}>Cancel</Button>
          <Button
            variant="contained"
            onClick={() => {
              editor.dispatchCommand(INSERT_LAYOUT_COMMAND, layout);
              close();
            }}
          >
            Insert
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={dialogType === "youtube" || dialogType === "embed"}
        onClose={close}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          {dialogType === "youtube" ? "Insert video" : "Insert embed (YouTube)"}
        </DialogTitle>
        <DialogContent>
          <TextField
            label="YouTube URL"
            fullWidth
            sx={{ mt: 1 }}
            value={dialogType === "youtube" ? videoUrl : embedUrl}
            onChange={(e) =>
              dialogType === "youtube"
                ? setVideoUrl(e.target.value)
                : setEmbedUrl(e.target.value)
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={close}>Cancel</Button>
          <Button
            variant="contained"
            onClick={() => {
              const url = (dialogType === "youtube" ? videoUrl : embedUrl).trim();
              const id = extractYoutubeId(url);
              if (id) {
                editor.dispatchCommand(INSERT_YOUTUBE_COMMAND, id);
              }
              close();
            }}
          >
            Insert
          </Button>
        </DialogActions>
      </Dialog>
    </InsertDialogContext.Provider>
  );
}

export function useInsertDialog(): InsertDialogContextValue {
  const ctx = useContext(InsertDialogContext);
  if (!ctx) {
    throw new Error("useInsertDialog must be used within InsertDialogProvider");
  }
  return ctx;
}

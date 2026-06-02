import { useRef, type ChangeEvent, type JSX } from "react";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import UploadFileOutlinedIcon from "@mui/icons-material/UploadOutlined";
import PictureAsPdfOutlinedIcon from "@mui/icons-material/PictureAsPdfOutlined";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import CodeOutlinedIcon from "@mui/icons-material/CodeOutlined";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";

import ButtonMenu from "../../../shared/ButtonMenu";
import { useEditorDoc } from "../../context/EditorDocContext";
import {
  exportDocAsDocx,
  exportDocAsHtml,
  exportDocAsPlainText,
  importDocxIntoEditor,
  printDocument,
} from "../../../editor/io/documentIo";

export default function DocumentFileMenu(): JSX.Element {
  const [editor] = useLexicalComposerContext();
  const { doc, saveDoc } = useEditorDoc();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const onPickDocx = () => fileInputRef.current?.click();

  const onFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    if (!file.name.toLowerCase().endsWith(".docx")) {
      window.alert("Please choose a .docx Word document.");
      return;
    }
    try {
      await importDocxIntoEditor(editor, file);
      await saveDoc();
    } catch (err) {
      console.error(err);
      window.alert("Could not open this document. Try a different .docx file.");
    }
  };

  const menu = [
    {
      value: "Open .docx",
      icon: <UploadFileOutlinedIcon fontSize="small" />,
      onClick: onPickDocx,
    },
    {
      value: "Export as .docx",
      icon: <DescriptionOutlinedIcon fontSize="small" />,
      onClick: () => void exportDocAsDocx(editor, doc.title),
    },
    {
      value: "Export as .html",
      icon: <CodeOutlinedIcon fontSize="small" />,
      onClick: () => exportDocAsHtml(editor, doc.title),
    },
    {
      value: "Export as .txt",
      icon: <ArticleOutlinedIcon fontSize="small" />,
      onClick: () => exportDocAsPlainText(editor, doc.title),
    },
    {
      value: "Export / Print PDF",
      icon: <PictureAsPdfOutlinedIcon fontSize="small" />,
      onClick: printDocument,
    },
  ];

  return (
    <>
      <input
        ref={fileInputRef}
        type="file"
        accept=".docx,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        hidden
        onChange={onFileChange}
      />
      <ButtonMenu
        value="File"
        startIcon={<FileDownloadOutlinedIcon />}
        menu={menu}
      />
    </>
  );
}

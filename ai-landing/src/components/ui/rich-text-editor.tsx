"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import { AlignLeft, AlignCenter, AlignRight, Code, Quote } from "lucide-react";

const markdownConfig = {
  heading: {
    levels: [1, 2, 3, 4, 5, 6],
    parseHTML: (element: any) => {
      const level = Number(element.tagName.replace("H", ""));
      return { level };
    },
  },
  bold: {},
  italic: {},
  code: {},
  codeBlock: {},
  blockquote: {},
  bulletList: {},
  orderedList: {},
};

interface RichTextEditorProps {
  content: string;
  onChange: (content: string) => void;
}

export function RichTextEditor({ content, onChange }: RichTextEditorProps) {
  const editor = useEditor({
    parseOptions: {
      preserveWhitespace: true,
    },
    content,
    editable: true,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  if (!editor) {
    return null;
  }

  return (
    <div className="border rounded-md">
      <div className="border-b p-2 flex flex-wrap gap-2">
        <div className="flex gap-1 items-center border-r pr-2">
          {[1, 2, 3, 4, 5, 6].map((level) => (
            <button
              key={level}
              className={`p-1 rounded min-w-[2rem] ${
                editor.isActive("heading", { level }) ? "bg-slate-200" : ""
              }`}
              type="button"
            >
              H{level}
            </button>
          ))}
        </div>

        <div className="flex gap-1 items-center border-r pr-2">
          <button
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={`p-1 rounded ${
              editor.isActive("bold") ? "bg-slate-200" : ""
            }`}
            type="button"
          >
            Bold
          </button>
          <button
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={`p-1 rounded ${
              editor.isActive("italic") ? "bg-slate-200" : ""
            }`}
            type="button"
          >
            Italic
          </button>
        </div>

        <div className="flex gap-1 items-center border-r pr-2">
          <button
            onClick={() => editor.chain().focus().setTextAlign("left").run()}
            className={`p-1 rounded ${
              editor.isActive({ textAlign: "left" }) ? "bg-slate-200" : ""
            }`}
            type="button"
          >
            <AlignLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => editor.chain().focus().setTextAlign("center").run()}
            className={`p-1 rounded ${
              editor.isActive({ textAlign: "center" }) ? "bg-slate-200" : ""
            }`}
            type="button"
          >
            <AlignCenter className="w-4 h-4" />
          </button>
          <button
            onClick={() => editor.chain().focus().setTextAlign("right").run()}
            className={`p-1 rounded ${
              editor.isActive({ textAlign: "right" }) ? "bg-slate-200" : ""
            }`}
            type="button"
          >
            <AlignRight className="w-4 h-4" />
          </button>
        </div>

        <div className="flex gap-1 items-center">
          <button
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={`p-1 rounded ${
              editor.isActive("bulletList") ? "bg-slate-200" : ""
            }`}
            type="button"
          >
            Bullet List
          </button>
          <button
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={`p-1 rounded ${
              editor.isActive("orderedList") ? "bg-slate-200" : ""
            }`}
            type="button"
          >
            Ordered List
          </button>
          <button
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            className={`p-1 rounded ${
              editor.isActive("blockquote") ? "bg-slate-200" : ""
            }`}
            type="button"
          >
            <Quote className="w-4 h-4" />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
            className={`p-1 rounded ${
              editor.isActive("codeBlock") ? "bg-slate-200" : ""
            }`}
            type="button"
          >
            <Code className="w-4 h-4" />
          </button>
        </div>
      </div>
      <EditorContent
        editor={editor}
        className="p-4 min-h-[200px] prose max-w-none"
      />
    </div>
  );
}

"use client";
import React, { useState, useRef, useEffect } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Editor as TinyMCEEditorType } from "tinymce";

interface TinyMCEEditorProps {
  initialValue?: string;
  onChange?: (content: string) => void;
  height?: number;
  placeholder?: string;
  disabled?: boolean;
}

function TinyMCEEditor({
  initialValue,
  onChange,
  height = 300,
  placeholder = "Write your content here...",
  disabled = false,
}: TinyMCEEditorProps) {
  const editorRef = useRef<TinyMCEEditorType | null>(null);
  const [content, setContent] = useState(initialValue || "");
  const [isClient, setIsClient] = useState(false);

  console.log("Editor content:", content);

  // Check if the component is mounted on the client side
  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleEditorChange = (value: any) => {
    setContent(value);
    if (onChange) {
      onChange(value);
    }
  };

  if (!isClient) {
    return (
      <div
        className="border border-gray-300 rounded-md p-4 bg-gray-50"
        style={{ height: height }}
      >
        <p className="text-gray-400">{placeholder}</p>
      </div>
    );
  }

  return (
    <Editor
      apiKey={"pvd21alpl7wwifc5lyrso3pxivps1jkk3ealnn3i3j10149v"}
      onInit={(evt, editor) => (editorRef.current = editor)}
      onEditorChange={handleEditorChange}
      init={{
        height: 300,
        menubar: true,
        plugins: ["lists", "link", "autolink", "help", "wordcount"],
        toolbar:
          "undo redo | formatselect | " +
          "bold italic | bullist numlist | " +
          "link | removeformat | help",
        content_style:
          "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
        placeholder: placeholder,
        min_height: height,
      }}
    />
  );
}

export default TinyMCEEditor;

"use client";

import { useEffect, useState } from "react";
import { useQuill } from "react-quilljs";
import "quill/dist/quill.snow.css";

export default function QuillEditor({ content, setContent }) {
  const { quill, quillRef } = useQuill({
    modules: {
      toolbar: [
        [{ header: [1, 2, false] }],
        ["bold", "italic", "underline", "strike"],
        [{ list: "ordered" }, { list: "bullet" }],
        ["blockquote", "code-block"],
        ["link", "image"],
        [{ align: [] }],
        ["clean"],
      ],
    },
  });

  useEffect(() => {
    if (quill) {
      quill.root.innerHTML = content; // Restore previous content
      quill.on("text-change", () => {
        setContent(quill.root.innerHTML); // Update content state
      });
    }
  }, [quill]);

  return (
    <div className="border p-3 rounded-md bg-white min-h-[200px]">
      <div ref={quillRef} className="min-h-[200px] bg-gray-100 p-3 rounded-md" />
    </div>
  );
}

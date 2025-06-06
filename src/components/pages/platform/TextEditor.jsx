"use client";

import { useState } from "react";
import QuillEditor from "./QuillEditor";
import HtmlEditor from "./MonacoEditor";

export default function TextEditor({ value, onChange }) {
  const [isHtmlMode, setIsHtmlMode] = useState(false);
  const [quillContent, setQuillContent] = useState(""); // Store Quill content
  const [htmlContent, setHtmlContent] = useState("<h1>Hello, World!</h1>"); // Store Monaco content

  return (
    <div className="p-5 bg-white shadow-md rounded-lg">
      <h4 className="font-semibold mb-4">Message</h4>

      {/* Toggle Buttons */}
      <div className="flex gap-2 mb-4">
        <button
          className={`px-4 py-2 text-sm transition ${
            !isHtmlMode
              ? "border border-red-500 text-white bg-red-500 rounded-md"
              : "border border-gray-400 text-gray-500 rounded-md"
          }`}
          onClick={() => setIsHtmlMode(false)}
        >
          Text
        </button>
        <button
          className={`px-4 py-2 text-sm transition ${
            isHtmlMode
              ? "border border-blue-500 text-white bg-blue-500 rounded-md"
              : "border border-gray-400 text-gray-500 rounded-md"
          }`}
          onClick={() => setIsHtmlMode(true)}
        >
          HTML
        </button>
      </div>

      {/* Render the editor based on the selected mode */}
      {isHtmlMode ? (
        <HtmlEditor content={value} setContent={onChange} />
      ) : (
        <QuillEditor content={value} setContent={onChange} />
      )}
    </div>
  );
}

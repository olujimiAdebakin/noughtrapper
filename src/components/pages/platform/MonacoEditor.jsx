"use client";

import { useRef } from "react";
import MonacoEditor from "@monaco-editor/react";

export default function HtmlEditor({ content, setContent }) {
  const editorRef = useRef(null);

  // Save Editor Instance
  function handleEditorDidMount(editor) {
    editorRef.current = editor;
  }

  // Format Code
  function handleFormatCode() {
    if (editorRef.current) {
      editorRef.current.getAction("editor.action.formatDocument").run();
    }
  }

  // Copy Code
  function handleCopyCode() {
    if (editorRef.current) {
      navigator.clipboard.writeText(editorRef.current.getValue());
      alert("Code copied to clipboard!");
    }
  }

  // Clear Code
  function handleClearCode() {
    setContent(""); // Reset content
  }

  return (
    <div className="border rounded-lg shadow-md bg-white">
      {/* Toolbar */}
      <div className="flex gap-2 p-2 border-b bg-gray-100">
        <button onClick={handleFormatCode} className="px-3 py-1 text-sm bg-blue-500 text-white rounded">Format</button>
        <button onClick={handleCopyCode} className="px-3 py-1 text-sm bg-green-500 text-white rounded">Copy</button>
        <button onClick={handleClearCode} className="px-3 py-1 text-sm bg-red-500 text-white rounded">Clear</button>
      </div>

      {/* Monaco Editor */}
      <MonacoEditor
        height="300px"
        language="html"
        theme="vs-dark"
        value={content}
        onChange={(value) => setContent(value)} // Update state on change
        onMount={handleEditorDidMount}
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          scrollBeyondLastLine: false,
          automaticLayout: true,
        }}
      />
    </div>
  );
}

// import React, { useState } from 'react';
// import ReactQuill from 'react-quill';
// import 'react-quill/dist/quill.snow.css';

// const QuestionEditor = () => {
//   const [question, setQuestion] = useState('');

//   const modules = {
//     toolbar: [
//       ['bold', 'italic', 'underline'],
//       [{ list: 'ordered' }, { list: 'bullet' }],
//       ['link', 'image', 'video', 'code-block']
//     ],
//   };

//   const formats = [
//     'bold', 'italic', 'underline',
//     'list', 'bullet',
//     'link', 'image', 'video', 'code-block'
//   ];

//   return (
//     <div className="my-4">
//       <label className="font-semibold">Question</label>
//       <ReactQuill
//         theme="snow"
//         value={question}
//         onChange={setQuestion}
//         modules={modules}
//         formats={formats}
//         placeholder="Enter your question here..."
//       />
//     </div>
//   );
// };

// export default QuestionEditor;






"use client";

import { useEffect } from "react";
import { useQuill } from "react-quilljs";
import "quill/dist/quill.snow.css";

export default function QuestionEditor({ content, setContent }) {
  const { quill, quillRef } = useQuill({
    modules: {
      toolbar: [
        // [{ header: [1, 2, false] }],
        ["bold"],
        // [{ list: "ordered" }, { list: "bullet" }],
        ["code-block"],
        ["link", "image", "video"],
        // [{ align: [] }],
        // ["clean"],
      ],
    },
    theme: "snow",
  });

  useEffect(() => {
    if (quill) {
      quill.root.innerHTML = content || ""; // Restore existing content if available
      quill.on("text-change", () => {
        setContent(quill.root.innerHTML); // Sync content to parent
      });
    }
  }, [quill, content, setContent]);

  return (
    <div className="my-4">
      <div className="border rounded-md bg-white">
        <div ref={quillRef} className="min-h-[40px] p-3" />
      </div>
    </div>
  );
}

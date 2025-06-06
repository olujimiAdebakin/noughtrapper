"use client";

import { useState } from "react";

export default function CopyButton({ textToCopy }) {
    const [copied, setCopied] = useState(false);
    const [unCopy, setUnCopy] = useState(false);

//   const handleCopy = () => {
//     navigator.clipboard.writeText(textToCopy).then(() => {
//       setCopied(true);
//       setTimeout(() => setCopied(false), 1500);
//     });
//   };

 

     const handleCopy = () => {
       // If already copied, toggle to uncopying state
       if (copied) {
         setUnCopy(true);
         // Reset after animation
         setTimeout(() => {
           setCopied(false);
           setUnCopy(false);
         }, 3000);
       } else {
         // Normal copy flow
         setCopied(true);

         
         setTimeout(() => {
           if (!unCopy) {
             setCopied(false);
           }
         }, 3000);
       }
     };

  return (
    <div className="flex flex-col items-center justify-center p-8">
      <button
        onClick={handleCopy}
        className={`
          w-4 h-4
          rounded-full
          flex items-center justify-center
          shadow-lg
          transition-all duration-300 ease-in-out
          ${
            unCopy
              ? "bg-yellow-500"
              : copied
              ? "bg-[#FD3842]"
              : ""
          }
          focus:outline-none
        `}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke={unCopy || copied ? "white" : "black"}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {unCopy ? (
            
            <path d="M9 14l-4-4 4-4" />
          ) : copied ? (
           
            <polyline points="20 6 9 17 4 12" />
          ) : (
        //    default copy color
            <>
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
            </>
          )}
        </svg>
      </button>
    </div>
  );
}

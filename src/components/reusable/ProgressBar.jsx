

"use client"
import { Progress } from "@nextui-org/react";
import { useEffect, useState } from "react";

export default function ProgressBar() {
  const [value, setValue] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setValue((v) => (v >= 100 ? 0 : v + 10));
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center w-full max-w-md gap-2">
      <Progress
        aria-label="Downloading..."
        className="flex-1"
        color="success"
        size="md"
        value={value}
      />
      <span className="text-sm font-medium text-gray-700">{value}%</span>
    </div>
  );
}


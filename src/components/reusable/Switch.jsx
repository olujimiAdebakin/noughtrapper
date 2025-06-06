"use client"

import { useState } from "react";

export default function Switch({ checked, onChange }) {

  const handleToggle = () => {
    if (onChange) {
      onChange(!checked); // Notify parent of the new state
    }
  };
  const [isOn, setIsOn] = useState(false);

  const toggleSwitch = () => setIsOn(!isOn);

  return (
    <div className="flex items-center gap-3">
      <label className="relative inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          checked={checked}
          onChange={handleToggle}
          className="sr-only" // Hide the default checkbox
        />
        <div
          className={`w-[70px] h-7 flex items-center rounded-full p-1 transition-all duration-300 ease-in-out shadow-inner ${
            checked
              ? "bg-gradient-to-r from-[#FD3842] to-[#FF6B73]"
              : "bg-gray-200"
          }`}
        >
          <div
            className={`w-8 h-5 bg-white rounded-full shadow-md transform transition-transform duration-300 ease-in-out flex items-center justify-center ${
              checked ? "translate-x-7" : "translate-x-0"
            }`}
          >
            <span
              className={`text-xs font-bold ${
                checked ? "text-[#FD3842]" : "text-gray-400"
              }`}
            >
              {isOn ? "ON" : "OFF"}
            </span>
          </div>
        </div>
      </label>
      {/* <span className="text-[#212B36] text-sm font-medium">
        {isOn ? "Enabled" : "Disabled"}
      </span> */}
    </div>
  );
}
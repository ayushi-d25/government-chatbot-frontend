// src/components/ui/Switch.jsx
import React from "react";

const Switch = ({ checked = false, onCheckedChange }) => {
  const handleClick = () => {
    if (typeof onCheckedChange === "function") {
      onCheckedChange(!checked);
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 ${
        checked ? "bg-blue-600" : "bg-gray-400"
      }`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300 ${
          checked ? "translate-x-6" : "translate-x-1"
        }`}
      />
    </button>
  );
};

export { Switch };

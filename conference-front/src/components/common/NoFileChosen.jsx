import React from "react";

function NoFileChosen() {
  return (
    <div className="text-lime-700 bg-gray-100 absolute flex items-center justify-center flex-col inset-4 p-4 border-1 border-lime-700 shadow-md">
      <svg
        className="w-36 h-36 mx-auto mb-4"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
      </svg>
      <p className="font-bold text-center">Upload files</p>
    </div>
  );
}

export default NoFileChosen;
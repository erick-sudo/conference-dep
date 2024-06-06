import React from 'react';
import { Rings } from "react-loader-spinner";

function Loading() {
  return (
    <div className="absolute z-50 inset-0 flex items-center justify-center bg-white">
      <div className="bg-gray-100 w-48 h-48 flex flex-col items-center justify-center border border-lime-700">
        <h2 className="font-bold text-lime-700">Loading...</h2>
        <Rings />
      </div>
    </div>
  );
}

export default Loading
import React from "react";

function Background() {
  return (
    <div className="absolute inset-0 -z-10 opacity-[0.3]">
      {/* <svg
        version="1.1"
        baseProfile="full"
        width="100%"
        height="100%"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="dotPattern"
            x="0"
            y="0"
            width="10"
            height="10"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="5" cy="5" r="1" fill="gray" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#dotPattern)" />
      </svg> */}
    </div>
  );
}

export { Background }

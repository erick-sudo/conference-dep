
import React from "react";

function EyeIcon({ isActive, toggleIsActive }) {
  return (
<svg xmlns="http://www.w3.org/2000/svg"
     width="16"
     height="16"
     fill="none"
     className="bi bi-eye absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer"
     viewBox="0 0 16 16"
     onClick={toggleIsActive}>
  <path d="M9 12.5a4.5 4.5 0 0 0 4.5-4.5 4.5 4.5 0 0 0-4.5-4.5 4.5 4.5 0 0 0-4.5 4.5A4.5 4.5 0 0 0 8 12.5z" fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth="2"/>
  {isActive ? (
    <path d="M9 8a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" fill="currentColor"/>
  ) : (
    <g>
      <circle cx="8" cy="8" r="3" fill="currentColor"/>
      <path d="M8 0C5.5 0 2.792 1.166 1.156 3.304a.5.5 0 0 0 .688.718C3.047 2.19 5.43 1 8 1c2.57 0 4.953 1.19 6.156 3.022a.5.5 0 0 0 .688-.718C13.208 1.166 10.5 0 8 0z" fill="currentColor"/>
      <path d="M14.844 12.696c-1.204-1.832-3.586-3.022-6.156-3.022-2.57 0-4.952 1.19-6.156 3.022a.5.5 0 1 0 .688.718c1.635-2.138 4.343-3.304 7.156-3.304s5.52 1.166 7.156 3.304a.5.5 0 0 0 .688-.718z" fill="currentColor"/>
    </g>
  )}
</svg>


  );
}

export default EyeIcon

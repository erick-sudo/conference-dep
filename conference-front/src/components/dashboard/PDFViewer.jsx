import React from "react";

import { Viewer, Worker } from "@react-pdf-viewer/core";

import "@react-pdf-viewer/core/lib/styles/index.css";


function PdfViewer({ fileDataUrl }) {
  return (
    <div className="absolute inset-0 overflow-y-scroll scroll_y">
      <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.8.162/build/pdf.worker.min.js">
        <Viewer fileUrl={fileDataUrl.dataUrl} className="" />
      </Worker>
    </div>
  );
}

export default PdfViewer;

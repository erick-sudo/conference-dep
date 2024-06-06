import React from "react";

import PdfViewer from "./PDFViewer";

function DisplayMedia({ files = [] }) {
  return (
    <div className="min-h-[70vh] max-h-[70vh] scroll_x overflow-hidden flex items-center gap-2 overflow-x-scroll">
      {files.map((file, index) => {
        return file.mime.endsWith("pdf") ? (
          <div className="relative min-w-[600px] max-w-[500px] h-[69vh] border-1 border-lime-700 overflow-hidden bg-lime-700 rounded">
            <PdfViewer key={index} fileDataUrl={file} />
          </div>
        ) : file.mime.startsWith("video") ? (
          <video key={index} muted={false} controls>
            <source src={file.dataUrl} type={file.mime} /> Your browser does not
            support the video tag.
          </video>
        ) : (
          <img key={index} className="h-[69vh] border-1 border-lime-700 p-1 rounded" src={file.dataUrl}></img>
        );
      })}
    </div>
  );
}

export { DisplayMedia };

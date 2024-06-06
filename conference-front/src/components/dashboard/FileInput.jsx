import React from "react";

import { MdAttachment, MdDeleteForever } from "react-icons/md";
import { BsPlusSquareDotted } from "react-icons/bs";
import { Badge, Card, Container } from "react-bootstrap";
import PdfViewer from "./PDFViewer";
import NoFileChosen from "../common/NoFileChosen";

const FileInput = ({ files = [], updateSelectedIndex, selectedIndex, updateFiles }) => {

  const readFileData = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.readAsDataURL(file);

      reader.onload = (e) => {
        resolve({
          newFile: true,
          mime: file.type,
          name: file.name,
          dataUrl: e.target.result,
        });
      };

      reader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const handleFileChange = async (event) => {
    const fileDataUrls = await Promise.all(
      Array.from(event.target.files).map((file) => readFileData(file))
    );

    updateFiles([...files, ...fileDataUrls]);
  };

  function removeFile(idx) {
    updateSelectedIndex(idx - 1);
    updateFiles(files.filter((f, i) => i !== idx));
  }

  const formats = [".pdf", ".png", ".jpg", ".jpeg", ".gif", ".mp4", ".webp"]

  return (
    <Card className="border-1 border-lime-600">
      <Card.Header>
        <h2 className="my-1 font-bold">Attach Files</h2>
        <div className="flex gap-2 flex-wrap">
          {files.map((file, index) => (
            <div
              onClick={() => updateSelectedIndex(index)}
              className={`py-1 pl-4 pr-2 rounded-lg cursor-pointer flex items-center gap-2 ${
                index === selectedIndex
                  ? "bg-white border-2 border-lime-700 text-lime-700"
                  : "bg-lime-700 border-2 border-lime-700 text-white hover:bg-lime-600 hover:border-lime-600 hover:scale-95"
              }`}
              key={index}
            >
              <span>{file.name}</span>
              <span
                onClick={() => removeFile(index)}
                className="rounded hover:bg-lime-700 hover:text-white p-1"
              >
                <MdDeleteForever />
              </span>
            </div>
          ))}
        </div>
      </Card.Header>
      <Container className="min-h-[50vh] relative" fluid>
        {files[selectedIndex] ? (
          files[selectedIndex].mime.endsWith("pdf") ? (
            <PdfViewer fileDataUrl={files[selectedIndex]} />
          ) : files[selectedIndex].mime.startsWith("video") ? (
            <video muted={false} controls> <source src={files[selectedIndex].dataUrl} type={files[selectedIndex].mime} /> Your browser does not support the video tag.</video>
          ) : (
            <iframe
              className="border absolute inset-0 w-full h-full"
              src={files[selectedIndex].dataUrl}
            ></iframe>
          )
        ) : (
          <>
            <NoFileChosen />
          </>
        )}
      </Container>
      <Card.Footer className="flex items-start gap-4">
        <label
          className="relative cursor-pointer px-4 py-2 border-2 border-lime-600 rounded"
          htmlFor="file-input"
        >
          <span className="flex items-center text-lime-600 gap-4">
            <MdAttachment /> <BsPlusSquareDotted />
          </span>
          <input
            id="file-input"
            type="file"
            className="absolute w-0 h-0 overflow-hidden"
            accept={formats.join(',')}
            onChange={handleFileChange}
            multiple
          />
        </label>
        <div className="flex flex-wrap gap-2">
        {
            formats.map((format, index) => (<Badge className="rounded-full px-3 py-1" bg="dark" key={index}>{format}</Badge>))
        }
        </div>
      </Card.Footer>
    </Card>
  );
};

export default FileInput;

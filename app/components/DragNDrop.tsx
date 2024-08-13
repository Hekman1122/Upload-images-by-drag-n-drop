"use client";
type FileType = {
  name: string;
  url: string;
};

import Image from "next/image";
import { useState, useRef } from "react";
export default function DragNDrop() {
  const [isDragging, setIsDragging] = useState(false);
  const [images, setImages] = useState<FileType[]>([]);
  const fileInput = useRef<HTMLInputElement>(null);
  function selectFiles() {
    const input = fileInput.current as HTMLInputElement;
    input.click();
  }
  function onFilesChange(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (!files) return;
    for (let i = 0; i < files.length; i++) {
      if (files[i].type.split("/")[0] !== "image") continue;
      if (!images.some((img) => img.name === files[i].name)) {
        console.log(files[i]);
        setImages((prev) => [
          ...prev,
          {
            name: files[i].name,
            url: URL.createObjectURL(files[i]),
          },
        ]);
      }
    }
  }

  function DragOverHandler(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setIsDragging(true);
    e.dataTransfer!.dropEffect = "copy";
  }
  function DragLeaveHandler(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setIsDragging(false);
  }

  function DropHandler(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    for (let i = 0; i < files.length; i++) {
      if (files[i].type.split("/")[0] !== "image") continue;
      if (!images.some((img) => img.name === files[i].name)) {
        setImages((prev) => [
          ...prev,
          {
            name: files[i].name,
            url: URL.createObjectURL(files[i]),
          },
        ]);
      }
    }
  }
  return (
    <section className="max-w-5xl mx-auto py-8 border-2 min-h-96">
      {/* title */}
      <div className="flex flex-col gap-6 items-center ">
        <div>
          <h1 className="text-2xl text-blue-600 font-semibold">
            Drag & Drop images uploading.
          </h1>
        </div>
        {/* Drag and Drop area */}
        <div
          className="flex min-w-96 justify-center items-center gap-2 border-2 h-60 border-dashed rounded-md border-blue-300"
          onDragOver={DragOverHandler}
          onDragLeave={DragLeaveHandler}
          onDrop={DropHandler}
        >
          {isDragging ? (
            <span className="text-blue-500 font-semibold transition-opacity hover:opacity-70">
              Drop images here
            </span>
          ) : (
            <>
              <span className="text-blue-500 font-semibold transition-opacity hover:opacity-70">
                Drag and Drop images here or
              </span>
              <span
                className="ml-2 text-neutral-600 font-semibold"
                role="button"
                onClick={selectFiles}
              >
                Browse
              </span>
            </>
          )}

          <input
            type="file"
            multiple
            name="file"
            className="hidden"
            ref={fileInput}
            onChange={onFilesChange}
          />
        </div>
        {/* images list */}
        <div className="w-full grid grid-cols-4 gap-4 px-6 py-4">
          {images.map((img) => (
            <div
              key={img.name}
              className="flex flex-col gap-2 justify-center items-center p-1 bg-neutral-100 rounded-lg"
            >
              <Image
                src={img.url}
                alt="uploaded image"
                width={200}
                height={200}
                className="rounded-lg"
              />
            </div>
          ))}
        </div>
        {/* Send to imgur to get the real url */}
        <div className="flex flex-col gap-4 mt-6">
          <button
            type="button"
            className="w-96 px-4 py-2 bg-blue-600 text-white text-sm font-bold rounded-xl opacity-90 duration-200 transition-opacity hover:opacity-100"
          >
            Upload
          </button>
        </div>
      </div>
    </section>
  );
}

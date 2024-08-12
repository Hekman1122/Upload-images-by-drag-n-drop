"use client";
import { useState, useRef } from "react";
export default function DragNDrop() {
  const [isDragging, setIsDragging] = useState(false);
  const fileInput = useRef<HTMLInputElement>(null);
  function selectFiles() {
    const input = fileInput.current as HTMLInputElement;
    input.click();
  }
  return (
    <section className="max-w-5xl mx-auto py-8 border-2 min-h-96">
      <div className="flex flex-col gap-6 items-center ">
        <div>
          <h1 className="text-2xl text-blue-600 font-semibold">
            Drag & Drop images uploading.
          </h1>
        </div>
        <div className="flex min-w-96 justify-center items-center gap-2 border-2 h-60 border-dashed rounded-md border-blue-300">
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
          />
        </div>
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

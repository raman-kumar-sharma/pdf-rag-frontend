"use client";

import { useCallback, useRef, useState } from "react";

interface DropzoneProps {
  file: File | null;
  onFileChange: (file: File | null) => void;
}

export function Dropzone({ file, onFileChange }: DropzoneProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);

  const pick = useCallback(
    (f: File | undefined) => {
      if (f?.name.toLowerCase().endsWith(".pdf")) onFileChange(f);
    },
    [onFileChange]
  );

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => inputRef.current?.click()}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          inputRef.current?.click();
        }
      }}
      onDragEnter={(e) => {
        e.preventDefault();
        setDragOver(true);
      }}
      onDragOver={(e) => e.preventDefault()}
      onDragLeave={() => setDragOver(false)}
      onDrop={(e) => {
        e.preventDefault();
        setDragOver(false);
        pick(e.dataTransfer.files[0]);
      }}
      className={`cursor-pointer rounded-xl border-2 border-dashed px-4 py-8 text-center transition ${
        dragOver || file
          ? "border-indigo-400 bg-indigo-50/80"
          : "border-slate-200 bg-slate-50 hover:border-indigo-300 hover:bg-indigo-50/50"
      }`}
    >
      <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl border border-slate-200 bg-white text-indigo-600">
        <UploadIcon />
      </div>
      <p className="font-semibold text-slate-800">
        {file ? "Ready to index" : "Drop your PDF here"}
      </p>
      <p className="mt-1 text-sm text-slate-500">
        or <span className="font-semibold text-indigo-600">browse</span> · max 15 MB
      </p>
      {file && (
        <p className="mt-2 break-all text-sm font-medium text-indigo-600">{file.name}</p>
      )}
      <input
        ref={inputRef}
        type="file"
        accept=".pdf"
        className="hidden"
        onChange={(e) => pick(e.target.files?.[0])}
      />
    </div>
  );
}

function UploadIcon() {
  return (
    <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
      />
    </svg>
  );
}

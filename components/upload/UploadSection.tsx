"use client";

import { useState } from "react";
import { uploadPdf } from "@/lib/api";
import { Alert } from "@/components/ui/Alert";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Dropzone } from "./Dropzone";

interface UploadSectionProps {
  onUploaded: (docId: string) => void;
}

export function UploadSection({ onUploaded }: UploadSectionProps) {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(
    null
  );

  async function handleUpload() {
    if (!file) {
      setMessage({ type: "error", text: "Choose a PDF file first." });
      return;
    }
    setLoading(true);
    setMessage(null);
    try {
      const data = await uploadPdf(file);
      setMessage({
        type: "success",
        text: `Indexed ${data.filename} · ${data.chunks} chunks · id ${data.doc_id}`,
      });
      onUploaded(data.doc_id);
    } catch (e) {
      setMessage({
        type: "error",
        text: e instanceof Error ? e.message : "Upload failed",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card title="Upload PDF" step={1}>
      <Dropzone file={file} onFileChange={setFile} />
      <Button className="mt-4" loading={loading} loadingLabel="Indexing…" onClick={handleUpload}>
        Index PDF
      </Button>
      {message && <Alert variant={message.type === "success" ? "success" : "error"}>{message.text}</Alert>}
    </Card>
  );
}

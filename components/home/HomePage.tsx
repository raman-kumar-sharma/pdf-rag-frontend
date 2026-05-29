"use client";

import { useCallback, useEffect, useState } from "react";
import { fetchDocuments } from "@/lib/api";
import type { AskResponse, Document } from "@/lib/types";
import { Header } from "@/components/layout/Header";
import { UploadSection } from "@/components/upload/UploadSection";
import { DocumentPicker } from "@/components/documents/DocumentPicker";
import { AskSection } from "@/components/ask/AskSection";
import { AnswerPanel } from "@/components/results/AnswerPanel";
import { Card } from "@/components/ui/Card";

export function HomePage() {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [docId, setDocId] = useState("");
  const [result, setResult] = useState<AskResponse | null>(null);

  const loadDocs = useCallback(async () => {
    try {
      const data = await fetchDocuments();
      setDocuments(data.documents);
    } catch {
      /* empty */
    }
  }, []);

  useEffect(() => {
    loadDocs();
  }, [loadDocs]);

  return (
    <>
      <Header />
      <main className="mx-auto grid max-w-6xl gap-5 px-4 py-6 sm:px-6 lg:grid-cols-[minmax(280px,340px)_1fr] lg:items-start lg:gap-6 lg:py-8">
        <aside className="space-y-5">
          <UploadSection
            onUploaded={(id) => {
              setDocId(id);
              loadDocs();
            }}
          />
          <DocumentPicker documents={documents} value={docId} onChange={setDocId} />
        </aside>

        <div className="space-y-5">
          <AskSection docId={docId} onResult={setResult} />
          {result ? (
            <AnswerPanel result={result} />
          ) : (
            <Card title="Results">
              <p className="py-8 text-center text-sm text-slate-500">
                Upload a PDF and ask a question — answers appear here with page references.
              </p>
            </Card>
          )}
        </div>
      </main>
    </>
  );
}

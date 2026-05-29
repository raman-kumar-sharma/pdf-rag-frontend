"use client";

import { useState } from "react";
import { askDocument } from "@/lib/api";
import type { AskMode, AskResponse } from "@/lib/types";
import { Alert } from "@/components/ui/Alert";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { ModeToggle } from "./ModeToggle";
import { QuestionInput } from "./QuestionInput";

interface AskSectionProps {
  docId: string;
  onResult: (result: AskResponse) => void;
}

export function AskSection({ docId, onResult }: AskSectionProps) {
  const [mode, setMode] = useState<AskMode>("answer");
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState("");

  async function handleAsk() {
    if (!docId) {
      setError("Select a document first.");
      return;
    }
    if (mode === "answer" && !question.trim()) {
      setError("Enter a question.");
      return;
    }

    setLoading(true);
    setError(null);
    setStatus("Searching vectors and generating answer…");

    try {
      const result = await askDocument(
        docId,
        question.trim() || "Summarize this document.",
        mode
      );
      onResult(result);
      setStatus("");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Request failed");
      setStatus("");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card title="Ask your document" step={3}>
      <div className="space-y-4">
        <ModeToggle mode={mode} onChange={setMode} />
        {mode === "answer" && (
          <QuestionInput value={question} onChange={setQuestion} onSubmit={handleAsk} />
        )}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <Button
            loading={loading}
            loadingLabel="Working…"
            onClick={handleAsk}
          >
            {mode === "summarize" ? "Summarize" : "Get answer"}
          </Button>
          {status && !error && (
            <p className="text-sm text-indigo-600">{status}</p>
          )}
        </div>
        {error && <Alert variant="error">{error}</Alert>}
      </div>
    </Card>
  );
}

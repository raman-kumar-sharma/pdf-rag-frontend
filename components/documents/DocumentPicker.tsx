"use client";

import type { Document } from "@/lib/types";
import { Card } from "@/components/ui/Card";
import { FieldLabel } from "@/components/ui/FieldLabel";

interface DocumentPickerProps {
  documents: Document[];
  value: string;
  onChange: (docId: string) => void;
}

export function DocumentPicker({ documents, value, onChange }: DocumentPickerProps) {
  return (
    <Card title="Your documents" step={2}>
      <FieldLabel htmlFor="docSelect">Active document</FieldLabel>
      <select
        id="docSelect"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-900 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
      >
        {documents.length === 0 ? (
          <option value="">— upload a PDF first —</option>
        ) : (
          documents.map((d) => (
            <option key={d.doc_id} value={d.doc_id}>
              {d.filename} ({d.chunks} chunks)
            </option>
          ))
        )}
      </select>
    </Card>
  );
}

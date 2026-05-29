"use client";

import type { AskMode } from "@/lib/types";
import { FieldLabel } from "@/components/ui/FieldLabel";

interface ModeToggleProps {
  mode: AskMode;
  onChange: (mode: AskMode) => void;
}

export function ModeToggle({ mode, onChange }: ModeToggleProps) {
  const options: { id: AskMode; label: string }[] = [
    { id: "answer", label: "Ask a question" },
    { id: "summarize", label: "Summarize" },
  ];

  return (
    <div>
      <FieldLabel>Mode</FieldLabel>
      <div className="grid grid-cols-2 gap-1 rounded-xl border border-slate-200 bg-slate-50 p-1">
        {options.map((opt) => (
          <button
            key={opt.id}
            type="button"
            onClick={() => onChange(opt.id)}
            className={`rounded-lg px-3 py-2.5 text-sm font-semibold transition ${
              mode === opt.id
                ? "bg-white text-indigo-600 shadow-sm"
                : "text-slate-500 hover:text-slate-700"
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}

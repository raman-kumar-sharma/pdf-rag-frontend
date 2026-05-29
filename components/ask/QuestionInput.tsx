"use client";

import { FieldLabel } from "@/components/ui/FieldLabel";

interface QuestionInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
}

export function QuestionInput({ value, onChange, onSubmit }: QuestionInputProps) {
  return (
    <div>
      <FieldLabel htmlFor="question">Question</FieldLabel>
      <textarea
        id="question"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
            e.preventDefault();
            onSubmit();
          }
        }}
        placeholder="e.g. What are the main conclusions and recommendations?"
        className="min-h-[110px] w-full resize-y rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm leading-relaxed text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
      />
      <p className="mt-1.5 text-xs text-slate-400">Ctrl+Enter to submit</p>
    </div>
  );
}

import type { AskResponse } from "@/lib/types";
import { Card } from "@/components/ui/Card";
import { SourcesGrid } from "./SourcesGrid";

interface AnswerPanelProps {
  result: AskResponse;
}

export function AnswerPanel({ result }: AnswerPanelProps) {
  const count = result.sources.length;

  return (
    <Card
      title="Answer"
      badge={
        <span className="rounded-full bg-indigo-50 px-2.5 py-1 text-xs font-semibold text-indigo-600">
          {count ? `${count} source${count > 1 ? "s" : ""}` : "No sources"}
        </span>
      }
    >
      <div className="whitespace-pre-wrap text-[0.98rem] leading-relaxed text-slate-800">
        {result.answer}
      </div>
      <SourcesGrid sources={result.sources} />
    </Card>
  );
}

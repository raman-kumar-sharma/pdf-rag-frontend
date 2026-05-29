import type { Source } from "@/lib/types";

interface SourcesGridProps {
  sources: Source[];
}

export function SourcesGrid({ sources }: SourcesGridProps) {
  if (!sources.length) return null;

  return (
    <div>
      <p className="mb-3 mt-6 border-t border-slate-100 pt-5 text-xs font-semibold uppercase tracking-wide text-slate-500">
        Sources
      </p>
      <div className="grid gap-3 sm:grid-cols-2">
        {sources.map((s) => (
          <article
            key={s.source}
            className="rounded-xl border border-slate-200 border-l-[3px] border-l-indigo-500 bg-slate-50 p-4"
          >
            <div className="mb-2 flex flex-wrap gap-2">
              <span className="rounded-md bg-indigo-50 px-2 py-0.5 text-xs font-semibold text-indigo-600">
                Source {s.source}
              </span>
              <span className="rounded-md border border-slate-200 bg-white px-2 py-0.5 text-xs font-medium text-slate-500">
                Page {s.page ?? "—"}
              </span>
              <span className="rounded-md border border-slate-200 bg-white px-2 py-0.5 text-xs font-medium text-slate-500">
                Score {s.score}
              </span>
            </div>
            <p className="line-clamp-4 text-sm leading-relaxed text-slate-600">{s.snippet}</p>
          </article>
        ))}
      </div>
    </div>
  );
}

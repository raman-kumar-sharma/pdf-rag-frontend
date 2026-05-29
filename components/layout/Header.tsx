"use client";

import { useEffect, useState } from "react";
import { checkHealth } from "@/lib/api";

export function Header() {
  const [online, setOnline] = useState<boolean | null>(null);

  useEffect(() => {
    checkHealth().then(setOnline).catch(() => setOnline(false));
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 to-violet-600 text-xs font-bold text-white shadow-lg shadow-indigo-500/30">
            RAG
          </div>
          <div>
            <h1 className="text-lg font-bold tracking-tight text-slate-900">PDF RAG</h1>
            <p className="hidden text-xs text-slate-500 sm:block">
              Next.js UI · Python API · Pinecone · Claude
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <span
            className={`h-2 w-2 rounded-full ${
              online === null
                ? "bg-slate-300"
                : online
                  ? "bg-emerald-500 ring-4 ring-emerald-500/20"
                  : "bg-red-400"
            }`}
          />
          {online === null ? "Checking API…" : online ? "API online" : "API offline"}
        </div>
      </div>
    </header>
  );
}

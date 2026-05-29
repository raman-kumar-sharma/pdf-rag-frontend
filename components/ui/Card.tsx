import { ReactNode } from "react";

interface CardProps {
  title: string;
  step?: number;
  badge?: ReactNode;
  children: ReactNode;
  className?: string;
}

export function Card({ title, step, badge, children, className = "" }: CardProps) {
  return (
    <section
      className={`overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm shadow-slate-200/50 ${className}`}
    >
      <header className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 px-5 py-4">
        <h2 className="flex items-center gap-2 text-sm font-semibold text-slate-900">
          {step != null && (
            <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-indigo-50 text-xs font-bold text-indigo-600">
              {step}
            </span>
          )}
          {title}
        </h2>
        {badge}
      </header>
      <div className="p-5">{children}</div>
    </section>
  );
}

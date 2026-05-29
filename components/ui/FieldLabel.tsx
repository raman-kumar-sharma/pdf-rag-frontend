interface FieldLabelProps {
  htmlFor?: string;
  children: React.ReactNode;
}

export function FieldLabel({ htmlFor, children }: FieldLabelProps) {
  return (
    <label
      htmlFor={htmlFor}
      className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-500"
    >
      {children}
    </label>
  );
}

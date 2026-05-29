type AlertVariant = "success" | "error";

interface AlertProps {
  variant: AlertVariant;
  children: React.ReactNode;
}

export function Alert({ variant, children }: AlertProps) {
  const styles =
    variant === "success"
      ? "bg-emerald-50 text-emerald-800"
      : "bg-red-50 text-red-700";

  return (
    <p className={`mt-3 rounded-xl px-3.5 py-2.5 text-sm leading-relaxed ${styles}`}>
      {children}
    </p>
  );
}

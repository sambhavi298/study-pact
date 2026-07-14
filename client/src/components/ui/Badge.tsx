import { type ReactNode } from "react";

type Variant = "neutral" | "success" | "warning" | "error" | "action";

const variantClasses: Record<Variant, string> = {
  neutral: "bg-surface-muted text-secondary",
  success: "bg-surface-muted text-success",
  warning: "bg-surface-muted text-warning",
  error: "bg-surface-muted text-error",
  action: "bg-surface-muted text-action-primary",
};

type BadgeProps = {
  variant?: Variant;
  children: ReactNode;
};

export function Badge({ variant = "neutral", children }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-sm text-xs font-medium font-body
        ${variantClasses[variant]}`}
    >
      {children}
    </span>
  );
}

import { type ButtonHTMLAttributes, type ReactNode } from "react";
import { Loader2 } from "lucide-react";

type Variant = "primary" | "secondary" | "ghost" | "danger";

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-action-primary text-inverse hover:bg-action-primary-hover",
  secondary:
    "bg-surface text-primary border border-border-control hover:bg-surface-muted",
  ghost: "bg-transparent text-primary hover:bg-surface-muted",
  danger: "bg-error text-inverse hover:opacity-90",
};

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  isLoading?: boolean;
  children: ReactNode;
};

export function Button({
  variant = "primary",
  isLoading = false,
  disabled,
  children,
  className = "",
  ...props
}: ButtonProps) {
  return (
    <button
      disabled={disabled || isLoading}
      className={`min-h-10 px-4 rounded-control font-body font-medium text-sm
        transition-colors duration-150 ease-out
        disabled:opacity-50 disabled:cursor-not-allowed
        motion-reduce:transition-none
        inline-flex items-center justify-center gap-2
        ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {isLoading && <Loader2 className="w-4 h-4 animate-spin motion-reduce:animate-none" />}
      {children}
    </button>
  );
}

import { type ButtonHTMLAttributes } from "react";
import { type LucideIcon } from "lucide-react";

type Variant = "primary" | "secondary" | "ghost" | "danger";

const variantClasses: Record<Variant, string> = {
  primary: "bg-action-primary text-inverse hover:bg-action-primary-hover",
  secondary: "bg-surface text-primary border border-border-control hover:bg-surface-muted",
  ghost: "bg-transparent text-secondary hover:bg-surface-muted",
  danger: "bg-error text-inverse hover:opacity-90",
};

type IconButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  icon: LucideIcon;
  variant?: Variant;
  // Required, not optional - an icon-only control cannot ship without a
  // label, so we don't give the option to forget it.
  "aria-label": string;
};

export function IconButton({
  icon: Icon,
  variant = "ghost",
  className = "",
  ...props
}: IconButtonProps) {
  return (
    <button
      className={`min-w-10 min-h-10 rounded-control inline-flex items-center justify-center
        transition-colors duration-150 ease-out motion-reduce:transition-none
        disabled:opacity-50 disabled:cursor-not-allowed
        ${variantClasses[variant]} ${className}`}
      {...props}
    >
      <Icon className="w-5 h-5" />
    </button>
  );
}

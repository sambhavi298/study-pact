import { type SelectHTMLAttributes, type ReactNode } from "react";
import { ChevronDown } from "lucide-react";

type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  children: ReactNode;
};

export function Select({ children, className = "", ...props }: SelectProps) {
  return (
    <div className="relative">
      <select
        className={`w-full min-h-10 pl-3 pr-9 rounded-control border border-border-control
          bg-surface text-primary font-body text-sm appearance-none
          focus:outline-none focus:ring-2 focus:ring-focus focus:ring-offset-1
          aria-invalid:border-error
          disabled:opacity-50 disabled:cursor-not-allowed
          transition-colors duration-150 ease-out motion-reduce:transition-none
          ${className}`}
        {...props}
      >
        {children}
      </select>
      <ChevronDown
        className="w-4 h-4 text-secondary absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"
        aria-hidden="true"
      />
    </div>
  );
}

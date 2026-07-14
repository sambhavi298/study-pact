import { type InputHTMLAttributes } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement>;

export function Input(props: InputProps) {
  return (
    <input
      className="w-full min-h-10 px-3 rounded-control border border-border-control
        bg-surface text-primary placeholder:text-secondary font-body text-sm
        focus:outline-none focus:ring-2 focus:ring-focus focus:ring-offset-1
        aria-invalid:border-error
        disabled:opacity-50 disabled:cursor-not-allowed
        transition-colors duration-150 ease-out motion-reduce:transition-none"
      {...props}
    />
  );
}

import { type TextareaHTMLAttributes } from "react";

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement>;

export function Textarea({ rows = 4, ...props }: TextareaProps) {
  return (
    <textarea
      rows={rows}
      className="w-full px-3 py-2 rounded-control border border-border-control
        bg-surface text-primary placeholder:text-secondary font-body text-sm
        focus:outline-none focus:ring-2 focus:ring-focus focus:ring-offset-1
        aria-invalid:border-error
        disabled:opacity-50 disabled:cursor-not-allowed
        transition-colors duration-150 ease-out motion-reduce:transition-none"
      {...props}
    />
  );
}

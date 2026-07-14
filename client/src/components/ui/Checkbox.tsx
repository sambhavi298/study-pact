import { type InputHTMLAttributes } from "react";
import { Check } from "lucide-react";

type CheckboxProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
};

export function Checkbox({ label, id, ...props }: CheckboxProps) {
  return (
    <label htmlFor={id} className="inline-flex items-center gap-2 cursor-pointer font-body text-sm text-primary">
      <span className="relative inline-flex">
        <input type="checkbox" id={id} className="peer sr-only" {...props} />
        <span
          className="w-5 h-5 rounded-sm border border-border-control bg-surface
            peer-checked:bg-success peer-checked:border-success
            peer-focus-visible:ring-2 peer-focus-visible:ring-focus peer-focus-visible:ring-offset-1
            flex items-center justify-center
            transition-colors duration-150 ease-out motion-reduce:transition-none"
        >
          {/* Icon color matches the unchecked background, so it's invisible
              until the background turns success-green on check. Avoids
              relying on peer-* selectors reaching a nested descendant,
              which Tailwind's sibling-only peer variant can't target. */}
          <Check className="w-3.5 h-3.5 text-inverse" strokeWidth={3} aria-hidden="true" />
        </span>
      </span>
      {label}
    </label>
  );
}

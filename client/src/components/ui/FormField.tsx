import { cloneElement, isValidElement, useId, type ReactElement } from "react";

type ControlProps = {
  id?: string;
  "aria-describedby"?: string;
  "aria-invalid"?: boolean;
};

type FormFieldProps = {
  label: string;
  error?: string;
  required?: boolean;
  children: ReactElement<ControlProps>;
};

export function FormField({ label, error, required, children }: FormFieldProps) {
  const id = useId();
  const errorId = `${id}-error`;

  const control = isValidElement(children)
    ? cloneElement(children, {
        id,
        "aria-describedby": error ? errorId : undefined,
        "aria-invalid": !!error,
      })
    : children;

  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className="block text-sm font-medium font-body text-primary">
        {label}
        {required && <span className="text-error"> *</span>}
      </label>
      {control}
      {error && (
        <p id={errorId} className="text-sm text-error font-body">
          {error}
        </p>
      )}
    </div>
  );
}

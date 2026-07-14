import { useEffect, useRef, type ReactNode } from "react";

type DialogProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
};

export function Dialog({ open, onClose, title, children }: DialogProps) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;

    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      onCancel={onClose}
      className="rounded-dialog border border-border bg-surface p-6 max-w-md w-full
        backdrop:bg-black/40
        motion-reduce:transition-none"
    >
      <h2 className="font-display text-2xl font-semibold text-primary mb-4">{title}</h2>
      {children}
    </dialog>
  );
}

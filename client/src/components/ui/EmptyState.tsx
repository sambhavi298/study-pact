import { type LucideIcon } from "lucide-react";
import { type ReactNode } from "react";

type EmptyStateProps = {
  icon: LucideIcon;
  title: string;
  description: string;
  action?: ReactNode;
};

export function EmptyState({ icon: Icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center text-center py-12 px-6">
      <Icon className="w-8 h-8 text-secondary mb-3" aria-hidden="true" />
      <p className="font-body font-medium text-primary mb-1">{title}</p>
      <p className="font-body text-sm text-secondary max-w-sm mb-4">{description}</p>
      {action}
    </div>
  );
}

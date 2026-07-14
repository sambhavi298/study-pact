import { type HTMLAttributes } from "react";

type CardProps = HTMLAttributes<HTMLDivElement>;

export function Card({ className = "", ...props }: CardProps) {
  return (
    <div
      className={`bg-surface border border-border rounded-card shadow-card p-6 ${className}`}
      {...props}
    />
  );
}

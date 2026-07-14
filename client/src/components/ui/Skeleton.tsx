import { type HTMLAttributes } from "react";

type SkeletonProps = HTMLAttributes<HTMLDivElement>;

export function Skeleton({ className = "", ...props }: SkeletonProps) {
  return (
    <div
      className={`bg-surface-muted rounded-control animate-pulse motion-reduce:animate-none ${className}`}
      aria-hidden="true"
      {...props}
    />
  );
}

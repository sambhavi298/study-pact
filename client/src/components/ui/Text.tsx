import { type HTMLAttributes } from "react";

type TextProps = HTMLAttributes<HTMLParagraphElement> & {
  variant?: "primary" | "secondary";
  size?: "body" | "small";
};

const variantClasses = {
  primary: "text-primary",
  secondary: "text-secondary",
};

const sizeClasses = {
  body: "text-base",
  small: "text-sm",
};

export function Text({
  variant = "primary",
  size = "body",
  className = "",
  ...props
}: TextProps) {
  return (
    <p
      className={`font-body leading-relaxed ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      {...props}
    />
  );
}

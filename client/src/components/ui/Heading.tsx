import { type HTMLAttributes } from "react";

type HeadingLevel = 1 | 2 | 3;

type HeadingProps = HTMLAttributes<HTMLHeadingElement> & {
  level?: HeadingLevel;
};

// Per the type scale: level 1-2 (display/page/section headings) use the
// Fraunces display font. Level 3 (card titles) explicitly uses IBM Plex
// Sans at weight 600, per the brief - Fraunces never appears at card-title
// size or smaller.
const levelStyles: Record<HeadingLevel, string> = {
  1: "font-display text-3xl font-semibold",
  2: "font-display text-2xl font-semibold",
  3: "font-body text-lg font-semibold",
};

export function Heading({ level = 1, className = "", ...props }: HeadingProps) {
  const Tag = `h${level}` as "h1" | "h2" | "h3";

  return <Tag className={`text-primary ${levelStyles[level]} ${className}`} {...props} />;
}

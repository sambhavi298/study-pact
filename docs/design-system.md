# StudyPact Design System

## Visual Principles

StudyPact should feel like a well-designed academic notebook translated into a
modern application: composed, focused, restrained, quietly distinctive. It
should reward attention without demanding it, and make progress visible
without turning study into a game.

**Is:** disciplined, academic, warm, trustworthy, calm.
**Is not:** playful, gamified, corporate-blue-SaaS, a Notion clone, a generic
Tailwind template.

Default interface is light mode. All colors are semantic tokens so dark mode
can be added later without rewriting components.

## Color Tokens

Defined as CSS variables in `src/index.css` via Tailwind v4's `@theme`
directive, which auto-generates matching utility classes (e.g.
`--color-background` → `bg-background`).

| Token | Hex | Purpose |
|---|---|---|
| `--color-background` | `#F7F5F0` | Page canvas |
| `--color-surface` | `#FFFFFF` | Cards, dialogs, elevated panels |
| `--color-surface-muted` | `#F0EDE6` | Subtle recessed areas |
| `--color-text-primary` | `#161B2E` | Primary text, headings |
| `--color-text-secondary` | `#5B5F6B` | Metadata, timestamps, helper text |
| `--color-text-inverse` | `#F7F5F0` | Text on dark/action-primary backgrounds |
| `--color-action-primary` | `#A84E1F` | Primary buttons, selected nav, key CTAs |
| `--color-action-primary-hover` | `#8C4019` | Hover state for the above |
| `--color-success` | `#3F6B4F` | Completed tasks, success states, focus ring |
| `--color-warning` | `#9A6700` | Warnings, distinct from action-primary |
| `--color-error` | `#B42318` | Errors, destructive actions |
| `--color-border` | `#DEDAD0` | Card borders, dividers (non-interactive) |
| `--color-border-control` | `#938D82` | Input/checkbox/select borders (interactive) |
| `--color-focus` | `#3F6B4F` | Focus ring color |

Never reference raw hex values or arbitrary Tailwind values (`bg-[#...]`)
inside components — always the semantic token.

## Typography

| Role | Font | Token | Used for |
|---|---|---|---|
| Display | Fraunces, weight 600 | `font-display` | Page titles, section headings only — never body/buttons/nav |
| Body/UI | IBM Plex Sans | `font-body` | Everything else: labels, buttons, nav, tasks, tables |
| Data | IBM Plex Mono | `font-mono` | Streak counts, hours, percentages, timestamps only |

**Type scale:** Display title 32–36px · Page heading 28–32px · Section
heading 20–24px · Card title 16–18px (weight 600) · Body 16px (line-height
~1.5) · Small body 14px · Metadata 12–13px.

## Spacing

Uses Tailwind's default 4px-based scale directly (no custom tokens needed —
`p-2`=8px, `p-4`=16px, `p-6`=24px, `p-8`=32px, `p-12`=48px, etc., already
matches our target scale).

## Radius

| Token | Value | Used for |
|---|---|---|
| `--radius-sm` | 6px | Chips, tags |
| `--radius-control` | 8px | Buttons, inputs |
| `--radius-card` | 12px | Cards |
| `--radius-dialog` | 12px | Dialogs |

## Elevation

Border first, shadow second. Cards use a 1px `border-border` (not
`border-border-control`, which is reserved for interactive fields) plus a
subtle `shadow-card`. No large floating shadows, glassmorphism, or glow.

## Motion

Duration 150–200ms, `ease-out` for entry/hover, `ease-in` for exit. No
bounce, overshoot, or celebratory animation (no confetti, no elastic). All
motion must respect `prefers-reduced-motion` — use Tailwind's
`motion-reduce:` variant to strip transforms when set.

## Signature Motif: the Consistency Grid (`DotGrid`)

Small filled/hollow/muted squares representing repeated effort over time
(e.g. `■ ■ ■ □ □`). Never color-only — always paired with a text summary
("5 of the last 7 days completed"). Deferred until a screen genuinely needs
it (not used by Tasks initially — see component inventory below).

## Component Inventory

### Implemented in Milestone 9 (needed by Tasks, Milestone 10)
`Button`, `IconButton`, `Input`, `Textarea`, `Select`, `Checkbox`,
`FormField`, `Card`, `Heading`, `Text`, `Badge`, `Dialog`, `Toast`,
`Skeleton`, `EmptyState`

### Deferred until a real feature needs them
`Radio`, `Dropdown`, `Tabs`, `Avatar`, `NavigationItem` (folded into
`Layout` for now), `ProgressBar`, `Alert`, `DotGrid` — not built
speculatively; each will be added in the milestone that first requires it,
with this document updated at that point.

## Accessibility Baseline

WCAG 2.2 AA target. Visible keyboard focus on every interactive element,
44px minimum touch targets on mobile, no color-only meaning, labels on every
form control, `aria-describedby` linking errors to their field,
`prefers-reduced-motion` respected throughout.

import * as React from "react";
import { cn } from "@/lib/utils";

type Variant = "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
type Size = "default" | "sm" | "lg" | "icon";

const base =
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-ring)] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ring-offset-[var(--color-background)]";

const variantClass: Record<Variant, string> = {
  default: "bg-[var(--color-primary)] text-[var(--color-primary-foreground)] hover:bg-[color-mix(in_oklab,var(--color-primary),#000_10%)]",
  destructive:
    "bg-[var(--color-destructive)] text-[var(--color-destructive-foreground)] hover:bg-[color-mix(in_oklab,var(--color-destructive),#000_10%)]",
  outline: "border border-[var(--color-input)] bg-[var(--color-background)] hover:bg-[var(--color-accent)] hover:text-[var(--color-accent-foreground)]",
  secondary:
    "bg-[var(--color-secondary)] text-[var(--color-secondary-foreground)] hover:bg-[color-mix(in_oklab,var(--color-secondary),#000_10%)]",
  ghost: "hover:bg-[var(--color-accent)] hover:text-[var(--color-accent-foreground)]",
  link: "text-[var(--color-primary)] underline-offset-4 hover:underline",
};

const sizeClass: Record<Size, string> = {
  default: "h-10 px-4 py-2",
  sm: "h-9 rounded-md px-3",
  lg: "h-11 rounded-md px-8",
  icon: "h-10 w-10",
};

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(base, variantClass[variant], sizeClass[size], className)}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

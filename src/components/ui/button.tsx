import React from "react";
import { Slot } from "@radix-ui/react-slot";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  size?: "sm" | "md" | "lg" | "icon";
  asChild?: boolean; // <-- agregado
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, className = "", variant = "default", size = "md", asChild = false, ...props }, ref) => {
    let baseClasses =
      "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";

    // variantes
    if (variant === "default") baseClasses += " bg-primary text-primary-foreground shadow-xs hover:bg-primary/90";
    if (variant === "destructive") baseClasses += " bg-destructive text-white shadow-xs hover:bg-destructive/90";
    if (variant === "outline") baseClasses += " border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground";
    if (variant === "secondary") baseClasses += " bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80";
    if (variant === "ghost") baseClasses += " hover:bg-accent hover:text-accent-foreground";
    if (variant === "link") baseClasses += " text-primary underline-offset-4 hover:underline";

    // tamaños
    if (size === "sm") baseClasses += " h-8 px-3 text-xs";
    if (size === "md") baseClasses += " h-10 px-4 py-2 text-sm";
    if (size === "lg") baseClasses += " h-12 px-6 text-base";
    if (size === "icon") baseClasses += " h-10 w-10 p-0 rounded-full";

    const Comp = asChild ? Slot : "button"; // <-- usar Slot si asChild es true

    return (
      <Comp ref={ref} className={`${baseClasses} ${className}`} {...props}>
        {children}
      </Comp>
    );
  }
);

Button.displayName = "Button";

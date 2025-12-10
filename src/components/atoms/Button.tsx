import { cn } from "@/lib/utils"
import React from "react"

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "destructive"
  | "success"
  | "view"

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  fullWidth?: boolean
  size?: "sm" | "md" | "lg"
  children: React.ReactNode
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-primary text-primary-foreground hover:bg-primary/90 focus:ring-primary/50",
  secondary:
    "bg-secondary text-secondary-foreground hover:bg-secondary/80 border border-border",
  destructive:
    "bg-destructive text-destructive-foreground hover:bg-destructive/90",
  success: "bg-success text-success-foreground hover:bg-success/80",
  view: "bg-view text-view-foreground hover:bg-view/80",
}

const sizeClasses = {
  sm: "py-1.5 px-4 text-sm",
  md: "py-2 px-5",
  lg: "py-3 px-6",
}

const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  fullWidth = false,
  size = "md",
  className,
  children,
  ...props
}) => {
  return (
    <button
      className={cn(
        "rounded-full font-medium transition-all duration-200 focus:ring-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50",
        variantClasses[variant],
        sizeClasses[size],
        fullWidth && "w-full",
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button

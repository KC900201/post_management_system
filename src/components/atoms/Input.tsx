import { cn } from "@/lib/utils"
import React from "react"

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn(
          "w-full rounded-full border-2 border-input bg-card px-5 py-3 text-foreground",
          "focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none",
          "transition-all duration-200",
          error &&
            "border-destructive focus:border-destructive focus:ring-destructive/20",
          className
        )}
        {...props}
      />
    )
  }
)

Input.displayName = "Input"

export default Input

import React from "react"

import { cn } from "@/lib/utils"

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean
}

const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ className, error, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        className={cn(
          "w-full resize-none rounded-2xl border-2 border-input bg-card px-5 py-3 text-foreground",
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

TextArea.displayName = "TextArea"

export default TextArea

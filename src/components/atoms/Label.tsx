import { cn } from "@/lib/utils"
import React from "react"

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  children: React.ReactNode
}

const Label = ({ className, children, ...props }: LabelProps) => {
  return (
    <label
      className={cn(
        "mb-2 block text-sm font-medium text-foreground",
        className
      )}
      {...props}
    >
      {children}
    </label>
  )
}

export default Label

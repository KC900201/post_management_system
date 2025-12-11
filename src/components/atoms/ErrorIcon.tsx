import { Cross } from "lucide-react"

import { cn } from "@/lib/utils"

interface ErrorIconProps {
  className?: string
}

const ErrorIcon = ({ className }: ErrorIconProps) => {
  return (
    <div
      className={cn(
        "bg-destructive-icon flex h-16 w-16 items-center justify-center rounded-full",
        className
      )}
    >
      <Cross className="h-10 w-10 text-card" strokeWidth={3} />
    </div>
  )
}

export default ErrorIcon

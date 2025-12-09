import { Check } from "lucide-react"

import { cn } from "@/lib/utils"

interface SuccessIconProps {
  className?: string
}

const SuccessIcon = ({ className }: SuccessIconProps) => {
  return (
    <div
      className={cn(
        "flex h-16 w-16 items-center justify-center rounded-full bg-success-icon",
        className
      )}
    >
      <Check className="h-10 w-10 text-card" strokeWidth={3} />
    </div>
  )
}

export default SuccessIcon

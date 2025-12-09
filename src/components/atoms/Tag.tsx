import { X } from "lucide-react"

import { cn } from "@/lib/utils"

interface TagProps {
  label: string
  onRemove?: () => void
  className?: string
}

const Tag = ({ label, onRemove, className }: TagProps) => {
  return (
    <span
      className={cn(
        "text-tag-foreground, inline-flex items-center gap-1 rounded-full bg-tag px-3 py-1 text-xs font-medium",
        className
      )}
    >
      {label}
      {onRemove && (
        <button
          type="button"
          onClick={onRemove}
          className="transition-colors hover:text-destructive"
        >
          <X className="h-3 w-3" />
        </button>
      )}
    </span>
  )
}

export default Tag

import { Label, Tag } from "@/components/atoms"
import { cn } from "@/lib/utils"

interface TagInputProps {
  id: string
  label: string
  tags: string[]
  inputValue: string
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void
  onRemoveTag: (tag: string) => void
  placeholder?: string
  className?: string
}

const TagInput = ({
  id,
  label,
  tags,
  inputValue,
  onInputChange,
  onKeyDown,
  onRemoveTag,
  placeholder = "Type and press Enter",
  className,
}: TagInputProps) => {
  return (
    <div className={className}>
      <Label htmlFor={id}>{label}</Label>
      <div
        className={cn(
          "w-full rounded-full border-2 border-input bg-card px-5 py-3",
          "flex min-h-12 flex-wrap items-center gap-2",
          "focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20",
          "transition-all duration-200"
        )}
      >
        {tags.map((tag) => (
          <Tag key={tag} label={tag} onRemove={() => onRemoveTag(tag)} />
        ))}
        <input
          id={id}
          name={id}
          type="text"
          placeholder={tags.length === 0 ? placeholder : ""}
          className="min-w-[100px] flex-1 border-0 bg-transparent text-foreground outline-none"
          value={inputValue}
          onChange={onInputChange}
          onKeyDown={onKeyDown}
        />
      </div>
    </div>
  )
}

export default TagInput

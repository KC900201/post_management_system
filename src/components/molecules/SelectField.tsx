import { ErrorMessage, Label } from "@/components/atoms"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface SelectOption {
  value: string
  label: string
}

interface SelectFieldProps {
  id: string
  label: string
  value: string
  options: SelectOption[]
  onValueChange: (value: string) => void
  onBlur?: () => void
  error?: string
  touched?: boolean
  placeholder?: string
}

const SelectField = ({
  id,
  label,
  value,
  options,
  onValueChange,
  onBlur,
  error,
  touched,
  placeholder = "Select an option",
}: SelectFieldProps) => {
  const showError = touched && error

  return (
    <div>
      <Label htmlFor={id}>{label}</Label>
      <Select value={value} onValueChange={onValueChange}>
        <SelectTrigger id={id} onBlur={onBlur}>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {showError && <ErrorMessage message={error} />}
    </div>
  )
}

export default SelectField

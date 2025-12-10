import { ErrorMessage, Label, TextArea } from "@/components/atoms"

interface TextAreaFieldProps {
  id: string
  label: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  onBlur?: (e: React.FocusEvent<HTMLTextAreaElement>) => void
  error?: string
  touched?: boolean
  rows?: number
  placeholder?: string
}

const TextAreaField = ({
  id,
  label,
  value,
  onChange,
  onBlur,
  error,
  touched,
  rows = 4,
  placeholder,
}: TextAreaFieldProps) => {
  const showError = touched && error

  return (
    <div>
      <Label htmlFor={id}>{label}</Label>
      <TextArea
        id={id}
        name={id}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        rows={rows}
        placeholder={placeholder}
        error={!!showError}
      />
      {showError && <ErrorMessage message={error} />}
    </div>
  )
}

export default TextAreaField

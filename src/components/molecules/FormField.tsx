import { ErrorMessage, Input, Label } from "@/components/atoms"

interface FormFieldProps {
  id: string
  label: string
  type?: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void
  error?: string
  touched?: boolean
  autoComplete?: string
  placeholder?: string
}

const FormField = ({
  id,
  label,
  type = "text",
  value,
  onChange,
  onBlur,
  error,
  touched,
  autoComplete,
  placeholder,
}: FormFieldProps) => {
  const showError = touched && error

  return (
    <div>
      <Label htmlFor={id}>{label}</Label>{" "}
      <Input
        id={id}
        name={id}
        type={type}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        autoComplete={autoComplete}
        placeholder={placeholder}
        error={!!showError}
      />
      {showError && <ErrorMessage message={error} />}
    </div>
  )
}

export default FormField

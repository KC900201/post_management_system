import { cn } from "@/lib/utils"

interface ErrorMessageProps {
  message?: string
  className?: string
}

const ErrorMesage = ({ message, className }: ErrorMessageProps) => {
  if (!message) return null

  return (
    <p className={cn("mt-1 text-sm text-destructive", className)}>{message}</p>
  )
}

export default ErrorMesage

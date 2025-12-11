import { useEffect } from "react"

import { ErrorIcon } from "@/components/atoms"

interface ErrorModalProps {
  isOpen: boolean
  message: string
  onClose: () => void
  autoCloseDelay?: number
}

const ErrorModal = ({
  isOpen,
  message,
  onClose,
  autoCloseDelay = 2000,
}: ErrorModalProps) => {
  useEffect(() => {
    if (isOpen && autoCloseDelay > 0) {
      const timer = setTimeout(onClose, autoCloseDelay)
      return () => clearTimeout(timer)
    }
  }, [isOpen, onClose, autoCloseDelay])

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/30 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="animate-fade-in mx-auto w-full max-w-md rounded-3xl bg-card p-8 text-center shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4 flex justify-center">
          <ErrorIcon />
        </div>
        <p className="text-lg font-medium text-foreground">{message}</p>
      </div>
    </div>
  )
}

export default ErrorModal

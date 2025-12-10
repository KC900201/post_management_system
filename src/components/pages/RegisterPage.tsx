import { useState } from "react"
import { useNavigate } from "react-router-dom"

import { RegisterForm, SuccessModal } from "@/components/organisms"
import { AuthTemplate } from "@/components/templates"
import { useAuth } from "@/contexts/AuthContext"
import { authApi } from "@/lib/api"
import { parseToken } from "@/lib/auth"

const RegisterPage = () => {
  const navigate = useNavigate()
  const { setUser } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showSuccess, setShowSuccess] = useState(false)
  const [successMessage, setSuccessMessage] = useState("")

  const handleSubmit = async (values: {
    username: string
    email: string
    password: string
    role: string
  }) => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await authApi.register(
        values.username,
        values.email,
        values.password,
        values.role
      )

      localStorage.setItem("token", response.token)

      const user = parseToken(response.token)
      if (user) {
        setUser(user)
      }

      setSuccessMessage(response.message)
      setShowSuccess(true)
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Registration failed. Please try again."
      )
    } finally {
      setIsLoading(false)
    }
  }

  const handleSuccessClose = () => {
    setShowSuccess(false)
    navigate("/posts")
  }

  return (
    <AuthTemplate>
      <RegisterForm
        onSubmit={handleSubmit}
        isLoading={isLoading}
        error={error}
      />
      <SuccessModal
        isOpen={showSuccess}
        message={successMessage || "Account registered successfully"}
        onClose={handleSuccessClose}
      />
    </AuthTemplate>
  )
}

export default RegisterPage

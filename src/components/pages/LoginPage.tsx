import React, { useState } from "react"
import { useNavigate } from "react-router-dom"

import { LoginForm, SuccessModal } from "@/components/organisms"
import { AuthTemplate } from "@/components/templates"
import { useAuth } from "@/contexts/AuthContext"
import { authApi } from "@/lib/api"
import { parseToken } from "@/lib/auth"

const LoginPage = () => {
  const navigate = useNavigate()
  const { setUser } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showSuccess, setShowSuccess] = useState(false)
  const [successMessage, setSuccessMessage] = useState("")

  const handleSubmit = async (values: { email: string; password: string }) => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await authApi.login(values.email, values.password)

      localStorage.setItem("token", response.token)

      const user = parseToken(response.token)

      if (user) {
        setUser(user)
      }

      setSuccessMessage(response.message)
      setShowSuccess(true)
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Login failed. Please try again."
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
      <LoginForm error={error} onSubmit={handleSubmit} isLoading={isLoading} />
      <SuccessModal
        isOpen={showSuccess}
        message={successMessage || "Successfully login"}
        onClose={handleSuccessClose}
      />
    </AuthTemplate>
  )
}

export default LoginPage

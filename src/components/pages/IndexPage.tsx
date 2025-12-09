import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

import { isAuthenticated } from "@/lib/auth"

const IndexPage = () => {
  const navigate = useNavigate()

  useEffect(() => {
    if (isAuthenticated()) {
      navigate("/posts")
    } else {
      navigate("/login")
    }
  }, [navigate])

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <p className="text-muted-foreground">Redirecting...</p>
    </div>
  )
}

export default IndexPage

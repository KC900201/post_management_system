import type React from "react"

interface AuthTemplateProps {
  children: React.ReactNode
}

const AuthTemplate = ({ children }: AuthTemplateProps) => {
  return (
    <main className="flex min-h-screen items-center justify-center p-4">
      {children}
    </main>
  )
}

export default AuthTemplate

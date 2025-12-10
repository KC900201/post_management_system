import type React from "react"

import { Header } from "@/components/organisms"

interface DashboardTemplateProps {
  children: React.ReactNode
  showAddPost?: boolean
  showBack?: boolean
  maxWidth?: "md" | "lg" | "xl" | "4xl" | "6xl"
}

const maxWidthClasses = {
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-4xl",
  "4xl": "max-w-4xl",
  "6xl": "max-w-6xl",
}

const DashboardTemplate = ({
  children,
  showAddPost = false,
  showBack = false,
  maxWidth = "6xl",
}: DashboardTemplateProps) => {
  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className={`${maxWidthClasses[maxWidth]} mx-auto`}>
        <Header showAddPost={showAddPost} showBack={showBack} />
        {children}
      </div>
    </div>
  )
}

export default DashboardTemplate

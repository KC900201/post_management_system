import {
  Link as RouterLink,
  type LinkProps as RouterLinkProps,
} from "react-router-dom"

import { cn } from "@/lib/utils"

type LinkVariant = "primary" | "destructive"

interface LinkProps extends RouterLinkProps {
  variant?: LinkVariant
}

const variantClasses: Record<LinkVariant, string> = {
  primary: "text-primary hover:text-primary/80",
  destructive: "text-destructive hover: text-destructive/80",
}

const Link = ({
  variant = "primary",
  className,
  children,
  ...props
}: LinkProps) => {
  return (
    <RouterLink
      className={cn(
        "cursor-pointer transition-colors duration-200",
        variantClasses[variant],
        className
      )}
      {...props}
    >
      {children}
    </RouterLink>
  )
}

export default Link

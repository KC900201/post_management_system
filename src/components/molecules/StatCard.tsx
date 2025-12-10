import { cn } from "@/lib/utils"

interface StatCardProps {
  title: string
  value: number
  variant: "red" | "green" | "amber"
}

const variantClasses = {
  red: "bg-stat-red",
  green: "bg-stat-green",
  amber: "bg-stat-amber",
}

const StatCard = ({ title, value, variant }: StatCardProps) => {
  return (
    <div className={cn("rounded-2xl p-6 text-center", variantClasses[variant])}>
      <h3 className="mb-2 font-medium text-foreground">{title}</h3>
      <p className="text-4xl font-bold text-foreground">{value}</p>
    </div>
  )
}

export default StatCard

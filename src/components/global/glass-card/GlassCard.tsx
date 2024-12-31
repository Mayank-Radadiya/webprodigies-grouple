import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { FC } from "react"

interface GlassCardProps {
    children: React.ReactNode
    className?: string
}

const GlassCard: FC<GlassCardProps> = ({ children, className }) => {
   return (
       <Card
           className={cn(
               className,
               "rounded-2xl bg-themeGray border-themeGray bg-clip-padding backdrop--blur__safari backdrop-filter backdrop-blur-4xl bg-opacity-40",
           )}
       >
           {children}
       </Card>
   )
}

export default GlassCard

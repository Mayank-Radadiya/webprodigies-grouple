import { cn } from "@/lib/utils"
import { FC } from "react"

interface BackdropGradientProps {
    children: React.ReactNode
    className?: string
    container?: string
    gradientStyle?: "frosted-glass" | "gradient-glow" | "soft-glow"
}

const BackdropGradient: FC<BackdropGradientProps> = ({
    children,
    className = "",
    container = "",
    gradientStyle = "frosted-glass",
}) => {
    return (
        <div className={cn("relative flex w-full flex-col", container)}>
            <div
                className={cn(
                    "absolute rounded-[50%] mx-10",
                    className,
                    gradientStyle,
                )}
                role="presentation"
                aria-hidden="true"
            >
                {children}
            </div>
        </div>
    )
}

export default BackdropGradient

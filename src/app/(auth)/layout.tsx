import { onAuthenticatedUser } from "@/actions/auth"
import BackdropGradient from "@/components/global/backdrop-gradient/BackdropGradient"
import GlassCard from "@/components/global/glass-card/GlassCard"
import { redirect } from "next/navigation"

interface Props {
    children: React.ReactNode
}

const AuthLayout = async ({ children }: Props) => {
    const user = await onAuthenticatedUser()

    if (user.status === 200) redirect("/callback/sign-in")
        
    return (
        <>
            <div className="h-full w-full flex justify-center items-center text-themeTextWhite mt-16">
                <div className="flex flex-col w-full max-w-lg items-center space-y-8 py-16 px-4">
                    <h2 className="text-5xl font-extrabold tracking-tight drop-shadow-md text-center">
                        Grouple.
                    </h2>
                    <BackdropGradient
                        className="absolute h-1/2 inset-0 opacity-40"
                        container="relative flex w-full h-full items-center justify-center"
                    >
                        <GlassCard className="w-full  p-8 shadow-xl border border-gray-700 bg-opacity-70 relative z-10">
                            {children}
                        </GlassCard>
                    </BackdropGradient>
                </div>
            </div>
        </>
    )
}

export default AuthLayout

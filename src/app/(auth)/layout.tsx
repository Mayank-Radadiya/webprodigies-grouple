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
            <div className="container mx-auto flex justify-center items-center mt-48 text-themeTextWhite">
                <div className="flex flex-col w-full items-center space-y-8 py-16 px-4 lg:px-0">
                    <h2 className="text-5xl font-extrabold tracking-tight drop-shadow-md">
                        Grouple.
                    </h2>
                    <BackdropGradient
                        className="w-full h-full opacity-60"
                        gradientStyle="gradient-glow"
                        container="relative ml-[900px] flex w-full h-full flex-col items-center justify-center"
                    >
                        <GlassCard className="xs:w-full md:w-7/12 lg:w-5/12 xl:w-4/12 p-8 mt-8 shadow-xl border border-gray-700 bg-opacity-70">
                            {children}
                        </GlassCard>
                    </BackdropGradient>
                </div>
            </div>
        </>
    )
}

export default AuthLayout

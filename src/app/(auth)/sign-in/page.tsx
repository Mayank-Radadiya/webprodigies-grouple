import SignInForm from "@/components/forms/Sign-In/SignInForm"
import GoogleAuthButton from "@/components/global/GoogleAuthButton/GoogleAuthButton"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"
import { FC } from "react"

const SignInPage: FC = () => {
    return (
        <>
            <div className="flex items-center justify-center mb-2">
                {" "}
                <h5 className="font-bold text-2xl flex items-center text-themeTextWhite">
                    Login
                </h5>
            </div>
            <p className="text-themeTextGray leading-tight">
                Network with people from around the world, join groups, create
                your own, watch courses and become the best version of yourself.
            </p>
            <SignInForm />
            <div className="my-10 w-full relative">
                <div className="bg-black p-3 absolute text-themeTextGray text-xs top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    OR CONTINUE WITH
                </div>
                <Separator
                    orientation="horizontal"
                    className="bg-themeTextGray"
                />
            </div>
            <GoogleAuthButton method="signin" />
            <Link href="sign-up" className="flex items-center justify-end pt-4">
                <p className="text-themeTextWhite leading-tight hover:underline hover:text-blue-400 focus:text-blue-500 transition-colors duration-200 cursor-pointer">
                    Create an account
                </p>
            </Link>
        </>
    )
}

export default SignInPage

"use client"
import { Button } from "@/components/ui/button"
import { useGoogleAuth } from "@/hooks/Authentication"
import { Google } from "@/icons"
import { FC } from "react"
import { Loader } from "../Loader/Loader"

interface GoogleAuthButtonProps {
    method: "signup" | "signin"
}

const GoogleAuthButton: FC<GoogleAuthButtonProps> = ({ method }) => {
    const { signInWith, signUpWith } = useGoogleAuth()

    return (
        <Button
            {...(method === "signin"
                ? {
                      onClick: () => signInWith("oauth_google"),
                  }
                : {
                      onClick: () => signUpWith("oauth_google"),
                  })}
            variant="default"
            className="bg-[#444444] w-full gap-3 rounded-2xl text-white hover:text-[#212121]"
        >
            <Loader loading={false}>
                {" "}
                <Google />
                Google
            </Loader>
        </Button>
    )
}

export default GoogleAuthButton

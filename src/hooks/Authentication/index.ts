import { SignInSchema } from "@/components/schema/SignIn.Schema"
import { SignUpSchema } from "@/components/schema/SignUp.Schema"

import { useSignIn, useSignUp } from "@clerk/nextjs"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"

type ClerkSignInError = {
    errors: {
        code: string // A unique identifier for the error (e.g., "form_password_incorrect")
        message: string // A human-readable error message
        path?: string // (Optional) The path to the invalid field, if applicable
    }[]
}

export const useAuthSignIn = () => {
    const { isLoaded, setActive, signIn } = useSignIn()
    const router = useRouter()
    const {
        register,
        formState: { errors },
        reset,
        handleSubmit,
    } = useForm<z.infer<typeof SignInSchema>>({
        resolver: zodResolver(SignInSchema),
        mode: "onBlur",
    })

    const onClerkAuth = async (email: string, password: string) => {
        if (!isLoaded)
            return toast("error", {
                description: "Oops! something went wrong",
            })

        try {
            const authenticated = await signIn?.create({
                identifier: email,
                password: password,
            })

            if (authenticated.status === "complete") {
                reset()
                await setActive({ session: authenticated.createdSessionId })
                toast("Success", {
                    description: "Welcome back!",
                })
                router.push("/callback/sign-in")
            }
        } catch (error) {
            if (
                (error as ClerkSignInError).errors[0].code ===
                "form_password_incorrect"
            )
                toast("Error", {
                    description: "email/password is incorrect try again",
                })
        }
    }

    const { mutate: InitiateLoginFlow, isPending } = useMutation({
        mutationFn({ email, password }: { email: string; password: string }) {
            return onClerkAuth(email, password)
        },
    })

    const onAuthenticateUser = handleSubmit(async (values) => {
        InitiateLoginFlow({ email: values.email, password: values.password })
    })

    return {
        onAuthenticateUser,
        isPending,
        register,
        errors,
    }
}

export const useAuthSignUp = () => {
    const { isLoaded, setActive, signUp } = useSignUp()
    const [creating, setCreating] = useState<boolean>(false)
    const [verifying, setVerifying] = useState<boolean>(false)
    const [code, setCode] = useState<string>("")

    const router = useRouter()

    const {
        register,
        formState: { errors },
        reset,
        handleSubmit,
        getValues,
    } = useForm<z.infer<typeof SignUpSchema>>({
        resolver: zodResolver(SignUpSchema),
        mode: "onBlur",
    })

    const onGenerateCode = async (email: string, password: string) => {
        if (!isLoaded)
            return toast("Error", {
                description: "Oops! something went wrong",
            })

        try {
            if (email && password) {
                await signUp.create({
                    emailAddress: getValues("email"),
                    password: getValues("password"),
                })
                await signUp.prepareEmailAddressVerification({
                    strategy: "email_code",
                })

                setVerifying(true)
            } else {
                return toast("Error", {
                    description: "No fields must be empty",
                })
            }
        } catch (error) {
            console.error(JSON.stringify(error, null, 2))
        }

    }

    const onInitiateUserRegistration = handleSubmit
}

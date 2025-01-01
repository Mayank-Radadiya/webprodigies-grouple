"use client"

import { FormGenerator } from "@/components/global/form-generator/FormGenerator"
import { Loader } from "@/components/global/Loader/Loader"
import { Button } from "@/components/ui/button"
import { GROUPLE_CONSTANTS } from "@/constants"
import { useAuthSignIn } from "@/hooks/Authentication"
import { FC } from "react"

const SignInForm: FC = ({}) => {
    const { isPending, onAuthenticateUser, register, errors } = useAuthSignIn()

    return (
        <form className="flex flex-col gap-3 mt-10">
            {GROUPLE_CONSTANTS.signInForm.map((field) => (
                <FormGenerator
                    {...field}
                    key={field.id}
                    register={register}
                    errors={errors}
                />
            ))}

            <Button
                variant="default"
                type="submit"
                className="bg-white text-themeGray px-6 py-3 shadow-md font-semibold w-full rounded-xl  hover:text-gray-900 hover:bg-slate-200"
            >
                <Loader loading={isPending}>Sign In with Email</Loader>
            </Button>
        </form>
    )
}

export default SignInForm

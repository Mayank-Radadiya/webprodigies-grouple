"use client"
import { FormGenerator } from "@/components/global/form-generator/FormGenerator"
import { Loader } from "@/components/global/Loader/Loader"
import OtpInput from "@/components/global/otp-input/OtpInput"
import { Button } from "@/components/ui/button"
import { GROUPLE_CONSTANTS } from "@/constants"
import { useAuthSignUp } from "@/hooks/Authentication"
import { FC } from "react"

const SignUpFrom: FC = () => {
    const {
        register,
        errors,
        verifying,
        creating,
        onGenerateCode,
        onInitiateUserRegistration,
        code,
        setCode,
        getValues,
    } = useAuthSignUp()
    return (
        <form
            onSubmit={onInitiateUserRegistration}
            className="flex flex-col gap-3 mt-10"
        >
            {verifying ? (
                <div className="flex justify-center mb-5">
                    <OtpInput otp={code} setOtp={setCode} />
                </div>
            ) : (
                GROUPLE_CONSTANTS.signUpForm.map((field) => (
                    <FormGenerator
                        {...field}
                        key={field.id}
                        register={register}
                        errors={errors}
                    />
                ))
            )}

            {verifying ? (
                <Button type="submit" className="rounded-2xl">
                    <Loader loading={creating}>Sign Up with Email</Loader>
                </Button>
            ) : (
                <Button
                    type="button"
                    className="rounded-2xl"
                    onClick={() =>
                        onGenerateCode(
                            getValues("email"),
                            getValues("password"),
                        )
                    }
                >
                    <Loader loading={false}>Generate Code</Loader>
                </Button>
            )}
        </form>
    )
}

export default SignUpFrom

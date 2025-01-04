import { FormGenerator } from "@/components/global/form-generator/FormGenerator"
import { GroupList } from "@/components/global/group-list-slider/GroupList"
import { Loader } from "@/components/global/Loader/Loader"
import { Button } from "@/components/ui/button"
import { usePayments } from "@/hooks/payment/patment.hook"
import { ErrorMessage } from "@hookform/error-message"
import { CardElement } from "@stripe/react-stripe-js"
import Link from "next/link"
import { FC } from "react"

interface PaymentFormProps {
    userId: string
    affiliate: boolean
    stripeId?: string
}

const PaymentForm: FC<PaymentFormProps> = ({ userId, affiliate, stripeId }) => {
    const {
        onCreateGroup,
        isPending,
        register,
        errors,
        isCategory,
        creatingIntent,
    } = usePayments(userId, affiliate)
    return (
        <Loader loading={creatingIntent}>
            <form className="pt-5" onSubmit={onCreateGroup}>
                <GroupList
                    selected={isCategory}
                    register={register}
                    label="Select Category"
                    slidesOffsetBefore={28}
                />
                <div className="px-7 mb-2">
                    <ErrorMessage
                        errors={errors}
                        name={"category"}
                        render={({ message }) => (
                            <p className="text-red-400">
                                {message === "Required" ? "" : message}
                            </p>
                        )}
                    />
                </div>
                <div className="px-7">
                    <FormGenerator
                        register={register}
                        name="name"
                        errors={errors}
                        inputType="input"
                        type="text"
                        placeholder="Group Name"
                    />
                </div>
                <div className="px-7 my-3">
                    <CardElement
                        options={{
                            style: {
                                base: {
                                    fontSize: "16px",
                                    color: "#B4B0AE",
                                    "::placeholder": {
                                        color: "#B4B0AE",
                                    },
                                },
                            },
                        }}
                        className="bg-themeBlack border-[1px] border-themeGray outline-none rounded-lg p-3"
                    />
                </div>
                <div className="px-7 flex flex-col gap-5">
                    <p className="text-sm text-themeTextGray">
                        Cancel anytime with 1-click. By clicking below, you
                        accept our terms.
                    </p>

                    <Button
                        variant="outline"
                        type="submit"
                        className="bg-themeBlack border-themeGray rounded-xl"
                    >
                        <Loader loading={isPending}>Get Started</Loader>
                    </Button>

                    <Link
                        href={"/explore"}
                        className="flex items-center justify-start pt-4"
                    >
                        <p className="text-themeTextWhite leading-tight hover:underline hover:text-blue-400 focus:text-blue-400 transition-colors duration-200 cursor-pointer">
                            Skip for now
                        </p>
                    </Link>
                </div>
            </form>
        </Loader>
    )
}

export default PaymentForm

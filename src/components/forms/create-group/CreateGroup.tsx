"use client"
import { FC } from "react"
import PaymentForm from "./PaymentForm"
import { StripeElements } from "@/components/global/stripe/element"

interface CreateGroupProps {
    userId: string
    affiliate: boolean
    stripeId?: string
}

const CreateGroup: FC<CreateGroupProps> = ({ userId, affiliate, stripeId }) => {
    return (
        <StripeElements>
            <PaymentForm
                userId={userId}
                affiliate={affiliate}
                stripeId={stripeId}
            />
        </StripeElements>
    )
}

export default CreateGroup

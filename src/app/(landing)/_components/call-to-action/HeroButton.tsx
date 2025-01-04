"use client"
import { Button } from "@/components/ui/button"
import { BadgePlus } from "lucide-react"
import Link from "next/link"
import { FC } from "react"
import { toast } from "sonner"

const HeroButton: FC = ({}) => {
    const handler = () => {
        toast("Coming soon!")
    }
    return (
        <>
            <Button
                variant="outline"
                className="rounded-xl bg-transparent text-base"
                onClick={() => handler()}
            >
                Watch Demo
            </Button>
            <Link href="/sign-in">
                <Button className="rounded-xl text-base flex items-center gap-2 w-full">
                    <BadgePlus /> Get Started
                </Button>
            </Link>
        </>
    )
}

export default HeroButton

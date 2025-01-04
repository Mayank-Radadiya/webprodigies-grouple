import GradientText from "@/components/global/Gradient/GradientText"
import { Button } from "@/components/ui/button"
import { BadgePlus } from "lucide-react"
import Link from "next/link"
import { FC } from "react"
import { toast } from "sonner"

const CallToAction: FC = () => {

    return (
        <div className="flex flex-col items-start md:items-center gap-y-5 md:gap-y-0">
            <GradientText
                className="text-[35px] md:text-[40px] lg:text-[55px] xl:text-[70px] 2xl:text-[80px] leading-tight font-semibold"
                element="H1"
            >
                Bringing Communities <br className="md:hidden" /> Together
            </GradientText>
            <p className="text-sm md:text-center mt-5 text-left text-muted-foreground">
                Grouple is a vibrant online community platform that empowers
                <br className="md:hidden" />
                people to connect, <br className="hidden md:block" />{" "}
                collaborate, and cultivate meaningful
                <br className="md:hidden" />
                relationships
            </p>
            <div className="flex flex-col gap-5 w-full md:flex-row md:justify-center md:mt-5">
                <Button
                    variant="outline"
                    className="rounded-xl bg-transparent text-base"
                >
                    Watch Demo
                </Button>
                <Link href="/sign-in">
                    <Button className="rounded-xl text-base flex items-center gap-2 w-full">
                        <BadgePlus /> Get Started
                    </Button>
                </Link>
            </div>
        </div>
    )
}

export default CallToAction

import BackdropGradient from "@/components/global/backdrop-gradient/BackdropGradient"
import GradientText from "@/components/global/Gradient/GradientText"

import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardTitle } from "@/components/ui/card"
import { Check } from "@/icons"
import Link from "next/link"

type Props = {}

const PricingSection = (props: Props) => {
    return (
        <div
            className="w-full pt-20 flex flex-col items-center gap-3"
            id="pricing"
        >
            <BackdropGradient className="w-full h-full opacity-50 flex flex-col items-center">
                <GradientText
                    className="text-6xl pb-2 font-semibold text-center"
                    element="H2"
                >
                    Pricing Plans That Fit Your Right
                </GradientText>
                <p className="text-sm mt-2 md:text-center text-left text-muted-foreground">
                    Grouple is a vibrant online community platform that empowers
                    people to connect, <br className="hidden md:block" />
                    collaborate, and cultivate meaningful relationships
                </p>
            </BackdropGradient>
            <Card className="p-7 mt-40 md:w-auto w-full bg-themeBlack border-themeGray">
                <div className="flex flex-col gap-2">
                    <CardTitle>
                        <div>
                            <GradientText element="H2" > 99$/m</GradientText>{" "}
                        </div>
                    </CardTitle>
                    <CardDescription className="text-[#B4B0AE]">
                        Great if you’re just getting started
                    </CardDescription>
                    <Link href="#" className="w-full mt-3">
                        <Button
                            variant="default"
                            className="bg-[#333337] w-full rounded-2xl text-white hover:text-[#333337]"
                        >
                            Start for free
                        </Button>
                    </Link>
                </div>
                <div className="flex flex-col gap-2 text-[#B4B0AE] mt-5">
                    <p>Features</p>
                    <span className="flex gap-2 mt-3 items-center">
                        <Check />
                        Feature number 1
                    </span>
                    <span className="flex gap-2 items-center">
                        <Check />
                        Feature number 1
                    </span>
                    <span className="flex gap-2 items-center">
                        <Check />
                        Feature number 1
                    </span>
                    <span className="flex gap-2 items-center">
                        <Check />
                        Feature number 1
                    </span>
                    <span className="flex gap-2 items-center">
                        <Check />
                        Feature number 1
                    </span>
                </div>
            </Card>
        </div>
    )
}

export default PricingSection

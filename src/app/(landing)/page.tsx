import CallToAction from "./_components/call-to-action/CallToAction"
import DashboardSnippet from "./_components/DashboardSnippet/DashboardSnippet"
import PricingSection from "./_components/Pricing/PricingSection"

export default function Home() {
    return (
        <>
            <main className="md:px-10 py-20 flex flex-col gap-28">
                <div>
                    <CallToAction />
                    <DashboardSnippet />
                </div>
                <PricingSection />
            </main>
        </>
    )
}

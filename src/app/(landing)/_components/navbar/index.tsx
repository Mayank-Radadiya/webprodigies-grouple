import { FC } from "react"
import Menu from "./menu"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { LogOut, MenuIcon } from "lucide-react"
import GlassSheet from "@/components/global/glass-sheet/GlassSheet"
const index: FC = () => {
    return (
        <>
            <div className="w-full flex justify-between items-center sticky top-0 z-10 py-5 ">
                <p className="text-2xl font-bold">Grouple.</p>
                <Menu orientation="desktop" />
                <div className="flex gap-2">
                    <Link href="/sign-in">
                        <Button
                            variant="outline"
                            className="bg-themeBlack rounded-xl flex gap-2 border-themeGray hover:bg-themeGray"
                        >
                            <LogOut />
                            Login
                        </Button>
                    </Link>
                    <GlassSheet
                        triggerClass="lg:hidden"
                        trigger={
                            <div>
                                <Button
                                    variant="ghost"
                                    className="hover:bg-transparent"
                                >
                                    <MenuIcon size={30} />
                                </Button>
                            </div>
                        }
                    >
                        <Menu orientation="mobile" />
                    </GlassSheet>
                </div>
            </div>
        </>
    )
}

export default index

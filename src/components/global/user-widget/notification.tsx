"use client"

import { Bell } from "@/icons"
import GlassSheet from "../glass-sheet/GlassSheet"


export const Notification = () => {
    return (
        <GlassSheet
            trigger={
                <span className="cursor-pointer">
                    <Bell />
                </span>
            }
        >
            <div>yo</div>
        </GlassSheet>
    )
}

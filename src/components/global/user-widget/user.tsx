"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Logout, Settings } from "@/icons"
import { supabaseClient } from "@/lib/utils"
import { onOffline } from "@/redux/slices/online-member-slice"
import { AppDispatch } from "@/redux/store"
import { useClerk } from "@clerk/nextjs"
import Link from "next/link"
import { useDispatch } from "react-redux"
import { DropDown } from "../drop-down/dropDown"

type UserWidgetProps = {
  image: string
  groupid?: string
  userid?: string
}

export const UserAvatar = ({ image, groupid, userid }: UserWidgetProps) => {
  const { signOut } = useClerk()

  const untrackPresence = async () => {
    await supabaseClient.channel("tracking").untrack()
  }

  const dispatch: AppDispatch = useDispatch()

  const onLogout = async () => {
    untrackPresence()
    dispatch(onOffline({ members: [{ id: userid! }] }))
    signOut({ redirectUrl: "/" })
  }

  return (
    <DropDown
      title="Account"
      trigger={
        <Avatar className="cursor-pointer">
          <AvatarImage src={image} alt="user" />
          <AvatarFallback>U</AvatarFallback>
        </Avatar>
      }
    >
      <Link
        href={`/group/${groupid}/settings`}
        className="flex gap-3 px-4 py-2 items-center justify-start w-full mt-2  font-medium text-white hover:bg-themeDarkGray hover:text-gray-400 rounded-md transition-colors duration-200"
      >
        <Settings /> Settings
      </Link>
      <Link
        onClick={onLogout}
        href="#"
        className="flex gap-3 px-4 py-2 items-center justify-start w-full mt-2  font-medium text-white hover:bg-themeDarkGray hover:text-gray-400 rounded-md transition-colors duration-200"
      >
        <Logout />
        Logout
      </Link>
    </DropDown>
  )
}

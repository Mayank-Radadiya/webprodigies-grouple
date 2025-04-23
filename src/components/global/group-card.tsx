"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Group } from "@prisma/client"
import { Globe, Shield, Users } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface GroupCardProps {
  group: Group
  isMember?: boolean
  className?: string
  showJoin?: boolean
  onJoin?: (groupId: string) => void
  isLoading?: boolean
}

export function GroupCard({
  group,
  isMember = false,
  className,
  showJoin = true,
  onJoin,
  isLoading = false,
}: GroupCardProps) {
  const handleJoin = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (onJoin) {
      onJoin(group.id)
    }
  }

  return (
    <Link
      href={`/group/${group.id}`}
      className={cn(
        "flex flex-col h-full overflow-hidden rounded-lg border border-zinc-800 bg-black transition-all hover:border-zinc-700 hover:shadow-md",
        className,
      )}
    >
      <div className="relative aspect-video w-full overflow-hidden">
        {group.thumbnail ? (
          <Image
            src={group.thumbnail}
            alt={group.name}
            fill
            className="object-cover transition-transform hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-zinc-900 text-zinc-500">
            <Users size={48} />
          </div>
        )}
        <div className="absolute right-2 top-2">
          <Badge
            variant={group.privacy === "PUBLIC" ? "default" : "outline"}
            className="flex gap-1 items-center"
          >
            {group.privacy === "PUBLIC" ? (
              <Globe size={14} />
            ) : (
              <Shield size={14} />
            )}
            {group.privacy}
          </Badge>
        </div>
      </div>
      <div className="flex flex-1 flex-col p-4">
        <h3 className="line-clamp-1 font-semibold text-lg">{group.name}</h3>
        <p className="line-clamp-2 mt-2 text-sm text-zinc-400">
          {group.description || "No description available"}
        </p>
        <div className="mt-auto pt-4">
          {showJoin && (
            <Button
              onClick={handleJoin}
              variant={isMember ? "outline" : "default"}
              className="w-full"
              disabled={isLoading}
            >
              {isMember ? "Joined" : "Join Group"}
            </Button>
          )}
        </div>
      </div>
    </Link>
  )
}

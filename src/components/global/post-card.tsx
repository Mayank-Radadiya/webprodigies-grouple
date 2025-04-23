"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Post, User } from "@prisma/client"
import { formatDistanceToNow } from "date-fns"
import { Heart, MessageSquare, Share2 } from "lucide-react"
import Link from "next/link"

interface PostWithAuthor extends Post {
  author: User
  _count?: {
    likes: number
    comments: number
  }
  isLiked?: boolean
}

interface PostCardProps {
  post: PostWithAuthor
  onLike?: (postId: string) => void
  className?: string
  isLoading?: boolean
}

export function PostCard({
  post,
  onLike,
  className,
  isLoading = false,
}: PostCardProps) {
  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (onLike) {
      onLike(post.id)
    }
  }

  const likeCount = post._count?.likes || 0
  const commentCount = post._count?.comments || 0
  const timeAgo = formatDistanceToNow(new Date(post.createdAt), {
    addSuffix: true,
  })

  return (
    <div
      className={cn(
        "flex flex-col rounded-lg border border-zinc-800 bg-black p-4",
        className,
      )}
    >
      <div className="flex items-start gap-3">
        <Avatar className="h-10 w-10">
          <AvatarImage src={post.author.image || ""} />
          <AvatarFallback>
            {post.author.firstname.charAt(0)}
            {post.author.lastname.charAt(0)}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1 space-y-1">
          <div className="flex items-center justify-between">
            <div>
              <Link
                href={`/profile/${post.author.id}`}
                className="font-medium hover:underline"
              >
                {post.author.firstname} {post.author.lastname}
              </Link>
              <p className="text-xs text-zinc-400">{timeAgo}</p>
            </div>
          </div>
          {post.title && (
            <h3 className="text-lg font-semibold">{post.title}</h3>
          )}
          <div className="mt-2">
            {post.htmlContent ? (
              <div
                className="prose prose-sm dark:prose-invert max-w-none"
                dangerouslySetInnerHTML={{ __html: post.htmlContent }}
              />
            ) : (
              <p className="text-zinc-300">{post.content}</p>
            )}
          </div>
        </div>
      </div>
      <div className="mt-4 flex gap-4">
        <Button
          variant="ghost"
          size="sm"
          className={cn(
            "gap-1.5 text-zinc-500",
            post.isLiked && "text-red-500",
          )}
          onClick={handleLike}
          disabled={isLoading}
        >
          <Heart size={18} className={post.isLiked ? "fill-red-500" : ""} />
          <span>{likeCount}</span>
        </Button>
        <Link href={`/post/${post.id}#comments`} passHref>
          <Button variant="ghost" size="sm" className="gap-1.5 text-zinc-500">
            <MessageSquare size={18} />
            <span>{commentCount}</span>
          </Button>
        </Link>
        <Button
          variant="ghost"
          size="sm"
          className="gap-1.5 text-zinc-500 ml-auto"
          onClick={(e) => {
            e.preventDefault()
            navigator.clipboard.writeText(
              `${window.location.origin}/post/${post.id}`,
            )
          }}
        >
          <Share2 size={18} />
        </Button>
      </div>
    </div>
  )
}

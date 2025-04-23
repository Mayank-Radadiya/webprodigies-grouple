"use client"

import { GroupCard } from "@/components/global/group-card"
import { PostCard } from "@/components/global/post-card"
import { Button } from "@/components/ui/button"
import { GroupCardSkeleton } from "@/components/ui/skeleton"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Group, Post, User } from "@prisma/client"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

interface PostWithAuthor extends Post {
  author: User
  _count?: {
    likes: number
    comments: number
  }
  isLiked?: boolean
}

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(true)
  const [recentGroups, setRecentGroups] = useState<Group[]>([])
  const [recommendedGroups, setRecommendedGroups] = useState<Group[]>([])
  const [feed, setFeed] = useState<PostWithAuthor[]>([])
  const router = useRouter()

  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setIsLoading(false)

      // These would normally be fetched from an API
      setRecentGroups([
        {
          id: "1",
          name: "Tech Enthusiasts",
          description:
            "A community of technology lovers discussing the latest trends and innovations.",
          privacy: "PUBLIC",
          category: "Technology",
          active: true,
          createdAt: new Date(),
          userId: "user1",
          thumbnail:
            "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
          gallery: [],
          htmlDescription: null,
          jsonDescription: null,
          icon: null,
          domain: null,
        },
        {
          id: "2",
          name: "Fitness Goals",
          description:
            "Join us to share your fitness journey, workouts, and nutrition tips.",
          privacy: "PUBLIC",
          category: "Fitness",
          active: true,
          createdAt: new Date(),
          userId: "user2",
          thumbnail:
            "https://images.unsplash.com/photo-1517836357463-d25dfeac3438",
          gallery: [],
          htmlDescription: null,
          jsonDescription: null,
          icon: null,
          domain: null,
        },
      ])

      setRecommendedGroups([
        {
          id: "3",
          name: "Digital Nomads",
          description:
            "For remote workers and travelers sharing experiences and tips.",
          privacy: "PRIVATE",
          category: "Lifestyle",
          active: true,
          createdAt: new Date(),
          userId: "user3",
          thumbnail:
            "https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b",
          gallery: [],
          htmlDescription: null,
          jsonDescription: null,
          icon: null,
          domain: null,
        },
        {
          id: "4",
          name: "Book Club",
          description:
            "Discuss your favorite books and get recommendations from fellow readers.",
          privacy: "PUBLIC",
          category: "Education",
          active: true,
          createdAt: new Date(),
          userId: "user4",
          thumbnail:
            "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0",
          gallery: [],
          htmlDescription: null,
          jsonDescription: null,
          icon: null,
          domain: null,
        },
      ])

      setFeed([
        {
          id: "101",
          title: "Getting Started with Next.js",
          content:
            "Next.js is a powerful React framework that makes building modern web applications easier.",
          htmlContent:
            "<p>Next.js is a powerful React framework that makes building modern web applications easier. Here are some key features:</p><ul><li>Server-side rendering</li><li>Static site generation</li><li>API routes</li><li>File-based routing</li></ul>",
          jsonContent: null,
          createdAt: new Date(),
          authorId: "user1",
          channelId: "channel1",
          author: {
            id: "user1",
            firstname: "John",
            lastname: "Doe",
            createdAt: new Date(),
            clerkId: "clerk1",
            image:
              "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e",
            stripeId: null,
          },
          _count: {
            likes: 24,
            comments: 5,
          },
          isLiked: false,
        },
        {
          id: "102",
          title: "How to Stay Motivated During Your Fitness Journey",
          content:
            "Consistency is key when it comes to fitness. Here are some tips to stay motivated.",
          htmlContent:
            "<p>Consistency is key when it comes to fitness. Here are some tips to stay motivated:</p><ol><li>Set clear, achievable goals</li><li>Find a workout buddy</li><li>Track your progress</li><li>Mix up your routine to keep it interesting</li></ol>",
          jsonContent: null,
          createdAt: new Date(Date.now() - 3600000), // 1 hour ago
          authorId: "user2",
          channelId: "channel2",
          author: {
            id: "user2",
            firstname: "Jane",
            lastname: "Smith",
            createdAt: new Date(),
            clerkId: "clerk2",
            image:
              "https://images.unsplash.com/photo-1534528741775-53994a69daeb",
            stripeId: null,
          },
          _count: {
            likes: 42,
            comments: 8,
          },
          isLiked: true,
        },
      ])
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  const handleJoinGroup = (groupId: string) => {
    console.log(`Joining group ${groupId}`)
    // This would normally call an API endpoint
  }

  const handleLikePost = (postId: string) => {
    console.log(`Liking post ${postId}`)
    // This would normally call an API endpoint
    setFeed((prev) =>
      prev.map((post: any) =>
        post.id === postId
          ? {
              ...post,
              isLiked: !post.isLiked,
              _count: {
                ...post._count,
                likes: post.isLiked
                  ? (post._count?.likes || 1) - 1
                  : (post._count?.likes || 0) + 1,
              },
            }
          : post,
      ),
    )
  }

  return (
    <div className="container mx-auto max-w-4xl py-6 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-6">Welcome Back!</h1>

        <Tabs defaultValue="feed" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="feed">Your Feed</TabsTrigger>
            <TabsTrigger value="groups">Groups</TabsTrigger>
          </TabsList>

          <TabsContent value="feed" className="space-y-6">
            {isLoading
              ? Array(3)
                  .fill(0)
                  .map((_, i) => (
                    <div
                      key={i}
                      className="animate-pulse space-y-4 rounded-lg border border-zinc-800 p-4"
                    >
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-zinc-800" />
                        <div className="space-y-2">
                          <div className="h-4 w-32 rounded bg-zinc-800" />
                          <div className="h-3 w-24 rounded bg-zinc-800" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="h-5 w-full rounded bg-zinc-800" />
                        <div className="h-4 w-full rounded bg-zinc-800" />
                        <div className="h-4 w-3/4 rounded bg-zinc-800" />
                      </div>
                    </div>
                  ))
              : feed.map((post) => (
                  <PostCard key={post.id} post={post} onLike={handleLikePost} />
                ))}

            {!isLoading && (
              <div className="flex items-center justify-center pt-4">
                <Button variant="outline">Load More</Button>
              </div>
            )}
          </TabsContent>

          <TabsContent value="groups" className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-4">Your Recent Groups</h2>

              {isLoading ? (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {Array(2)
                    .fill(0)
                    .map((_, i) => (
                      <GroupCardSkeleton key={i} />
                    ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {recentGroups.map((group) => (
                    <GroupCard
                      key={group.id}
                      group={group}
                      isMember={true}
                      showJoin={false}
                    />
                  ))}
                </div>
              )}
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-4">Recommended Groups</h2>

              {isLoading ? (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {Array(2)
                    .fill(0)
                    .map((_, i) => (
                      <GroupCardSkeleton key={i} />
                    ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {recommendedGroups.map((group) => (
                    <GroupCard
                      key={group.id}
                      group={group}
                      onJoin={handleJoinGroup}
                      isLoading={isLoading}
                    />
                  ))}
                </div>
              )}
            </div>

            {!isLoading && (
              <div className="flex items-center justify-center pt-4">
                <Button
                  variant="outline"
                  onClick={() => router.push("/explore")}
                >
                  Discover More Groups
                </Button>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

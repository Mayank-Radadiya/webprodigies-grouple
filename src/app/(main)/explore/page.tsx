"use client"

import { GroupCard } from "@/components/global/group-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { GroupCardSkeleton } from "@/components/ui/skeleton"
import { Group } from "@prisma/client"
import { Search } from "lucide-react"
import { useEffect, useState } from "react"

const CATEGORIES = [
  "All Categories",
  "Technology",
  "Fitness",
  "Education",
  "Business",
  "Arts",
  "Gaming",
  "Lifestyle",
  "Music",
  "Travel",
  "Food",
  "Sports",
]

export default function ExplorePage() {
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All Categories")
  const [groups, setGroups] = useState<Group[]>([])
  const [filteredGroups, setFilteredGroups] = useState<Group[]>([])

  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setIsLoading(false)

      // These would normally be fetched from an API
      const dummyGroups: Group[] = [
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
        {
          id: "5",
          name: "Startup Founders",
          description:
            "A group for entrepreneurs to share experiences and get advice.",
          privacy: "PUBLIC",
          category: "Business",
          active: true,
          createdAt: new Date(),
          userId: "user5",
          thumbnail:
            "https://images.unsplash.com/photo-1556761175-5973dc0f32e7",
          gallery: [],
          htmlDescription: null,
          jsonDescription: null,
          icon: null,
          domain: null,
        },
        {
          id: "6",
          name: "Photography Enthusiasts",
          description:
            "Share your photography, get feedback, and learn new techniques.",
          privacy: "PUBLIC",
          category: "Arts",
          active: true,
          createdAt: new Date(),
          userId: "user6",
          thumbnail:
            "https://images.unsplash.com/photo-1516035069371-29a1b244cc32",
          gallery: [],
          htmlDescription: null,
          jsonDescription: null,
          icon: null,
          domain: null,
        },
        {
          id: "7",
          name: "Gaming Community",
          description:
            "For gamers to connect, share tips, and organize play sessions.",
          privacy: "PUBLIC",
          category: "Gaming",
          active: true,
          createdAt: new Date(),
          userId: "user7",
          thumbnail:
            "https://images.unsplash.com/photo-1511512578047-dfb367046420",
          gallery: [],
          htmlDescription: null,
          jsonDescription: null,
          icon: null,
          domain: null,
        },
        {
          id: "8",
          name: "Musicians Network",
          description:
            "Connect with fellow musicians, share your work, and collaborate.",
          privacy: "PUBLIC",
          category: "Music",
          active: true,
          createdAt: new Date(),
          userId: "user8",
          thumbnail:
            "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4",
          gallery: [],
          htmlDescription: null,
          jsonDescription: null,
          icon: null,
          domain: null,
        },
      ]

      setGroups(dummyGroups)
      setFilteredGroups(dummyGroups)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (groups.length > 0) {
      let filtered = [...groups]

      // Filter by search query
      if (searchQuery) {
        filtered = filtered.filter(
          (group) =>
            group.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (group.description &&
              group.description
                .toLowerCase()
                .includes(searchQuery.toLowerCase())),
        )
      }

      // Filter by category
      if (selectedCategory !== "All Categories") {
        filtered = filtered.filter(
          (group) => group.category === selectedCategory,
        )
      }

      setFilteredGroups(filtered)
    }
  }, [searchQuery, selectedCategory, groups])

  const handleJoinGroup = (groupId: string) => {
    console.log(`Joining group ${groupId}`)
    // This would normally call an API endpoint
  }

  return (
    <div className="container mx-auto max-w-6xl py-6 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-6">Explore Groups</h1>

        <div className="flex flex-col gap-4 mb-8 sm:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
            <Input
              placeholder="Search groups..."
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              {CATEGORIES.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array(6)
              .fill(0)
              .map((_, i) => (
                <GroupCardSkeleton key={i} />
              ))}
          </div>
        ) : (
          <>
            {filteredGroups.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <p className="text-lg text-zinc-400 mb-4">
                  No groups found matching your search.
                </p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchQuery("")
                    setSelectedCategory("All Categories")
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filteredGroups.map((group) => (
                  <GroupCard
                    key={group.id}
                    group={group}
                    onJoin={handleJoinGroup}
                  />
                ))}
              </div>
            )}

            <div className="flex items-center justify-center mt-8">
              <Button variant="outline">Load More</Button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

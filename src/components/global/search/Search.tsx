"use client"

import { Input } from "@/components/ui/input"
import { useSearch } from "@/hooks/groups"
import { cn } from "@/lib/utils"
import { SearchIcon } from "lucide-react"

type Props = {
  className?: string
  inputStyle?: string
  placeholder?: string
  searchType: "GROUPS" | "POSTS"
  iconStyle?: string
  glass?: boolean
}

const Search = ({
  searchType,
  className,
  glass,
  iconStyle,
  inputStyle,
  placeholder,
}: Props) => {
  const { query, onSearchQuery } = useSearch(searchType)

  return (
    <div
      className={cn(
        "border-2 flex items-center gap-2 p-2 rounded-md",
        className, // Allowing custom overrides
        glass &&
          "bg-clip-padding backdrop-blur-lg bg-opacity-20 backdrop-filter",
      )}
    >
      <SearchIcon className={cn(iconStyle || "text-gray-500")} />
      <Input
        onChange={onSearchQuery}
        value={query}
        className={cn(
          "bg-transparent border-none outline-none focus:ring-0 focus:outline-none focus-visible:ring-0",
          inputStyle,
        )}
        placeholder={placeholder}
        type="text"
      />
    </div>
  )
}

export default Search

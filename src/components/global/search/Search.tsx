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
        "flex items-center gap-2 w-[200px] h-10  rounded-md",
        className,
        glass &&
          "bg-clip-padding backdrop-blur-lg bg-opacity-20 backdrop-filter overflow-hidden",
      )}
    >
      <p>
        <SearchIcon className={cn(iconStyle || "text-gray-500")} />
      </p>

      {/* Input  change input */}
      <input
        onChange={onSearchQuery}
        value={query}
        className={cn(
          "bg-transparent border-0 focus:outline-none focus-visible:ring-0",
          inputStyle,
        )}
        placeholder={placeholder}
        type="text"
      />
      {/* <Input
        onChange={onSearchQuery}
        value={query}
        className={cn("bg-transparent border-0", inputStyle)}
        placeholder={placeholder}
        type="text"
      /> */}
    </div>
  )
}

export default Search

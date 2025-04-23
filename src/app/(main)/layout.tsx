"use client"

import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"
import { cn } from "@/lib/utils"
import { UserButton } from "@clerk/nextjs"
import {
  Bell,
  Compass,
  Home,
  Menu,
  MessageSquare,
  Plus,
  Search,
  X,
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"

const NAV_ITEMS = [
  {
    label: "Home",
    href: "/home",
    icon: Home,
  },
  {
    label: "Explore",
    href: "/explore",
    icon: Compass,
  },
  {
    label: "Notifications",
    href: "/notifications",
    icon: Bell,
  },
  {
    label: "Messages",
    href: "/messages",
    icon: MessageSquare,
  },
]

export default function NavigationLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  return (
    <div className="flex min-h-screen bg-black">
      {/* Desktop Sidebar */}
      <div className="hidden w-64 border-r border-zinc-800 p-4 md:flex md:flex-col">
        <Link href="/home" className="mb-8 flex items-center gap-2">
          <h1 className="text-2xl font-bold text-white">Grouple</h1>
        </Link>

        <nav className="flex flex-1 flex-col gap-2">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-zinc-800 text-white"
                    : "text-zinc-400 hover:bg-zinc-900 hover:text-white",
                )}
              >
                <Icon size={20} />
                {item.label}
              </Link>
            )
          })}
        </nav>

        <Button variant="default" size="lg" className="mt-auto w-full" asChild>
          <Link href="/group/create">
            <Plus className="mr-2" size={18} />
            Create Group
          </Link>
        </Button>

        <div className="mt-4 flex items-center gap-2">
          <UserButton
            appearance={{
              elements: {
                userButtonAvatarBox: "w-10 h-10",
              },
            }}
          />
          <div className="flex flex-col text-sm">
            <span className="font-medium">My Account</span>
            <Link href="/settings" className="text-zinc-400 hover:text-white">
              Settings
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Header */}
      <div className="flex w-full flex-col md:pl-64">
        <header className="sticky top-0 z-10 border-b border-zinc-800 bg-black p-4 md:hidden">
          <div className="flex items-center justify-between">
            <Link href="/home" className="flex items-center gap-2">
              <h1 className="text-xl font-bold">Grouple</h1>
            </Link>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsSearchOpen(true)}
              >
                <Search size={20} />
              </Button>
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Menu size={20} />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-64 p-0">
                  <div className="flex h-full flex-col p-4">
                    <div className="flex items-center justify-between mb-8">
                      <Link href="/home" className="flex items-center gap-2">
                        <h1 className="text-xl font-bold">Grouple</h1>
                      </Link>
                      <SheetClose asChild>
                        <Button variant="ghost" size="icon">
                          <X size={18} />
                        </Button>
                      </SheetClose>
                    </div>
                    <nav className="flex flex-1 flex-col gap-2">
                      {NAV_ITEMS.map((item) => {
                        const Icon = item.icon
                        const isActive = pathname === item.href

                        return (
                          <SheetClose key={item.href} asChild>
                            <Link
                              href={item.href}
                              className={cn(
                                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                                isActive
                                  ? "bg-zinc-800 text-white"
                                  : "text-zinc-400 hover:bg-zinc-900 hover:text-white",
                              )}
                            >
                              <Icon size={20} />
                              {item.label}
                            </Link>
                          </SheetClose>
                        )
                      })}
                    </nav>
                    <SheetClose asChild>
                      <Button
                        variant="default"
                        size="lg"
                        className="mt-auto w-full"
                        asChild
                      >
                        <Link href="/group/create">
                          <Plus className="mr-2" size={18} />
                          Create Group
                        </Link>
                      </Button>
                    </SheetClose>
                    <div className="mt-4 flex items-center gap-2">
                      <UserButton
                        appearance={{
                          elements: {
                            userButtonAvatarBox: "w-10 h-10",
                          },
                        }}
                      />
                      <div className="flex flex-col text-sm">
                        <span className="font-medium">My Account</span>
                        <SheetClose asChild>
                          <Link
                            href="/settings"
                            className="text-zinc-400 hover:text-white"
                          >
                            Settings
                          </Link>
                        </SheetClose>
                      </div>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </header>

        {/* Search Modal */}
        <Sheet open={isSearchOpen} onOpenChange={setIsSearchOpen}>
          <SheetContent side="top" className="h-80">
            <div className="flex h-full flex-col gap-4 p-4">
              <div className="flex items-center gap-2 border-b border-zinc-800 pb-4">
                <Search size={20} className="text-zinc-400" />
                <input
                  type="text"
                  placeholder="Search groups, posts, and more..."
                  className="w-full bg-transparent text-lg focus:outline-none"
                  autoFocus
                />
                <SheetClose asChild>
                  <Button variant="ghost" size="icon">
                    <X size={18} />
                  </Button>
                </SheetClose>
              </div>
              <div className="overflow-auto">
                {/* Search results would go here */}
                <p className="text-center text-zinc-500">Type to search...</p>
              </div>
            </div>
          </SheetContent>
        </Sheet>

        <main className="flex-1">{children}</main>
      </div>
    </div>
  )
}

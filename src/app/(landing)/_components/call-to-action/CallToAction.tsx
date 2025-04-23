"use client"

import { Button } from "@/components/ui/button"
import { ChevronRight, Globe, ShieldCheck, Users } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function CallToAction() {
  const router = useRouter()
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500">
      <div
        className="absolute inset-0 bg-[url('/noise.svg')] opacity-30 mix-blend-overlay"
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-8">
          <div className="max-w-2xl">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
              Connect with like-minded people in groups
            </h1>
            <p className="mt-6 text-lg leading-8 text-indigo-100">
              Grouple helps you find and build communities around your
              interests, hobbies, and passions. Create or join groups, share
              content, and make meaningful connections.
            </p>
            <div className="mt-10 flex items-center gap-x-6">
              <Button
                size="lg"
                className="bg-white text-indigo-600 hover:bg-indigo-50"
                onClick={() => router.push("/sign-up")}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                Get started
                <ChevronRight
                  className={`ml-2 h-4 w-4 transition-transform duration-300 ${isHovered ? "translate-x-1" : ""}`}
                />
              </Button>
              <Link
                href="/about"
                className="text-sm font-semibold leading-6 text-white hover:text-indigo-100"
              >
                Learn more <span aria-hidden="true">→</span>
              </Link>
            </div>
            <div className="mt-10 flex flex-wrap gap-x-8 gap-y-4 text-sm text-white">
              <div className="flex items-center gap-x-2">
                <Users className="h-5 w-5 text-indigo-200" />
                <span>Join thriving communities</span>
              </div>
              <div className="flex items-center gap-x-2">
                <Globe className="h-5 w-5 text-indigo-200" />
                <span>Connect globally</span>
              </div>
              <div className="flex items-center gap-x-2">
                <ShieldCheck className="h-5 w-5 text-indigo-200" />
                <span>Private or public groups</span>
              </div>
            </div>
          </div>
          <div className="relative hidden lg:block">
            <div className="absolute -left-10 top-1/2 h-[500px] w-[600px] -translate-y-1/2 rounded-3xl bg-white/5 backdrop-blur-lg ring-1 ring-white/10">
              <div className="absolute left-8 top-8 right-8 bottom-8 overflow-hidden rounded-2xl">
                <Image
                  src="/dashboard-snippet.png"
                  alt="Grouple dashboard preview"
                  fill
                  priority
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

"use client"
import {
    onAddCustomDomain,
    onGetAllGroupMembers,
    onGetAllUserMessages,
    onGetDomainConfig,
    onGetExploreGroup,
    onGetGroupInfo,
    onSearchGroups,
    onSendMessage,
    onUpDateGroupSettings,
    onUpdateGroupGallery,
} from "@/actions/groups"
import { upload } from "@/lib/uploadcare"
import { supabaseClient, validateURLString } from "@/lib/utils"
import { onChat } from "@/redux/slices/chats-slices"
import {
    onClearList,
    onInfiniteScroll,
} from "@/redux/slices/infinite-scroll-slice"
import { onOnline } from "@/redux/slices/online-member-slice"
import {
    GroupStateProps,
    onClearSearch,
    onSearch,
} from "@/redux/slices/search-slice"
import { AppDispatch } from "@/redux/store"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { usePathname, useRouter } from "next/navigation"
import { JSONContent } from "novel"
import { useEffect, useLayoutEffect, useRef, useState } from "react"
import { useForm } from "react-hook-form"
import { useDispatch } from "react-redux"
import { toast } from "sonner"
import { v4 } from "uuid"
import { z } from "zod"

export const useGroupChatOnline = (userid: string) => {
    const dispatch: AppDispatch = useDispatch()

    useEffect(() => {
        const channel = supabaseClient.channel("tracking")

        channel
            .on("presence", { event: "sync" }, () => {
                const state: any = channel.presenceState()
                console.log(state)
                for (const user in state) {
                    dispatch(
                        onOnline({
                            members: [{ id: state[user][0].member.userid }],
                        }),
                    )
                }
            })
            .subscribe(async (status) => {
                if (status === "SUBSCRIBED") {
                    await channel.track({
                        member: {
                            userid,
                        },
                    })
                }
            })

        return () => {
            channel.unsubscribe()
        }
    }, [])
}

export const useSearch = (search: "GROUPS" | "POSTS") => {
    const [query, setQuery] = useState<string>("")
    const [debounce, setDebounce] = useState<string>("")

    const dispatch: AppDispatch = useDispatch()

    const onSearchQuery = (e: React.ChangeEvent<HTMLInputElement>) =>
        setQuery(e.target.value)

    useEffect(() => {
        const delayInputTimeoutId = setTimeout(() => {
            setDebounce(query)
        }, 1000)
        return () => clearTimeout(delayInputTimeoutId)
    }, [query, 1000])

    const { refetch, data, isFetched, isFetching } = useQuery({
        queryKey: ["search-data", debounce],
        queryFn: async ({ queryKey }) => {
            if (search === "GROUPS") {
                const groups = await onSearchGroups(search, queryKey[1])
                return groups
            }
        },
        enabled: false,
    })

    if (isFetching)
        dispatch(
            onSearch({
                isSearching: true,
                data: [],
            }),
        )

    if (isFetched)
        dispatch(
            onSearch({
                isSearching: false,
                status: data?.status as number,
                data: data?.groups || [],
                debounce,
            }),
        )

    useEffect(() => {
        if (debounce) refetch()
        if (!debounce) dispatch(onClearSearch())
        return () => {
            debounce
        }
    }, [debounce])

    return { query, onSearchQuery }
}


export const useGroupList = (query: string) => {
    const { data } = useQuery({
        queryKey: [query],
    })

    const dispatch: AppDispatch = useDispatch()

    useLayoutEffect(() => {
        dispatch(onClearList({ data: [] }))
    }, [])

    const { groups, status } = data as {
        groups: GroupStateProps[]
        status: number
    }

    return { groups, status }
}

export const useExploreSlider = (query: string, paginate: number) => {
    const [onLoadSlider, setOnLoadSlider] = useState<boolean>(false)
    const dispatch: AppDispatch = useDispatch()
    const { data, refetch, isFetching, isFetched } = useQuery({
        queryKey: ["fetch-group-slides"],
        queryFn: () => onGetExploreGroup(query, paginate | 0),
        enabled: false,
    })

    if (isFetched && data?.status === 200 && data.groups) {
        dispatch(onInfiniteScroll({ data: data.groups }))
    }

    useEffect(() => {
        setOnLoadSlider(true)
        return () => {
            onLoadSlider
        }
    }, [])

    return { refetch, isFetching, data, onLoadSlider }
}

export const useGroupInfo = () => {
    const { data } = useQuery({
        queryKey: ["about-group-info"],
    })

    const router = useRouter()

    if (!data) router.push("/explore")

    const { group, status } = data as { status: number; group: GroupStateProps }

    if (status !== 200) router.push("/explore")

    return {
        group,
    }
}


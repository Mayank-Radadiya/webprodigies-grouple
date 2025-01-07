"use server"

import { client } from "@/lib/prisma"
import { currentUser } from "@clerk/nextjs/server"

export const onAuthenticatedUser = async () => {
    try {
        const clerk = await currentUser()

        if (!clerk) {
            console.error("No Clerk user found")
            return { status: 404, message: "User not authenticated" }
        }

        // Try finding the user in the database
        let user = await client.user.findUnique({
            where: {
                clerkId: clerk.id,
            },
            select: {
                id: true,
                firstname: true,
                lastname: true,
            },
        })

        // If user not found, create a new user
        if (!user) {
            console.log(
                `User not found for Clerk ID: ${clerk.id}, creating a new user...`,
            )
            user = await client.user.create({
                data: {
                    clerkId: clerk.id,
                    firstname: clerk.firstName || "Unknown",
                    lastname: clerk.lastName || "Unknown",
                    image: clerk.imageUrl || "", // Optional: Add image if required
                },
            })
        }

        return {
            status: 200,
            id: user.id,
            image: clerk.imageUrl,
            username: `${user.firstname} ${user.lastname}`,
        }
    } catch (error) {
        console.error("Error in onAuthenticatedUser:", error)
        return {
            status: 400,
            message: "An error occurred during authentication",
        }
    }
}


export const onSignUpUser = async (data: {
    firstname: string
    lastname: string
    image: string
    clerkId: string
}) => {
    try {
        const createdUser = await client.user.create({
            data: {
                ...data,
            },
        })

        if (createdUser) {
            return {
                status: 200,
                message: "User successfully created",
                id: createdUser.id,
            }
        }

        return {
            status: 400,
            message: "User could not be created! Try again",
        }
    } catch (error) {
        console.error("Error in onSignUpUser:", error)
        return {
            status: 400,
            message: "Oops! something went wrong. Try again",
        }
    }
}

export const onSignInUser = async (clerkId: string) => {
    try {
        const loggedInUser = await client.user.findUnique({
            where: {
                clerkId,
            },
            select: {
                id: true,
                group: {
                    select: {
                        id: true,
                        channel: {
                            select: {
                                id: true,
                            },
                            take: 1,
                            orderBy: {
                                createdAt: "asc",
                            },
                        },
                    },
                },
            },
        })

        if (loggedInUser) {
            if (loggedInUser.group.length > 0) {
                return {
                    status: 207,
                    id: loggedInUser.id,
                    groupId: loggedInUser.group[0].id,
                    channelId: loggedInUser.group[0].channel[0].id,
                }
            }
            return {
                status: 200,
                message: "User successfully logged in",
                id: loggedInUser.id,
            }
        }
        console.error(`User not found for Clerk ID: ${clerkId}`)
        return {
            status: 400,
            message: "User could not be logged in! Try again",
        }


    } catch (error) {
        console.error("Error in onSignInUser:", error)
        return {
            status: 400,
            message: "An error occurred during login",
        }
    }
}

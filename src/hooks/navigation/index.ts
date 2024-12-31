import { usePathname } from "next/navigation"
import { useState } from "react"

// Custom hook to manage navigation state.
export const useNavigation = () => {
    const pathName = usePathname() // Get the current URL path from Next.js.

    // Initialize the `section` state with the current path name.
    const [section, setSection] = useState<string>(pathName)

    // Function to update the `section` state with a new value.
    const onSetSection = (page: string) => setSection(page)

    // Return the current section and the function to update it.
    return {
        section, // Current navigation section.
        onSetSection, // Function to update the section.
    }
}

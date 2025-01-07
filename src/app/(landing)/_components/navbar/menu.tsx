"use client"
import { Card, CardContent } from "@/components/ui/card"
import { GROUPLE_CONSTANTS } from "@/constants"
import { useNavigation } from "@/hooks/navigation"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { FC } from "react"

type MenuProps = {
  orientation: "desktop" | "mobile"
}

const Menu: FC<MenuProps> = ({ orientation }) => {
  const { section, onSetSection } = useNavigation()

  const renderMenuItems = () =>
    GROUPLE_CONSTANTS.landingPageMenu.map((menu) => (
      <Link
        href={menu.path}
        key={menu.id}
        {...(menu.section && {
          onClick: () => onSetSection(menu.path),
        })}
        // onClick={() => onSetSection(menu.path)}
        className={cn(
          "rounded-xl flex gap-2 py-2 px-4 items-center",
          section === menu.path ? "bg-[#09090B] border-[#27272A]" : "",
        )}
      >
        {section === menu.path && menu.icon}
        {menu.label}
      </Link>
    ))

  switch (orientation) {
    case "desktop":
      return (
        <Card className="bg-themeGray border-themeGray bg-clip-padding backdrop--blur__safari backdrop-filter backdrop-blur-2xl bg-opacity-60 p-1 lg:flex hidden rounded-xl">
          <CardContent className="p-0 flex gap-2">
            {renderMenuItems()}
          </CardContent>
        </Card>
      )
    case "mobile":
      return <div className="flex flex-col mt-10">{renderMenuItems()}</div>
    default:
      return null
  }
}

export default Menu

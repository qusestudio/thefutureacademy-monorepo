"use client"

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
} from "@workspace/ui/components/sidebar"
import { HugeiconsIcon } from "@hugeicons/react"
import { Home01Icon } from "@hugeicons/core-free-icons"
import { usePathname, useRouter } from "next/navigation"
import Link from "next/link"
import React from "react"

export function NavMain({
  items,
}: {
  items: {
    title: string
    url: string
    icon?: React.ReactNode
  }[]
}) {
  const router = useRouter()
  const pathname = usePathname()
  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2 font-chillax text-lg">
        <SidebarMenu>
          <SidebarMenuItem className="flex items-center gap-2 pb-5">
            <Link
              href={"/"}
              className="flex gap-x-2 rounded-full border-2 border-foreground bg-[#ffbb00]/60 p-2 group-data-[collapsible=icon]:opacity-0 dark:border-[#ffbb00] dark:bg-transparent dark:text-[#ffbb00]"
            >
              <HugeiconsIcon icon={Home01Icon} strokeWidth={2} /> Home
              <span className="sr-only">Home</span>
            </Link>
          </SidebarMenuItem>
        </SidebarMenu>
        <SidebarMenu className="gap-y-2">
          {items.map((item) => {
            const isActive = pathname === item.url
            return (
              <SidebarMenuItem
                className={`${isActive ? "border-2 border-foreground bg-[#ffbb00]/60 dark:border-[#ffbb00] dark:bg-transparent dark:text-[#ffbb00]" : "border-transparent"} flex items-center rounded-lg border-2 text-sm`}
                key={item.title}
              >
                <button
                  className="flex cursor-pointer items-center gap-x-2 px-4 py-2 text-lg"
                  onClick={() => router.push(item.url)}
                >
                  {item.icon}
                  <span>{item.title}</span>
                </button>
              </SidebarMenuItem>
            )
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}

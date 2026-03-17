"use client"

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
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
              className="flex gap-x-2 rounded-full border border-white p-2 group-data-[collapsible=icon]:opacity-0"
            >
              <HugeiconsIcon icon={Home01Icon} strokeWidth={2} /> Home
              <span className="sr-only">Home</span>
            </Link>
          </SidebarMenuItem>
        </SidebarMenu>
        <SidebarMenu className="">
          {items.map((item) => {
            const isActive = pathname === item.url
            return (
              <SidebarMenuItem
                className={`${isActive ? "border" : ""} border-foreground`}
                key={item.title}
              >
                <SidebarMenuButton
                  className="cursor-pointer"
                  tooltip={item.title}
                  onClick={() => router.push(item.url)}
                >
                  {item.icon}
                  <span>{item.title}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            )
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}

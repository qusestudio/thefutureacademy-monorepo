"use client"

import * as React from "react"

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@workspace/ui/components/sidebar"
import Link from "next/link"
import { HugeiconsIcon } from "@hugeicons/react"
import LogoutDialog from "@/components/logout-dialog"
import { Logout01Icon } from "@hugeicons/core-free-icons"

export function NavSecondary({
  items,
  ...props
}: {
  items: {
    title: string
    url: string
    icon: React.ReactNode
  }[]
} & React.ComponentPropsWithoutRef<typeof SidebarGroup>) {
  return (
    <SidebarGroup {...props}>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <Link
                className="flex items-center gap-x-2 p-4 text-lg hover:bg-sidebar-accent"
                href={item.url}
              >
                {item.icon}
                <span>{item.title}</span>
              </Link>
            </SidebarMenuItem>
          ))}
          <SidebarMenuItem className="flex cursor-pointer text-lg hover:bg-accent">
            <LogoutDialog />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}

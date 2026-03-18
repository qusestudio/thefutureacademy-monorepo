"use client"

import * as React from "react"

import { NavMain } from "@/components/nav-main"
import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@workspace/ui/components/sidebar"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  Settings05Icon,
  HelpCircleIcon,
  SearchIcon,
  Book02Icon,
  DashboardSquare02Icon,
  Logout01Icon,
} from "@hugeicons/core-free-icons"
import LogoutDialog from "@/components/logout-dialog"

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: (
        <HugeiconsIcon size={25} icon={DashboardSquare02Icon} strokeWidth={2} />
      ),
    },
    {
      title: "My Learning",
      url: "/dashboard/mylearning",
      icon: <HugeiconsIcon size={25} icon={Book02Icon} strokeWidth={2} />,
    },
  ],
  navSecondary: [
    {
      title: "Settings",
      url: "/dashboard/settings",
      icon: <HugeiconsIcon size={25} icon={Settings05Icon} strokeWidth={2} />,
    },
    {
      title: "Get Help",
      url: "/help",
      icon: <HugeiconsIcon size={25} icon={HelpCircleIcon} strokeWidth={2} />,
    },
  ],
}
export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              className="mb-10 bg-transparent data-[slot=sidebar-menu-button]:p-1.5!"
              render={<a href="/" />}
            >
              <span className="font-chillax text-xl tracking-wide uppercase">
                Learning Space
              </span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent className="font-chillax">
        <NavMain items={data.navMain} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}

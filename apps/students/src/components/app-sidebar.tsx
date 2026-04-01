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
  Book03Icon,
  LibraryIcon,
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
    {
      title: "Available Subjects",
      url: "/dashboard/available-subjects",
      icon: <HugeiconsIcon size={25} icon={LibraryIcon} strokeWidth={2} />,
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
    <Sidebar className={"bg-background "} collapsible="offcanvas" {...props}>
      <SidebarHeader className="bg-background hover:bg-background">
        <SidebarMenu className="bg-background hover:bg-background">
          <SidebarMenuItem className="hover:bg-background">
            <SidebarMenuButton
              className="mb-10 bg-background hover:bg-background data-[slot=sidebar-menu-button]:p-1.5!"
              render={<a href="/" />}
            >
              <span className="font-chillax text-xl leading-6 font-bold tracking-wider uppercase hover:bg-none">
                the future
                <br />
                learning space
              </span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent className="bg-background font-chillax">
        <NavMain items={data.navMain} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
    </Sidebar>
  )
}

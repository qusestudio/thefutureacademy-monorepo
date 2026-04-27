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
  Table01Icon,
  DeskIcon,
  Clock03Icon,
  User03Icon,
} from "@hugeicons/core-free-icons"

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
        <HugeiconsIcon size={20} icon={DashboardSquare02Icon} strokeWidth={2} />
      ),
    },
    {
      title: "Course List",
      url: "/dashboard/course-list",
      icon: <HugeiconsIcon size={20} icon={Book02Icon} strokeWidth={2} />,
    },
    {
      title: "Allocations",
      url: "/dashboard/allocations",
      icon: <HugeiconsIcon size={20} icon={Clock03Icon} strokeWidth={2} />,
    },
    {
      title: "Students",
      url: "/dashboard/students",
      icon: <HugeiconsIcon size={20} icon={User03Icon} strokeWidth={2} />,
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
    {
      title: "Search",
      url: "#",
      icon: <HugeiconsIcon size={25} icon={SearchIcon} strokeWidth={2} />,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar className={"dark:bg-[#050505]"} collapsible="offcanvas" {...props}>
      <SidebarHeader className="dark:bg-[#050505] hover:dark:bg-[#050505]">
        <SidebarMenu className="dark:bg-[#050505] hover:dark:bg-[#050505]">
          <SidebarMenuItem className="hover:dark:bg-[#050505]">
            <SidebarMenuButton
              className="mb-10 data-[slot=sidebar-menu-button]:p-1.5! dark:bg-[#050505] hover:dark:bg-[#050505]"
              render={<a href="/" />}
            >
              <span className="font-chillax text-xl leading-6 font-bold tracking-wider uppercase hover:bg-none">
                the
                <br />
                studio
              </span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent className="font-chillax dark:bg-[#050505]">
        <NavMain items={data.navMain} />
      </SidebarContent>
    </Sidebar>
  )
}

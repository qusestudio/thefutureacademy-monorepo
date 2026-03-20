import * as React from "react"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
} from "@workspace/ui/components/sidebar"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  ArrowLeftIcon,
  Book02Icon,
  DashboardSquare02Icon,
  HelpCircleIcon,
  Settings05Icon,
} from "@hugeicons/core-free-icons"
import { CollapsibleTopic, CollapsibleTopicItem } from "@/components/preview/collapsible-content"
import Link from "next/link"

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

export function TopicsSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar
      className="flex flex-col gap-y-10 bg-background"
      collapsible="offcanvas"
      {...props}
    >
      <SidebarHeader className="bg-background p-3">
        <SidebarMenu className="space-y-10">
          <SidebarMenuItem className="text-xs font-medium uppercase">
            The Future Academy
          </SidebarMenuItem>

          <SidebarMenuItem className="">
            <Link href={"/dashboard/mylearning"} className={"flex items-center gap-x-3"}>
              <HugeiconsIcon size={20} icon={ArrowLeftIcon} />
              <p className="text-xs">Back to courses</p>
            </Link>
          </SidebarMenuItem>

          <SidebarMenuItem className="flex flex-col gap-x-3">
            <p className="text-xs font-medium text-muted-foreground">Course</p>
            <p className="font-medium">Mathematics</p>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent className="bg-background p-3 py-7 font-chillax">
        <CollapsibleTopicItem />
      </SidebarContent>
    </Sidebar>
  )
}
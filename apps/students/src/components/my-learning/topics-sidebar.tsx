"use client"

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
import { useGetTopicsBySubjectQuery } from "@/state/api"

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

export function TopicsSidebar({ subjectId, ...props }: React.ComponentProps<typeof Sidebar> & {subjectId: string}) {
  const {data: topics, isLoading: topicsLoading} = useGetTopicsBySubjectQuery(subjectId, {skip: !subjectId})
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
            <Link
              href={"/dashboard/mylearning"}
              className={"flex items-center gap-x-3"}
            >
              <div className="rounded-sm border-2 border-foreground bg-[#ffbb00]/60 p-2 dark:border-[#ffbb00] dark:bg-transparent dark:text-[#ffbb00]">
                <HugeiconsIcon size={20} icon={ArrowLeftIcon} />
              </div>
              <p className="text-xs">Back to courses</p>
            </Link>
          </SidebarMenuItem>
          <SidebarMenuItem className="rounded-lg border-2 border-foreground bg-[#ffbb00]/60 p-2 dark:border-[#ffbb00] dark:bg-transparent dark:text-[#ffbb00]">
            <p className="text-xs font-medium text-muted-foreground">Course</p>
            <p className="font-medium text-xl">Mathematics</p>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent className="gap-y-2 bg-background p-3 py-7 font-chillax">
        {topicsLoading ? (
          <p>Loading...</p>
        ) : (
          topics?.map((topic, index) => (
            <CollapsibleTopicItem
              subjectId={subjectId}
              title={topic.title}
              topicId={topic?.id}
              key={index}
            />
          ))
        )}
      </SidebarContent>
    </Sidebar>
  )
}
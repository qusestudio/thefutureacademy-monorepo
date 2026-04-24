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
  ArrowLeft02Icon,
  ArrowLeftIcon,
  Book02Icon,
  DashboardSquare02Icon,
  HelpCircleIcon,
  Menu02Icon,
  MenuTwoLineIcon,
  Settings05Icon,
} from "@hugeicons/core-free-icons"
import {
  CollapsibleTopic,
  CollapsibleTopicItem,
} from "@/components/preview/collapsible-content"
import Link from "next/link"
import { useGetSubjectQuery, useGetTopicsBySubjectQuery } from "@/state/api"
import { Skeleton } from "@workspace/ui/components/skeleton"

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

export function TopicsSidebar({
  subjectId,
  ...props
}: React.ComponentProps<typeof Sidebar> & { subjectId: string }) {
  const { data: topics, isLoading: topicsLoading } = useGetTopicsBySubjectQuery(
    subjectId,
    { skip: !subjectId }
  )
  return (
    <Sidebar
      className="flex w-(--sidebar-width) flex-col bg-background gap-y-10"
      collapsible="offcanvas"
      {...props}
    >
      <SidebarHeader className="bg-background py-1 px-3">
        <SidebarMenu className="space-y-5">
          <SidebarMenuItem className="text-sm flex font-semibold uppercase">
            <HugeiconsIcon size={50} icon={MenuTwoLineIcon} />
          </SidebarMenuItem>

          <SidebarMenuItem className="">
            <Link
              href={"/dashboard/mylearning"}
              className={"flex items-center gap-x-3"}
            >
              <div className="rounded-full border-2 border-foreground  p-2 dark:bg-transparent ">
                <HugeiconsIcon size={20} icon={ArrowLeft02Icon} />
              </div>
              <p className="text-sm font-medium">Back to courses</p>
            </Link>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent className="gap-y-2 bg-background p-3 py-7 font-chillax">
        {topicsLoading ?
            Array.from({length: 5}, (_, index) => {
              return <Skeleton key={index} className="h-10 w-full rounded-lg" />
            })

            : (
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

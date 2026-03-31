"use client"

import * as React from "react"

import { NavMain } from "@/components/nav-main"
import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
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
  Home01Icon,
  ArrowLeftIcon,
  PieChart02Icon,
  ArrowDownIcon,
} from "@hugeicons/core-free-icons"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useGetAllSubjectsQuery, useGetTopicsBySubjectQuery } from "@/state/api"
import { IconlyGraph } from "@workspace/ui/components/iconly-icons"
import { Separator } from "@workspace/ui/components/separator"

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
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

type TopicSidebarProps = React.ComponentProps<typeof Sidebar>

export function ContentSidebar({ ...props }: TopicSidebarProps) {
  const router = useRouter()
  const pathname = usePathname()
  const { data: subjects, isLoading } = useGetAllSubjectsQuery()

  return (
    <Sidebar collapsible="offcanvas" {...props} className={"bg-background"}>
      <SidebarHeader className="bg-background">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              className="mb-10 data-[slot=sidebar-menu-button]:p-1.5!"
              render={<a href="/" />}
            >
              <span className="font-chillax text-xl leading-6 font-bold tracking-wider uppercase">
                the
                <br />
                studio
              </span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent className="bg-background font-chillax">
        <SidebarGroup className="">
          <SidebarGroupContent className="flex flex-col gap-2 font-chillax text-lg">
            <SidebarMenu>
              <SidebarMenuItem className="flex items-center gap-2 pb-5">
                <button
                  onClick={() => {
                    router.push("/dashboard/course-list")
                  }}
                  className="flex cursor-pointer items-center gap-x-4 text-sm"
                >
                  <div className="rounded-sm border-2 border-foreground bg-[#ffbb00]/60 p-1 dark:border-[#FFBB00] dark:bg-transparent">
                    <HugeiconsIcon icon={ArrowLeftIcon} />
                  </div>{" "}
                  <p className="underline">Back to course list</p>
                </button>
              </SidebarMenuItem>
            </SidebarMenu>
            <SidebarMenu className=""></SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <div className="flex gap-x-2 w-full text-foreground/90 justify-center gap-y-3 px-1 py-4 ">
          <div className="flex cursor-pointer items-center bg-accent gap-x-2 self-start rounded-full  p-1 px-2 text-xs tracking-wider">
            <HugeiconsIcon size={15} icon={PieChart02Icon} /> Term 1{" "}
            <HugeiconsIcon size={15} strokeWidth={2} icon={ArrowDownIcon} />
          </div>
          <div className="flex cursor-pointer items-center bg-accent gap-x-2 self-start rounded-full p-1 px-2 text-xs tracking-wider">
            <HugeiconsIcon size={15} icon={PieChart02Icon} /> Grade 12{" "}
            <HugeiconsIcon size={15} strokeWidth={2} icon={ArrowDownIcon} />
          </div>
        </div>
        <Separator />
        <div className="flex flex-col pt-5 gap-y-2 px-1">
          {subjects?.map((subject, i) => {
            const activeLink = pathname == `/content/${subject.id}`
            return (
              <Link
                href={`/content/${subject.id}`}
                className={` ${activeLink ? "border-foreground bg-[#ffbb00]/60 p-2 dark:border-[#FFBB00] dark:bg-transparent dark:text-[#FFBB00]" : "border-foreground hover:bg-[#ffbb00]/60 dark:hover:bg-[#ffbb00]/20"} flex w-full items-center gap-x-2 rounded-lg border-2 p-3 text-sm font-medium tracking-wider transition-all duration-200`}
                key={i}
              >
                {subject.title}
              </Link>
            )
          })}
        </div>
      </SidebarContent>
      {/*<SidebarFooter className="bg-primary/10">*/}
      {/*  <NavUser user={data.user} />*/}
      {/*</SidebarFooter>*/}
    </Sidebar>
  )
}

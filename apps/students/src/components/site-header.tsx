"use client"
import { Separator } from "@workspace/ui/components/separator"
import { SidebarTrigger } from "@workspace/ui/components/sidebar"
import * as React from "react"
import { useGetSubjectQuery } from "@/state/api"
import { Skeleton } from "@workspace/ui/components/skeleton"

export function SiteHeader( {subjectId} : {subjectId?: string}) {
  const {data, isLoading} = useGetSubjectQuery(subjectId ?? "", {skip: !subjectId});
  return (
    <header className="grid h-(--header-height) shrink-0 grid-cols-3 items-center gap-2  font-chillax transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 h-4 data-vertical:self-auto"
        />
        {
          isLoading ? <Skeleton className={"h-7 w-full bg-accent rounded-sm"} /> : <p className="text-lg font-semibold">{data?.title}</p>
        }
      </div>
    </header>
  )
}

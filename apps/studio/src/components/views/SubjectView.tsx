"use client"

import React from "react"
import { useGetSubjectQuery, useGetTopicsBySubjectQuery } from "@/state/api"
import { Skeleton } from "@workspace/ui/components/skeleton"
import { Button } from "@workspace/ui/components/button"
import { Separator } from "@workspace/ui/components/separator"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  ArrowDownIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
} from "@hugeicons/core-free-icons"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@workspace/ui/components/resizable"
import { CollapsibleTopicItem } from "@/components/collapsible-topic"

const SubjectView = ({ subjectId }: { subjectId: string }) => {

  const router = useRouter();
  const pathname = usePathname();

  const { data: subjectData, isLoading: subjectLoading } =
    useGetSubjectQuery(subjectId)
  const { data: topics, isLoading: topicsLoading } =
    useGetTopicsBySubjectQuery(subjectId)



  return (
    <main className="flex w-full flex-col gap-y-5 p-5 max-md:p-2">
      <section className="flex flex-col gap-x-2 gap-y-5 rounded-sm bg-primary/10 p-3">
        <div className="flex flex-col text-4xl">
          {subjectLoading ? (
            <div className="space-y-2">
              <Skeleton className="h-10 w-1/9 rounded bg-background" />
              <Skeleton className="h-6 w-1/15 rounded bg-background" />
            </div>
          ) : (
            <p className="flex flex-col font-medium">
              {subjectData?.title}
              <span className="text-lg font-medium text-muted-foreground uppercase">
                {subjectData?.id}
              </span>
            </p>
          )}
        </div>
      </section>
      <Separator />
      <ResizablePanelGroup
        orientation="horizontal"
        className="min-h-50 w-full rounded-lg border"
      >
        <ResizablePanel defaultSize="35%">
          <section className="flex flex-col">
            <article className="flex w-full bg-primary/10 flex-col gap-x-2 p-3 font-semibold">
              Topics
            </article>
            {topics?.length == 0 && (
              <div className="flex flex-col items-center p-3 tracking-wide text-muted-foreground">
                no topics available yet.
              </div>
            )}
            {topicsLoading &&
              Array.from({ length: 5 }).map((_, i) => (
                <Skeleton
                  key={i}
                  className={` ${i%2===0? "bg-primary/10": "bg-background"} h-10  w-full`}
                />
              ))}
            {topics?.map((item, i) => {
              return (
                <CollapsibleTopicItem key={i} index={i} topic={item} />
              )
              // return (
              //   <div
              //     className="flex w-full cursor-pointer items-center justify-between gap-x-5 border-b p-2 font-chillax text-xs font-medium tracking-widest hover:bg-primary/10"
              //     key={i}
              //   >
              //     <div className="flex items-center gap-x-2">
              //       <Button
              //         size={"icon"}
              //         variant={"outline"}
              //         className="rounded-full border-none border-white"
              //       >
              //         {i + 1}
              //       </Button>
              //       <p>{item.title}</p>
              //     </div>
              //     <Link href={`${pathname}/${item.id}`}>
              //       <HugeiconsIcon icon={ArrowDownIcon} />
              //     </Link>
              //   </div>
              // )
            })}
          </section>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize="65%">
          <div className="flex h-full items-center justify-center p-6">
            <span className="font-semibold">Content</span>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </main>
  )
}

export default SubjectView

"use client"
import {  CardContent } from "@workspace/ui/components/card"
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent
} from "@workspace/ui/components/collapsible"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  ArrowDown,
  ArrowUp,
  ArrowUp01,
  Cancel01Icon,
  Close,
  PlayIcon,
  PlusSignIcon,
} from "@hugeicons/core-free-icons"
import { useState } from "react"
import { Button } from "@workspace/ui/components/button"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Topic } from "@/types/models"
import { useGetLessonsQuery } from "@/state/api"
import { Skeleton } from "@workspace/ui/components/skeleton"
import * as React from "react"

interface Props {
  title: string
  description: string
}

export function CollapsibleTopic({ title, description }: Props) {
  const [open, setOpen] = useState(false)
  return (
    <div className="mx-auto w-full border-none bg-transparent">
      <CardContent className="border-none">
        <Collapsible className="w-full space-y-4 rounded-md border-none data-[state=open]:bg-muted">
          <CollapsibleTrigger
            onClick={() => setOpen(!open)}
            className="flex w-full"
          >
            <span className="group flex w-full text-left items-center justify-between max-md:text-lg text-xl font-normal uppercase">
              {title}
              <HugeiconsIcon
                icon={open ? Cancel01Icon : PlusSignIcon}
                size={25}
                className="ml-auto group-data-[state=open]:rotate-45"
              />
            </span>
          </CollapsibleTrigger>
          <CollapsibleContent className="flex flex-col items-start gap-2 border-none text-sm text-muted-foreground">
            <div className="text-sm leading-6 font-medium">{description}</div>
          </CollapsibleContent>
        </Collapsible>
      </CardContent>
    </div>
  )
}

interface itemProps {
  title: string
  topicId: string
  subjectId: string
}

export function CollapsibleTopicItem({ title, topicId, subjectId }: itemProps) {
  const [open, setOpen] = useState(false)
  const { data: lessons, isLoading: lessonsLoading } = useGetLessonsQuery(topicId, {
    skip: !open,
  })
  const pathname = usePathname()
  return (
    <div className="mx-auto w-full cursor-pointer border-none bg-transparent">
      <CardContent className="cursor-pointer border-none px-0">
        <Collapsible
          open={open}
          className={`flex h-full w-full flex-col space-y-2 rounded-lg border-2 border-foreground py-2 font-medium data-[state=open]:bg-muted`}
        >
          <CollapsibleTrigger
            onClick={() => setOpen(!open)}
            className="flex w-full items-center justify-between gap-2 px-4 text-[20px]"
          >
            <span
              className={`group flex w-full items-center justify-between gap-2 transition-all duration-200`}
            >
              <span className="min-w-0 flex-1 truncate text-left">{title}</span>

              <HugeiconsIcon
                icon={open ? ArrowUp : ArrowDown}
                size={25}
                className="shrink-0 group-data-[state=open]:rotate-45"
              />
            </span>
          </CollapsibleTrigger>
          <CollapsibleContent className="flex w-full flex-col items-start gap-2 border-none pb-2 text-muted-foreground">
            {
              !lessonsLoading && lessons?.length == 0 && (
                <div className="flex w-full items-center bg-accent py-4 justify-center gap-2">
                  <span className="text-sm">No lessons yet</span>
                </div>
              )
            }
            {lessonsLoading
              ? Array.from({ length: 5 }, (_, index) => {
                  return (
                    <div key={index} className="px-2 w-full">
                      <Skeleton className="h-8 w-full bg-accent rounded-lg" />
                    </div>
                  )
                })
              : lessons?.map((lesson, idx) => (
                  <Link
                    key={idx}
                    href={`/my-learning/${subjectId}/${lesson.id}`}
                    className={`flex justify-between px-15 text-[18px] ${pathname == `/my-learning/${subjectId}/${lesson.id}` ? "border-foreground bg-[#ffbb00]/60 dark:bg-[#ffbb00] dark:text-black" : "border-foreground"} w-full items-center gap-x-5 dark:border-none border-y-2 py-1 font-normal text-foreground`}
                  >
                    <span>
                      {idx + 1}.{"  "}
                      <span className="underline">{lesson?.title}</span>
                    </span>
                    <HugeiconsIcon
                      className="fill-black"
                      size={20}
                      icon={PlayIcon}
                    />
                  </Link>
                ))}
          </CollapsibleContent>
        </Collapsible>
      </CardContent>
    </div>
  )
}

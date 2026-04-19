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
          className={`w-full space-y-2 pb-2 rounded-md border-foreground font-medium border-2 data-[state=open]:bg-muted`}
        >
          <CollapsibleTrigger
            onClick={() => setOpen(!open)}
            className="flex w-full p-2 min-w-0 justify-self-start"
          >
            <span
              className={`group flex w-full min-w-0 items-center justify-between gap-2 text-sm transition-all duration-200`}
            >
              <span className="min-w-0 flex-1 truncate">{title}</span>

              <HugeiconsIcon
                icon={open ? ArrowUp : ArrowDown}
                size={25}
                className="shrink-0 group-data-[state=open]:rotate-45"
              />
            </span>
          </CollapsibleTrigger>
          <CollapsibleContent className="flex flex-col items-start gap-2 border-none text-sm text-muted-foreground">
            {lessonsLoading ? (
              <>Loading...</>
            ) : (
              lessons?.map((lesson, idx) => (
                <Link
                  key={idx}
                  href={`/my-learning/${subjectId}/${lesson.id}`}
                  className={`flex ${pathname == `/my-learning/${subjectId}/${lesson.id}` ? "dark:text-[#ffbb00] border-foreground dark:bg-transparent bg-[#ffbb00]/60 dark:border-[#ffbb00]" : "border-foreground"} w-full border-y-2 py-1 text-foreground items-center gap-x-5 text-sm font-medium`}
                >
                  <HugeiconsIcon icon={PlayIcon} />
                  {lesson?.title}
                </Link>
              ))
            )}
          </CollapsibleContent>
        </Collapsible>
      </CardContent>
    </div>
  )
}

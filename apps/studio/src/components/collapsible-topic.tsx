import { useState } from "react"
import { usePathname } from "next/navigation"
import { CardContent } from "@workspace/ui/components/card"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@workspace/ui/components/collapsible"
import { HugeiconsIcon } from "@hugeicons/react"
import { ArrowDown, ArrowUp, PlayIcon, Plus } from "@hugeicons/core-free-icons"
import Link from "next/link"
import { Button } from "@workspace/ui/components/button"
import { Topic } from "@/types/models"
import { useGetLessonsQuery } from "@/state/api"
import { Skeleton } from "@workspace/ui/components/skeleton"
import { Separator } from "@workspace/ui/components/separator"

interface Props {
  index: number
  topic: Topic
  onCreateLesson?: (topic: Topic) => void
}

export function CollapsibleTopicItem({ index, topic , onCreateLesson}: Props) {
  const [open, setOpen] = useState(false)
  const {data: lessons, isLoading} = useGetLessonsQuery(topic.id, {skip: !open});

  const pathname = usePathname()
  return (
    <div className="mx-auto w-full cursor-pointer border-none bg-transparent">
      <CardContent className="cursor-pointer border-none px-0">
        <Collapsible
          open={open}
          onOpenChange={setOpen}
          className="w-full space-y-2 rounded-md border-none data-[state=open]:bg-muted"
        >
          <CollapsibleTrigger className="flex w-full hover:bg-[#ffbb00]/10">
            <div className="flex w-full items-center gap-x-4 border-b p-3">
              <p className="flex h-8.5 w-10 items-center justify-center rounded-full bg-[#ffbb00]/60 text-sm font-medium dark:border-2 dark:border-[#ffbb00]/70 dark:bg-transparent">
                {index + 1}
              </p>
              <span
                className={`group flex w-full cursor-pointer justify-between text-sm font-medium transition-all duration-200`}
              >
                {/* Topic title */}
                {topic.title}
              </span>
              <HugeiconsIcon
                icon={open ? ArrowUp : ArrowDown}
                size={25}
                className="ml-auto self-end group-data-[state=open]:rotate-45"
              />
            </div>
          </CollapsibleTrigger>
          <CollapsibleContent className="flex flex-col items-start gap-2 gap-y-3 border-b py-5 text-sm text-muted-foreground">
            <div className="flex w-full flex-col items-center justify-center gap-y-2">
              <Button
                size={"icon"}
                variant={"ghost"}
                className="rounded-sm border-2 border-foreground/50"
                aria-label={`Add lesson to ${topic.title}`}
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  onCreateLesson?.(topic)
                }}
              >
                <HugeiconsIcon className="text-foreground" icon={Plus} />
              </Button>
              <p className="text-xs">Add lesson</p>
            </div>

            {isLoading && <Skeleton className="h-5 w-full rounded" />}

            {lessons?.length == 0 && (
              <p className="flex w-full justify-center">
                No lessons added for this topic
              </p>
            )}
            {lessons?.map((lesson, idx) => (
              <Link
                key={lesson.id}
                href="#"
                className="flex w-full items-center gap-x-3 pl-15 text-sm py-2 font-medium text-foreground hover:bg-[#ffbb00]/65 dark:hover:bg-transparent dark:hover:text-[#ffbb00]"
              >
                <HugeiconsIcon strokeWidth={2} icon={PlayIcon} />
                {lesson.title}
              </Link>
            ))}
          </CollapsibleContent>
        </Collapsible>
      </CardContent>
    </div>
  )
}

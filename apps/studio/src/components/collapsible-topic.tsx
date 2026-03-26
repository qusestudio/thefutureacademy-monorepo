import { useState } from "react"
import { usePathname } from "next/navigation"
import { CardContent } from "@workspace/ui/components/card"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@workspace/ui/components/collapsible"
import { HugeiconsIcon } from "@hugeicons/react"
import { ArrowDown, ArrowUp, Plus } from "@hugeicons/core-free-icons"
import Link from "next/link"
import { Button } from "@workspace/ui/components/button"
import { Topic } from "@/types/models"
import { useGetLessonsQuery } from "@/state/api"

interface Props {
  index: number
  topic: Topic
}

export function CollapsibleTopicItem({ index, topic }: Props) {
  const {data: lessons, isLoading} = useGetLessonsQuery(topic.id);
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  return (
    <div className="mx-auto w-full cursor-pointer border-none bg-transparent">
      <CardContent className="cursor-pointer border-none px-0">
        <Collapsible className="w-full space-y-2 rounded-md border-none data-[state=open]:bg-muted">
          <CollapsibleTrigger
            onClick={() => setOpen(!open)}
            className="flex w-full hover:bg-primary/10"
          >
            <div className="flex w-full items-center gap-x-2 border-b p-3">
              <p className="flex h-10 w-10 items-center justify-center rounded-full border-none border-white bg-accent/20">
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
          <CollapsibleContent className="flex flex-col items-start gap-2 py-5 gap-y-5 border-none pl-5 text-sm text-muted-foreground">
            <div className="flex w-full justify-center">
              <Button size={"icon"} variant={"outline"} className="rounded">
                <HugeiconsIcon icon={Plus} />
              </Button>
            </div>

            {lessons?.length == 0 && (
              <p className="flex w-full justify-center">
                No lessons added for this topic
              </p>
            )}
            {lessons?.map((lesson, index) => (
              <Link
                href="/my-learning/mth1001/introduction"
                className={`flex ${pathname == "/my-learning/mth1001/introduction" ? "text-primary" : ""} items-center gap-x-5 text-sm font-medium`}
              >
                <Button
                  variant={"outline"}
                  size={"icon"}
                  className="rounded-full border"
                >
                  {index + 1}
                </Button>
                {lesson.title}
              </Link>
            ))}
          </CollapsibleContent>
        </Collapsible>
      </CardContent>
    </div>
  )
}

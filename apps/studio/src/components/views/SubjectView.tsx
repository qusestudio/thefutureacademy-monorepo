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
import { Topic } from "@/types/models"
import { CreateLessonForm } from "@/components/forms/lesson-form"



const SubjectView = ({ subjectId }: { subjectId: string }) => {

  type RightPane = { kind: "empty" } | { kind: "createLesson"; topic: Topic }
  const [rightPane, setRightPane] = React.useState<RightPane>({kind: "empty"})

  const router = useRouter();
  const pathname = usePathname();

  const { data: subjectData, isLoading: subjectLoading } =
    useGetSubjectQuery(subjectId)
  const { data: topics, isLoading: topicsLoading } =
    useGetTopicsBySubjectQuery(subjectId)



  return (
    <main className="flex w-full flex-col gap-y-5 p-5 max-md:p-2">
      <section className="flex flex-col gap-x-2 gap-y-5 rounded-sm  p-3">
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
        className="min-h-50 w-full rounded-lg border border-foreground"
      >
        <ResizablePanel defaultSize="35%">
          <section className="flex flex-col">
            <article className="flex w-full flex-col gap-x-2 justify-center p-3 font-semibold">
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
                  className={` ${i % 2 === 0 ? "bg-primary/10" : "bg-background"} h-10 w-full`}
                />
              ))}
            {topics?.map((item, i) => {
              return (
                <CollapsibleTopicItem
                  key={i}
                  index={i}
                  topic={item}
                  onCreateLesson={(topic) =>
                    setRightPane({ kind: "createLesson", topic })
                  }
                />
              )
            })}
          </section>
        </ResizablePanel>
        <ResizableHandle className="bg-foreground" withHandle />
        <ResizablePanel defaultSize="65%">
          {rightPane.kind === "createLesson" ? (
            <CreateLessonForm
              topicId={rightPane.topic.id}
              topicTitle={rightPane.topic.title}
              onDone={() => setRightPane({ kind: "empty" })}
            />
          ) : (
            <div className="flex h-full items-center justify-center p-6">
              <span className="font-semibold">
                Select a topic, or click + to add a lesson
              </span>
            </div>
          )}
        </ResizablePanel>
      </ResizablePanelGroup>
    </main>
  )
}

export default SubjectView

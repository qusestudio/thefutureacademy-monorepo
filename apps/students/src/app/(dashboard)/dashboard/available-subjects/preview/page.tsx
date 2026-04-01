"use client"

import React from "react"
import Image from "next/image"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  Book02Icon,
  Check,
  ShoppingBag01Icon,
} from "@hugeicons/core-free-icons"

import { CollapsibleTopic } from "@/components/preview/collapsible-content"
import { IconlyGraph } from "@workspace/ui/components/iconly-icons"
import { useSearchParams } from "next/navigation"
import {
  useEnrollStudentMutation,
  useGetSubjectQuery,
  useGetTopicsBySubjectQuery,
} from "@/state/api"
import { Skeleton } from "@workspace/ui/components/skeleton"
import { CLOUDFRONT } from "@/lib/constants"
import { toast } from "sonner"
import { Spinner } from "@workspace/ui/components/spinner"

const SubjectPreview = () => {
  const searchParams = useSearchParams()
  const subjectId = searchParams.get("subjectId")
  const [enrolled, setEnrolled] = React.useState<boolean>(false)
  const { data: subject, isLoading: subjectLoading } = useGetSubjectQuery(
    subjectId ?? "",
    { skip: !subjectId }
  )
  const { data: topics, isLoading: topicsLoading } = useGetTopicsBySubjectQuery(
    subjectId ?? "",
    { skip: !subjectId }
  )

  const [enrollStudent, { isLoading: enrolling, isError }] =
    useEnrollStudentMutation()

  const handleEnroll = async () => {
    if (!subjectId) {
      toast.error("Subject ID is missing")
      return
    }
    const response = await enrollStudent(subjectId)
    if (isError) {
      toast.error("Something went wrong. Please try again or report fault.")
      return
    }
    setEnrolled(true)
    console.log(response.data)
  }

  return (
    <div className="flex w-full flex-col items-center justify-center gap-y-5 p-5">
      {subjectLoading ? (
        <div className="flex w-full gap-x-10">
          {/*TODO: Refactor to a component*/}
          <section className="flex flex-2 flex-col items-center gap-y-4">
            <div className="relative flex aspect-video h-auto w-full flex-col gap-y-4 rounded-xl border-background p-5 font-medium text-background shadow-xl">
              <Skeleton className="aspect-video h-auto w-full rounded-xl bg-accent object-cover" />
            </div>

            {/* SUBJECT EXPLANATION */}
            <div className="flex w-full max-w-4xl flex-col items-center gap-y-4 py-5">
              <Skeleton className="h-10 w-2/3 self-start rounded-sm" />
              {Array.from({ length: 3 }).map((_, index) => (
                <Skeleton
                  key={index}
                  className="h-30 w-full self-start rounded-sm"
                />
              ))}
            </div>

            {/* COURSE TABLE OF CONTENT */}
            <div className="flex w-full max-w-4xl flex-col items-center gap-y-4 py-5">
              <Skeleton className="h-8 w-1/3 self-start rounded-sm" />
              <section className="flex w-full flex-col gap-y-8 rounded-md bg-accent px-5 py-10">
                <Skeleton className="h-30 w-full self-start rounded-sm" />
              </section>
            </div>
          </section>

          {/*TODO: Refactor to a component*/}
          <section className="flex flex-1 flex-col gap-y-5">
            <Skeleton className="h-20 w-full self-start rounded-sm" />
            <div className="flex flex-col gap-y-5 px-2">
              <ul className="flex flex-col gap-y-2 text-sm text-muted-foreground">
                <Skeleton className="h-6 w-2/5 self-start rounded-lg" />
                <Skeleton className="h-6 w-1/5 self-start rounded-lg" />
                <Skeleton className="h-6 w-2/5 self-start rounded-lg" />
                <Skeleton className="h-6 w-4/5 self-start rounded-lg" />
              </ul>
              <div className="border-b pb-5">
                <Skeleton className="h-15 w-full self-start rounded-lg" />
              </div>
              <div className="flex flex-col gap-y-4">
                <Skeleton className="h-6 w-2/5 self-start rounded-lg" />
                <Skeleton className="h-8 w-full self-start rounded-lg" />
              </div>
            </div>
          </section>
        </div>
      ) : (
        <div className="flex w-full gap-x-10">
          {/*TODO: Refactor to a component*/}
          <section className="flex flex-2 flex-col items-center gap-y-4">
            <div className="relative flex aspect-video h-auto w-full flex-col gap-y-4 rounded-xl border-background p-5 font-medium text-background shadow-xl">
              <Image
                src={`${CLOUDFRONT}/${subject?.image}`}
                alt={"/file.svg"}
                fill
                className="h-auto w-full rounded-xl object-cover"
              />
            </div>

            {/* SUBJECT EXPLANATION */}
            <div className="flex w-full max-w-4xl flex-col items-center gap-y-4 py-5">
              <p className="w-full uppercase lg:text-3xl">{subject?.title}</p>
              {subject?.description.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>

            {/* COURSE TABLE OF CONTENT */}
            <div className="flex w-full max-w-4xl flex-col items-center gap-y-4 py-5">
              <p className="w-full font-medium text-muted-foreground uppercase lg:text-sm">
                COURSE TABLE OF CONTENT
              </p>
              <section className="flex w-full flex-col gap-y-8 rounded-md bg-accent px-5 py-10">
                {topicsLoading
                  ? Array.from({ length: 3 }).map((_, index) => (
                      <Skeleton
                        key={index}
                        className={`h-10 w-3/4 self-start rounded-full bg-foreground/10`}
                      />
                    ))
                  : topics?.map((topic, index) => (
                      <CollapsibleTopic
                        key={index}
                        title={topic.title}
                        description={topic.description}
                      />
                    ))}
              </section>
            </div>
          </section>

          {/*TODO: Refactor to a component*/}
          <section className="flex flex-1 flex-col gap-y-5">
            <div className="grid grid-cols-2 items-center gap-x-4 rounded-xl border">
              <span className="flex items-center gap-x-5 px-5">
                <HugeiconsIcon icon={Book02Icon} />
                <p className="flex flex-col uppercase">
                  <span className="text-xs font-semibold tracking-wide">
                    Grade
                  </span>
                  <span className="font-medium">{subject?.grade}</span>
                </p>
              </span>
              <span className="flex items-center gap-x-4 border-l p-3 px-5">
                <IconlyGraph size={35} />
                <p className="flex flex-col uppercase">
                  <span className="text-xs font-semibold tracking-wide">
                    Term
                  </span>
                  <span className="font-medium">1</span>
                </p>
              </span>
            </div>
            <div className="flex flex-col gap-y-5 px-2">
              {/*<ul className="flex flex-col gap-y-2 text-sm text-muted-foreground">*/}
              {/*  <li className="flex items-center gap-x-2">*/}
              {/*    <HugeiconsIcon icon={Mortarboard01Icon} />*/}
              {/*    Students:{" "}*/}
              {/*    <span className="font-medium text-foreground">110</span>*/}
              {/*  </li>*/}
              {/*  <li className="flex items-center gap-x-2">*/}
              {/*    <IconlyVolumeUp />*/}
              {/*    Language:{" "}*/}
              {/*    <span className="font-medium text-foreground">English</span>*/}
              {/*  </li>*/}
              {/*  <li className="flex items-center gap-x-2">*/}
              {/*    <IconlyTimeSquare />*/}
              {/*    Duration:{" "}*/}
              {/*    <span className="font-medium text-foreground">5h 23m</span>*/}
              {/*  </li>*/}
              {/*  <li className="flex items-center gap-x-2">*/}
              {/*    <HugeiconsIcon icon={Files01Icon} />*/}
              {/*    Additional resources:{" "}*/}
              {/*    <span className="font-medium text-foreground">12 Files</span>*/}
              {/*  </li>*/}
              {/*</ul>*/}
              <div className="border-b pb-5">
                <button
                  disabled={enrolling || enrolled}
                  onClick={handleEnroll}
                  className={`${enrolled ? "bg-green-400 text-black border-green-400" : "bg-foreground"} flex w-full cursor-pointer items-center justify-center gap-x-2 rounded-md border border-foreground p-3 px-5 text-sm font-medium text-background`}
                >
                  {enrolling ? (
                    <Spinner />
                  ) : enrolled ? (
                    <>
                      <HugeiconsIcon icon={Check} /> Enrolled
                    </>
                  ) : (
                    <>
                      <HugeiconsIcon icon={ShoppingBag01Icon} /> Enroll Now
                    </>
                  )}
                </button>
              </div>
              <div className="flex flex-col gap-y-4">
                <p className="text-xs font-medium tracking-wider text-muted-foreground uppercase">
                  Assignment
                </p>
                <p className="text-sm font-medium tracking-wider text-muted-foreground">
                  Plan to dedicate a minimum of 1-2 hours per day to watch
                  lecture videos, and complete assignments.
                </p>
              </div>
            </div>
          </section>
        </div>
      )}
    </div>
  )
}

export default SubjectPreview

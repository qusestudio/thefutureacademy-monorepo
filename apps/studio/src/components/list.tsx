"use client"

import React from "react"
import {
  Allocation,
  Subject,
  Lesson,
  Topic,
} from "@/types/models"
import { Button } from "@workspace/ui/components/button"
import { Checkbox } from "@workspace/ui/components/checkbox"
import { CheckedState } from "@radix-ui/react-checkbox"
import { useGetInstructorQuery, useGetSubjectQuery } from "@/state/api"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  BellDotIcon,
  DashboardSquare02Icon,
  PlayIcon,
} from "@hugeicons/core-free-icons"
import { Spinner } from "@workspace/ui/components/spinner"

function SubjectListItem({
  subject,
  checked,
  onSelect,
  onView,
}: {
  subject: Subject
  checked: boolean
  onSelect: () => void
  onView?: () => void
}) {
  return (
    <div className="flex w-full items-center justify-between rounded-sm border-2 p-2 px-3">
      <div className="flex flex-col gap-2">
        <p className="text-sm font-medium">{subject.title}</p>
        <p className="flex items-center text-sm font-medium text-gray-500">
          Grade {subject.grade} <HugeiconsIcon icon={BellDotIcon} />{" "}
          <span className="text-sm uppercase">{subject.id}</span>
        </p>
      </div>
      <div className="flex gap-2">
        <Checkbox
          checked={checked}
          // onChange={onSelect}
        />
        <Button
          className="rounded-xs bg-[#4F6357] text-white hover:cursor-pointer max-md:text-xs"
          onClick={onView}
        >
          View
        </Button>
      </div>
    </div>
  )
}

function TopicListItem({
  topic,
  onView,
}: {
  topic: Topic
  onView?: () => void
}) {
  return (
    <div className="flex w-full items-center justify-between border-b px-3 py-3 hover:cursor-pointer hover:bg-[#4F6357]/20">
      <div className="flex flex-col gap-2">
        <p className="text-sm font-medium">{topic.title}</p>
      </div>
      <Button
        className="rounded bg-[#4F6357] text-white hover:cursor-pointer hover:text-black max-md:text-xs"
        onClick={onView}
      >
        View
      </Button>
    </div>
  )
}

function LessonListItem({
  lesson,
  onView,
}: {
  lesson: Lesson
  onView?: () => void
}) {
  return (
    <div className="flex w-full items-center justify-between rounded-xl border-2 border-black p-2 px-3 hover:cursor-pointer hover:bg-yellow-200">
      <div className="flex flex-col gap-2">
        <p className="text-sm font-medium">{lesson.title}</p>
      </div>
      <Button
        className="rounded hover:cursor-pointer max-md:text-xs"
        onClick={onView}
      >
        <HugeiconsIcon icon={PlayIcon} /> View lesson
      </Button>
    </div>
  )
}

function EnrollmentListItem({
  subject,
  onEnroll,
}: {
  subject: Subject
  onEnroll?: () => void
}) {
  return (
    <div className="flex w-full items-end justify-between gap-x-5 rounded-md border-2 p-4 transition-all duration-300 hover:cursor-pointer hover:shadow-lg">
      <div className="flex items-center gap-x-5">
        <HugeiconsIcon icon={DashboardSquare02Icon} />
        <p className="flex flex-col font-medium">
          <span>{subject.title}</span>
          <span className="text-xs">Grade {subject.grade}</span>
        </p>
      </div>
      <Button
        onClick={onEnroll}
        className="bg-secondary-450 hover:bg-secondary-600 self-end rounded text-xs font-semibold text-black hover:cursor-pointer"
      >
        Enroll
      </Button>
    </div>
  )
}

function AllocationListItem({
  allocation,
  checked,
  onCheckedChange,
}: {
  checked: boolean
  onCheckedChange: (checked: CheckedState) => void
  allocation: Allocation
}) {
  const { data, isLoading, isError } = useGetSubjectQuery(allocation.subjectId, {
    skip: !allocation.subjectId,
  })
  const { data: instructor, isLoading: instructorLoading } =
    useGetInstructorQuery(allocation.instructorId, {
      skip: !allocation.instructorId,
    })
  return (
    <div className="grid w-full cursor-pointer grid-cols-4 items-center justify-between rounded-lg border-2 border-foreground p-4 hover:border-[#ffbb00]/20">
      <div className="flex w-full items-center gap-x-5">
        <Checkbox
          className="checked:bg-[#ffbb00] hover:cursor-pointer"
          checked={checked}
          onCheckedChange={onCheckedChange}
        />
      </div>
      <div className="flex w-full flex-col items-center gap-2 capitalize">
        {instructorLoading && (
          <span>
            <Spinner />
          </span>
        )}
        {instructor?.name}
      </div>
      <div className="flex flex-col gap-2 text-center">
        {isLoading && (
          <span>
            <Spinner />
          </span>
        )}
        {isError && <span>Subject not found</span>}
        {data?.title}
      </div>
      <div className="flex flex-col gap-2 text-center">
        <p className="uppercase">Grade {data?.grade}</p>
      </div>
    </div>
  )
}

function List({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex w-full flex-col items-stretch gap-5">{children}</div>
  )
}

export {
  List,
  SubjectListItem,
  TopicListItem,
  LessonListItem,
  EnrollmentListItem,
  AllocationListItem,
}

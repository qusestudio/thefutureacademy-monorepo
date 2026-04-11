"use client"

import React from "react"
import { Separator } from "@workspace/ui/components/separator"
import { HugeiconsIcon } from "@hugeicons/react"
import { LockedIcon, PieChart02Icon } from "@hugeicons/core-free-icons"
import SectionLocker from "@/components/section-locker"
import Image from "next/image"
import { Card } from "@workspace/ui/components/card"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { CLOUDFRONT } from "@thefutureacademy/instructors/src/lib/constants"
import { useGetStudentEnrollmentsQuery } from "@/state/api"
import { Skeleton } from "@workspace/ui/components/skeleton"

interface SubjectCardProps {
  id: string
  src: string
  title: string
  term: number
  grade: number
}

const SubjectCard = (props: SubjectCardProps) => {
  const { id, src, title, term } = props
  return (
    <Link
      href={`/my-learning/${id}`}
      className="flex w-full flex-col gap-x-5 gap-y-2 rounded-xl border border-none bg-accent p-2"
    >
      {/* Subject Image */}
      <div className="relative flex aspect-video h-full w-full flex-col gap-y-4 rounded p-5 font-medium text-background">
        <Image
          src={`${CLOUDFRONT}/${src}`}
          alt={title}
          fill
          className="h-auto w-full rounded-lg object-cover"
        />
      </div>
      {/* Subject Title and Term*/}
      <div className="flex flex-col justify-between">
        <div className="flex flex-col gap-y-1 px-3">
          <div className="flex w-full items-center justify-between">
            <p className="text-xl capitalize">{title}</p>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold tracking-wider text-muted-foreground uppercase">
              {id}
            </p>
            <p className="flex items-center gap-x-1 rounded-full bg-accent p-1 px-2 text-lg font-medium text-muted-foreground uppercase">
              <HugeiconsIcon size={20} icon={PieChart02Icon} strokeWidth={1} />{" "}
              {term}
            </p>
          </div>
        </div>
      </div>
    </Link>
  )
}

const MyLearning = () => {
  const router = useRouter();
  const {data: subjects, isLoading: subjectsLoading} = useGetStudentEnrollmentsQuery();

  if (subjectsLoading) {
    return <div className="grid w-full grid-cols-4 flex-col gap-5 gap-y-5 p-5">
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i}>
          <div className="grid w-full gap-x-5 gap-y-2 rounded-xl bg-accent/50 p-2">
            <Skeleton className="aspect-video w-full rounded-lg" />
            <div className="flex flex-col gap-y-2">
              <Skeleton className="h-8 w-2/5 rounded-sm" />
              <Skeleton className="h-8 w-2/9 rounded-sm" />
            </div>
          </div>
        </div>
      ))}
    </div>
  }

  if (subjects?.length === 0) {
    return <div>No available subjects yet.</div>
  }

  return (
    <div>
      <div className="@container/main flex flex-1 flex-col gap-5 p-5 pb-10 font-chillax max-md:px-0">
        <h1 className="text-4xl md:text-5xl">My Learning</h1>
        <p className="font-medium max-md:text-sm">
          View your active subjects and track your learning journey. Stay
          focused as you progress through lessons and materials
        </p>
      </div>
      <Separator />
        <div className="no-scrollbar grid w-full grid-cols-4 flex-col gap-5 overflow-y-auto p-5">
          {subjects?.map(
            ({ subjectTitle, subjectId, subjectImage, term, grade }, i) => (
              <SubjectCard
                key={i}
                id={subjectId}
                src={subjectImage}
                title={subjectTitle}
                term={term}
                grade={grade}
              />
            )
          )}
        </div>
    </div>
  )
}

export default MyLearning

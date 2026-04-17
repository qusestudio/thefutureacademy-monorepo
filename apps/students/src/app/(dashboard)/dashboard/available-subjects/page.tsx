"use client"

import React from "react"
import Image from "next/image"
import Link from "next/link"
import {
  useGetAuthProfileQuery, useGetStudentSubscriptionQuery,
  useGetSubjectsByGradeQuery,
} from "@/state/api"
import { SubjectPreviewCard } from "@/components/cards/SubjectCard"
import { Skeleton } from "@workspace/ui/components/skeleton"

const AvailableSubjects = () => {
  // const {data: profile, isLoading: pLoading} = useGetAuthProfileQuery();

  const { data: availableSubjects, isLoading } = useGetSubjectsByGradeQuery(12)
  /** todo: -------------------
   *
   * For now everyone is in grade 12.
   *
   * (1) check student profile
   * if loading
   * -- (1.3) Loading components
   * if no profile
   * -- (1.2) Display profile creation flow
   * if profile
   * -- (1.3) Display available subjects
   * if loading
   *
  */

  if (isLoading) {
    return (
      <div className="grid w-full flex-col gap-5 gap-y-5 p-5 md:grid-cols-2 xl:grid-cols-4">
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
    )
  }

  if (availableSubjects?.length === 0) {
    return <div>No available subjects yet.</div>
  }


  return (
    <div className="flex w-full flex-col justify-center dark:bg-background">
      <section className="flex w-full flex-col gap-y-5  ">
        <h1 className="font-chillax w-full   text-4xl max-sm:text-3xl">
          Your future starts here. Explore the subjects designed to get you
          there.
        </h1>
        <div className="grid w-full xl:grid-cols-4 sm:grid-cols-2 gap-5 max-sm:grid-cols-1">
          {availableSubjects?.map(({ title, id, image, term, grade }, i) => (
            <SubjectPreviewCard
              key={i}
              id={id}
              src={image}
              title={title}
              term={term}
              grade={grade}
            />
          ))}
        </div>
      </section>
    </div>
  )
}

export default AvailableSubjects

"use client"

import React from "react"
import Image from "next/image"
import Link from "next/link"
import {
  useGetAuthProfileQuery,
  useGetSubjectsByGradeQuery,
} from "@/state/api"
import { SubjectPreviewCard } from "@/components/cards/SubjectCard"

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
    return <div>Loading</div>
  }

  if (availableSubjects?.length === 0) {
    return <div>No available subjects yet.</div>
  }


  return (
    <div className="flex w-full flex-col justify-center  p-5 dark:bg-background">
      <section className="flex w-full flex-7 flex-col gap-y-5  ">
        <h1 className="font-chillax text-center  text-4xl max-sm:text-3xl">
          Your future starts here. Explore the subjects designed to get you
          there.
        </h1>
        <div className="grid w-full lg:grid-cols-4 sm:grid-cols-2 md:grid-cols-3 gap-5 max-sm:grid-cols-1">
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

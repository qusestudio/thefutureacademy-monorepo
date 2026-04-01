"use client"

import React from "react"
import VideoPlayer from "@/components/VideoPlayer"
import LessonResourcesTab from "@/components/lesson-resource-tab"
import { useGetSubjectQuery } from "@/state/api"
import { usePathname } from "next/navigation"
import Image from "next/image"
import { CLOUDFRONT } from "@/lib/constants"

const SubjectPage = () => {
  const pathname = usePathname();
  const subjectId = pathname.split("/").pop();
  const {data: subject, isLoading: subjectLoading} = useGetSubjectQuery(
    subjectId ?? "", {skip: !subjectId}
  );
  return (
    <div className="grid w-full grid-cols-[70%_30%] flex-col">
      <div className="flex w-full flex-col items-center space-y-10 rounded-xl p-2">
        <div className="relative flex aspect-video h-auto w-full flex-col gap-y-4 rounded-xl border-background p-5 font-medium text-background shadow-xl">
          <Image
            src={`${CLOUDFRONT}/${subject?.image}`}
            alt={"/file.svg"}
            fill
            className="h-auto w-full rounded-xl object-cover"
          />
        </div>
        <div className="w-full space-y-5">
          <p className="text-xl font-medium tracking-wider uppercase">
            {subject?.title}
          </p>
          {
            subject?.description.map((p, i)=>(
              <p key={i}>
                {p}
              </p>
            ))
          }
        </div>
      </div>
      <div className="w-full gap-y-2 rounded-xl p-2">
        <LessonResourcesTab />
      </div>
    </div>
  )
}

export default SubjectPage

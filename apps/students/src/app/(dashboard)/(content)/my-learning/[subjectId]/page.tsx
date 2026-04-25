"use client"

import React from "react"
import VideoPlayer from "@/components/VideoPlayer"
import LessonResourcesTab from "@/components/lesson-resource-tab"
import { useGetSubjectQuery } from "@/state/api"
import { usePathname } from "next/navigation"
import Image from "next/image"
import { CLOUDFRONT } from "@/lib/constants"
import ReadMore from "@/components/ReadMore"

const SubjectPage = () => {
  const pathname = usePathname();
  const subjectId = pathname.split("/").pop();
  const {data: subject, isLoading: subjectLoading} = useGetSubjectQuery(
    subjectId ?? "", {skip: !subjectId}
  );
  return (
    <div className="grid w-full flex-col gap-y-4 overflow-y-hidden md:grid-cols-[70%_30%]">
      <div className="flex w-full flex-col items-center space-y-10 rounded-xl">
        <div className="relative flex aspect-video h-auto w-full flex-col gap-y-4 rounded-xl border-background font-medium text-background shadow-xl">
          <Image
            src={
              subjectLoading ? "/image-placeholder.svg" : `${CLOUDFRONT}/${subject?.image}`
            }
            alt={"/file.svg"}
            fill
            className="h-auto aspect-video w-full rounded-xl object-cover"
          />
        </div>
        <div className="w-full space-y-5">
          <p className="text-xl font-medium tracking-wider uppercase">
            {subject?.title}
          </p>
          <ReadMore previewLines={3}>
            <div className="space-y-5">
              {subject?.description.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </ReadMore>
        </div>
      </div>
      <div className="w-full gap-y-2 rounded-xl pl-10 max-md:pl-0">
        <LessonResourcesTab />
      </div>
    </div>
  )
}

export default SubjectPage

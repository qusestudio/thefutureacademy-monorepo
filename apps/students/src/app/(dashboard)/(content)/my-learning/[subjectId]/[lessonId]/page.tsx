"use client"

import React from "react"
import VideoPlayer from "@/components/VideoPlayer"
import LessonResourcesTab from "@/components/lesson-resource-tab"
import { useGetLessonQuery } from "@/state/api"
import { usePathname } from "next/navigation"
import { CLOUDFRONT } from "@/lib/constants"

const LessonPage = () => {
  const pathname = usePathname();
  const lessonId = pathname.split("/").pop();
  const {data: lesson, isLoading} = useGetLessonQuery(
    lessonId ?? "", {skip: !lessonId}
  )
  return (
    <div className="flex max-md:flex-col w-full ">
      <div className="flex w-full flex-2 flex-col items-start space-y-10 rounded-xl py-5">
        <p className="text-[24px] font-medium tracking-wider capitalize">
          {lesson?.title}
        </p>
        <VideoPlayer
          src={`${CLOUDFRONT}/${lesson?.videoId}`}
          poster={"/file.svg"}
        />
        <div className="w-full max-w-4xl space-y-5">
          <p>{lesson?.description}</p>
        </div>
      </div>
      <div className="w-full  flex-1 gap-y-2 rounded-xl py-5 max-md:pl-0 pl-10">
        <LessonResourcesTab />
      </div>
    </div>
  )
}

export default LessonPage

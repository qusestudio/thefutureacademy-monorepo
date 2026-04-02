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
    <div className="grid w-full grid-cols-[70%_30%] flex-col">
      <div className="flex w-full flex-col items-center space-y-10 rounded-xl p-2">
        <VideoPlayer
          src={`${CLOUDFRONT}/${lesson?.videoId}`}
          poster={"/file.svg"}
        />
        <div className="w-full max-w-4xl space-y-5">
          <p className="text-xl font-medium tracking-wider uppercase">
            {lesson?.title}
          </p>
          <p>
            {lesson?.description}
          </p>
        </div>
      </div>
      <div className="w-full gap-y-2 rounded-xl p-2">
        <LessonResourcesTab />
      </div>
    </div>
  )
}

export default LessonPage

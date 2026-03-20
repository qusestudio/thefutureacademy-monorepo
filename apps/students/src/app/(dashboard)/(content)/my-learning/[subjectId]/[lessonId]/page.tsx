import React from "react"
import VideoPlayer from "@/components/VideoPlayer"
import LessonResourcesTab from "@/components/lesson-resource-tab"

interface LayoutProps {
  children: React.ReactNode
  params: Promise<{ lessonId: string }>
}

const LessonPage = async ({children, params}: LayoutProps) => {
  const {lessonId} = await params;
  return (
    <div className="grid w-full grid-cols-[70%_30%] flex-col">
      <div className="flex w-full flex-col items-center space-y-10 rounded-xl p-2">
        <VideoPlayer
          src={"/videos/preview_video.mp4"}
          poster={"/maths_12.png"}
        />
        <div className="w-full max-w-4xl space-y-5">
          <p className="text-xl font-medium tracking-wider uppercase">
            Introduction
          </p>
          <p>
            In Sequences and Series, learners explore patterns in numbers and
            how they can be described, extended, and summed. The focus is on
            understanding arithmetic and geometric sequences, finding general
            terms, and calculating sums of series, including finite and infinite
            cases. Students also learn to recognise real life applications,
            develop formulas, and solve problems that require logical thinking
            and pattern recognition.
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

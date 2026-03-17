import React from "react"
import { Separator } from "@workspace/ui/components/separator"
import { HugeiconsIcon } from "@hugeicons/react"
import { LockedIcon } from "@hugeicons/core-free-icons"
import SectionLocker from "@/components/section-locker"

const MyLearning = () => {
  return (
    <div>
      <div className="@container/main flex flex-1 flex-col gap-5 p-5 pb-10 font-chillax max-md:px-0 lg:p-15">
        <h1 className="text-4xl md:text-5xl lg:text-8xl">My Learning</h1>
        <p className="font-sans text-sm font-medium md:text-xl lg:text-xl">
          View your active subjects and track your learning journey. Stay
          focused as you progress through lessons and materials
        </p>
      </div>
      <Separator />
      <SectionLocker />
    </div>
  )
}

export default MyLearning

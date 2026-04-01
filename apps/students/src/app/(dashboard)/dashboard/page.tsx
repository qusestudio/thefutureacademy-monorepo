import React from "react"
import { Separator } from "@workspace/ui/components/separator"
import SectionLocker from "@/components/section-locker"

export default function Page() {
  return (
    <div className={"@container/main w-full"}>
      <div className="flex flex-1 flex-col gap-5 p-5 pb-10 font-chillax max-md:px-0 ">
        <h1 className="text-4xl md:text-5xl ">My Dashboard</h1>
        <p className="font-sans text-sm tracking-wider text-accent-foreground md:text-xl lg:text-lg">
          Track your learning progress and manage all your courses in one place.
          Stay updated with upcoming lessons, tasks, and important
          announcements.
        </p>
      </div>
      <Separator />
      <SectionLocker />
    </div>
  )
}

import React from "react"
import { Separator } from "@workspace/ui/components/separator"
import { HugeiconsIcon } from "@hugeicons/react"
import { LockedIcon } from "@hugeicons/core-free-icons"
import SectionLocker from "@/components/section-locker"

export default function Page() {
  return (
    <div>
      <div className="@container/main flex flex-1 flex-col gap-5 max-md:px-0 p-5 lg:p-15 pb-10 font-chillax">
        <h1 className="text-4xl md:text-5xl lg:text-8xl">My Dashboard</h1>
        <p className="font-sans  text-accent-foreground text-sm tracking-wider md:text-xl lg:text-lg">
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

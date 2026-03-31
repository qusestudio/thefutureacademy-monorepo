import React from "react"
import { Separator } from "@workspace/ui/components/separator"

export default function Page() {
  return (
    <div>
      <div className="@container/main flex flex-1 flex-col gap-5 max-md:px-0 p-5 pb-10 font-chillax">
        <h1 className="text-4xl md:text-5xl">My Dashboard</h1>
        <p className="font-geist-sans font-light  text-accent-foreground text-sm tracking-wider md:text-lg">
          Track your class progress
        </p>
      </div>
      <Separator />
    </div>
  )
}

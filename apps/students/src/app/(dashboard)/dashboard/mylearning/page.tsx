"use client"

import React from "react"
import { Separator } from "@workspace/ui/components/separator"
import { HugeiconsIcon } from "@hugeicons/react"
import { LockedIcon } from "@hugeicons/core-free-icons"
import SectionLocker from "@/components/section-locker"
import Image from "next/image"
import { Card } from "@workspace/ui/components/card"
import { useRouter } from "next/navigation"

const MyLearning = () => {
  const router = useRouter();
  return (
    <div>
      <div className="@container/main flex flex-1 flex-col gap-5 p-5 pb-10 font-chillax max-md:px-0">
        <h1 className="text-4xl md:text-5xl lg:text-8xl">My Learning</h1>
        <p className="font-sans text-sm font-medium md:text-xl lg:text-xl">
          View your active subjects and track your learning journey. Stay
          focused as you progress through lessons and materials
        </p>
      </div>
      <Separator />
      <section className="grid grid-cols-4 p-5 py-7">
        <Card className="p-2 gap-y-2 rounded-xl">
          <div className="relative flex aspect-video h-full w-full flex-col gap-y-4 rounded-t-lg border-background p-5 font-medium text-background">
            <Image
              src={"/maths_12.png"}
              alt={"Mathematics"}
              fill
              className="h-auto w-full rounded-t-xl object-cover"
            />
          </div>
          <div>
            <button
              onClick={()=> {router.push(`/my-learning/mth1001`)}}
              className="w-full font-medium text-lg cursor-pointer rounded-b-lg bg-foreground p-3 text-background">
              Continue learning
            </button>
          </div>
        </Card>
      </section>
    </div>
  )
}

export default MyLearning

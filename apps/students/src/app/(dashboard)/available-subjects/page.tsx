import React from "react"
import { HugeiconsIcon } from "@hugeicons/react"
import { ArrowUpRight01Icon, Home01Icon } from "@hugeicons/core-free-icons"
import Image from "next/image"
import Link from "next/link"

const availableSubjects = [
  {
    title: "Mathematics",
    image: "/maths_12.png",
  },
  {
    title: "Physics",
    image: "/physics_12.png",
  },
  {
    title: "Chemistry",
    image: "/chemistry_12.png",
  },
  {
    title: "Life Sciences",
    image: "/lifesciences_12.png",
  },
  {
    title: "Accounting",
    image: "/accounting_12.png",
  },
]

const AvailableSubjects = () => {
  return (
    <div className="flex w-full flex-col items-center justify-center bg-accent p-5 dark:bg-background">
      <header className="flex w-full max-w-[80%] items-center justify-center gap-x-2 rounded-full bg-background py-1 font-chillax text-xl max-md:text-xs dark:bg-accent">
        <Link
          href={"/settings/profile"}
          className="rounded-full p-4 hover:bg-accent dark:hover:bg-background"
        >
          Profile
        </Link>
        <Link
          href={"/dashboard"}
          className="rounded-full p-4 hover:bg-accent dark:hover:bg-background"
        >
          Dashboard
        </Link>
        <Link
          href={"/settings/subscription"}
          className="rounded-full p-4 hover:bg-accent dark:hover:bg-background"
        >
          Subscription
        </Link>
      </header>
      <section className="flex w-full flex-7 flex-col gap-y-10 py-[2%] md:max-w-[70%]">
        <h1 className="mb-10 font-chillax text-4xl max-sm:text-3xl">
          Your future starts here. Explore the subjects designed to get you
          there.
        </h1>
        <div className="grid w-full grid-cols-3 gap-5 max-sm:grid-cols-1">
          {availableSubjects.map((subject, index) => (
            <div key={index} className="flex flex-col gap-y-3  pb-5">
              <div className="relative flex aspect-video h-full w-full flex-col gap-y-4 rounded-xl border-background p-5 font-medium text-background">
                <Image
                  src={subject.image}
                  alt={subject.title}
                  fill
                  className="w-full rounded-xl object-cover"
                />
                {/*<p className="font-chillax text-2xl">{subject.title}</p>*/}
                {/*<p className="tracking-wide">*/}
                {/*  Explore all your Grade 10 Maths topics in one place. Practice,*/}
                {/*  learn, and master concepts the CAPS step by step.*/}
                {/*</p>*/}
                {/*<p className="text-4xl text-accent">5 Topics</p>*/}
              </div>
              <p className="font-chillax text-2xl font-normal">
                {subject.title}
              </p>
              <button className="border border-foreground hover:bg-accent cursor-pointer bg-background p-4 font-chillax text-xl tracking-wide text-foreground">
                Preview
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default AvailableSubjects

"use client"

import React from "react"
import Link from "next/link"
import Image from "next/image"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  ArrowLeft01Icon,
  ArrowLeft02Icon,
  Book02Icon,
  Files01Icon,
  Mortarboard01Icon,
  ShoppingBag01Icon,
} from "@hugeicons/core-free-icons"
import { IconlyGraph, IconlyTimeSquare, IconlyVolumeUp } from "@/components/iconly-icons"
import { CollapsibleTopic } from "@/components/preview/collapsible-content"

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

const SubjectPreview = () => {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-y-5 bg-background p-5">
      <header className="flex w-full max-w-[80%] items-center justify-center gap-x-2 rounded-full bg-accent py-1 font-chillax text-xl dark:bg-accent">
        <Link
          href={"/settings/profile"}
          className="rounded-full p-4 transition-all duration-200 hover:bg-accent hover:font-semibold dark:hover:bg-background"
        >
          Profile
        </Link>
        <Link
          href={"/dashboard"}
          className="rounded-full p-4 transition-all duration-200 hover:bg-accent hover:font-semibold dark:hover:bg-background"
        >
          My Dashboard
        </Link>
        <Link
          href={"/settings/subscription"}
          className="rounded-full p-4 transition-all duration-200 hover:bg-accent hover:font-semibold dark:hover:bg-background"
        >
          Subscription
        </Link>
      </header>
      <div className="w-full max-w-[80%]">
        <button className="cursor-pointer self-start rounded-full border border-foreground p-2 text-foreground">
          <HugeiconsIcon strokeWidth={1} icon={ArrowLeft02Icon} />
        </button>
      </div>
      <div className="flex w-full max-w-[80%] gap-x-10">
        {/*TODO: Refactor to a component*/}
        <section className="flex flex-2 flex-col items-center gap-y-4">
          <div className="relative flex aspect-video h-full w-full flex-col gap-y-4 rounded-xl border-background p-5 font-medium text-background shadow-xl">
            <Image
              src={"/maths_12.png"}
              alt={"Mathematics"}
              fill
              className="h-auto w-full rounded-xl object-cover"
            />
          </div>

          {/* SUBJECT EXPLANATION */}
          <div className="flex w-full max-w-3xl flex-col items-center gap-y-4 py-5">
            <p className="w-full uppercase lg:text-3xl">Mathematics</p>
            <p className="">
              Mathematics Grade 12 CAPS is the final and most important stage of
              high school mathematics, where everything comes together. Learners
              build on concepts developed in earlier grades and refine their
              understanding of algebra, functions, calculus, geometry, and
              statistics. This level focuses on deeper thinking, accuracy, and
              the ability to apply knowledge in structured and unfamiliar
              problems.
            </p>
            <p className="">
              Throughout the year, students are guided to develop strong problem
              solving skills and logical reasoning. Topics such as
              differentiation, analytical geometry, and probability are explored
              in greater detail, preparing learners not only for exams but for
              real world applications. Consistent practice and clear
              understanding are key, as each concept connects closely with
              others.
            </p>
            <p className="">
              By the end of the course, learners are expected to approach
              complex questions with confidence and clarity. Mathematics Grade
              12 CAPS equips students with the analytical mindset needed for
              further studies in fields such as engineering, science, finance,
              and technology. It is both a challenge and an opportunity to
              master skills that extend far beyond the classroom.
            </p>
          </div>

          {/* COURSE TABLE OF CONTENT */}
          <div className="flex w-full max-w-3xl flex-col items-center gap-y-4 py-5">
            <p className="w-full text-muted-foreground font-medium uppercase lg:text-sm">
              COURSE TABLE OF CONTENT
            </p>
            <section className="flex w-full flex-col  gap-y-8 rounded-md bg-accent px-5 py-10">
              <CollapsibleTopic />
              <CollapsibleTopic />
              <CollapsibleTopic />
            </section>
          </div>
        </section>

        {/*TODO: Refactor to a component*/}
        <section className="flex flex-1 flex-col gap-y-5">
          <div className="grid grid-cols-2 items-center gap-x-4 rounded-xl border">
            <span className="flex items-center gap-x-5 px-5">
              <HugeiconsIcon icon={Book02Icon} />
              <p className="flex flex-col uppercase">
                <span className="text-xs font-semibold tracking-wide">
                  Lessons
                </span>
                <span className="font-medium">12</span>
              </p>
            </span>
            <span className="flex items-center gap-x-4 border-l p-3 px-5">
              <IconlyGraph size={35} />
              <p className="flex flex-col uppercase">
                <span className="text-xs font-semibold tracking-wide">
                  Term
                </span>
                <span className="font-medium">1</span>
              </p>
            </span>
          </div>
          <div className="flex flex-col gap-y-5 px-2">
            <ul className="flex flex-col gap-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-x-2">
                <HugeiconsIcon icon={Mortarboard01Icon} />
                Students:{" "}
                <span className="font-medium text-foreground">110</span>
              </li>
              <li className="flex items-center gap-x-2">
                <IconlyVolumeUp />
                Language:{" "}
                <span className="font-medium text-foreground">English</span>
              </li>
              <li className="flex items-center gap-x-2">
                <IconlyTimeSquare />
                Duration:{" "}
                <span className="font-medium text-foreground">5h 23m</span>
              </li>
              <li className="flex items-center gap-x-2">
                <HugeiconsIcon icon={Files01Icon} />
                Additional resources:{" "}
                <span className="font-medium text-foreground">12 Files</span>
              </li>
            </ul>
            <div className="border-b pb-5">
              <button className="flex w-full cursor-pointer items-center justify-center gap-x-2 rounded-md border border-foreground bg-foreground p-3 px-5 text-sm font-medium text-background">
                <HugeiconsIcon icon={ShoppingBag01Icon} />
                Enroll a course
              </button>
            </div>
            <div className="flex flex-col gap-y-4">
              <p className="text-xs font-medium tracking-wider text-muted-foreground uppercase">
                Assignment
              </p>
              <p className="text-sm font-medium tracking-wider text-muted-foreground">
                Plan to dedicate a minimum of 1-2 hours per day to watch lecture
                videos, and complete assignments.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default SubjectPreview

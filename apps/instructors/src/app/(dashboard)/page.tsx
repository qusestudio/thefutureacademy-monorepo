"use client"

import React from "react"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  ArrowRight01Icon,
  ArrowRight02Icon,
  ArrowUpRight01Icon,
} from "@hugeicons/core-free-icons"
import { useRouter } from "next/navigation"
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
  // {
  //   title: "Life Sciences",
  //   image: "/lifesciences_12.png",
  // },
  // {
  //   title: "Accounting",
  //   image: "/accounting_12.png",
  // },
]

const HomePage = () => {
  const router = useRouter()
  // logged in people come in here.... paid or not!
  // fetch subscription information from the server
  // display components based on the state
  return (
    <div className="flex h-screen w-full flex-col items-center bg-accent py-5 dark:bg-background">
      <header className="flex w-full max-w-[80%] items-center justify-center gap-x-2 rounded-full bg-background py-1 font-chillax text-xl dark:bg-accent">
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
      <div className="flex h-screen w-full max-w-[80%] items-center justify-center gap-x-20 gap-y-4 self-center px-3 py-10 font-sans max-md:flex-col">
        <section className="flex flex-7 flex-col items-center gap-y-10">
          <h1
            className={`text-center font-chillax text-3xl uppercase sm:text-4xl md:text-5xl lg:text-8xl`}
          >
            Welcome to the <br />
            Learning Space <br />
          </h1>
          <p className="font-chillax text-3xl font-semibold max-sm:text-xl">
            The future is now.
          </p>
          <p className="max-w-4xl text-center font-medium text-foreground">
            Step into a dynamic learning environment designed to help you grow
            with confidence. Explore expertly crafted lessons, track your
            progress in real time, and access resources that make complex
            concepts easier to understand. Whether you're revising, practicing,
            or mastering new topics, everything you need to succeed is right
            here, built to keep you focused, motivated, and ahead.
          </p>
          <div className="flex gap-x-4 font-medium">
            <button
              className="flex cursor-pointer items-center rounded-full bg-foreground p-4 font-chillax text-background"
              onClick={() => router.push("/available-subjects")}
            >
              Available Subjects{" "}
              <HugeiconsIcon
                className=""
                strokeWidth={2}
                size={40}
                icon={ArrowUpRight01Icon}
              />
            </button>
            <button
              className="flex cursor-pointer items-center rounded-full bg-background p-4 font-chillax text-xl font-normal text-foreground transition-all duration-200 hover:font-semibold dark:bg-accent"
              onClick={() => router.push("/plans-and-pricing")}
            >
              Plans & Pricing
            </button>
          </div>
        </section>
        <section className="relative flex h-full w-full flex-3 flex-col items-start justify-center gap-y-4 bg-background p-5">
          <p className="font-chillax text-2xl">
            Your future starts here. Explore the subjects designed to get you
            there.
          </p>
          {availableSubjects.map((subject, index) => (
            <div
              key={index}
              className="relative flex h-full w-full flex-col gap-y-4 rounded-xl border-background p-5 font-medium text-background"
            >
              <Image
                src={subject.image}
                alt={subject.title}
                fill
                className="h-auto w-full rounded-xl object-cover"
              />
              <p className="font-chillax text-2xl">{subject.title}</p>
              <p className="tracking-wide">
                Explore all your Grade 10 Maths topics in one place. Practice,
                learn, and master concepts the CAPS step by step.
              </p>
              <p className="text-4xl text-accent">5 Topics</p>
            </div>
          ))}
        </section>
      </div>
    </div>
  )
}

export default HomePage

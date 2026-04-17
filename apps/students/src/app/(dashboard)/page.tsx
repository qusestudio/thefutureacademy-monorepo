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
    <div className="flex h-screen w-full flex-col items-center justify-center p-2 dark:bg-background">
      <div className="flex h-screen w-full flex-col items-center justify-center gap-y-5 self-center font-sans">
        <Image src={"/logo-image.svg"} alt={"Logo"} width={100} height={100} />
        <h1
          className={`text-center font-chillax text-3xl font-semibold capitalize sm:text-5xl md:text-7xl lg:text-8xl`}
        >
          The Future Academy
        </h1>
        <p className="text-center font-chillax text-3xl font-normal tracking-widest uppercase max-sm:text-xl sm:tracking-[20%] lg:tracking-[120%]">
          The future is now
        </p>
        <div className="mt-5 flex font-medium">
          <button
            className="flex cursor-pointer items-center gap-x-4 rounded-full bg-foreground p-1 pr-5 font-chillax text-background"
            onClick={() => router.push("/dashboard/mylearning")}
          >
            <span className="rounded-full bg-[#1F329D] p-2 text-white">
              <HugeiconsIcon
                className=""
                strokeWidth={2}
                size={40}
                icon={ArrowUpRight01Icon}
              />
            </span>
            Get started
          </button>
        </div>
      </div>
    </div>
  )
}

export default HomePage

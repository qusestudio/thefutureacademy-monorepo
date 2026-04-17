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
    <div className="flex h-screen w-full flex-col items-center justify-center p-5 dark:bg-background">
      <div className="flex h-screen w-full flex-col items-center justify-center gap-x-20 gap-y-4 self-center border px-3 py-10 font-sans">
        <section className="flex flex-col items-center gap-y-10">
          <Image
            src={"/logo-image.svg"}
            alt={"Logo"}
            width={100}
            height={100}
          />
          <h1
            className={`text-center font-semibold font-chillax text-3xl capitalize sm:text-5xl md:text-7xl lg:text-8xl`}
          >
            The Future Academy
          </h1>
          <p className="font-chillax uppercase text-center text-3xl font-normal sm:tracking-[20%] lg:tracking-[120%] max-sm:text-xl">
            The future is now
          </p>
          <div className="flex gap-x-4 font-medium">
            <button
              className="flex cursor-pointer items-center rounded-full bg-foreground p-1 pr-5 gap-x-4 font-chillax text-background"
              onClick={() => router.push("/dashboard/mylearning")}
            >
              <span className="bg-[#1F329D] text-white rounded-full p-2">
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
        </section>
      </div>
    </div>
  )
}

export default HomePage

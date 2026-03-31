"use client"

import React from "react"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  ArrowUpRight01Icon,
} from "@hugeicons/core-free-icons"
import { useRouter } from "next/navigation"

const HomePage = () => {
  const router = useRouter()
  // logged in people come in here.... paid or not!
  // fetch subscription information from the server
  // display components based on the state
  return (
    <div className="flex h-screen w-full flex-col items-center bg-accent py-5 dark:bg-background">
      <div className="flex h-screen w-full max-w-[80%] items-center justify-center gap-x-20 gap-y-4 self-center px-3 py-10 font-sans max-md:flex-col">
        <section className="flex flex-7 flex-col items-center gap-y-10">
          <h1
            className={`text-center font-chillax text-3xl uppercase sm:text-4xl md:text-5xl lg:text-8xl`}
          >
            Welcome to <br />
            the future instructors <br />
          </h1>
          <p className="font-chillax text-3xl font-semibold max-sm:text-xl">
            The future is now.
          </p>

          <div className="flex gap-x-4 font-medium">
            <button
              className="flex cursor-pointer items-center rounded-full bg-foreground p-4 font-chillax text-background"
              onClick={() => router.push("/dashboard")}
            >
              Create Content{" "}
              <HugeiconsIcon
                className=""
                strokeWidth={2}
                size={40}
                icon={ArrowUpRight01Icon}
              />
            </button>
          </div>
        </section>
      </div>
    </div>
  )
}

export default HomePage

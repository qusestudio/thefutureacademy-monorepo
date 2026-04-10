import React from "react"
import { Header } from "@/components/header"
import Link from "next/link"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  ArrowUpRight01Icon,
} from "@hugeicons/core-free-icons"
import Image from "next/image"
import { Separator } from "@workspace/ui/components/separator"

const PricingPage = () => {
  const planItems = [
    "Access to all supported subject content",
    "Structured lessons and guided learning paths",
    "Progress tracking and feedback",
    "Step-by-step explanations for clear understanding",
    "Study notes designed for effective revision",
    "Support to keep you consistent and on track",
    "24/7 access to on-demand lectures",
  ]

  return (
    <div className="flex w-full flex-col items-center font-chillax">
      <div className="fixed flex w-full flex-col items-center">
        <Header />
      </div>
      <main className="w-full max-w-[75%] space-y-5 max-md:max-w-[90%] max-sm:px-0">
        <section className="flex w-full flex-col items-center pt-50">
          <div className="flex w-full items-center gap-x-5 self-start p-5 text-4xl max-md:gap-x-1 max-md:p-1 max-md:text-3xl max-sm:text-3xl">
            <Image
              alt={"/globe.svg"}
              src={"/logo-image.svg"}
              height={100}
              width={100}
              className="text-white max-md:p-3 max-md:text-2xl"
            />
            <Link className="flex max-md:hidden" href={"/"}>
              <p className="text-3xl leading-6 font-semibold uppercase">
                The
                <br /> Future
                <br /> Academy
              </p>
            </Link>
          </div>
          <div className="flex w-full flex-col border">
            <h1 className="w-full border-b pt-5 pr-5 text-center text-5xl font-semibold uppercase sm:text-[7em] lg:text-[7em]">
              Find a pl
              <span className="bg-[#ffbb00]/60 dark:text-background">
                an <br /> that fit
              </span>
              <span className="bg-[#ffbb00]/60 dark:text-background">
                s you
              </span>
              r needs
            </h1>
            <div className="flex w-full flex-col items-start gap-y-5 p-5 px-[5%] font-archivo max-xl:h-full max-md:justify-end md:justify-center lg:py-[4%]">
              <div className="w-full">
                {/*<p className="max-w-lg text-sm text-foreground/90 max-xl:text-lg max-md:text-xs dark:text-primary-foreground/90">*/}
                {/*  Don’t wait until it’s too late. your future is built by what*/}
                {/*  you do now. Stay consistent, stay focused, and commit to the*/}
                {/*  process that will get you results. Take control today and give*/}
                {/*  yourself the best chance to succeed.*/}
                {/*</p>*/}
              </div>
              {/*<Link*/}
              {/*  href={"https://space.thefutureacademy.co.za/signup"}*/}
              {/*  className="bg-[#1F329D] p-3 px-5 font-medium tracking-wide text-white max-md:text-sm"*/}
              {/*>*/}
              {/*  Join the academy*/}
              {/*</Link>*/}
            </div>
          </div>
        </section>
        <p
          className={
            "p-2 text-center text-foreground/80 font-archivo tracking-wide max-md:text-sm"
          }
        >
          Here&apos;s a plan that gives you the structure, support, and
          consistency needed to succeed your grade. Everything is designed to
          help you stay on track, understand your work, and improve your results
          with confidence.
        </p>
        <section className="flex w-full flex-col items-center">
          <section className="mb-20 flex w-full flex-col items-center border max-md:pt-5 lg:flex-row">
            <div className="flex h-full w-full flex-col justify-between px-5 py-5 font-archivo text-2xl font-light tracking-wide text-foreground/80">
              <div className="flex flex-col items-start gap-y-2">
                <p className="max-md:text-text-6xl font-chillax text-8xl font-semibold text-foreground">
                  R400<span className="text-lg font-normal">/ month</span>
                </p>
                <p className="self-start px-3 text-sm font-medium">
                  one simple plan for all Grade 12 students
                </p>
                <ul className="flex list-disc flex-col p-5">
                  {planItems.map((item, index) => (
                    <li
                      className="flex items-center gap-x-2 py-2 text-sm font-medium"
                      key={index}
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <button className="flex items-center justify-center gap-x-2 rounded-full bg-[#1F329D] px-2 py-3 tracking-wider text-white">
                Get Started
                <HugeiconsIcon
                  strokeWidth={2}
                  size={30}
                  icon={ArrowUpRight01Icon}
                />
              </button>
            </div>
            <Separator className={"hidden lg:block"} orientation={"vertical"} />
            <Separator className={"lg:hidden"} orientation={"horizontal"} />
            <div className="flex h-full w-full flex-col justify-between px-5 py-5 font-archivo text-2xl font-light tracking-wide text-foreground/70 max-md:px-2">
              <div className="flex flex-col items-start gap-y-2 p-2">
                <p className="max-md:text-text-6xl font-chillax text-8xl font-semibold text-foreground">
                  R350<span className="text-lg font-normal">/ month</span>
                </p>
                <p className="self-start px-3 text-sm font-medium">
                  one simple plan for all Grade 11 students
                </p>
                <ul className="flex list-disc flex-col p-5">
                  {planItems.map((item, index) => (
                    <li
                      className="flex items-center gap-x-2 py-2 text-sm font-medium"
                      key={index}
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <button
                disabled={true}
                className="flex items-center justify-center gap-x-2 rounded-full bg-accent px-2 py-3 font-medium tracking-wider text-foreground"
              >
                Coming soon
              </button>
            </div>
            <Separator className={"hidden lg:block"} orientation={"vertical"} />
            <Separator className={"lg:hidden"} orientation={"horizontal"} />
            <div className="flex h-full w-full flex-col justify-between px-5 py-5 font-archivo text-2xl font-light tracking-wide text-foreground/80">
              <div className="flex flex-col items-start gap-y-2 p-2">
                <p className="max-md:text-text-6xl font-chillax text-8xl font-semibold text-foreground">
                  R300<span className="text-lg font-normal">/ month</span>
                </p>
                <p className="self-start px-3 text-sm font-medium">
                  one simple plan for all Grade 10 students
                </p>
                <ul className="flex list-disc flex-col p-5">
                  {planItems.map((item, index) => (
                    <li
                      className="flex items-center gap-x-2 py-2 text-sm font-medium"
                      key={index}
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <button
                disabled
                className="flex items-center justify-center gap-x-2 rounded-full bg-accent px-2 py-3 font-medium text-accent-foreground"
              >
                Coming soon
              </button>
            </div>
          </section>
        </section>
      </main>
    </div>
  )
}

export default PricingPage

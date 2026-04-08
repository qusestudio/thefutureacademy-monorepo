import React from "react"
import { Header } from "@/components/header"
import Link from "next/link"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  ArrowUpRight01Icon,
  Check,
  CircleCheck,
} from "@hugeicons/core-free-icons"
import Image from "next/image"
import {Separator} from "@workspace/ui/components/separator";

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
      <main className="w-full max-w-[80%] space-y-5 max-sm:px-0 xl:px-10">
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
            <h1 className="w-full border-b pt-5 pr-5 text-center text-5xl font-semibold uppercase sm:text-[7em] lg:text-[8em]">
              Find a pl
              <span className="bg-[#ffbb00]/60 dark:text-background">
                an <br /> that fit
              </span>
              <br className="lg:hidden" />
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

        <section className="flex w-full flex-col items-center">
          <section className="mb-20 flex w-full flex-col items-center gap-x-3 border max-md:pt-5 lg:flex-row">
            <div className="flex h-full w-full flex-col justify-between p-5 font-archivo text-2xl font-light tracking-wide text-muted-foreground">
              <div>
                <p className="font-chillax text-[6em] font-semibold">R400</p>
                <p className="px-3 text-sm">
                  one simple plan for all Grade 12 students
                </p>
                <ul className="flex list-disc flex-col p-5">
                  {planItems.map((item, index) => (
                    <li
                      className="flex items-center gap-x-2 py-2 font-medium text-sm lg:text-xs xl:text-sm"
                      key={index}
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <Link
                className="flex items-center justify-between rounded-lg bg-white px-2 text-black"
                href={"#"}
              >
                Select plan
                <HugeiconsIcon size={45} icon={ArrowUpRight01Icon} />
              </Link>
            </div>
            <Separator orientation={"vertical"} />
            <div className="flex h-full w-full flex-col justify-between p-5 font-archivo text-2xl font-light tracking-wide text-muted-foreground">
              <div>
                <p className="font-chillax text-[6em] font-semibold">R350</p>
                <p className="px-3 text-sm">
                  one simple plan for all Grade 11 students
                </p>
                <ul className="flex flex-col p-5">
                  {planItems.map((item, index) => (
                    <li
                      className="flex items-center gap-x-2 py-2 font-medium lg:text-xs xl:text-sm"
                      key={index}
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <Link
                className="flex items-center justify-between rounded-lg bg-white px-2 text-black"
                href={"#"}
              >
                Select plan
                <HugeiconsIcon size={45} icon={ArrowUpRight01Icon} />
              </Link>
            </div>
            <Separator orientation={"vertical"} />
            <div className="flex h-full w-full flex-col justify-between p-5 font-archivo text-2xl font-light tracking-wide text-muted-foreground">
              <div>
                <p className="font-chillax text-[6em] font-semibold">R300</p>
                <p className="px-3 text-sm">
                  one simple plan for all Grade 10 students
                </p>
                <ul className="flex flex-col p-5">
                  {planItems.map((item, index) => (
                    <li
                      className="flex items-center gap-x-2 py-2 font-medium lg:text-xs xl:text-sm"
                      key={index}
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <Link
                className="flex items-center justify-between rounded-lg bg-white px-2 text-black"
                href={"#"}
              >
                Select plan
                <HugeiconsIcon size={45} icon={ArrowUpRight01Icon} />
              </Link>
            </div>
          </section>
        </section>
      </main>
    </div>
  )
}

export default PricingPage

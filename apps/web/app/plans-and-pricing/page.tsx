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

const PricingPage = () => {

  const planItems = [
    "Access to all Grade 12 subject content",
    "Structured lessons and guided learning paths",
    "Practice questions and exams packages",
    "Step-by-step explanations for clear understanding",
    "Study notes designed for effective revision",
    "Progress tracking and feedback to improve your performance",
    "Support to keep you consistent and on track",
  ]

  return (
    <div className="flex w-full flex-col items-center font-chillax">
      <div className="fixed flex w-full flex-col items-center">
        <Header />
      </div>
      <main className="w-full max-w-[90%] space-y-5 max-sm:px-0 xl:px-10">
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
          <div className="flex w-full border max-xl:flex-col">
            <h1 className="w-full pt-5 pr-5 text-7xl font-semibold uppercase max-xl:border-b sm:text-[7em] lg:text-[8em] xl:border-r xl:text-[11em]">
              Plan
              <span className="bg-[#ffbb00]/60 dark:text-background">
                s <br /> &
              </span>
              <br className="lg:hidden" />
              <span className="bg-[#ffbb00]/60 dark:text-background">
                Prici
              </span>
              ng
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
              <Link
                href={"https://space.thefutureacademy.co.za/signup"}
                className="bg-[#1F329D] p-3 px-5 font-medium tracking-wide text-white max-md:text-sm"
              >
                Join the academy
              </Link>
            </div>
          </div>
          {/*<div className="flex w-full flex-col justify-center gap-y-10 py-10">*/}
          {/*  <div className="flex h-5 w-full max-w-xl flex-wrap items-center gap-x-2 gap-y-2 font-archivo text-lg leading-tight tracking-wide text-foreground/90 max-md:text-sm">*/}
          {/*    <span className="w-fit rounded-full border p-2">*/}
          {/*      CAPS-Aligned Curriculum*/}
          {/*    </span>*/}
          {/*    <span className="rounded-full border p-2">Grade 12</span>*/}
          {/*    <span className="rounded-full border p-2">*/}
          {/*      University Readiness*/}
          {/*    </span>*/}
          {/*  </div>*/}
          {/*</div>*/}
        </section>
        <section className="flex w-full flex-col items-center gap-x-3 py-20 font-archivo max-md:pt-5">
          <p
            className={
              "mb-4  border-b border-foreground pb-1 text-3xl max-md:text-2xl"
            }
          >
            Supported subjects
          </p>
          <article className="w-full  space-y-1 py-2">
            <p className={"text-2xl font-medium max-md:text-lg"}>Mathematics</p>
            <p className={"text-sm"}>
              Mathematics builds the foundation for problem-solving, logical
              thinking, and analytical skills that are essential in almost every
              career. Mastering Maths opens doors to fields like engineering,
              finance, data science, architecture, and technology. With strong
              mathematical skills, students gain the ability to think
              critically, approach challenges with confidence, and unlock some
              of the most in-demand career opportunities in the world.
            </p>
          </article>
          <article className="w-full  space-y-1 py-2">
            <p className="text-2xl font-medium max-md:text-lg">Physics</p>
            <p className="text-sm">
              Physics helps students understand how the world works—from motion
              and energy to forces and matter. It develops deep analytical and
              reasoning skills that are highly valued in technical and
              scientific careers. Studying Physics can lead to pathways in
              engineering, aviation, research, robotics, and even space
              sciences, giving students the tools to innovate and solve
              real-world problems.
            </p>
          </article>
          <article className="w-full  space-y-1 py-2">
            <p className="text-2xl font-medium max-md:text-lg">Chemistry</p>
            <p className="text-xm">
              Chemistry explores the building blocks of matter and how
              substances interact and transform. It is essential for
              understanding everything from medicines to materials and
              environmental processes. This subject opens pathways into careers
              such as medicine, pharmacy, chemical engineering, biochemistry,
              and environmental science, making it a powerful subject for
              students interested in science and healthcare.
            </p>
          </article>

          <article className="w-full space-y-1 py-2">
            <p className="text-2xl font-medium max-md:text-lg">Accounting</p>
            <p className="text-sm">
              Accounting teaches students how to manage, record, and interpret
              financial information—an essential skill in both business and
              everyday life. It builds a strong foundation in financial
              literacy, critical thinking, and decision-making. This subject
              leads to career opportunities in accounting, auditing, business
              management, finance, and entrepreneurship, empowering students to
              understand and control financial success.
            </p>
          </article>
        </section>
        <section className="flex w-full flex-col items-center">
          <section className="mb-20 flex w-full max-w-6xl flex-col items-center gap-x-3 max-md:pt-5 lg:flex-row">
            <div className="flex h-full w-full flex-col justify-between rounded-l-xl border border-black bg-[#ffbb00] p-5 font-archivo text-2xl font-light tracking-wide text-black">
              <div>
                <p className="font-chillax text-[7em] font-semibold">R400</p>
                <p className="px-3 text-sm">one simple plan for all students</p>
                <ul className="flex flex-col p-5">
                  {planItems.map((item, index) => (
                    <li
                      className="flex items-center gap-x-2 py-2 font-chillax font-medium lg:text-xs xl:text-sm"
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
            <div className="flex h-full w-full flex-col border"></div>
            <div className="relative flex h-full w-full flex-col rounded-r-xl border"></div>
          </section>
        </section>
      </main>
    </div>
  )
}

export default PricingPage

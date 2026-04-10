"use client"

import React from "react"
import { Header } from "@/components/header"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"

type NavLink = {
  label: string;
  link: string;
};

const sectionLinks: NavLink[] = [
  { label: "What to expect?", link: "/what-to-expect" },
  {
    label: "Core platform experience",
    link: "/what-to-expect/core-platform-experience",
  },
  {
    label: "Learning system",
    link: "/what-to-expect/learning-system",
  },
  {
    label: "Subjects offered",
    link: "/what-to-expect/subjects-offered",
  },
  {
    label: "Live & Interactive Support",
    link: "/what-to-expect/live-and-interactive-support",
  },
  {
    label: "Progress & Performance",
    link: "/what-to-expect/progress-and-performance",
  },
  {
    label: "Communication & Community",
    link: "/what-to-expect/communication-and-community",
  },
  {
    label: "Student experience",
    link: "/what-to-expect/student-experience",
  },
  {
    label: "Outcomes & Goals",
    link: "/what-to-expect/outcomes-and-goals",
  },
];


const DocsLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  return (
    <div className="flex w-full flex-col items-center font-chillax">
      <div className="fixed flex w-full flex-col items-center">
        <Header />
      </div>
      <main className="w-full max-w-[75%] space-y-5 max-md:max-w-[90%] max-sm:px-0">
        <section className="flex w-full py-10 pt-50 font-archivo">
          {/*  First Column */}
          <div className="flex w-full flex-1 flex-col gap-y-3 text-sm text-muted-foreground">
            <div className="mb-5 flex w-full items-center gap-x-5 self-start font-chillax text-4xl max-md:gap-x-1 max-md:p-1 max-md:text-3xl max-sm:text-3xl">
              <Image
                alt={"/globe.svg"}
                src={"/logo-image.svg"}
                height={70}
                width={70}
                className="text-white max-md:p-3 max-md:text-2xl"
              />
              <Link className="flex max-md:hidden" href={"/"}>
                <p className="text-2xl leading-5 font-semibold text-foreground uppercase">
                  The
                  <br /> Future
                  <br /> Academy
                </p>
              </Link>
            </div>
            {
              sectionLinks.map(({label, link}, index) => {
                const active = pathname === link;
                return (
                  <Link
                    key={index}
                    href={link}
                    className={`${active ? "text-blue-600" : "text-foreground/70"}`}
                  >
                    {label}
                  </Link>
                )
              })
            }
          </div>
          {/*  Second Column */}
          {children}
        </section>
      </main>
    </div>
  )
}

export default DocsLayout

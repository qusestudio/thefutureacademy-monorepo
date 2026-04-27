"use client"

import React from "react"
import { usePathname } from "next/navigation"
import { useGetStudentQuery } from "@/state/api"
import Image from "next/image"
import { Skeleton } from "@workspace/ui/components/skeleton"
import Link from "next/link"

type TabLink = {
  label: string
  href: string
}



const StudentProfileLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const studentId = pathname.split("/")[3]
  const { data: student, isLoading } = useGetStudentQuery(studentId!, {
    skip: !studentId,
  })

  const tabs:TabLink[] = [
    { label: "Profile", href: `/dashboard/students/${studentId}` },
    { label: "Subscriptions", href: `/dashboard/students/${studentId}/subscriptions` },
  ]


  return (
    <main className="flex w-full flex-col items-center gap-y-5 p-5">
      <section className="flex w-full flex-col items-center gap-y-5 p-5">
        <p className="text-lg font-medium">Student Profile</p>
        <div className="flex w-full items-center gap-x-4">
          <div className={"h-px w-full bg-border"} />
          <Image src={"/logo-image.svg"} alt="profile" width={75} height={75} />
          <div className={"h-px w-full bg-border"} />
        </div>
        <>
          {isLoading ? (
            <Skeleton
              className={"h-6 w-40 animate-pulse rounded-full bg-accent"}
            />
          ) : (
            student?.email
          )}
        </>
      </section>

      <section className="flex w-full flex-col gap-y-5">
        {/** Tabs */}
        <nav className="max-w-6xl">
          {tabs.map((tab, i) => (
            <Link
              key={i}
              href={tab.href}
              className={`rounded-full p-5 py-2 text-sm ${pathname === tab.href ? "bg-[#1F329D] text-white" : ""}`}
            >
              {tab.label}
            </Link>
          ))}
        </nav>
        <section className="p-5">{children}</section>
      </section>
    </main>
  )
}

export default StudentProfileLayout

"use client"

import React, { useState } from "react"
import { Separator } from "@workspace/ui/components/separator"
import Image from "next/image"
import { IconlyGraph } from "@workspace/ui/components/iconly-icons"
import { Button } from "@workspace/ui/components/button"
import { ContentDrawer } from "@/components/drawers/content-drawer"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  Edit02Icon,
  PencilEdit02Icon,
  PieChart01Icon,
  PieChart02Icon,
  Plus,
} from "@hugeicons/core-free-icons"
import { useGetAllSubjectsQuery } from "@/state/api"
import { Skeleton } from "@workspace/ui/components/skeleton"
import { CLOUDFRONT } from "@/lib/constants"
import { CreateContentDrawer } from "@/components/drawers/create-content-drawer"
import { useRouter } from "next/navigation"
import Link from "next/link"

// I love coding
interface CourseListItemProps {
  id: string
  src: string
  title: string
  term: number
  grade: number
}

const CourseListItem = (props: CourseListItemProps) => {
  const router = useRouter()
  const { id, src, title, term } = props
  return (
    <Link
      href={`/content/${id}`}
      className="flex w-full flex-col gap-x-5 gap-y-2 rounded-xl border border-none bg-accent p-2"
    >
      {/* Subject Image */}
      <div className="relative flex aspect-video h-full w-full flex-col gap-y-4 rounded p-5 font-medium text-background">
        <Image
          src={`${CLOUDFRONT}/${src}`}
          alt={title}
          fill
          className="h-auto w-full rounded-lg object-cover"
        />
      </div>
      {/* Subject Title and Term*/}
      <div className="flex flex-col justify-between">
        <div className="flex flex-col gap-y-1 px-3">
          <div className="flex w-full items-center justify-between">
            <p className="text-xl capitalize">{title}</p>
            <ContentDrawer
              id={id}
              icon={
                <HugeiconsIcon
                  className="text-muted-foreground"
                  size={25}
                  icon={PencilEdit02Icon}
                />
              }
            />
          </div>
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold tracking-wider text-muted-foreground uppercase">
              {id}
            </p>
            <p className="flex items-center bg-accent p-1 px-2 rounded-full gap-x-1 text-lg font-medium text-muted-foreground uppercase">
              <HugeiconsIcon size={20} icon={PieChart02Icon} strokeWidth={1} />{" "}
              {term}
            </p>
          </div>
        </div>
      </div>
    </Link>
  )
}

const CourseList = () => {
  const [selectedIds, setSelectedIds] = useState<string[]>([])
  const { data: subjects, isLoading } = useGetAllSubjectsQuery()

  return (
    <div>
      <div className="@container/main flex flex-1 flex-col gap-5 pb-5 font-chillax ">
        <h1 className="text-4xl font-medium">Course List</h1>
        <CreateContentDrawer />
      </div>
      {/*<Separator />*/}
      {isLoading ? (
        <div className="flex w-full flex-col gap-y-5 p-5">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i}>
              <div className="grid w-full grid-cols-5 gap-x-5 rounded-xl bg-accent/50 p-2">
                <Skeleton className="aspect-video w-full rounded-lg" />
                <div className="col-span-4 flex flex-col gap-y-5">
                  <Skeleton className="h-8 w-2/5 rounded-sm" />
                  <Skeleton className="h-8 w-2/9 rounded-sm" />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="no-scrollbar pt-5 grid w-full grid-cols-4 flex-col gap-5 overflow-y-auto ">
          {subjects?.map(({ title, id, image, term, grade }, i) => (
            <CourseListItem
              key={i}
              id={id}
              src={image}
              title={title}
              term={term}
              grade={grade}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default CourseList

"use client"

import React, { useState } from "react"
import { Separator } from "@workspace/ui/components/separator"
import Image from "next/image"
import { IconlyGraph } from "@workspace/ui/components/iconly-icons"
import { Button } from "@workspace/ui/components/button"
import { ContentDrawer } from "@/components/drawers/content-drawer"
import { HugeiconsIcon } from "@hugeicons/react"
import { Edit02Icon, Plus } from "@hugeicons/core-free-icons"
import { useGetAllSubjectsQuery } from "@/state/api"
import { Skeleton } from "@workspace/ui/components/skeleton"
import { CLOUDFRONT } from "@/lib/constants"
import { CreateContentDrawer } from "@/components/drawers/create-content-drawer"
import { useRouter } from "next/navigation"


// I love coding
interface CourseListItemProps {
  id: string
  src: string
  title: string
  term: number
  grade: number
}

const CourseListItem = (props: CourseListItemProps) => {
  const router = useRouter();
  const {id, src, title, term } = props;
  return (
    <div className="grid w-full grid-cols-5 rounded-sm gap-x-5 border-2  bg-accent p-2">
      {/* Subject Image */}
      <div className="relative flex aspect-video h-full w-full flex-col gap-y-4 rounded border-background p-5 font-medium text-background">
        <Image
          src={`${CLOUDFRONT}/${src}`}
          alt={title}
          fill
          className="h-auto w-full rounded-sm object-cover"
        />
      </div>
      {/* Subject Title and Term*/}
      <div className="col-span-4 flex flex-col justify-between gap-y-5">
        <div className="flex w-full items-center justify-between">
          <p className="text-2xl capitalize">{title}</p>
          <div className="rounded-md border-2 border-muted-foreground p-1">
            <ContentDrawer
              id={id}
              icon={
                <HugeiconsIcon
                  className="text-muted-foreground"
                  size={20}
                  icon={Edit02Icon}
                />
              }
            />
          </div>
        </div>
        <p className="uppercase font-medium tracking-wider text-xl">{id}</p>
        <p className="flex uppercase text-lg items-center gap-x-3 font-medium">
          <IconlyGraph /> Term {term}
        </p>
        <Button onClick={()=>{router.push(`/content/${id}`)}} className="cursor-pointer rounded bg-foreground p-3 text-sm text-background">
          View Subject
        </Button>
      </div>
    </div>
  )
}

const CourseList = () => {
  const [selectedIds, setSelectedIds] = useState<string[]>([])
  const { data: subjects, isLoading } = useGetAllSubjectsQuery();

  return (
    <div>
      <div className="@container/main flex flex-1 flex-col gap-5 p-5 font-chillax max-md:px-0 lg:p-10">
        <h1 className="text-4xl md:text-5xl lg:text-5xl">Course List</h1>
        <CreateContentDrawer />
      </div>
      <Separator />
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
        <div className="flex w-full no-scrollbar overflow-y-auto flex-col gap-y-5 p-5">
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

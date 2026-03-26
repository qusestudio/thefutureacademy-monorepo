import { Button } from "@workspace/ui/components/button"
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@workspace/ui/components/drawer"
import React from "react"
import { SubjectForm } from "@/components/forms/subject-form"
import { useGetSubjectQuery } from "@/state/api"
import { Spinner } from "@workspace/ui/components/spinner"
import { description } from "@/components/chart-area-interactive"
interface DrawerProps {
  id: string
  icon: React.ReactNode
}



export type FormValues = {
  title: string
  image: string
  term: string
  grade: string
  description: string[]
}

export function ContentDrawer({ icon, id }: DrawerProps) {
  const {data, isLoading} = useGetSubjectQuery(id);

  const initialValues = {
    id: data?.id || "",
    title: data?.title || "",
    image: data?.image || "",
    term: data?.term.toString() || "1",
    grade: data?.grade.toString() || "12",
    description: data?.description || [""],
  }

  return (
    <Drawer direction="right">
      <DrawerTrigger className={"cursor-pointer"} asChild>
        {icon}
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Subject Form</DrawerTitle>
        </DrawerHeader>
        {/** Edit Subject Form */}
        <div className="no-scrollbar overflow-y-auto">
          {isLoading ? (
            <div className="flex h-full w-full flex-col items-center justify-center">
              <Spinner />
            </div>
          ) : (
            <SubjectForm
              initialValues={initialValues}
              label={"Edit Subject"}
              description={"Update subject details here."}
            />
          )}
        </div>
      </DrawerContent>
    </Drawer>
  )
}

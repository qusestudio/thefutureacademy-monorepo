import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@workspace/ui/components/drawer"
import React from "react"
import { SubjectForm } from "@/components/forms/subject-form"
import { HugeiconsIcon } from "@hugeicons/react"
import { Plus } from "@hugeicons/core-free-icons"

export function CreateContentDrawer() {
  const initialValues = {
    id: "",
    title: "",
    image: "",
    term: "1",
    grade: "12",
    description: [{ value: "" }],
  }

  return (
    <Drawer direction="right">
      <DrawerTrigger
        className={
          "flex cursor-pointer gap-x-2 self-start rounded-full border-2 border-foreground p-2"
        }
        asChild
      >
        <div>
          <HugeiconsIcon icon={Plus} /> Create Course
        </div>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Subject Form</DrawerTitle>
        </DrawerHeader>
        {/** Edit Subject Form */}
        <div className="no-scrollbar overflow-y-auto">
          <SubjectForm
            initialValues={initialValues}
            label={"Create Course"}
            description={"Add subject details here."}
          />
        </div>
      </DrawerContent>
    </Drawer>
  )
}

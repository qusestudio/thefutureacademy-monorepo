import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@workspace/ui/components/drawer"
import React from "react"
import { HugeiconsIcon } from "@hugeicons/react"
import { Plus } from "@hugeicons/core-free-icons"
import { TopicForm } from "@/components/forms/topic-form"

export function CreateTopicFormDrawer({subjectId}: {subjectId: string}) {
  const initialValues = {
    id: "",
    subjectId: subjectId,
    title: "",
    description: "",
  }

  return (
    <Drawer direction="right">
      <DrawerTrigger
        className={
          "flex cursor-pointer items-center gap-x-1 self-start rounded-full text-sm font-medium"
        }
        asChild
      >
        <HugeiconsIcon size={20} icon={Plus} />
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Topic Form</DrawerTitle>
        </DrawerHeader>
        {/** Edit Subject Form */}
        <div className="no-scrollbar overflow-y-auto">
          <TopicForm
            initialValues={initialValues}
            label={"Add topic for subject."}
            description={"Add topic details here."}
            subjectId={subjectId}
          />
        </div>
      </DrawerContent>
    </Drawer>
  )
}

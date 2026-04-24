import React from "react"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@workspace/ui/components/tabs"
import { HugeiconsIcon } from "@hugeicons/react"
import { Download01Icon } from "@hugeicons/core-free-icons"
import { PdfAttachment, NoFileCard } from "@/components/pdf-attachment"

const LessonResourcesTab = () => {
  return (
    <Tabs
      defaultValue="account"
      className="w-full rounded-xl border-2 border-foreground px-2 py-5"
    >
      <TabsList className="rounded-xl bg-transparent">
        <TabsTrigger
          className="rounded-xl border-none p-3 text-sm tracking-wider data-active:bg-[#ffbb00]/60 dark:data-active:bg-[#ffbb00] dark:data-active:text-black"
          value="account"
        >
          Files
        </TabsTrigger>
        <TabsTrigger
          className="rounded-xl border-none p-3 text-sm tracking-wider data-active:bg-[#ffbb00]/60 dark:data-active:bg-[#ffbb00] dark:data-active:text-black"
          value="q-and-a"
        >
          Q&A
        </TabsTrigger>
      </TabsList>
      <TabsContent value="account" className="p-5">
        {/*<div className="flex cursor-pointer items-center gap-x-5 font-medium">*/}
        {/*  <p className="text-sm uppercase">Lesson notes</p>*/}
        {/*  <HugeiconsIcon strokeWidth={2} size={20} icon={Download01Icon} />*/}
        {/*</div>*/}
        <div className="flex flex-wrap gap-4">
          {/* Example without a thumbnail (uses the sleek fallback) */}
          <NoFileCard fileName="No files yet" thumbnailUrl={"/file.svg"} />
        </div>
      </TabsContent>
      <TabsContent value="q-and-a" className="p-5">
        {/*<div className="flex cursor-pointer items-center gap-x-5 font-medium">*/}
        {/*  <p className="text-sm uppercase">Lesson notes</p>*/}
        {/*  <HugeiconsIcon strokeWidth={2} size={20} icon={Download01Icon} />*/}
        {/*</div>*/}
        <div className="flex flex-wrap gap-4">
          {/* Example without a thumbnail (uses the sleek fallback) */}
          No Q&As yet
        </div>
      </TabsContent>
    </Tabs>
  )
}

export default LessonResourcesTab

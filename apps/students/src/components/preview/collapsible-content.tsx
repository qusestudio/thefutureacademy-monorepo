"use client"
import {  CardContent } from "@workspace/ui/components/card"
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent
} from "@workspace/ui/components/collapsible"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  ArrowDown,
  ArrowUp,
  ArrowUp01,
  Cancel01Icon,
  Close,
  PlayIcon,
  PlusSignIcon,
} from "@hugeicons/core-free-icons"
import { useState } from "react"
import { Button } from "@workspace/ui/components/button"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Topic } from "@/types/models"
import { useGetLessonsQuery } from "@/state/api"
import { Skeleton } from "@workspace/ui/components/skeleton"
import * as React from "react"
import LessonCollapsible from "@/components/LessonsCollapsible"
import { AnimatePresence, motion } from "framer-motion"

interface Props {
  title: string
  description: string
}

export function CollapsibleTopic({ title, description }: Props) {
  const [open, setOpen] = useState(false)

  return (
    <div className="mx-auto w-full border-none bg-transparent">
      <CardContent className="border-none">
        <Collapsible className="w-full space-y-4 rounded-md border-none data-[state=open]:bg-muted">
          <CollapsibleTrigger
            onClick={() => setOpen(!open)}
            className="flex w-full"
          >
            <span className="group flex w-full items-center justify-between text-left text-xl font-normal uppercase max-md:text-lg">
              {title}
              <motion.div
                animate={{ rotate: open ? 45 : 0 }}
                transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
                className="ml-auto shrink-0"
              >
                <HugeiconsIcon
                  icon={open ? Cancel01Icon : PlusSignIcon}
                  size={25}
                />
              </motion.div>
            </span>
          </CollapsibleTrigger>

          <AnimatePresence initial={false}>
            {open && (
              <motion.div
                key="content"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{
                  height: { duration: 0.35, ease: [0.25, 0.1, 0.25, 1] },
                  opacity: { duration: 0.2, ease: "easeOut" },
                }}
                style={{ overflow: "hidden" }}
                className="flex flex-col items-start gap-2 border-none text-sm text-muted-foreground"
              >
                <motion.div
                  initial={{ y: 6, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1, duration: 0.2, ease: "easeOut" }}
                  className="text-sm leading-6 font-medium"
                >
                  {description}
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </Collapsible>
      </CardContent>
    </div>
  )
}

interface itemProps {
  title: string
  topicId: string
  subjectId: string
}

export function CollapsibleTopicItem({ title, topicId, subjectId }: itemProps) {
  const [open, setOpen] = useState(false)
  const { data: lessons, isLoading: lessonsLoading } = useGetLessonsQuery(topicId, {
    skip: !open,
  })
  const pathname = usePathname()
  return (
    <div className="mx-auto w-full cursor-pointer border-none bg-transparent">
      <CardContent className="cursor-pointer border-none px-0">
        <LessonCollapsible
          open={open}
          setOpen={setOpen}
          title={title}
          subjectId={subjectId}
          lessons={lessons}
          lessonsLoading={lessonsLoading}
        />
      </CardContent>
    </div>
  )
}

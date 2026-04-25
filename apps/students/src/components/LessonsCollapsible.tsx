"use client"

import { usePathname } from "next/navigation"
import {
  Collapsible,
  CollapsibleTrigger,
} from "@workspace/ui/components/collapsible"
import { AnimatePresence, motion } from "framer-motion"
import { HugeiconsIcon } from "@hugeicons/react"
import { ArrowDown, ArrowUp, PlayIcon } from "@hugeicons/core-free-icons"
import { Skeleton } from "@workspace/ui/components/skeleton"
import Link from "next/link"

export default function LessonCollapsible({
  open,
  setOpen,
  title,
  subjectId,
  lessons,
  lessonsLoading,
}: {
  open: boolean
  setOpen: (val: boolean) => void
  title: string
  subjectId: string
  lessons: { id: string; title: string }[] | undefined
  lessonsLoading: boolean
}) {
  const pathname = usePathname()

  return (
    <Collapsible
      open={open}
      className={`flex h-full w-full flex-col space-y-2 rounded-lg border-2 border-foreground py-2 font-medium data-[state=open]:bg-muted`}
    >
      <CollapsibleTrigger
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between gap-2 px-4 text-[20px]"
      >
        <span className="group flex w-full items-center justify-between gap-2 transition-all duration-200">
          <span className="min-w-0 flex-1 truncate text-left">{title}</span>
          <motion.div
            animate={{ rotate: open ? 180 : 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="shrink-0"
          >
            <HugeiconsIcon icon={open ? ArrowUp : ArrowDown} size={25} />
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
            className="flex w-full flex-col items-start gap-2 border-none pb-2 text-muted-foreground"
          >
            {!lessonsLoading && lessons?.length === 0 && (
              <div className="flex w-full items-center justify-center gap-2 bg-accent py-4">
                <span className="text-sm">No lessons yet</span>
              </div>
            )}

            {lessonsLoading
              ? Array.from({ length: 5 }, (_, index) => (
                  <div key={index} className="w-full px-2">
                    <Skeleton className="h-8 w-full rounded-lg bg-accent" />
                  </div>
                ))
              : lessons?.map((lesson, idx) => (
                  <motion.div
                    key={lesson.id}
                    initial={{ opacity: 0, x: -6 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: idx * 0.04,
                      duration: 0.2,
                      ease: "easeOut",
                    }}
                    className="w-full"
                  >
                    <Link
                      href={`/my-learning/${subjectId}/${lesson.id}`}
                      className={`flex justify-between px-15 text-[18px] ${
                        pathname === `/my-learning/${subjectId}/${lesson.id}`
                          ? "border-foreground bg-[#ffbb00]/60 dark:bg-[#ffbb00] dark:text-black"
                          : "border-foreground"
                      } w-full items-center gap-x-5 border-y-2 py-1 font-normal text-foreground dark:border-none`}
                    >
                      <span>
                        {idx + 1}.{"  "}
                        <span className="underline">{lesson?.title}</span>
                      </span>
                      <HugeiconsIcon
                        className="fill-black"
                        size={20}
                        icon={PlayIcon}
                      />
                    </Link>
                  </motion.div>
                ))}
          </motion.div>
        )}
      </AnimatePresence>
    </Collapsible>
  )
}

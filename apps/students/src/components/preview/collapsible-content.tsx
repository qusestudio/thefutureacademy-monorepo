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
  PlusSignIcon,
} from "@hugeicons/core-free-icons"
import { useState } from "react"
import { Button } from "@workspace/ui/components/button"
import Link from "next/link"
import { usePathname } from "next/navigation"


export function CollapsibleTopic() {
  const [open, setOpen] = useState(false)
  return (
    <div className="mx-auto  w-full border-none bg-transparent">
      <CardContent className="border-none">
        <Collapsible className="w-full rounded-md space-y-4 border-none data-[state=open]:bg-muted">
          <CollapsibleTrigger onClick={()=>setOpen(!open)} className="flex w-full">
            <span className="group flex w-full uppercase justify-between text-xl font-normal">
              Sequences and Series
              <HugeiconsIcon
                icon={open ? Cancel01Icon : PlusSignIcon }
                size={25}
                className="ml-auto group-data-[state=open]:rotate-45"
              />
            </span>
          </CollapsibleTrigger>
          <CollapsibleContent className="flex  flex-col items-start gap-2 border-none text-sm text-muted-foreground">
            <div className="text-sm font-medium leading-6">
              Learners explore patterns in numbers and how they can be
              described, extended, and summed. The focus is on understanding
              arithmetic and geometric sequences, finding general terms, and
              calculating sums of series, including finite and infinite cases.
              Students also learn to recognise real life applications, develop
              formulas, and solve problems that require logical thinking and
              pattern recognition.
            </div>
          </CollapsibleContent>
        </Collapsible>
      </CardContent>
    </div>
  )
}

export function CollapsibleTopicItem({}) {
  const [open, setOpen] = useState(false)
  const pathname = usePathname();
  return (
    <div className="mx-auto w-full cursor-pointer border-none bg-transparent">
      <CardContent className="cursor-pointer border-none px-0">
        <Collapsible className="w-full space-y-2 rounded-md border-none data-[state=open]:bg-muted">
          <CollapsibleTrigger
            onClick={() => setOpen(!open)}
            className="flex w-full"
          >
            <span
              className={`group ${open ? "font-medium text-foreground" : "text-muted-foreground"} flex w-full cursor-pointer justify-between text-sm transition-all duration-200`}
            >
              Sequences and Series
              <HugeiconsIcon
                icon={open ? ArrowUp : ArrowDown}
                size={25}
                className="ml-auto group-data-[state=open]:rotate-45"
              />
            </span>
          </CollapsibleTrigger>
          <CollapsibleContent className="flex flex-col items-start gap-2 border-none text-sm text-muted-foreground">
            <Link
              href="/my-learning/mth1001/introduction"
              className={`flex ${pathname == "/my-learning/mth1001/introduction" ? "text-primary" : ""} items-center gap-x-5 text-sm font-medium`}
            >
              <Button
                variant={"outline"}
                size={"icon"}
                className="rounded-full border"
              >
                1
              </Button>
              Introduction
            </Link>
            <Link
              href="/my-learning/mth1001/patterns"
              className={`flex items-center ${pathname == "/my-learning/mth1001/patterns" ? "text-primary" : ""} gap-x-5 text-sm font-medium`}
            >
              <Button
                variant={"outline"}
                size={"icon"}
                className={`rounded-full  border`}
              >
                2
              </Button>
              Patterns
            </Link>
          </CollapsibleContent>
        </Collapsible>
      </CardContent>
    </div>
  )
}

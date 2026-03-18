import { Separator } from "@workspace/ui/components/separator"
import { SidebarTrigger } from "@workspace/ui/components/sidebar"
import { SearchIcon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import * as React from "react"

export function SiteHeader() {
  return (
    <header className="grid h-(--header-height) shrink-0 grid-cols-3 items-center gap-2 border-b font-chillax transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 h-4 data-vertical:self-auto"
        />
        <h1 className="text-base">@thefutureacademy</h1>
      </div>
      <form className="flex w-full items-center gap-x-2 rounded-full bg-accent p-1.5">
        <HugeiconsIcon
          size={20}
          className="text-gray-400"
          icon={SearchIcon}
          strokeWidth={2}
        />
        <input className="w-full text-sm outline-none" />
      </form>
    </header>
  )
}

import React from "react"
import { HugeiconsIcon } from "@hugeicons/react"
import { LockedIcon } from "@hugeicons/core-free-icons"

const SectionLocker = () => {
  return (
    <section className="flex  w-full flex-col items-center justify-center py-[5%]">
      <div className="flex flex-col items-center gap-y-4">
        <HugeiconsIcon
          className="size-50 stroke-[1px] text-accent"
          strokeWidth={1}
          icon={LockedIcon}
        />
        <button className="rounded-xs cursor-pointer bg-primary p-3 px-10 text-lg text-white ">
          Activate plan
        </button>
      </div>
    </section>
  )
}

export default SectionLocker

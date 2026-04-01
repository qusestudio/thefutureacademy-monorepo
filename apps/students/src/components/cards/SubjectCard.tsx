import Link from "next/link"
import Image from "next/image"
import { CLOUDFRONT } from "@/lib/constants"
import { HugeiconsIcon } from "@hugeicons/react"
import { PieChart02Icon } from "@hugeicons/core-free-icons"

interface SubjectCardProps {
  id: string
  src: string
  title: string
  term: number
  grade: number
}

const SubjectCard = (props: SubjectCardProps) => {
  const { id, src, title, term } = props
  return (
    <Link
      href={`/content/${id}`}
      className="flex w-full flex-col gap-x-5 gap-y-2 rounded-xl bg-accent p-2"
    >
      {/* Subject Image */}
      <div className="relative flex aspect-video h-full w-full flex-col gap-y-4 rounded p-5 font-medium text-background">
        <Image
          src={`${CLOUDFRONT}/${src}`}
          alt={title}
          fill
          className="h-auto w-full rounded-lg object-cover"
        />
      </div>
      {/* Subject Title and Term*/}
      <div className="flex flex-col justify-between">
        <div className="flex flex-col gap-y-1 px-3">
          <div className="flex w-full items-center justify-between">
            <p className="text-xl capitalize">{title}</p>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold tracking-wider uppercase text-muted-foreground">
              {id}
            </p>
            <p className="flex items-center gap-x-1 rounded-full bg-accent p-1 px-2 text-lg font-medium uppercase text-muted-foreground">
              <HugeiconsIcon size={20} icon={PieChart02Icon} strokeWidth={1} />
              {term}
            </p>
          </div>
        </div>
      </div>
    </Link>
  )
}

const SubjectPreviewCard = (props: SubjectCardProps) => {
  const { id, src, title, term } = props
  return (
    <Link
      href={`/dashboard/available-subjects/preview?subjectId=${id}`}
      className="flex w-full flex-col gap-x-5 gap-y-2 rounded-xl p-2"
    >
      {/* Subject Image */}
      <div className="relative flex aspect-video h-full w-full flex-col gap-y-4 rounded p-5 font-medium text-background">
        <Image
          src={`${CLOUDFRONT}/${src}`}
          alt={title}
          fill
          className="h-auto w-full rounded-lg object-cover"
        />
      </div>
      {/* Subject Title and Term*/}
      <div className="flex flex-col justify-between gap-y-2">
        <div className="flex gap-y-1 px-3">
          <div className="flex w-full items-center justify-between">
            <p className="text-2xl capitalize">{title}</p>
          </div>
          <div className="flex items-center justify-between">
            <p className="flex items-center gap-x-1 rounded-full border border-foreground bg-[#ffbb00]/60 p-1 px-2 text-lg font-medium uppercase dark:border-[#ffbb00] dark:bg-transparent dark:text-[#ffbb00]">
              <HugeiconsIcon size={20} icon={PieChart02Icon} strokeWidth={1} />
              {term}
            </p>
          </div>
        </div>
        <button className="rounded-lg border-2 border-foreground p-3">
          Preview
        </button>
      </div>
    </Link>
  )
}

export { SubjectCard, SubjectPreviewCard }

"use client"

import { ColumnDef } from "@tanstack/react-table"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  ArrowRight01Icon,
  ArrowUpDown,
} from "@hugeicons/core-free-icons"
import { redirect, usePathname, useRouter } from "next/navigation"

// Shape of our data.
export type Student = {
  id: number
  cognitoId: string
  name: string
  email: string
  phoneNumber: string
}



export const columns: ColumnDef<Student>[] = [
  {
    accessorKey: "id",
    header: "Id",
  },
  {
    accessorKey: "cognitoId",
    header: "Student Id",
  },
  {
    accessorKey: "name",
    header: "Username",
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <button
          className={
            "flex cursor-pointer items-center gap-x-2 rounded-sm p-2 hover:bg-accent"
          }
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <HugeiconsIcon size={17} icon={ArrowUpDown} />
        </button>
      )
    },
  },
  {
    accessorKey: "phoneNumber",
    header: "Phone Number",
  },
  {
    accessorKey: "Actions",
    id: "actions",
    cell: ({ row }) => {
      const pathname = usePathname();
      const router = useRouter();
      const student = row.original
      return (
        <button
          className="tm flex cursor-pointer items-center gap-x-1 rounded-full transition-all duration-200 bg-[#1F329D]/70 px-4 py-1.5 text-xs tracking-wide text-white hover:bg-blue-600"
          onClick={() => router.push(`${pathname}/${student.cognitoId}`)}
        >
          View <HugeiconsIcon className="size-5" icon={ArrowRight01Icon} />
        </button>
      )
    },
  },
]

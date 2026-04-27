"use client"

import { ColumnDef } from "@tanstack/react-table"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  ArrowRight01Icon,
  ArrowUpDown,
} from "@hugeicons/core-free-icons"
import { redirect, usePathname, useRouter } from "next/navigation"

// Shape of our data.
type StudentSubscription = {
  id: string
  studentId: string
  planId: string
  status: string
  currentPeriodStart: string
  currentPeriodEnd: string
  cancelAtPeriodEnd: boolean
}



export const subscriptionColumns: ColumnDef<StudentSubscription>[] = [
  {
    accessorKey: "id",
    header: "Id",
  },
  {
    accessorKey: "studentId",
    header: "Student Id",
  },
  {
    accessorKey: "planId",
    header: "Plan",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "currentPeriodStart",
    header: "Start Date",
  },
  {
    accessorKey: "currentPeriodEnd",
    header: ({ column }) => {
      return (
        <button
          className={
            "flex cursor-pointer items-center gap-x-2 rounded-sm p-2 hover:bg-accent"
          }
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          End Date
          <HugeiconsIcon size={17} icon={ArrowUpDown} />
        </button>
      )
    },
  },
  {
    accessorKey: "cancelAtPeriodEnd",
    header: "Cancelled",
  },
]

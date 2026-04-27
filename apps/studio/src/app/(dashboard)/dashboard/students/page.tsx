"use client"

import React from "react"
import { useGetAllStudentsQuery, useGetAllSubjectsQuery } from "@/state/api"
import { DataTable } from "@/app/(dashboard)/dashboard/students/data-table"
import { columns } from "@/app/(dashboard)/dashboard/students/columns"

const StudentsManagement = () => {
  const {data: students, isLoading} = useGetAllStudentsQuery();
  return (
    <div className="w-full h-full p-5  flex flex-col">
    {/*  Table Here. */}
      {
        isLoading ? <div>Loading...</div> : <DataTable columns={columns} data={students!} />
      }
    </div>
  )
}

export default StudentsManagement

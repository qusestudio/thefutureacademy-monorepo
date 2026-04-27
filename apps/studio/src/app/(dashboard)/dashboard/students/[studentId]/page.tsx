"use client"
import React from "react"
import { usePathname } from "next/navigation"
import { useGetStudentQuery } from "@/state/api"

const StudentProfilePage = () => {
  const studentId = usePathname().split("/").pop();
  const { data: student, isLoading } = useGetStudentQuery(studentId!, {
    skip: !studentId,
  })


  return (
    <div className="flex w-full flex-col gap-y-5">
      {/*  ====================================================================*/}
      <p>Profile</p>
    </div>
  )
}

export default StudentProfilePage

import React from "react"
import SubjectView from "@/components/views/SubjectView"
import { ContentResizableView } from "@/components/views/ContentResizableView"

interface Props {
  params: Promise<{ subjectId: string }>
}

const SubjectPage = async ({params}: Props) => {
  const {subjectId} = await params;
  return (
    <div className="w-full h-full no-scrollbar overflow-y-auto">
      <SubjectView subjectId={subjectId} />
    </div>
  )
}

export default SubjectPage

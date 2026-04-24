import React from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset, SidebarProvider } from "@workspace/ui/components/sidebar"
import { SiteHeader } from "@/components/site-header"
import { TopicsSidebar } from "@/components/my-learning/topics-sidebar"

interface LayoutProps {
  children: React.ReactNode
  params: Promise<{subjectId: string}>
}

const SubjectLayout = async ({ params, children }: LayoutProps) => {
  const { subjectId } = await params;
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 120)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <TopicsSidebar subjectId={subjectId} variant="inset" />
      <SidebarInset className="rounded-none">
        <div className="m-2 h-full">
          <SiteHeader subjectId={subjectId} />
          <div className="flex flex-1 flex-col items-center">
            <div className="@container/main flex w-full max-w-full px-[2%] flex-1 flex-col gap-2 rounded-lg font-chillax">
              {children}
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}

export default SubjectLayout

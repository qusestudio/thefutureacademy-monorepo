import React from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset, SidebarProvider } from "@workspace/ui/components/sidebar"
import { SiteHeader } from "@/components/site-header"
import { SectionCards } from "@/components/section-cards"
import { ChartAreaInteractive } from "@/components/chart-area-interactive"
import { DataTable } from "@/components/data-table"
import data from "@/app/(dashboard)/dashboard/data.json"

const DashboardLayout = ({children}: {children: React.ReactNode}) => {
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 120)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset
      >
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex w-full flex-1 flex-col gap-2 py-5 font-chillax">
            {children}
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}

export default DashboardLayout

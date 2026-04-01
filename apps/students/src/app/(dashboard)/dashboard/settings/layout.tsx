"use client"

import React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

const SettingsLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname()

  const links: { label: string; href: string }[] = [
    { label: "Profile", href: "/profile" },
    // {label: "Notifications", href: "/notifications"},
    { label: "Billing & Payments", href: "/billing" },
    // {label: "Security", href: "/security"},
  ]

  return (
    <div className="flex h-full w-full max-w-300 flex-col gap-y-5 py-5">
      <section className="space-y-4">
        <p className="font-semibold">Settings</p>
        <p className="text-xs font-medium text-muted-foreground">
          Update your profile, adjust notification preferences, manage payments,
          and configure your account settings.
        </p>
      </section>
      <div className="flex gap-x-2 rounded-sm border p-1 text-xs font-medium">
        {links.map((link, index) => {
          const isActive = pathname === "/dashboard/settings" + link.href
          return (
            <Link
              key={index}
              href={"/dashboard/settings" + link.href}
              className={`rounded-xs px-5 py-1.5 ${isActive ? "bg-sidebar-accent-foreground text-black" : ""}`}
            >
              {link.label}
            </Link>
          )
        })}
      </div>
      <div className="h-full w-full">{children}</div>
    </div>
  )
}

export default SettingsLayout

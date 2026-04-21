"use client"

import React, { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import {
  ArrowUpRight01Icon,
  Call02Icon,
  Mail01Icon,
  MenuTwoLineIcon,
  TiktokFreeIcons,
  X,
} from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import Link from "next/link"
import { Separator } from "@workspace/ui/components/separator"

type Icon = readonly (readonly [
  string,
  {
    readonly [key: string]: string | number
  },
])[]

export function Header() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  // Close menu when route changes
  useEffect(() => {
    setOpen(false)
  }, [pathname])

  const handleNavClick = () => setOpen(false)

  const linkList: {
    link: string
    icon: Icon
    label: string
  }[] = [
    { link: "/", icon: ArrowUpRight01Icon, label: "Home" },
    // { link: "/", icon: ArrowUpRight01Icon, label: "Features" },
    // { link: "/", icon: ArrowUpRight01Icon, label: "Subjects" },
    { link: "/what-to-expect", icon: ArrowUpRight01Icon, label: "What to expect" },
    { link: "/plans-and-pricing", icon: ArrowUpRight01Icon, label: "Plans & Pricing" },
  ]

  return (
    <header className="z-40 flex w-full justify-center border-b-2 border-foreground backdrop-blur-2xl dark:text-[#e1e1e1]">
      <div className="w-full border-[#2c2c2c] backdrop-blur-2xl max-md:px-2 xl:max-w-[81%]">
        <div className="flex w-full items-center justify-between gap-x-2 px-10 py-5 text-black backdrop-blur-2xl max-sm:px-0 dark:text-white">
          <div className="flex items-center gap-x-2">
            <button
              type="button"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? (
                <HugeiconsIcon icon={X} className="stroke-1" size={60} />
              ) : (
                <HugeiconsIcon
                  icon={MenuTwoLineIcon}
                  className="stroke-1"
                  strokeWidth={1}
                  size={70}
                />
              )}
            </button>
            <Link className="hidden max-md:flex" href={"/"}>
              <p className="text-xl leading-5 font-semibold uppercase">
                The
                <br /> Future
                <br /> Academy
              </p>
            </Link>
          </div>

          <div className="flex items-center gap-x-5 max-md:hidden">
            <Link
              target="_blank"
              href="https://www.tiktok.com/@thefutureacademysa"
              className="cursor-pointer rounded-full bg-foreground p-2 text-background hover:text-[#ffbb00] dark:hover:bg-[#ffbb00] dark:hover:text-background"
            >
              <HugeiconsIcon size={35} icon={TiktokFreeIcons} />
            </Link>
            <Link
              href="mailto:info@thefutureacademy.co.za?subject=Enquiry&body=Hi Future Academy"
              className="cursor-pointer rounded-full bg-foreground p-2 text-background hover:text-[#ffbb00] dark:hover:bg-[#ffbb00] dark:hover:text-background"
            >
              <HugeiconsIcon size={35} icon={Mail01Icon} />
            </Link>
            <Separator orientation="vertical" />
            <Link
              href={"https://space.thefutureacademy.co.za/signin"}
              className="hidden justify-center gap-x-5 rounded-full bg-foreground px-10 py-4 font-archivo text-xl font-medium text-background md:flex"
            >
              Sign In
            </Link>
          </div>
        </div>
        {/* Collapsible menu */}
        {open && (
          <nav className="font-space flex flex-col gap-x-5 gap-y-5 border-b border-white px-10 py-5 pt-10 text-4xl font-normal text-black uppercase max-md:text-3xl max-sm:px-2 dark:text-white">
            {linkList.map((link, index) => (
              <div className="flex items-center underline" key={index}>
                <Link onClick={handleNavClick} href={link.link}>
                  {link.label}
                </Link>
                <HugeiconsIcon icon={link.icon} size={40} />
              </div>
            ))}
            <div className="hidden items-center justify-between gap-x-2 max-md:flex">
              <div className="cursor-pointer rounded-full bg-foreground p-2 text-background hover:text-[#ffbb00] dark:hover:bg-[#ffbb00] dark:hover:text-background">
                <HugeiconsIcon size={35} icon={Call02Icon} />
              </div>
              <div className="cursor-pointer rounded-full bg-foreground p-2 text-background hover:text-[#ffbb00] dark:hover:bg-[#ffbb00] dark:hover:text-background">
                <HugeiconsIcon size={35} icon={Mail01Icon} />
              </div>
              <Separator orientation="vertical" />
              <Link
                href={"https://space.thefutureacademy.co.za/signin"}
                className="w-full justify-center gap-x-5 rounded-full bg-foreground px-10 py-4 text-center font-archivo text-lg font-medium text-background capitalize md:flex"
              >
                Sign In
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}

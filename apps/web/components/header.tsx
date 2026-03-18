"use client"

import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import { ArrowUpRight01Icon, Menu01Icon, X } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import Link from "next/link"

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
    { link: "/", icon: ArrowUpRight01Icon, label: "Features" },
    { link: "/", icon: ArrowUpRight01Icon, label: "Subjects" },
    { link: "/", icon: ArrowUpRight01Icon, label: "For Students" },
    { link: "/", icon: ArrowUpRight01Icon, label: "Plans & Pricing" },
  ]

  return (
    <header className="fixed top-0 left-0 z-40 flex w-full justify-center backdrop-blur-2xl dark:text-[#e1e1e1]">
      {/* Desktop nav */}
      <header className="hidden w-full max-w-400 items-center justify-between px-10 py-10 lg:flex">
        <p className="text-[20px] font-medium">The Future Academy</p>
        <nav className="flex gap-x-5 text-xs font-medium uppercase">
          <Link href={"/"}>Home</Link>
          <Link href={"/"}>Features</Link>
          <Link href={"/"}>Subjects</Link>
          <Link href={"/"}>For Students</Link>
          <Link href={"/"}>Plans & Pricing</Link>
        </nav>
        <Link
          href={"/signin"}
          className="flex gap-x-5 rounded-xs bg-primary px-10 py-2 text-xs font-medium text-white uppercase"
        >
          Log in
        </Link>
      </header>

      {/* Mobile header */}
      <div className="w-full border-[#2c2c2c] backdrop-blur-2xl lg:hidden">
        <div className="flex w-full items-center gap-x-2 px-10 py-5 text-black backdrop-blur-2xl max-sm:px-5 dark:text-white">
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
            className=""
          >
            {open ? (
              <HugeiconsIcon icon={X} className="stroke-1" size={60} />
            ) : (
              <HugeiconsIcon icon={Menu01Icon} className="stroke-1" size={60} />
            )}
          </button>
          <Link href={"/"}>
            <p className="font text-2xl leading-6">
              The <br /> Future <br /> Academy
            </p>
          </Link>
        </div>

        {/* Collapsible menu */}
        {open && (
          <nav className="font-space flex flex-col gap-x-5 gap-y-5 border-b border-white px-10 py-5 pt-10 text-4xl font-normal text-black uppercase max-sm:px-5 dark:text-white">
            {linkList.map((link, index) => (
              <div className="flex items-center underline" key={index}>
                <Link onClick={handleNavClick} href={link.link}>
                  {link.label}
                </Link>
                <HugeiconsIcon icon={link.icon} size={40} />
              </div>
            ))}
            <button className="flex justify-center gap-x-5 rounded-xs bg-[#942D00] px-10 py-2 font-medium text-white uppercase">
              Log in
            </button>
          </nav>
        )}
      </div>
    </header>
  )
}

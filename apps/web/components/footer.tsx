import React from "react"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  Call02Icon,
  CopyrightIcon,
  Mail01Icon,
  MenuTwoLineIcon,
  TiktokFreeIcons,
  X,
} from "@hugeicons/core-free-icons"
import Link from "next/link"
import { Separator } from "@workspace/ui/components/separator"
import Image from "next/image"

const Footer = () => {
  return (
    <footer className="fl flex-col w-full">
      <section>

      </section>
      <section className="flex w-full justify-center border-t border-border dark:text-[#e1e1e1]">
        <div className="w-full flex items-center justify-between gap-x-10 border-[#2c2c2c] py-5 max-md:px-2 xl:max-w-[77%]">
          <p className="hidden items-center gap-x-4 px-5 font-medium max-lg:flex">
            <Image
              src={"/logo-image.svg"}
              alt={"logo"}
              width={50}
              height={50}
            />
            <span className="text-sm leading-4">
              The <br />
              Future <br />
              Academy <br />
            </span>
          </p>
          <p className="flex items-center gap-x-4 font-medium max-lg:hidden">
            <Image
              src={"/logo-image.svg"}
              alt={"logo"}
              width={70}
              height={70}
            />
            <span className="text-lg leading-5">
              The <br />
              Future <br />
              Academy <br />
            </span>
          </p>
          <p className="flex max-md:flex-col items-center gap-x-2 text-xs">
            <HugeiconsIcon size={15} icon={CopyrightIcon} />
            {new Date().getFullYear()} The Future Academy. All rights reserved.
          </p>
        </div>
      </section>
    </footer>
  )
}

export default Footer

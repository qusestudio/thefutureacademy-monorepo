import Link from "next/link";
import { Header } from "@/components/header"
import { Separator } from "@workspace/ui/components/separator"
import {
  ArrowUpRight01Icon,
  CircleArrowRight01Icon,
} from "@hugeicons/core-free-icons"
import {HugeiconsIcon} from "@hugeicons/react";
import Image from "next/image";

const Home = () => {
  return (
    <div className="flex w-full flex-col items-center font-chillax">
      <div className="fixed flex w-full flex-col items-center">
        <Header />
      </div>
      <main className="w-full max-w-[90%] space-y-5 px-10 max-sm:px-2">
        <section className="flex w-full flex-col items-center pt-50">
          <div className="flex w-full items-end justify-between self-start text-4xl max-sm:text-3xl">
            <p className="bg-[#1F329D] p-5 text-white max-md:p-3 max-md:text-2xl">
              12
            </p>
            <Link
              href={"#"}
              className="mb-2 flex h-fit items-center gap-x-2 rounded-full bg-[#afafaf]/30 px-1.5 py-0.5 pl-2 text-sm dark:bg-accent/60"
            >
              <p className="font-archivo text-[13px] font-[450] tracking-wide dark:text-white">
                Release notes! Read More
              </p>
              <HugeiconsIcon
                icon={CircleArrowRight01Icon}
                className="rounded-full bg-[#1F329D] stroke-[2px] text-white"
              />
            </Link>
          </div>
          <div className="flex w-full border max-md:h-[50vh] max-md:flex-col">
            <h1 className="w-full pt-5 pr-5 text-6xl font-semibold uppercase max-md:h-[40vh] max-md:border-b sm:text-[10em] md:border-r">
              STUD
              <span className="bg-[#ffbb00]/60 dark:text-background">
                y <br /> Any
              </span>
              <span className="bg-[#ffbb00]/60 dark:text-background">
                time
                <br />A
              </span>
              nywhere
            </h1>
            <div className="flex w-full flex-col items-start gap-y-5 p-5 px-[5%] font-archivo max-md:h-full max-md:justify-end md:justify-center">
              <div className="w-full">
                <p className="max-w-sm text-sm text-foreground/90 max-md:text-xs dark:text-primary-foreground/90">
                  A refined learning experience built for Grade 12 success. We
                  combine expert teaching with structured support to help your
                  child truly understand each subject. With the flexibility to
                  learn anytime, they can build confidence and perform at their
                  best when it matters most.
                </p>
              </div>
              <Link
                href={"https://space.thefutureacademy.co.za/signup"}
                className="bg-[#1F329D] p-3 px-5 font-medium tracking-wide text-white max-md:text-sm"
              >
                Join the academy
              </Link>
            </div>
          </div>
          <div className="flex w-full flex-col justify-center gap-y-10 py-10">
            <div className="flex h-5 w-full max-w-xl flex-wrap items-center gap-x-2 gap-y-2 font-archivo text-lg leading-tight tracking-wide text-foreground/90 max-md:text-sm">
              <span className="w-fit rounded-full border p-2">
                CAPS-Aligned Curriculum
              </span>
              <span className="rounded-full border p-2">Grade 12</span>
              <span className="rounded-full border p-2">
                University Readiness
              </span>
            </div>
          </div>
        </section>
        <section className="mb-20 flex w-full items-center gap-x-3 md:h-[50vh]">
          <div className="flex h-full w-full flex-1 flex-col justify-end bg-foreground p-5 font-archivo text-xl font-light tracking-wide text-background">
            <Link
              className="flex items-center justify-between border-b border-background"
              href={"#"}
            >
              Plans & Pricing{" "}
              <HugeiconsIcon size={30} icon={ArrowUpRight01Icon} />
            </Link>
          </div>
          <div className="flex h-full w-full flex-1 flex-col bg-[#1F329D]"></div>
          <div className="flex h-full w-full flex-3 flex-col bg-[#ffbb00]">
            <Link href={"#"}>Plans & Pricing</Link>
          </div>
        </section>
      </main>
    </div>
  )
}

export default Home;
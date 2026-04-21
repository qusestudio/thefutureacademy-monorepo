import Link from "next/link";
import { Header } from "@/components/header"

import {
  ArrowUpRight01Icon,
  CircleArrowRight01Icon,
} from "@hugeicons/core-free-icons"
import {HugeiconsIcon} from "@hugeicons/react";
import Footer from "@/components/footer"

const Home = () => {
  return (
    <div className="flex w-full flex-col items-center font-chillax">
      <div className="fixed flex w-full flex-col items-center">
        <Header />
      </div>
      <main className="w-full max-w-[80%] space-y-5 max-md:max-w-[90%] max-sm:px-0 xl:px-10">
        <section className="flex w-full flex-col items-center pt-50">
          <div className="flex w-full items-end justify-between self-start text-4xl max-sm:text-3xl">
            <p className="bg-[#1F329D] p-5 text-white max-md:p-3 max-md:text-2xl">
              12
            </p>
            <Link
              href={"#"}
              className="mb-2 flex h-fit items-center gap-x-2 rounded-full bg-[#afafaf]/30 px-1.5 py-0.5 pl-2 text-sm dark:bg-accent/60"
            >
              <p className="  text-[13px] font-[450] tracking-wide dark:text-white/80">
                Now live — Grade 12 STEM
              </p>
              <HugeiconsIcon
                icon={CircleArrowRight01Icon}
                className="rounded-full bg-[#1F329D] stroke-[2px] text-white"
              />
            </Link>
          </div>
          <div className="flex w-full border max-xl:flex-col">
            <h1 className="w-full pt-5 pr-5 text-6xl font-semibold uppercase max-xl:border-b max-md:h-[40vh] sm:text-[7em] lg:text-[8em] xl:border-r xl:text-[10em]">
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
            <div className="flex w-full flex-col items-start gap-y-5 p-5 px-[5%] font-archivo max-xl:h-full max-md:justify-end md:justify-center lg:py-[4%]">
              <p></p>
              <div className="w-full">
                <p className="max-w-sm text-sm text-foreground/90 max-xl:text-lg max-md:text-xs dark:text-primary-foreground/90">
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
                South Africa
              </span>
              <span className="rounded-full border p-2">High School</span>
              <span className="rounded-full border p-2">
                University Readiness
              </span>
            </div>
          </div>
        </section>
        <section className="mb-20 flex w-full flex-col items-center gap-x-3 gap-y-4 max-md:pt-5 md:h-[50vh] lg:flex-row">
          <div className="flex h-full w-full flex-1 flex-col justify-between gap-y-4 bg-[#1F329D] p-5 font-archivo text-2xl font-light tracking-wide text-white">
            <div className="flex flex-col items-start gap-y-5">
              <p className="text-xs tracking-widest text-white/70">PRICING</p>
              <p className="font-chillax text-3xl font-semibold text-white/90 uppercase">
                Affordability at the core.
              </p>
              <p className="text-sm text-white/80">
                R400/month. Every subject.
                <br /> No contracts. Cancel anytime.
              </p>
            </div>
            <Link
              className="flex items-center justify-between justify-self-end border-t border-white/50 py-2 text-sm text-white/70"
              href={"/plans-and-pricing"}
            >
              Plans & Pricing{" "}
              <HugeiconsIcon size={30} icon={ArrowUpRight01Icon} />
            </Link>
          </div>
          <div className="flex h-full w-full flex-1 flex-col justify-between gap-y-4 bg-[#ffbb00] p-5 font-archivo text-black">
            <div className="flex flex-col items-start gap-y-5">
              <p className="text-xs tracking-widest text-black/70">
                WHAT&apos;S INCLUDED
              </p>
              <p className="grid grid-cols-[20%_80%] items-end font-chillax text-5xl font-medium uppercase">
                4{" "}
                <span className="font-chillax text-4xl font-medium">
                  Subjects.
                </span>
                <span className="font-semibold">1</span>{" "}
                <span className="font-chillax text-4xl font-semibold">
                  Price.
                </span>
              </p>
            </div>
            <Link
              className="flex items-center justify-between justify-self-end border-t border-black/70 py-2 text-sm text-black/90"
              href={"https://space.thefutureacademy.co.za/dashboard/mylearning"}
            >
              Start learning
              <HugeiconsIcon size={30} icon={ArrowUpRight01Icon} />
            </Link>
          </div>
          <div className="flex h-full w-full flex-3 flex-col justify-between bg-accent p-5">
            <div className="flex flex-col items-start gap-y-5">
              <p className="font-archivo text-xs tracking-widest text-muted-foreground">
                HOW IT WORKS
              </p>
              <p className="items-end font-chillax text-5xl font-semibold uppercase max-md:text-3xl">
                THREE STEPS <br /> TO START.
              </p>
              <section className="flex flex-col gap-y-5 pb-5">
                <div className="flex gap-x-4">
                  <p className="flex h-7 w-7 items-center justify-center rounded-full border font-medium text-muted-foreground">
                    1
                  </p>
                  <p className="flex flex-col font-medium">
                    Create your account
                    <span className="font-archivo text-sm text-muted-foreground">
                      Sign up in under a minute. No setup needed.
                    </span>
                  </p>
                </div>
                <div className="flex gap-x-4">
                  <p className="flex h-7 w-7 items-center justify-center rounded-full border font-medium text-muted-foreground">
                    2
                  </p>
                  <p className="flex flex-col font-medium">
                    Pick your subjects
                    <span className="font-archivo text-sm text-muted-foreground">
                      Choose from all four STEM subjects or start with one.
                    </span>
                  </p>
                </div>
                <div className="flex gap-x-4">
                  <p className="flex h-7 w-7 items-center justify-center rounded-full border font-medium text-muted-foreground">
                    3
                  </p>
                  <p className="flex flex-col font-medium">
                    Watch, learn, repeat
                    <span className="font-archivo text-sm text-muted-foreground">
                      Structured video lessons. Study at your own pace, anytime.
                    </span>
                  </p>
                </div>
                {/*<div className="flex gap-x-4">*/}
                {/*  <p className="flex h-7 w-7 items-center justify-center rounded-full border font-medium text-muted-foreground">*/}
                {/*    B*/}
                {/*  </p>*/}
                {/*  <p className="flex flex-col font-medium">*/}
                {/*    Bonus*/}
                {/*    <Link*/}
                {/*      target={"_blank"}*/}
                {/*      href={"https://chat.whatsapp.com/Iply69XJzfOI55Pvgy9m9R"}*/}
                {/*      className="font-archivo text-xs tracking-wider italic text-blue-400"*/}
                {/*    >*/}
                {/*      Click here to join our whatsapp community for any enquiries.*/}
                {/*    </Link>*/}
                {/*  </p>*/}
                {/*</div>*/}
              </section>
            </div>
            <Link
              className="flex items-center justify-between justify-self-end border-t border-white/60 py-2 font-archivo text-sm text-white/70"
              href={"https://space.thefutureacademy.co.za/signup"}
            >
              Join the academy
              <HugeiconsIcon size={30} icon={ArrowUpRight01Icon} />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

export default Home;
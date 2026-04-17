"use client"

import React from 'react';
import Image from "next/image";
import {
  useCreateCheckoutMutation,
  useGetStudentCheckoutQuery,
  useGetStudentSubscriptionQuery,
} from "@/state/api"
import {redirect} from "next/navigation";
import ProfilePageSkeleton from "@/components/skeletons/skeletons";
import { Button } from "@workspace/ui/components/button"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  Alert01Icon,
  CheckmarkSquare01Icon,
  NewsIcon,
} from "@hugeicons/core-free-icons"
import { Separator } from "@workspace/ui/components/separator"

const BillingSettings = () => {
    const {data: subscription, isLoading: subLoading} = useGetStudentSubscriptionQuery();
    const [createCheckout] = useCreateCheckoutMutation();
    // const {data: checkout, isLoading} = useGetStudentCheckoutQuery();

    const handlePay = async () => {
        const result = await createCheckout(
            {
                amount: 1000,
                currency: "ZAR",
                successUrl: process.env.NEXT_PUBLIC_BILLING_REDIRECT_URL!,
            }
        );
        console.log(result.data);
        alert(result.data!.redirectUrl)
        redirect(`${result.data!.redirectUrl}`);
    }

    const activeSubscription = subscription?.status.toLowerCase() === "active";

    if (subLoading) {
        return (
            <ProfilePageSkeleton />
        )
    }

    return (
      <main className="flex w-full flex-col gap-y-5 rounded-sm border p-4">
        <p className="font-medium">Billing & Payments</p>
        <div
          className={` ${subscription?.status === "pending" ? "bg-red-700/30 dark:bg-yellow-500/30" : "bg-green-500/40 dark:bg-green-500/10"} flex w-full items-center justify-between rounded-md border p-5`}
        >
          <p className="flex items-center gap-x-3 text-lg font-medium">
            <Image
              width={50}
              height={50}
              src={"/icon.webp"}
              alt={""}
              className="w-10 rounded-full"
            />
            Pay with YOCO
          </p>
          <p className="flex max-w-50 flex-wrap justify-center text-center text-sm">
            { !activeSubscription ? "Your payment is due" : "Thank you!"}
          </p>
          <Button
            variant={"outline"}
            disabled={activeSubscription}
            className="text-xs shadow-none hover:cursor-pointer"
            onClick={handlePay}
          >
            {!activeSubscription ? "Pay with Card" : "Paid"}
          </Button>
        </div>
        <p className="flex items-center gap-x-3 text-xs">
          {!activeSubscription && (
            <>
              {" "}
              <HugeiconsIcon icon={Alert01Icon} />
              Your payment is due to keep things running smoothly. A quick
              update now helps us stay on track together. Please complete your
              payment at your earliest convenience.{" "}
            </>
          )}
          {activeSubscription && (
            <>
              {" "}
              <HugeiconsIcon
                icon={CheckmarkSquare01Icon}
                className="text-green-500/50"
              />
              The current month is paid{" "}
            </>
          )}
        </p>
        <Separator />
        {/*<section className="flex justify-between">*/}
        {/*    <p className="text-xs">Your next payment of <span className="font-medium">R 300.00</span>, to be charged on the <span className="font-medium">31 of March, 2026</span></p>*/}
        {/*</section>*/}
        {/*<section className="rounded-md mt-5 grid grid-cols-[40%_60%] p-4 justify-between border">*/}
        {/*    <div>*/}
        {/*        <p className="text-sm font-medium">Payment Method</p>*/}
        {/*        <p className="text-xs">Choose your preferred payment method</p>*/}
        {/*    </div>*/}
        {/*    <div className="flex flex-col gap-y-3">*/}
        {/*        <div className="border flex gap-x-3 items-start p-3 rounded-md">*/}
        {/*            <div className="h-6 w-10 bg-[#222] rounded" />*/}
        {/*            <div className="text-xs flex flex-col gap-y-3">*/}
        {/*                <section>*/}
        {/*                    <p className="font-medium">Visa ending 4331</p>*/}
        {/*                    <p className="text-muted-foreground">Expiry 09/2024</p>*/}
        {/*                </section>*/}
        {/*                <section className="flex gap-x-3">*/}
        {/*                    <button disabled className="text-muted-foreground">Primary Card</button>*/}
        {/*                    <button className="font-medium hover:cursor-pointer">Edit</button>*/}
        {/*                </section>*/}
        {/*            </div>*/}
        {/*        </div>*/}
        {/*        <div className="border flex gap-x-3 items-start p-3 rounded-md">*/}
        {/*            <div className="h-6 w-10 bg-[#222] rounded" />*/}
        {/*            <div className="text-xs flex flex-col gap-y-3">*/}
        {/*                <section>*/}
        {/*                    <p className="font-medium">Visa ending 5442</p>*/}
        {/*                    <p className="text-muted-foreground">Expiry 08/2023</p>*/}
        {/*                </section>*/}
        {/*                <section className="flex gap-x-3">*/}
        {/*                    <button className="underline">Set as primary</button>*/}
        {/*                    <button className="font-medium hover:cursor-pointer">Edit</button>*/}
        {/*                </section>*/}
        {/*            </div>*/}
        {/*        </div>*/}
        {/*        <Button*/}
        {/*            variant={"ghost"}*/}
        {/*            className="text-xs hover:underline text-muted-foreground hover:cursor-pointer self-start"*/}
        {/*        >*/}
        {/*            <Plus /> Add new payment method*/}
        {/*        </Button>*/}
        {/*    </div>*/}
        {/*</section>*/}
        <section className="flex flex-col gap-y-4">
          <div className="flex items-start justify-between gap-x-3 rounded-md p-3 text-sm">
            <span className="font-medium">Latest Transactions</span>
            <button className="flex items-center gap-x-3 rounded-sm border p-1.5 text-[10px] font-medium hover:cursor-pointer">
              <HugeiconsIcon icon={NewsIcon} size={15} /> Export CSV
            </button>
          </div>
          {/*   Table of Transactions */}
        </section>
      </main>
    )
};

export default BillingSettings;
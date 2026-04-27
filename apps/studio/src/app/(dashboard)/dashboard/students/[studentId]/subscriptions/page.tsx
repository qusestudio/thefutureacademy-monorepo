"use client"

import React, { useState } from "react"
import { usePathname } from "next/navigation"
import {
  useCreateSubscriptionMutation,
  useGetPlansQuery,
  useGetStudentSubscriptionsQuery,
} from "@/state/api"
import { SubscriptionsTable } from "@/app/(dashboard)/dashboard/students/[studentId]/subscriptions/subscriptions-table"
import { subscriptionColumns } from "@/app/(dashboard)/dashboard/students/[studentId]/subscriptions/columns"
import { AnimatePresence, motion } from "framer-motion"
import { toast } from "sonner"
import { CardContent, CardFooter } from "@workspace/ui/components/card"
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@workspace/ui/components/field"
import { Input } from "@workspace/ui/components/input"
import { Controller, useForm } from "react-hook-form"
import z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { StudentSubscription } from "@/types/models"
import { Spinner } from "@workspace/ui/components/spinner"



const MS_PER_DAY = 1000 * 60 * 60 * 24
const statusValues = ["active", "inactive", "paused", "cancelled"] as const
const subscriptionSchema = z
  .object({
    planId: z.string().min(1, "Please select a plan."),
    status: z.string().refine((val) => statusValues.includes(val as any), {
      message: "Please select a valid status.",
    }),
    currentPeriodStart: z
      .string()
      .min(1, "Start date is required.")
      .transform((val) => new Date(val).toISOString()),
    currentPeriodEnd: z
      .string()
      .min(1, "End date is required.")
      .transform((val) => new Date(val).toISOString()),
    cancelAtPeriodEnd: z.boolean(),
  })
  .refine(
    (data) =>
      new Date(data.currentPeriodEnd) > new Date(data.currentPeriodStart),
    {
      message: "End date must be after start date.",
      path: ["currentPeriodEnd"],
    }
  )

type SubscriptionFormValues = z.infer<typeof subscriptionSchema>

const SubscriptionsPage = () => {
  const [isPanelOpen, setIsPanelOpen] = useState(false)
  const studentId = usePathname().split("/")[3];
  const {data: plans, isLoading: plansLoading} = useGetPlansQuery();
  const {data, isLoading} = useGetStudentSubscriptionsQuery(studentId!
    , { skip: !studentId }
  );
  const [createSubscription, { isLoading: isCreatingSubscription }] = useCreateSubscriptionMutation();
  // get all plans from the server
  // form data here.
  // const handleActivatePlan = async () => {
  //   if (!plan) return
  //   const subscription: Omit<StudentSubscription, "id"> = {
  //     studentId: studentId,
  //     planId: plan.id,
  //     status: "pending",
  //     currentPeriodStart: new Date(Date.now()).toISOString(),
  //     currentPeriodEnd: new Date(
  //       Date.now() + plan.duration * MS_PER_DAY
  //     ).toISOString(),
  //     cancelAtPeriodEnd: false,
  //   }
  //   // Create Subscription
  //   await createSubscription(subscription)
  //   // Create Checkout
  //   const result = await createCheckout({
  //     amount: plan.price,
  //     currency: "ZAR",
  //     successUrl: process.env.NEXT_PUBLIC_BILLING_REDIRECT_URL!,
  //   })
  //   // Redirect to the relevant page
  //   redirect(`${result.data!.redirectUrl}`)
  // }

  const form = useForm<SubscriptionFormValues>({
    resolver: zodResolver(subscriptionSchema),
    defaultValues: {
      planId: "",
      status: "active",
      currentPeriodStart: "",
      currentPeriodEnd: "",
      cancelAtPeriodEnd: false,
    },
  })

  const onValidSubmit = async (data: SubscriptionFormValues) => {
    console.log("Subscription data:", data)
    // call your mutation here
    const subscription: Omit<StudentSubscription, "id"> = {
      studentId: studentId,
      ...data,
    };

    await createSubscription(subscription);
  }

  return (
    <main className="flex w-full gap-x-5 p-5">
      <div className="flex w-full flex-col gap-y-4 text-center">
        <div className="flex w-full justify-end">
          <button
            onClick={() => setIsPanelOpen(true)}
            className="cursor-pointer rounded-md bg-[#1F329D] p-2 px-4 text-xs text-white"
          >
            Add Subscription
          </button>
        </div>
        <div className="flex w-full gap-x-4">
          {/* Table — shrinks to make room for the panel */}
          <div className="min-w-0 flex-1">
            {isLoading ? (
              <div>Loading...</div>
            ) : (
              <SubscriptionsTable data={data!} columns={subscriptionColumns} />
            )}
          </div>
        </div>
        {/* Slide-in panel */}
      </div>
      <AnimatePresence>
        {isPanelOpen && (
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 380, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="shrink-0 overflow-hidden"
          >
            <div className="h-full w-95 rounded-lg border p-2 shadow-sm">
              {/* Close button */}
              <div className="mb-4 flex justify-end">
                <button
                  onClick={() => setIsPanelOpen(false)}
                  className="cursor-pointer text-sm text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>

              {/* Your content goes here */}
              <form
                id="subscription-form"
                onSubmit={form.handleSubmit(onValidSubmit, (errors) => {
                  console.log("Validation Errors:", errors)
                  toast.error("Please fix the highlighted fields.")
                })}
              >
                <CardContent className="space-y-5">
                  <FieldGroup>
                    {/* Plan */}
                    <Controller
                      name="planId"
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                          <FieldLabel
                            className="text-sm font-medium"
                            htmlFor="sub-form-plan"
                          >
                            Plan
                          </FieldLabel>
                          <select
                            {...field}
                            id="sub-form-plan"
                            className="w-full rounded-sm border bg-background px-3 py-2 text-sm aria-invalid:border-destructive"
                            aria-invalid={fieldState.invalid}
                          >
                            <option value="" disabled>
                              Select a plan…
                            </option>
                            {plans &&
                              plans.map((plan) => (
                                <option key={plan.id} value={plan.id}>
                                  {plan.name}
                                </option>
                              ))}
                          </select>
                          {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                          )}
                        </Field>
                      )}
                    />

                    {/* Status */}
                    <Controller
                      name="status"
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                          <FieldLabel
                            className="text-sm font-medium"
                            htmlFor="sub-form-status"
                          >
                            Status
                          </FieldLabel>
                          <select
                            {...field}
                            id="sub-form-status"
                            className="w-full rounded-sm border bg-background px-3 py-2 text-sm aria-[invalid=true]:border-destructive"
                            aria-invalid={fieldState.invalid}
                          >
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                            <option value="paused">Paused</option>
                            <option value="cancelled">Cancelled</option>
                          </select>
                          {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                          )}
                        </Field>
                      )}
                    />

                    {/* Period dates — side by side */}
                    <div className="grid grid-cols-2 gap-4">
                      <Controller
                        name="currentPeriodStart"
                        control={form.control}
                        render={({ field, fieldState }) => (
                          <Field data-invalid={fieldState.invalid}>
                            <FieldLabel
                              className="text-sm font-medium"
                              htmlFor="sub-form-start"
                            >
                              Period Start
                            </FieldLabel>
                            <Input
                              {...field}
                              id="sub-form-start"
                              type="date"
                              className="rounded-sm"
                              aria-invalid={fieldState.invalid}
                            />
                            {fieldState.invalid && (
                              <FieldError errors={[fieldState.error]} />
                            )}
                          </Field>
                        )}
                      />

                      <Controller
                        name="currentPeriodEnd"
                        control={form.control}
                        render={({ field, fieldState }) => (
                          <Field data-invalid={fieldState.invalid}>
                            <FieldLabel
                              className="text-sm font-medium"
                              htmlFor="sub-form-end"
                            >
                              Period End
                            </FieldLabel>
                            <Input
                              {...field}
                              id="sub-form-end"
                              type="date"
                              className="rounded-sm"
                              aria-invalid={fieldState.invalid}
                            />
                            {fieldState.invalid && (
                              <FieldError errors={[fieldState.error]} />
                            )}
                          </Field>
                        )}
                      />
                    </div>

                    {/* Cancel at period end */}
                    <Controller
                      name="cancelAtPeriodEnd"
                      control={form.control}
                      render={({ field }) => (
                        <Field
                          orientation="horizontal"
                          className="items-center gap-3"
                        >
                          <input
                            type="checkbox"
                            id="sub-form-cancel"
                            checked={field.value}
                            onChange={(e) => field.onChange(e.target.checked)}
                            className="h-4 w-4 rounded border accent-[#1F329D]"
                          />
                          <FieldLabel
                            className="cursor-pointer text-sm font-medium"
                            htmlFor="sub-form-cancel"
                          >
                            Cancel at period end
                          </FieldLabel>
                        </Field>
                      )}
                    />
                  </FieldGroup>
                </CardContent>

                <CardFooter className="border-none">
                  <Field orientation="horizontal">
                    <button
                      type="button"
                      className="rounded-sm bg-accent px-3 py-2 text-sm font-medium"
                      onClick={() => form.reset()}
                    >
                      Reset
                    </button>
                    <button
                      type="submit"
                      className="rounded-sm bg-[#1F329D] px-3 py-2 text-sm font-medium text-white disabled:opacity-50"
                      disabled={form.formState.isSubmitting}
                    >
                      {isCreatingSubscription ? (
                        <Spinner />
                      ) : (
                        "Create Subscription"
                      )}
                    </button>
                  </Field>
                </CardFooter>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}

export default SubscriptionsPage

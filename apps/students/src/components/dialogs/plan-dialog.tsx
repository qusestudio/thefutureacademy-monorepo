import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@workspace/ui/components/dialog"
import { Separator } from "@workspace/ui/components/separator"
import {
  useCreateCheckoutMutation,
  useCreateSubscriptionMutation,
  useGetPlanByGradeQuery,
  useGetStudentCheckoutQuery,
} from "@/state/api"
import { Skeleton } from "@workspace/ui/components/skeleton"
import { StudentSubscription } from "@/types/models"
import { Spinner } from "@workspace/ui/components/spinner"
import { redirect } from "next/navigation"

const MS_PER_DAY = 1000 * 60 * 60 * 24

export function PlanDialog({ studentId }: { studentId: string }) {
  const [createCheckout, { isLoading: initiatingPayment }] =
    useCreateCheckoutMutation()
  const { data: plan, isLoading } = useGetPlanByGradeQuery(12)
  const [createSubscription, { isLoading: isSubscribing }] =
    useCreateSubscriptionMutation()

  const handlePay = async () => {
    // const result = await createCheckout({
    //   amount: plan.price,
    //   currency: "ZAR",
    //   successUrl: process.env.NEXT_PUBLIC_BILLING_REDIRECT_URL!,
    // })
    // console.log(result.data)
    // alert(result.data!.redirectUrl)
    // redirect(`${result.data!.redirectUrl}`)
  }

  const handleActivatePlan = async () => {
    if (!plan) return
    const subscription: Omit<StudentSubscription, "id"> = {
      studentId: studentId,
      planId: plan.id,
      status: "pending",
      currentPeriodStart: new Date(Date.now()).toISOString(),
      currentPeriodEnd: new Date(
        Date.now() + plan.duration * MS_PER_DAY
      ).toISOString(),
      cancelAtPeriodEnd: false,
    }
    // Create Subscription
    await createSubscription(subscription)
    // Create Checkout
    const result = await createCheckout({
      amount: plan.price,
      currency: "ZAR",
      successUrl: process.env.NEXT_PUBLIC_BILLING_REDIRECT_URL!,
    })
    // Redirect to the relevant page
    redirect(`${result.data!.redirectUrl}`)
  }

  return (
    <Dialog>
      <DialogTrigger className={"outline-none"}>
        <span className="cursor-pointer rounded-full bg-[#1F329D] px-5 py-2 text-sm font-medium text-white">
          Activate plan
        </span>
      </DialogTrigger>
      <DialogContent className="ring-foreground sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Activate</DialogTitle>
          <DialogDescription>
            Activate plan to start learning.
          </DialogDescription>
        </DialogHeader>
        <div className="my-2 flex items-center gap-2">
          {isLoading ? (
            <Skeleton className="h-10 w-full rounded-sm" />
          ) : (
            <div className="flex flex-1 justify-center gap-2 rounded-sm font-medium ring ring-muted-foreground">
              <p className="w-full flex-1 p-2 text-center">{plan?.name}</p>
              <Separator
                orientation="vertical"
                className="bg-muted-foreground"
              />
              <button
                onClick={handleActivatePlan}
                className="m-1 flex-1 rounded bg-[#ffbb00] text-center font-medium text-black"
              >
                {isSubscribing ? (
                  <p className="flex items-center justify-center">
                    <Spinner />
                    Subscribing...
                  </p>
                ) : initiatingPayment ? (
                  <p className="flex items-center justify-center">
                    <Spinner /> Initiating Payment...
                  </p>
                ) : (
                  <p className="flex items-center justify-center">Activate</p>
                )}
              </button>
            </div>
          )}
        </div>
        <DialogFooter className="sm:justify-start">
          <DialogClose className={"outline-none"}>
            <span
              className={
                "cursor-pointer rounded-full bg-[#1F329D] px-2 py-2 text-white"
              }
            >
              Close
            </span>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

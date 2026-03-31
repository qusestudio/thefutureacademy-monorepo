import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@workspace/ui/components/drawer"
import React from "react"
import { SubjectForm } from "@/components/forms/subject-form"
import { HugeiconsIcon } from "@hugeicons/react"
import { Plus } from "@hugeicons/core-free-icons"
import { CreateAllocationForm } from "@/components/forms/allocations-form"
import { AllocationFormData } from "@/lib/schemas"
import {
  useGetAllInstructorsQuery,
  useGetAllSubjectsQuery,
  useSetTeachingAllocationMutation,
} from "@/state/api"
import { TopicForm } from "@/components/forms/topic-form"
import { Field, FieldLabel } from "@workspace/ui/components/field"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@workspace/ui/components/select"
import { Input } from "@workspace/ui/components/input"

export function CreateContentDrawer() {
  const initialValues = {
    id: "",
    title: "",
    image: "",
    term: "1",
    grade: "12",
    description: [{ value: "" }],
  }

  return (
    <Drawer direction="right">
      <DrawerTrigger
        className={
          "flex cursor-pointer items-center gap-x-1 self-start rounded-full border-2 border-foreground p-2 text-sm font-medium"
        }
        asChild
      >
        <div>
          <HugeiconsIcon icon={Plus} /> Create Course
        </div>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Subject Form</DrawerTitle>
        </DrawerHeader>
        {/** Edit Subject Form */}
        <div className="no-scrollbar overflow-y-auto">
          <SubjectForm
            initialValues={initialValues}
            label={"Create Course"}
            description={"Add subject details here."}
          />
        </div>
      </DrawerContent>
    </Drawer>
  )
}

export function CreateAllocationFormDrawer(props: { children: React.ReactNode, subjectId: string }) {
  const { data: subjects, isLoading: sLoading } = useGetAllSubjectsQuery()
  const { data: instructors, isLoading: iLoading } = useGetAllInstructorsQuery()
  const [setTeachingAllocation] = useSetTeachingAllocationMutation()

  const listOfInstructors = instructors?.map(
    (instructor): { value: string; label: string } => ({
      value: instructor.cognitoId!,
      label: instructor.name!,
    })
  )

  const listOfSubjects = subjects?.map(
    (subject): { value: string; label: string } => {
      return { value: subject.id!, label: subject.id! }
    }
  )

  const handleSubmit = async (data: AllocationFormData) => {
    await setTeachingAllocation(data)
  }

  return (
    <div className="flex flex-wrap gap-2">
      <Drawer direction="right">
        <DrawerTrigger asChild>{props.children}</DrawerTrigger>
        <DrawerContent className="data-[vaul-drawer-direction=bottom]:max-h-[50vh] data-[vaul-drawer-direction=top]:max-h-[50vh]">
          <DrawerHeader>
            <DrawerTitle>New allocation</DrawerTitle>
            <DrawerDescription>
              Allocate the subject to an instructor
            </DrawerDescription>
          </DrawerHeader>
          <div className="h-full px-4">
            <div className="grid grid-cols-3 gap-4">
              <Field>
                <FieldLabel htmlFor="checkout-exp-month-ts6">Month</FieldLabel>
                <Select defaultValue="">
                  <SelectTrigger id="checkout-exp-month-ts6">
                    <SelectValue placeholder="MM" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="01">01</SelectItem>
                      <SelectItem value="02">02</SelectItem>
                      <SelectItem value="03">03</SelectItem>
                      <SelectItem value="04">04</SelectItem>
                      <SelectItem value="05">05</SelectItem>
                      <SelectItem value="06">06</SelectItem>
                      <SelectItem value="07">07</SelectItem>
                      <SelectItem value="08">08</SelectItem>
                      <SelectItem value="09">09</SelectItem>
                      <SelectItem value="10">10</SelectItem>
                      <SelectItem value="11">11</SelectItem>
                      <SelectItem value="12">12</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </Field>
              <Field>
                <FieldLabel htmlFor="checkout-7j9-exp-year-f59">
                  Year
                </FieldLabel>
                <Select defaultValue="">
                  <SelectTrigger id="checkout-7j9-exp-year-f59">
                    <SelectValue placeholder="YYYY" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="2024">2024</SelectItem>
                      <SelectItem value="2025">2025</SelectItem>
                      <SelectItem value="2026">2026</SelectItem>
                      <SelectItem value="2027">2027</SelectItem>
                      <SelectItem value="2028">2028</SelectItem>
                      <SelectItem value="2029">2029</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </Field>
              <Field>
                <FieldLabel htmlFor="checkout-7j9-cvv">CVV</FieldLabel>
                <Input id="checkout-7j9-cvv" placeholder="123" required />
              </Field>
            </div>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  )
}

export function CreateTopicFormDrawer({subjectId}: {subjectId: string}) {
  const initialValues = {
    id: "",
    subjectId: subjectId,
    title: "",
    description: "",
  }

  return (
    <Drawer direction="right">
      <DrawerTrigger
        className={
          "flex cursor-pointer items-center gap-x-1 self-start rounded-full text-sm font-medium"
        }
        asChild
      >
        <HugeiconsIcon size={20} icon={Plus} />
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Topic Form</DrawerTitle>
        </DrawerHeader>
        {/** Edit Subject Form */}
        <div className="no-scrollbar overflow-y-auto">
          <TopicForm
            initialValues={initialValues}
            label={"Add topic for subject."}
            description={"Add topic details here."}
            subjectId={subjectId}
          />
        </div>
      </DrawerContent>
    </Drawer>
  )
}

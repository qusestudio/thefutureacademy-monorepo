"use client"

import React, { Suspense, useState } from "react"
import { Button } from "@workspace/ui/components/button"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  Cancel01Icon,
  Plus,
  Trash,
} from "@hugeicons/core-free-icons"
import { Allocation } from "@/types/models"
import {
  useDeleteAllocationsMutation,
  useGetAllInstructorsQuery,
  useGetAllocationsQuery,
  useGetAllSubjectsQuery,
  useSetTeachingAllocationMutation,
} from "@/state/api"
import { useRouter } from "next/navigation"
import { CheckedState } from "@radix-ui/react-checkbox"
import { AllocationListItem, List } from "@/components/list"
import { CardContent } from "@workspace/ui/components/card"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@workspace/ui/components/collapsible"
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel, FieldLegend, FieldSeparator, FieldSet } from "@workspace/ui/components/field"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@workspace/ui/components/select"
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { AllocationFormData, allocationSchema } from "@/lib/schemas"
import { toast } from "sonner"
import { Spinner } from "@workspace/ui/components/spinner"


const AllocationsPage = () => {
  const [open, setOpen] = useState(false)
  const router = useRouter()
  const [deleteAllocations, { isLoading: deleting }] = useDeleteAllocationsMutation()
  const { data: allocations, isLoading: allocationsLoading } = useGetAllocationsQuery()
  const {data: instructors, isLoading: instructorsLoading} = useGetAllInstructorsQuery()
  const {data: subjects, isLoading: subjectsLoading} = useGetAllSubjectsQuery()
  const [setTeachingAllocation, {isLoading: allocating}] = useSetTeachingAllocationMutation();
  const [selectedIds, setSelectedIds] = useState<string[]>([])

  const form = useForm<AllocationFormData>({
    resolver: zodResolver(allocationSchema),
    defaultValues: {instructorId: "", subjectId: ""}
  })

  const handleDelete = async () => {
    for (let i = 0; i < selectedIds.length; i++) {
      alert(selectedIds[i])
    }
    await deleteAllocations({ ids: selectedIds })
    setSelectedIds([])
  }

  const handleClearAll = () => {
    setSelectedIds([])
  }

  const handleSubmit = async (data: AllocationFormData) => {
    await setTeachingAllocation({
      instructorId: data.instructorId,
      subjectId: data.subjectId,
    })
    form.reset({
      instructorId: "",
      subjectId: "",
    })
  }

  return (
    <div className="flex p-5 h-full w-full flex-col gap-y-5 overflow-y-scroll [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      <div className="mx-auto w-full cursor-pointer border-none bg-transparent">
        <CardContent className="cursor-pointer border-none px-0">
          <Collapsible
            open={open}
            onOpenChange={setOpen}
            className="w-full space-y-2 rounded-md border-none data-[state=open]:bg-muted"
          >
            <CollapsibleTrigger className="flex w-full">
              <header className="flex w-full justify-between px-2 pb-5">
                <p className="text-xl">Instructor allocations</p>
                <HugeiconsIcon icon={open ? Cancel01Icon : Plus} size={25} />
              </header>
            </CollapsibleTrigger>

            <CollapsibleContent className="flex w-full flex-col items-start gap-2 gap-y-3 rounded-lg border-2 border-foreground bg-[#ffbb00]/60 px-5 py-5 text-sm text-muted-foreground dark:border-[#ffbb00] dark:bg-transparent">
              <div className="flex w-full flex-col items-center justify-center gap-y-2">
                <form
                  id="allocation-form"
                  onSubmit={form.handleSubmit(handleSubmit, (errors) => {
                    console.log("Validation Errors:", errors)
                    toast.error("Please fix the highlighted fields.")
                  })}
                  className="w-full"
                >
                  <FieldGroup>
                    <FieldSet>
                      <FieldLabel className="text-lg font-medium text-foreground">
                        Set allocation
                      </FieldLabel>
                      <FieldGroup>
                        <div className="grid grid-cols-2 gap-4">
                          <Controller
                            name={"instructorId"}
                            control={form.control}
                            render={({ field, fieldState }) => (
                              <Field data-invalid={fieldState.invalid}>
                                <FieldLabel
                                  className="text-sm font-medium text-foreground"
                                  htmlFor="instructor-id"
                                >
                                  Instructor
                                </FieldLabel>
                                <Select
                                  onValueChange={field.onChange}
                                  value={field.value}
                                  defaultValue={field.value}
                                >
                                  <SelectTrigger
                                    id="instructor-id"
                                    aria-invalid={fieldState.invalid}
                                    className="rounded-sm border border-foreground font-medium uppercase dark:border-border"
                                  >
                                    <SelectValue placeholder="Select an instructor" />
                                  </SelectTrigger>
                                  <SelectContent
                                    aria-invalid={fieldState.invalid}
                                    className="bg-transparent"
                                  >
                                    <SelectGroup>
                                      {instructors?.map((instructor) => (
                                        <SelectItem
                                          key={instructor.cognitoId}
                                          value={instructor.cognitoId}
                                        >
                                          {instructor.name}
                                        </SelectItem>
                                      ))}
                                    </SelectGroup>
                                  </SelectContent>
                                </Select>
                                {fieldState.invalid && (
                                  <FieldError errors={[fieldState.error]} />
                                )}
                              </Field>
                            )}
                          />

                          <Controller
                            name={"subjectId"}
                            control={form.control}
                            render={({ field, fieldState }) => (
                              <Field data-invalid={fieldState.invalid}>
                                <FieldLabel
                                  className={
                                    "text-sm font-medium text-foreground"
                                  }
                                  htmlFor="subject-id"
                                >
                                  Subject
                                </FieldLabel>
                                <Select
                                  onValueChange={field.onChange}
                                  value={field.value}
                                  defaultValue={field.value}>
                                  <SelectTrigger
                                    aria-invalid={fieldState.invalid}
                                    className="rounded-sm border border-foreground font-medium uppercase dark:border-border"
                                    id="subject-id"
                                  >
                                    <SelectValue placeholder="Select a subject" />
                                  </SelectTrigger>
                                  <SelectContent className="bg-transparent">
                                    <SelectGroup>
                                      {subjects?.map((subject) => (
                                        <SelectItem
                                          key={subject.id}
                                          value={subject.id}
                                        >
                                          {subject.title}
                                        </SelectItem>
                                      ))}
                                    </SelectGroup>
                                  </SelectContent>
                                </Select>
                                {fieldState.invalid && (
                                  <FieldError errors={[fieldState.error]} />
                                )}
                              </Field>
                            )}
                          />
                        </div>
                      </FieldGroup>
                    </FieldSet>
                    <Field orientation="horizontal">
                      <Button
                        className="rounded-sm bg-black dark:bg-[#ffbb00] dark:text-black"
                        type="submit"
                      >
                        {
                          allocating ? <Spinner /> : "Allocate"
                        }
                      </Button>
                      <Button
                        onClick={() => {
                          setOpen(false)
                        }}
                        variant="outline"
                        type="button"
                      >
                        Cancel
                      </Button>
                    </Field>
                  </FieldGroup>
                </form>
              </div>
            </CollapsibleContent>
          </Collapsible>
        </CardContent>
      </div>

      <div className="flex w-full justify-end gap-x-2">
        <Button
          variant={"ghost"}
          className={`rounded-md px-2 py-1 text-xs ${
            selectedIds.length === 0
              ? "hidden"
              : "cursor-pointer underline transition-all duration-500 ease-out"
          }`}
          onClick={handleClearAll}
        >
          Clear all
        </Button>

        <Button
          variant="destructive"
          className={`rounded-sm px-2 py-1 text-xs ${
            selectedIds.length === 0
              ? "hidden bg-gray-400"
              : "flex cursor-pointer bg-red-600 text-white transition-all duration-500 ease-out"
          }`}
          onClick={handleDelete}
        >
          Delete <HugeiconsIcon icon={Trash} size={15} />
        </Button>
      </div>

      <section className="relative w-full overflow-y-scroll [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <List>
          <Suspense
            fallback={
              <div className="flex h-full w-full flex-col items-center justify-center gap-y-5">
                <p className="text-lg font-medium">Loading...</p>
              </div>
            }
          >
            {allocations?.map((allocation: Allocation, index: number) => (
              <AllocationListItem
                key={index}
                allocation={allocation}
                checked={selectedIds.includes(allocation.id!)}
                onCheckedChange={(checked: CheckedState) => {
                  setSelectedIds((prev) =>
                    checked
                      ? [...prev, allocation.id!]
                      : prev.filter((id) => id !== allocation.id!)
                  )
                }}
              />
            ))}
          </Suspense>
        </List>
      </section>
    </div>
  )
}

export default AllocationsPage

import { Controller, useForm } from "react-hook-form"
import z from "zod"
import { Field, FieldError, FieldGroup, FieldLabel } from "@workspace/ui/components/field"
import { Input } from "@workspace/ui/components/input"
import { RadioGroup, RadioGroupItem } from "@workspace/ui/components/radio-group"
import { InputGroup, InputGroupAddon, InputGroupText, InputGroupTextarea } from "@workspace/ui/components/input-group"
import * as React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@workspace/ui/components/select"
import { CustomFormField } from "@/components/forms/form-field"

export const allocationSchema = z.object({
  instructorId: z.string().min(1, "Instructor ID is required"),
  subjectId: z.string().min(1, "Subject ID is required"),
})

export type AllocationFormData = z.infer<typeof allocationSchema>

interface CreateAllocationFormProps {
  onSubmit?: (data: AllocationFormData) => void
  instructors?: { value: string; label: string }[]
  subjects?: { value: string; label: string }[]
}

function CreateAllocationForm({
  instructors,
  subjects,
  onSubmit,
}: CreateAllocationFormProps) {
  const form = useForm({
    resolver: zodResolver(allocationSchema),
    defaultValues: {
      instructorId: "",
      subjectId: "",
    },
  })

  const handleReset = () => {
    form.reset({
      instructorId: "",
      subjectId: "",
    })
  }

  const handleSubmit = async (data: AllocationFormData) => {
    if (onSubmit) {
      onSubmit(data)
    }
  }

  return (
    <div className="flex h-full w-full max-w-4xl flex-col pt-8 pb-5">
      <div className="w-full rounded-xl">
        <form
          id="allocation-form"
          onSubmit={form.handleSubmit(handleSubmit, (errors) => {
            console.log("Validation Errors:", errors)
          })}
        >
          <FieldGroup>
            <Controller
              name="instructorId"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel
                    className="text-lg"
                    htmlFor="allocation-form-title"
                  >
                    Instructor ID
                  </FieldLabel>
                  <Select
                    value={field.value || null}
                    onValueChange={(value) => field.onChange(value ?? "")}
                  >
                    <SelectTrigger className={`w-full border-gray-200 p-4`}>
                      <SelectValue placeholder="Select instructor" />
                    </SelectTrigger>
                    <SelectContent className="border border-gray-200 shadow">
                      {instructors?.map((option) => (
                        <SelectItem
                          key={option.value}
                          value={option.value}
                          className={`cursor-pointer`}
                        >
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <div className="grid grid-cols-3 gap-4">
              <Field>
                <FieldLabel htmlFor="checkout-exp-month-ts6">
                  Month
                </FieldLabel>
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

            <Controller
              name="subjectId"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel className="text-lg">Subject ID</FieldLabel>
                  <Select
                    value={field.value || null}
                    onValueChange={(value) => field.onChange(value ?? "")}
                  >
                    <SelectTrigger className={`w-full border-gray-200 p-4`}>
                      <SelectValue placeholder="Select subject" />
                    </SelectTrigger>
                    <SelectContent className="border border-gray-200 shadow">
                      {subjects?.map((option) => (
                        <SelectItem
                          key={option.value}
                          value={option.value}
                          className={`cursor-pointer`}
                        >
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
        </form>
      </div>
    </div>
  )
}




export { CreateAllocationForm }

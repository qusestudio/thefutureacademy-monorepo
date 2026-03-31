import {
  useCreateTopicMutation,
} from "@/state/api"
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as React from "react"
import { Topic } from "@/types/models"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card"
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@workspace/ui/components/field"
import { Input } from "@workspace/ui/components/input"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea,
} from "@workspace/ui/components/input-group"
import z from "zod"


export type TopicFormValues = {
  title: string
  subjectId: string
  description: string
}

interface TopicFormProps {
  subjectId: string,
  label: string
  description: string
  initialValues: TopicFormValues
}

export const topicSchema = z.object({
  title: z.string().min(5, "Title should have at least 5 characters."),
  subjectId: z.string().min(1, "Subject ID is required"),
  description: z.string().min(100, "The topic description should at least have 100 characters")
})

export type TopicFormData = z.infer<typeof topicSchema>

export function TopicForm({
  subjectId,
  initialValues,
  label,
  description,
}: TopicFormProps) {
  const [createTopic] = useCreateTopicMutation()

  const form = useForm<TopicFormValues>({
    resolver: zodResolver(topicSchema),
    defaultValues: {
      title: initialValues.title || "",
      subjectId: initialValues.subjectId || "",
      description: initialValues.description || "",
    },
  })

  // const { fields, append, remove } = useFieldArray({
  //   control: form.control,
  //   name: "description",
  // })

  const onSubmit = async (data: TopicFormData) => {
    console.log("onSubmit", data)

    const topic: Omit<Topic, "id"> = {
      title: data.title,
      subjectId: subjectId,
      description: data.description,
    }

    await createTopic(topic);

    form.reset(
      {
        title: "",
        subjectId: subjectId,
        description: "",
      }
    )
  }

  return (
    <Card className="w-full bg-background sm:max-w-md">
      <CardHeader>
        <CardTitle className="text-sm">{label}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className={"space-y-5"}>
        <form
          id="topic-form"
          onSubmit={form.handleSubmit(onSubmit, (errors) => {
            console.log("Validation Errors:", errors)
          })}
        >
          <FieldGroup>
            <Controller
              name="title"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel className="text-lg font-medium" htmlFor="topic-form-title">
                    Title
                  </FieldLabel>
                  <Input
                    {...field}
                    id="topic-form-title"
                    aria-invalid={fieldState.invalid}
                    className="font-medium"
                    placeholder="e.g. Patterns and Series"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="description"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel className="text-lg font-medium">
                    Description
                  </FieldLabel>
                  <InputGroup>
                    <InputGroupTextarea
                      {...field}
                      placeholder="Write description..."
                      rows={6}
                      className="min-h-28 w-full rounded-sm font-medium"
                      aria-invalid={fieldState.invalid}
                    />
                    <InputGroupAddon align="block-end">
                      <InputGroupText className="tabular-nums">
                        {field.value?.length ?? 0}
                      </InputGroupText>
                    </InputGroupAddon>
                  </InputGroup>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter>
        <Field orientation="horizontal">
          <button
            type="button"
            className={"rounded-full bg-accent p-3 text-lg"}
            onClick={() => form.reset()}
          >
            Reset
          </button>
          <button
            type="submit"
            className="rounded-full text-black font-medium bg-[#ffbb00] p-3 text-lg"
            form="topic-form"
          >
            Submit
          </button>
        </Field>
      </CardFooter>
    </Card>
  )
}
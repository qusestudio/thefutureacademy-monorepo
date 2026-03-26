"use client"

import * as React from "react"
import { JSX, useRef } from "react"

import {
  Controller,
  useForm,
  useFieldArray,
  UseFormReturn,
} from "react-hook-form"
import { toast } from "sonner"

import {Spinner} from "@workspace/ui/components/spinner"
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
  FieldDescription,
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
import { zodResolver } from "@hookform/resolvers/zod"
import Image from "next/image"
import {
  RadioGroup,
  RadioGroupItem,
} from "@workspace/ui/components/radio-group"
import { useState } from "react"
import { HugeiconsIcon } from "@hugeicons/react"
import { PencilEdit02Icon,  Upload03Icon } from "@hugeicons/core-free-icons"

import { useCreateSubjectMutation, useGetSignedUrlMutation, useUploadToS3Mutation } from "@/state/api"
import { CLOUDFRONT } from "@/lib/constants"
import { FormValues } from "@/components/drawers/content-drawer"
import { formSchema } from "@/types/form-schema"
import { z } from "zod"
import { Subject } from "@/types/models"



interface SubjectFormProps {
  label: string,
  description: string,
  initialValues: FormValues
}

export function SubjectForm({initialValues, label, description}: SubjectFormProps) {
  const [getSignedUrl] = useGetSignedUrlMutation()
  const [uploadToS3] = useUploadToS3Mutation()
  const [createSubject] = useCreateSubjectMutation();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: initialValues.title || "",
      image: initialValues.image || "blobs/image-placeholder.png",
      term: initialValues.term.toString() || "1",
      grade: initialValues.grade.toString() || "10",
      description: initialValues.description || [""],
    },
  });

  // local state
  const [uploadStatus, setUploadStatus] = useState<
    "idle" | "uploading" | "success" | "error"
  >("idle")

  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (!file.type.startsWith("image/")) {
      toast.error("Please select a valid image file.")
      return
    }

    try {
      setUploadStatus("uploading")

      // Request signed URL via RTK Mutation
      const { uploadUrl, fileKey } = await getSignedUrl({
        fileName: file.name,
        fileType: file.type,
      }).unwrap()

      // Upload file directly to S3
      await uploadToS3({ uploadUrl, file }).unwrap()

      form.setValue("image", fileKey, { shouldValidate: true })

      setUploadStatus("success")
      toast.success("Image uploaded successfully!")
    } catch (error) {
      setUploadStatus("error")
      toast.error("Error uploading image")
      console.error(error)
    }
  }



  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "description",
  })

  const onSubmit = async (data: z.infer<typeof formSchema>)=>  {
    console.log("onSubmit", data);
    if (uploadStatus === "uploading") {
      toast.error("Please wait for the image to finish uploading")
      return
    }


    const subject: Omit<Subject, "id"> = {
      title: data.title,
      term: Number(data.term),
      grade: Number(data.grade),
      image: data.image,
      description: data.description,
    }

    await createSubject(subject);
  }

  return (
    <Card className="w-full bg-background sm:max-w-md">
      <CardHeader>
        <CardTitle className="text-sm">{label}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className={"space-y-5"}>
        <div className="group relative aspect-video w-full overflow-hidden rounded-lg border-2 border-dashed border-muted-foreground/20 bg-muted/50 transition-colors hover:border-primary/50">
          {form.watch("image") ? (
            <>
              <Image
                src={`${CLOUDFRONT}/${form.getValues("image")}`}
                alt="Subject Preview"
                fill
                className={`object-cover transition-opacity ${uploadStatus === "uploading" ? "opacity-40" : "opacity-100"}`}
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground"
                >
                  <HugeiconsIcon icon={PencilEdit02Icon} />
                </button>
              </div>
            </>
          ) : (
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="flex h-full w-full flex-col items-center justify-center gap-2 text-muted-foreground"
            >
              {uploadStatus === "uploading" ? (
                <Spinner />
              ) : (
                <>
                  <HugeiconsIcon icon={Upload03Icon} />
                  <span className="text-xs font-medium">
                    Upload Subject Image
                  </span>
                </>
              )}
            </button>
          )}

          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept="image/*"
            onChange={handleImageUpload}
          />
        </div>
        <form
          id="subject-form"
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
                  <FieldLabel className="text-lg" htmlFor="subject-form-title">
                    Subject Title
                  </FieldLabel>
                  <Input
                    {...field}
                    id="subject-form-title"
                    aria-invalid={fieldState.invalid}
                    placeholder="e.g. Mathematics"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="term"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel className="text-lg">Term</FieldLabel>
                  <RadioGroup
                    onValueChange={field.onChange}
                    value={field.value} // Use 'value' instead of 'defaultValue'
                    className="flex flex-row space-x-4 pt-2"
                  >
                    {["1", "2", "3", "4"].map((value) => (
                      <div key={value} className="flex items-center space-x-2">
                        <RadioGroupItem value={value} id={`term-${value}`} />
                        <label
                          htmlFor={`term-${value}`}
                          className="cursor-pointer text-sm leading-none font-medium"
                        >
                          {value}
                        </label>
                      </div>
                    ))}
                  </RadioGroup>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="grade"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel className="text-lg">Grade</FieldLabel>
                  <RadioGroup
                    onValueChange={field.onChange}
                    value={field.value} // Use 'value' instead of 'defaultValue'
                    className="flex flex-row space-x-4 pt-2"
                  >
                    {["10", "11", "12"].map((value) => (
                      <div key={value} className="flex items-center space-x-2">
                        <RadioGroupItem value={value} id={`term-${value}`} />
                        <label
                          htmlFor={`term-${value}`}
                          className="cursor-pointer text-sm leading-none font-medium"
                        >
                          {value}
                        </label>
                      </div>
                    ))}
                  </RadioGroup>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <FieldGroup>
              {fields.map((item, index) => (
                <Controller
                  key={item.id}
                  name={`description.${index}`}
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel className="text-lg">
                        Paragraph {index + 1}
                      </FieldLabel>

                      <InputGroup>
                        <InputGroupTextarea
                          {...field}
                          placeholder="Write paragraph..."
                          rows={4}
                          className="min-h-20 resize-none"
                          aria-invalid={fieldState.invalid}
                        />
                        <InputGroupAddon align="block-end">
                          <InputGroupText className="tabular-nums">
                            {field.value.length}/710
                          </InputGroupText>
                        </InputGroupAddon>
                      </InputGroup>

                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}

                      {/* REMOVE BUTTON */}
                      {fields.length > 1 && (
                        <button
                          type="button"
                          onClick={() => remove(index)}
                          className="mt-2 text-sm text-red-500"
                        >
                          Remove paragraph
                        </button>
                      )}
                    </Field>
                  )}
                />
              ))}

              {/* ADD BUTTON */}
              <button
                type="button"
                onClick={() => append("")}
                className="mt-2 rounded-md border p-2 text-sm"
              >
                + Add Paragraph
              </button>
            </FieldGroup>
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
            className="rounded-full  bg-primary p-3 text-lg"
            form="subject-form"
          >
            Submit
          </button>
        </Field>
      </CardFooter>
    </Card>
  )
}

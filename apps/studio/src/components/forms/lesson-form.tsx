"use client"

import * as React from "react"
import { useRef, useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

import { lessonSchema } from "@/lib/schemas"
import {
  useCreateLessonMutation,
  useGetSignedUrlMutation,
  useUploadToS3Mutation,
} from "@/state/api"
import { Input } from "@workspace/ui/components/input"
import { toast } from "sonner"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card"
import { CLOUDFRONT } from "@/lib/constants"
import { HugeiconsIcon } from "@hugeicons/react"
import { PencilEdit02Icon, Upload03Icon } from "@hugeicons/core-free-icons"
import { Spinner } from "@workspace/ui/components/spinner"
import { Field, FieldError, FieldGroup, FieldLabel } from "@workspace/ui/components/field"
import { InputGroup, InputGroupAddon, InputGroupText, InputGroupTextarea } from "@workspace/ui/components/input-group"

export function CreateLessonForm(props: {
  topicId: string
  topicTitle: string
  onDone?: () => void
}) {
  const [getSignedUrl] = useGetSignedUrlMutation()
  const [uploadToS3] = useUploadToS3Mutation()
  const [createLesson, { isLoading }] = useCreateLessonMutation()

  // Keep the shared lessonSchema unchanged but let this form carry `videoId` for UI/watch purposes.
  const lessonFormSchema = lessonSchema.extend({ videoId: z.string().optional() })
  type LessonFormFields = z.infer<typeof lessonFormSchema>

  const form = useForm<LessonFormFields>({
    resolver: zodResolver(lessonFormSchema),
    defaultValues: { title: "", description: "", videoId: "" },
  })

  const [uploadStatus, setUploadStatus] = useState<
    "idle" | "uploading" | "success" | "error"
  >("idle")
  const [videoError, setVideoError] = useState<string>("")
  const fileInputRef = useRef<HTMLInputElement>(null)

  const videoId = form.watch("videoId") ?? ""
  const videoInvalid = !videoId || uploadStatus === "error"

  const handleVideoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (!file.type.startsWith("video/")) {
      setVideoError("Please select a valid video file.")
      toast.error("Please select a valid video file.")
      return
    }

    try {
      setUploadStatus("uploading")
      setVideoError("")

      const { uploadUrl, fileKey } = await getSignedUrl({
        fileName: file.name,
        fileType: file.type,
      }).unwrap()

      await uploadToS3({ uploadUrl, file }).unwrap()

      form.setValue("videoId", fileKey, { shouldDirty: true })
      setUploadStatus("success")
      setVideoError("")
      toast.success("Video uploaded successfully!")
    } catch (error) {
      setUploadStatus("error")
      setVideoError("Error uploading video")
      toast.error("Error uploading video")
      console.error(error)
    }
  }

  const onValidSubmit = async (values: LessonFormFields) => {
    if (uploadStatus === "uploading") {
      toast.error("Please wait for the video to finish uploading")
      return
    }

    const submittedVideoId = values.videoId ?? ""
    if (!submittedVideoId) {
      setVideoError("Please upload a video before submitting.")
      toast.error("Please upload a video before submitting")
      return
    }

    try {
      await createLesson({
        topicId: props.topicId,
        title: values.title,
        description: values.description,
        videoId: submittedVideoId,
      }).unwrap()

      toast.success("Lesson created!")
      form.reset({ title: "", description: "", videoId: "" })
      setUploadStatus("idle")
      setVideoError("")
      props.onDone?.()
    } catch (error) {
      toast.error("Error creating lesson")
      console.error(error)
    }
  }

  return (
    <Card className="w-full border-none bg-background sm:max-w-md">
      <CardHeader>
        <CardTitle className="text-sm">Create Lesson</CardTitle>
        <CardDescription className="font-medium">
          New lesson for:{" "}
          <span className="text-foreground text-lg font-normal">{props.topicTitle}</span>
        </CardDescription>
      </CardHeader>

      <form
        id="lesson-form"
        onSubmit={form.handleSubmit(onValidSubmit, (errors) => {
          console.log("Validation Errors:", errors)
          toast.error("Please fix the highlighted fields.")
        })}
      >
        <CardContent className="space-y-5">
          <div
            className={[
              "group relative aspect-video w-full overflow-hidden rounded-lg border-2 border-dashed bg-muted/50 transition-colors",
              videoInvalid
                ? " ring-offset-background"
                : "border-muted-foreground/20 hover:border-primary/50",
            ].join(" ")}
          >
            {videoId ? (
              <>
                <video
                  src={`${CLOUDFRONT}/${videoId}`}
                  controls
                  className={`h-full w-full object-cover transition-opacity ${uploadStatus === "uploading" ? "opacity-40" : "opacity-100"}`}
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
                      Upload Lesson Video
                    </span>
                  </>
                )}
              </button>
            )}

            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              accept="video/*"
              onChange={handleVideoUpload}
            />
          </div>
          {videoError ? (
            <p className="text-xs font-normal text-destructive">{videoError}</p>
          ) : null}

          <FieldGroup>
            <Controller
              name="title"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel className="text-lg" htmlFor="lesson-form-title">
                    Lesson Title
                  </FieldLabel>
                  <Input
                    {...field}
                    id="lesson-form-title"
                    className="rounded-sm"
                    aria-invalid={fieldState.invalid}
                    placeholder="e.g. Introduction to Algebra"
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
                  <FieldLabel className="text-lg">
                    Lesson Description
                  </FieldLabel>
                  <InputGroup>
                    <InputGroupTextarea
                      {...field}
                      placeholder="Write description..."
                      rows={6}
                      className="min-h-28 w-full rounded-sm"
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
        </CardContent>

        <CardFooter className={"border-none"}>
          <Field orientation="horizontal">
            <button
              type="button"
              className={"rounded-sm bg-accent px-3 py-2 text-sm font-medium"}
              onClick={() => {
                form.reset({ title: "", description: "", videoId: "" })
                setUploadStatus("idle")
                setVideoError("")
              }}
            >
              Reset
            </button>
            <button
              type="submit"
              className="rounded-sm bg-[#ffbb00] px-3 py-2 text-sm font-medium text-black disabled:opacity-50"
              disabled={isLoading || uploadStatus === "uploading"}
            >
              Submit
            </button>
          </Field>
        </CardFooter>
      </form>
    </Card>
  )
}

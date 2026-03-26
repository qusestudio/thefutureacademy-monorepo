import { z } from "zod"

export const formSchema = z.object({
  title: z
    .string()
    .min(5, "title must be at least 5 characters.")
    .max(32, "title must be at most 32 characters."),
  image: z.string().min(5, "image must be at least 5 characters."),
  term: z
    .string()
    .min(1, "One value is expected.")
    .max(1, "One value is expected."),
  grade: z
    .string()
    .min(1, "One or two value is expected.")
    .max(2, "One value is expected."),
  description: z
    .array(
      z.object({
        value: z
          .string()
          .min(100, "Each paragraph must be at least 100 characters.")
          .max(710, "Each paragraph must be at most 710 characters."),
      })
    )
    .min(1, "At least one paragraph is required."),
})

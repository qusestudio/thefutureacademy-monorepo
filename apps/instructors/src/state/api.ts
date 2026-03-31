import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { fetchAuthSession, getCurrentUser } from "aws-amplify/auth"

import {
  Instructor,
  Lesson,
  Subject,
  TeachingAllocation,
  Topic,
} from "@/types/models"
import { toast } from "sonner"
import { createNewUserInDatabase } from "@/lib/utils"

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
    prepareHeaders: async (headers) => {
      const session = await fetchAuthSession()
      const { idToken } = session.tokens ?? {}
      if (idToken) {
        headers.set("Authorization", `Bearer ${idToken}`)
      }
      console.log(headers.entries())
      return headers
    },
  }),
  reducerPath: "api",
  tagTypes: [
    "Instructors",
    "Allocations",
    "Subjects",
    "SubjectDetails",
    "Topics",
    "TopicDetails",
    "Lessons",
    "LessonDetails",
    "InstructorSubjects"
  ],
  endpoints: (build) => ({
    // Authentication
    getAuthUser: build.query<User, void>({
      queryFn: async (_, _queryApi, _extraoptions, fetchWithBQ) => {
        try {
          const session = await fetchAuthSession()
          const { idToken } = session.tokens ?? {}
          const user = await getCurrentUser() // Fetching info from cognito
          const userRole = idToken?.payload["custom:role"] as string
          const email = idToken?.payload["email"] as string

          const endpoint = `/instructors/${user.userId}`

          // Check if the user exists in our server
          console.log("Checking If user exists in our server")

          let userDetailsResponse = await fetchWithBQ(endpoint)
          console.log(userDetailsResponse.data)
          console.log(userDetailsResponse.error)

          // If user doesn't exist, create new user
          if (
            userDetailsResponse.error &&
            userDetailsResponse.error.status === 404
          ) {
            console.log("User Not Found Error")
            userDetailsResponse = await createNewUserInDatabase(
              user,
              idToken,
              userRole,
              fetchWithBQ
            )
          }

          return {
            data: {
              cognitoInfo: { ...user },
              userInfo: userDetailsResponse.data as Instructor, // discrepancy
              userRole,
              email,
            },
          }
        } catch (error: any) {
          return {
            error: error.message || "Could not fetch instructor data",
          }
        }
      },
    }),

    // Analytics
    getNoOfStudents: build.query<number, void>({
      query: () => {
        return { url: "/analytics/no-of-students" }
      },
      providesTags: [],
      async onQueryStarted(_, { queryFulfilled }) {
        toast.promise(queryFulfilled, {
          error: "Failed to fetch the number of registered students",
        })
      },
    }),
    getNoOfInstructors: build.query<number, void>({
      query: () => {
        return { url: "/analytics/no-of-instructors" }
      },
      providesTags: [],
      async onQueryStarted(_, { queryFulfilled }) {
        toast.promise(queryFulfilled, {
          error: "Failed to fetch the number of registered instructors",
        })
      },
    }),
    getNoOfEnrollments: build.query<number, void>({
      query: () => {
        return { url: "/analytics/no-of-enrollments" }
      },
      providesTags: [],
      async onQueryStarted(_, { queryFulfilled }) {
        toast.promise(queryFulfilled, {
          error: "Failed to fetch the number of registered students",
        })
      },
    }),

    // All instructors
    getInstructor: build.query<Instructor, string>({
      query: (instructorId) => {
        return { url: `/instructors/${instructorId}` }
      },
      providesTags: ["Instructors"],
      async onQueryStarted(_, { queryFulfilled }) {
        toast.promise(queryFulfilled, {
          error: "Could not fetch instructor",
        })
      },
    }),
    getSubject: build.query<Subject, string>({
      query: (subjectId) => `/subjects/${subjectId}`,
      providesTags: ["SubjectDetails"],
      async onQueryStarted(_, { queryFulfilled }) {
        toast.promise(queryFulfilled, {
          error: "Failed to fetch subject.",
        })
      },
    }),

    // Topics endpoints
    getTopicsBySubject: build.query<Topic[], string>({
      query: (subjectId) => {
        return { url: `/subjects/${subjectId}/topics` }
      },
      providesTags: ["Topics"],
      async onQueryStarted(_, { queryFulfilled }) {
        toast.promise(queryFulfilled, {
          error: "Failed to fetch topics.",
        })
      },
    }),
    createTopic: build.mutation<Topic, Omit<Topic, "id">>({
      query: (topic) => {
        return {
          url: "/topics",
          method: "POST",
          body: topic,
        }
      },

      invalidatesTags: (result, error) => [
        { type: "Topics" },
        { type: "Topics", id: "LIST" },
      ],

      async onQueryStarted(_, { queryFulfilled }) {
        toast.promise(queryFulfilled, {
          loading: "Creating topic...",
          success: "Topic created successfully!",
          error: "Failed to create topic.",
        })
      },
    }),
    getTopic: build.query<Topic, string>({
      query: (topicId) => `/topics/${topicId}`,
      providesTags: (result, error, id) => [{ type: "TopicDetails", id }],
      async onQueryStarted(_, { queryFulfilled }) {
        toast.promise(queryFulfilled, {
          error: "Failed to load topics details.",
        })
      },
    }),

    // Lesson endpoints
    getLessons: build.query<Lesson[], string>({
      query: (topicId) => {
        return { url: `/topics/${topicId}/lessons` }
      },
      providesTags: ["Lessons"],
      async onQueryStarted(_, { queryFulfilled }) {
        toast.promise(queryFulfilled, {
          error: "Failed to fetch lessons.",
        })
      },
    }),
    getLesson: build.query<Lesson, string>({
      query: (lessonId) => `/lessons/${lessonId}`,
      providesTags: (result, error, id) => [{ type: "LessonDetails", id }],
      async onQueryStarted(_, { queryFulfilled }) {
        toast.promise(queryFulfilled, {
          loading: "Fetching Lesson...",
          error: "Failed to fetch lesson.",
        })
      },
    }),
    createLesson: build.mutation<Lesson, Omit<Lesson, "id">>({
      query: (lessonData) => ({
        url: "/lessons",
        method: "POST",
        body: lessonData,
      }),
      invalidatesTags: (result, error, { topicId }) => [
        { type: "Lessons", id: topicId },
        { type: "Lessons", id: "LIST" },
      ],
      async onQueryStarted(_, { queryFulfilled }) {
        toast.promise(queryFulfilled, {
          loading: "Creating Lesson...",
          success: "Lesson created successfully!",
          error: "Failed to create lesson.",
        })
      },
    }),

    // Classroom endpoints
    getTeachingAllocations: build.query<TeachingAllocation[], void>({
      queryFn: async (_, _queryApi, _extraOptions, fetchWithBQ) => {
        try {
          const user = await getCurrentUser();
          if (!user) {
            return {
              error: { status: 401, data: "Not authenticated user found"} };
          }

          const instructorId = user.userId // or whatever field contains the student ID

          const result = await fetchWithBQ(`/instructors/${instructorId}/allocations`)

          if (result.error) {
            return { error: result.error }
          }

          return { data: result.data as TeachingAllocation[] }

        } catch (error: any) {
          return {
            error: error.message || "Could not fetch subjects",
          }
        }
      },
      providesTags: ["InstructorSubjects"],
      async onQueryStarted(_, {queryFulfilled}) {
        toast.promise(queryFulfilled, {
          loading: "We are fetching your subjects.",
          error: "We could not fetch your allocated subjects."
        })
      }
    }),
  }),
})

export const s3api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_HOST_URL,
    prepareHeaders: async (headers) => {
      headers.set("Content-Type", `application/json`)
      headers.set("Origin", "https://studio.thefutureacademy.co.za")
      console.log(headers.entries())
      return headers
    },
  }),
  reducerPath: "s3api",
  tagTypes: [],
  endpoints: (build) => ({
    // Getting signed URL
    getSignedUrl: build.mutation<
      { uploadUrl: string; fileKey: string },
      { fileName: string; fileType: string }
    >({
      query: (payload) => {
        return {
          url: "/upload",
          method: "POST",
          body: payload,
        }
      },

      invalidatesTags: [],

      async onQueryStarted(_, { queryFulfilled }) {
        const { data, meta } = await queryFulfilled
        console.log("LOGGING upload url")
        console.log(data.uploadUrl)
        toast.promise(queryFulfilled, {
          loading: "Getting signed url...",
          success: `Received signed url! ${data.uploadUrl}`,
          error: `Failed getting signed url. ${meta?.response}`,
        })
      },
    }),
    uploadToS3: build.mutation<null, { uploadUrl: string; file: File }>({
      queryFn: async ({ uploadUrl, file }) => {
        console.log("LOGGING upload url")
        console.log(uploadUrl)
        try {
          const response = await fetch(uploadUrl, {
            method: "PUT",
            body: file,
            headers: { "Content-Type": file.type },
          })

          if (!response.ok) throw new Error("S3 Upload Failed")

          return { data: null }
        } catch (error) {
          return { error: { status: "CUSTOM_ERROR", error: String(error) } }
        }
      },

      invalidatesTags: [],

      async onQueryStarted(_, { queryFulfilled }) {
        toast.promise(queryFulfilled, {
          loading: "Uploading file...",
          success: "File uploaded successfully!",
          error: "Failed to upload file.",
        })
      },
    }),
  }),
})

export const {
  // Analytics
  useGetNoOfStudentsQuery,
  useGetNoOfInstructorsQuery,
  useGetAuthUserQuery,
  useGetInstructorQuery,
  useGetSubjectQuery,
  useGetTopicsBySubjectQuery,
  useCreateTopicMutation,
  useGetTopicQuery,
  useGetLessonsQuery,
  useGetLessonQuery,
  useCreateLessonMutation,
  useGetTeachingAllocationsQuery
} = api

export const { useGetSignedUrlMutation, useUploadToS3Mutation } = s3api

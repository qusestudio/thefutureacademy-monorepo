import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { fetchAuthSession, getCurrentUser } from "aws-amplify/auth"

import {
  Admin,
  Allocation,
  Instructor,
  Lesson,
  Plan,
  Student,
  StudentSubscription,
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
    "StudentSubscriptions",
    "Students",
    "Instructors",
    "Allocations",
    "Subjects",
    "SubjectDetails",
    "Topics",
    "TopicDetails",
    "Lessons",
    "LessonDetails",
    "Plans",
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

          const endpoint = `/admins/${user.userId}`

          // Check if the user exists in our server
          console.log("Checking If user exists in our server")

          let userDetailsResponse = await fetchWithBQ(endpoint)
          console.log(userDetailsResponse.data)
          console.log(userDetailsResponse.error)

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
              userInfo: userDetailsResponse.data as Admin, // discrepancy
              userRole,
              email,
            },
          }
        } catch (error: any) {
          return {
            error: error.message || "Could not fetch admin data",
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

    /** Student APIs*/
    getStudent: build.query<Student, string>({
      query: (studentId) => {
        return { url: `/students/${studentId}` }
      },
      providesTags: ["Students"],
      async onQueryStarted(_, { queryFulfilled }) {
        toast.promise(queryFulfilled, {
          error: "Could not fetch student",
        })
      },
    }),
    getAllStudents: build.query<Student[], void>({
      query: () => {
        return { url: "/students" }
      },
      providesTags: ["Students"],
      async onQueryStarted(_, { queryFulfilled }) {
        toast.promise(queryFulfilled, {
          error: "Could not fetch students",
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
    getAllInstructors: build.query<Instructor[], void>({
      query: () => {
        return { url: "/instructors" }
      },
      providesTags: ["Instructors"],
      async onQueryStarted(_, { queryFulfilled }) {
        toast.promise(queryFulfilled, {
          error: "Could not fetch instructors",
        })
      },
    }),

    // Allocations endpoints
    getTeachingAllocations: build.query<TeachingAllocation[], string>({
      query: (instructorId) => {
        return { url: `/instructors/${instructorId}/allocations` }
      },
      providesTags: ["Allocations"],

      async onQueryStarted(_, { queryFulfilled }) {
        toast.promise(queryFulfilled, {
          loading: "Loading teaching allocations.",
          error: "Failed to fetch teaching allocations.",
        })
      },
    }),
    setTeachingAllocation: build.mutation<Allocation, Omit<Allocation, "id">>({
      query: (allocation) => ({
        url: "/allocations",
        method: "POST",
        body: allocation,
      }),

      invalidatesTags: ["Allocations"],

      async onQueryStarted(_, { queryFulfilled }) {
        toast.promise(queryFulfilled, {
          loading: "Allocating...",
          success: "Allocation successful!",
          error: "Setting allocation failed.",
        })
      },
    }),
    getAllocations: build.query<Allocation[], void>({
      query: () => {
        return { url: "/allocations" }
      },
      providesTags: ["Allocations"],
      async onQueryStarted(_, { queryFulfilled }) {
        toast.promise(queryFulfilled, {
          error: "Fetching allocations failed.",
        })
      },
    }),
    deleteAllocations: build.mutation<
      { rows_affected: number },
      { ids: string[] }
    >({
      query: ({ ids }) => {
        return {
          url: "/allocations",
          method: "DELETE",
          body: ids,
        }
      },
      invalidatesTags: ["Allocations"],
      async onQueryStarted(_, { queryFulfilled }) {
        const { data } = await queryFulfilled

        toast.promise(queryFulfilled, {
          loading: "Deleting allocation(s)...",
          success: `${data.rows_affected} row(s) affected!`,
          error: "Failed to delete allocation(s).",
        })
      },
    }),

    // Subjects endpoints
    getAllSubjects: build.query<Subject[], void>({
      query: () => {
        return { url: `/subjects` }
      },
      providesTags: ["Subjects"],
      async onQueryStarted(_, { queryFulfilled }) {
        toast.promise(queryFulfilled, {
          error: "Failed to fetch all subjects.",
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
    createSubject: build.mutation<Subject, Omit<Subject, "id">>({
      query: (subject) => {
        return {
          url: "/subjects",
          method: "POST",
          body: subject,
        }
      },

      invalidatesTags: (result, error) => [
        { type: "Subjects" },
        { type: "Subjects", id: "LIST" },
      ],

      async onQueryStarted(_, { queryFulfilled }) {
        toast.promise(queryFulfilled, {
          loading: "Creating subject...",
          success: "Subject created successfully!",
          error: `Failed to create subject.`,
        })
      },
    }),
    deleteSubjects: build.mutation<
      { rows_affected: number },
      { ids: string[] }
    >({
      query: ({ ids }) => {
        return {
          url: "/subjects",
          method: "DELETE",
          body: ids,
        }
      },
      invalidatesTags: ["Subjects"],
      async onQueryStarted(_, { queryFulfilled }) {
        const { data } = await queryFulfilled

        toast.promise(queryFulfilled, {
          loading: "Deleting subjects...",
          success: `${data.rows_affected} row(s) affected!`,
          error: "Failed to delete subjects.",
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
    deleteTopics: build.mutation<{ rows_affected: number }, { ids: string[] }>({
      query: ({ ids }) => {
        return {
          url: "/topics",
          method: "DELETE",
          body: ids,
        }
      },
      invalidatesTags: ["Topics"],
      async onQueryStarted(_, { queryFulfilled }) {
        const { data } = await queryFulfilled

        toast.promise(queryFulfilled, {
          loading: "Deleting topics...",
          success: `${data.rows_affected} row(s) affected!`,
          error: "Failed to delete topics.",
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

      invalidatesTags: ["Lessons"],

      async onQueryStarted(_, { queryFulfilled }) {
        toast.promise(queryFulfilled, {
          loading: "Creating Lesson...",
          success: "Lesson created successfully!",
          error: "Failed to create lesson.",
        })
      },
    }),

    // Billing
    getStudentSubscriptions: build.query<StudentSubscription[], string>({
      query: (studentId) => `/students/${studentId}/subscriptions`,
      providesTags: ["StudentSubscriptions"],
      async onQueryStarted(_, { queryFulfilled }) {
        toast.promise(queryFulfilled, {
          error: "Failed to fetch subscriptions.",
        })
      },
    }),
    createSubscription: build.mutation<void, Omit<StudentSubscription, "id">>({
      query: (subscription) => {
        console.log(subscription)
        return {
          url: "/subscriptions",
          method: "POST",
          body: subscription,
        }
      },
      invalidatesTags: ["StudentSubscriptions"],
      async onQueryStarted(_, { queryFulfilled }) {
        toast.promise(queryFulfilled, {
          error: "Could not create subscription.",
        })
      },
    }),

    getPlans: build.query<Plan[], void>({
      query: () => `/plans`,
      providesTags: ["Plans"],
      async onQueryStarted(_, { queryFulfilled }) {
        toast.promise(queryFulfilled, {
          error: "Failed to fetch plans.",
        })
      },
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
        toast.promise(queryFulfilled, {
          loading: "Getting signed url...",
          success: `Received signed url! ${data.uploadUrl}`,
          error: (err) => {
            // RTK Query wraps the server response in an 'error' or 'data' field
            // depending on the structure, usually err.error.data

            return err?.error?.data?.error || "Failed getting signed url."
          },
        });

        try {
          await queryFulfilled
        } catch (err) {
          // Optional: Log it here if you need to
          console.error("Upload error details:", err)
        }
      },
    }),
    uploadToS3: build.mutation<null, { uploadUrl: string; file: File }>({
      queryFn: async ({ uploadUrl, file }) => {
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
  useGetStudentQuery,
  useGetAllStudentsQuery,
  useGetStudentSubscriptionsQuery,
  useCreateSubscriptionMutation,
  useGetInstructorQuery,
  useGetAllInstructorsQuery,
  useGetSubjectQuery,
  useGetAllSubjectsQuery,
  useGetTopicsBySubjectQuery,
  useDeleteSubjectsMutation,
  useCreateTopicMutation,
  useGetTopicQuery,
  useDeleteTopicsMutation,
  useGetLessonsQuery,
  useGetLessonQuery,
  useCreateSubjectMutation,
  useCreateLessonMutation,
  useGetAllocationsQuery,
  useSetTeachingAllocationMutation,
  useDeleteAllocationsMutation,
  useGetPlansQuery,
} = api

export const { useGetSignedUrlMutation, useUploadToS3Mutation } = s3api

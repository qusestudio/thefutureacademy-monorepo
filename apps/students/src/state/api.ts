import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { fetchAuthSession, getCurrentUser } from "aws-amplify/auth"
import {
  Enrollment,
  Lesson,
  Plan,
  StudentCheckout,
  StudentEnrollment,
  StudentProfile,
  StudentSubscription,
  StudentUser,
  Subject,
  Topic,
  YocoCheckoutRequest,
  YocoCheckoutResponse,
} from "@/types/models"
import { createNewUserInDatabase } from "@/lib/utils"
import { toast } from "sonner"
import { Subscription } from "react-redux"

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
    "StudentProfile",
    "StudentEnrollments",
    "Subjects",
    "SubjectDetails",
    "Topics",
    "TopicDetails",
    "LessonDetails",
    "Lessons",
    "Payment",
    "StudentCheckout",
    "StudentSubscription",
    "Plan",
  ],
  endpoints: (build) => ({
    /** User Data*/
    getAuthUser: build.query<User, void>({
      queryFn: async (_, _queryApi, _extraoptions, fetchWithBQ) => {
        try {
          const session = await fetchAuthSession()
          const { idToken } = session.tokens ?? {}
          const user = await getCurrentUser() // Fetching info from cognito
          const userRole = idToken?.payload["custom:role"] as string
          const email = idToken?.payload["email"] as string

          const endpoint = `/students/${user.userId}`

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
              userInfo: userDetailsResponse.data as StudentUser,
              userRole,
              email,
            },
          }
        } catch (error: any) {
          return {
            error: error.message || "Could not fetch user data",
          }
        }
      },
    }),
    // Profile
    createProfile: build.mutation<StudentProfile, Omit<StudentProfile, "id">>({
      query: (profile) => ({
        url: "/student-profiles",
        method: "POST",
        body: profile,
      }),

      invalidatesTags: ["StudentProfile"],

      async onQueryStarted(_, { queryFulfilled }) {
        toast.promise(queryFulfilled, {
          loading: "Setting your profile...",
          success: "Profile set up successfully!",
          error: "We are sorry something happened.",
        })
      },
    }),
    getAuthProfile: build.query<StudentProfile, void>({
      queryFn: async (_, _queryApi, _extraOptions, fetchWithBQ) => {
        try {
          const user = await getCurrentUser()
          if (!user) {
            return {
              error: { status: 401, data: "No authenticated user found" },
            }
          }
          const studentId = user.userId // or whatever field contains the student ID
          const result = await fetchWithBQ(`/student-profiles/${studentId}`)
          if (result.error) {
            return { error: result.error }
          }
          return { data: result.data as StudentProfile }
        } catch (error: any) {
          return {
            error: error.message || "Could not fetch student profile",
          }
        }
      },
      providesTags: ["StudentProfile"],
    }),
    // Subjects
    getSubjectsByGrade: build.query<Subject[], number>({
      query: (grade) => {
        return { url: `/grades/${grade}/subjects` }
      },
      providesTags: ["Subjects"],
      async onQueryStarted(grade, { queryFulfilled }) {
        toast.promise(queryFulfilled, {
          error: `Failed to fetch available subjects for grade ${grade}`,
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

    // Topics
    getTopic: build.query<Topic, string>({
      query: (topicId) => `/topics/${topicId}`,
      providesTags: (result, error, id) => [{ type: "TopicDetails", id }],
      async onQueryStarted(_, { queryFulfilled }) {
        toast.promise(queryFulfilled, {
          error: "Failed to load topics details.",
        })
      },
    }),
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
    // Billing
    /** Billing endpoints */
    createCheckout: build.mutation<YocoCheckoutResponse, YocoCheckoutRequest>({
      query: (checkout) => {
        return {
          url: "/checkouts",
          method: "POST",
          body: checkout,
        }
      },
      invalidatesTags: ["Payment", "StudentCheckout"],
      async onQueryStarted(_, { queryFulfilled }) {
        toast.promise(queryFulfilled, {
          loading: "Initiating payment...",
          success: "You are being redirected to complete payment!",
          error: "Could not initiate payment.",
        })
      },
    }),
    getStudentCheckout: build.query<StudentCheckout, void>({
      queryFn: async (_, _queryApi, _extraOptions, fetchWithBQ) => {
        try {
          const user = await getCurrentUser()

          if (!user) {
            return {
              error: { status: 401, data: "No authenticated user found" },
            }
          }

          const studentId = user.userId

          const result = await fetchWithBQ(`/students/${studentId}/checkout`)

          if (result.error) {
            return { error: result.error }
          }

          return { data: result.data as StudentCheckout }
        } catch (error: any) {
          return {
            error: error.message || "Could not fetch student checkout",
          }
        }
      },
      providesTags: ["StudentCheckout"],
    }),

    getStudentSubscription: build.query<StudentSubscription, void>({
      queryFn: async (_, _queryApi, _extraOptions, fetchWithBQ) => {
        try {
          const user = await getCurrentUser()

          if (!user) {
            return {
              error: { status: 401, data: "No authenticated user found" },
            }
          }

          const studentId = user.userId

          const result = await fetchWithBQ(
            `/students/${studentId}/subscription`
          )

          if (result.error) {
            return { error: result.error }
          }

          return { data: result.data as StudentSubscription }
        } catch (error: any) {
          return {
            error: error.message || "Could not fetch student subscription",
          }
        }
      },
      providesTags: ["StudentSubscription"],
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
      invalidatesTags: ["StudentSubscription"],
      async onQueryStarted(_, { queryFulfilled }) {
        toast.promise(queryFulfilled, {
          error: "Could not create subscription.",
        })
      },
    }),

    getPlanByGrade: build.query<Plan, number>({
      query: (grade) => `/grades/${grade}/plan`,
      providesTags: ["Plan"],
    }),

    // Lessons
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
    // Classroom endpoints
    createEnrollment: build.mutation<Enrollment, Omit<Enrollment, "id">>({
      query: (enrollment) => ({
        url: "/enrollments",
        method: "POST",
        body: enrollment,
      }),

      invalidatesTags: ["StudentEnrollments"],

      async onQueryStarted(_, { queryFulfilled }) {
        toast.promise(queryFulfilled, {
          loading: "Enrolling you...",
          success: "Enrolled successfully!",
          error: "We are sorry something happened.",
        })
      },
    }),
    enrollStudent: build.mutation<StudentEnrollment[], string>({
      queryFn: async (subjectId, _queryApi, _extraOptions, fetchWithBQ) => {
        try {
          const user = await getCurrentUser()
          if (!user) {
            return {
              error: { status: 401, data: "No student found to enroll" },
            }
          }

          const studentId = user.userId // or whatever field contains the student ID
          const body: Omit<Enrollment, "id"> = {
            studentId,
            subjectId,
          }
          const result = await fetchWithBQ({
            url: "/enrollments",
            method: "POST",
            body,
          })

          if (result.error) {
            return { error: result.error }
          }

          return { data: result.data as StudentEnrollment[] }
        } catch (error: any) {
          return {
            error: error.message || "Could not fetch your subjects",
          }
        }
      },
      invalidatesTags: ["StudentEnrollments"],
      async onQueryStarted(_, { queryFulfilled }) {
        toast.promise(queryFulfilled, {
          success: "Enrolled successfully!",
          loading: "Enrolling you to the subject.",
          error: "We could not fetch enroll you.",
        })
      },
    }),
    getStudentEnrollments: build.query<StudentEnrollment[], void>({
      queryFn: async (_, _queryApi, _extraOptions, fetchWithBQ) => {
        try {
          const user = await getCurrentUser()
          if (!user) {
            return {
              error: { status: 401, data: "Not authenticated user found" },
            }
          }

          const studentId = user.userId // or whatever field contains the student ID

          const result = await fetchWithBQ(`/students/${studentId}/enrollments`)

          if (result.error) {
            return { error: result.error }
          }

          return { data: result.data as StudentEnrollment[] }
        } catch (error: any) {
          return {
            error: error.message || "Could not fetch your subjects",
          }
        }
      },
      providesTags: ["StudentEnrollments"],
      async onQueryStarted(_, { queryFulfilled }) {
        toast.promise(queryFulfilled, {
          loading: "We are fetching your subjects.",
          error: "We could not fetch your subjects.",
        })
      },
    }),
  }),
})

export const {
  // Billing endpoints
  useCreateCheckoutMutation,
  useGetStudentCheckoutQuery,
  useGetStudentSubscriptionQuery,
  useCreateSubscriptionMutation,
  useGetPlanByGradeQuery,
  // User data endpoints
  useGetAuthUserQuery,
  useGetAuthProfileQuery,
  // Classroom endpoints
  useGetStudentEnrollmentsQuery,
  useEnrollStudentMutation,
  // Content endpoints
  useGetSubjectsByGradeQuery,
  useGetSubjectQuery,
  useGetTopicsBySubjectQuery,
  useGetTopicQuery,
  useGetLessonsQuery,
  useGetLessonQuery,
} = api

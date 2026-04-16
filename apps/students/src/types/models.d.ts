interface StudentUser {
  id: number
  cognitoId: string
  name: string
  email: string
  phoneNumber: string
}

interface StudentProfile {
  id: string
  studentId: string
  firstName: string
  lastName: string
  schoolName: string
  dateOfBirth: string
  grade: number
}

interface Enrollment {
  id: string
  studentId: string
  subjectId: string
}

interface StudentEnrollment {
  studentId: string
  studentName: string
  subjectId: string
  subjectTitle: string
  subjectImage: string
  grade: number
  term: number
}

interface Allocation {
  id: string
  instructorId: string
  subjectId: string
  createdAt: Date
}

interface InstructorAllocation {
  instructorId: string
  instructorName: string
  subjectId: string
  subjectTitle: string
  grade: number
  term: number
}
/**
 * CONTENT RELATED DATA
 * */
interface Subject {
  id: string
  title: string
  image: string
  description: string[]
  grade: number
  term: number
}

interface Topic {
  id: string
  subjectId: string
  title: string
  description: string
}

interface Lesson {
  id: string
  topicId: string
  videoId: string
  title: string
  description: string
}

interface YocoCheckoutRequest {
  amount: number
  currency: string
  cancelUrl?: string
  successUrl?: string
  failureUrl?: string
  metadata?: Record<string, string>
  totalDiscount?: number
  totalTaxAmount?: number
  subtotalAmount?: number
  lineItems?: LineItem[]
  externalId?: string
}

interface LineItem {
  displayName: string
  quantity: number
  pricingDetails: PricingDetails
  description?: string
}

interface YocoCheckoutResponse {
  id: string
  redirectUrl: string
  status: string
  amount: number
  currency: string
  paymentId?: string
  successUrl?: string
  cancelUrl?: string
  failureUrl?: string
  metadata?: Record<string, string>
  merchantId: string
  totalDiscount?: number
  totalTaxAmount?: number
  subtotalAmount?: number
  lineItems?: LineItem[]
  externalId?: string
  processingMode: string
  clientReferenceId?: string
}

interface PricingDetails {
  price: number
  taxAmount?: number
  discountAmount?: number
}

interface StudentCheckout {
  id: string
  studentId: string
  amount: number
  status: string
  month: number
  year: number
  createdAt: Date
  updatedAt: Date
}

interface StudentSubscription {
  id: string
  studentId: string
  planId: string
  status: string
  currentPeriodStart: Date
  currentPeriodEnd: Date
  cancelAtPeriodEnd: boolean
}

export {
  StudentUser,
  StudentProfile,
  InstructorUser,
  InstructorAccount,
  Enrollment,
  StudentEnrollment,
  AvailableSubject,
  Allocation,
  InstructorAllocation,
  Lesson,
  Topic,
  Subject,
  YocoCheckoutRequest,
  PricingDetails,
  YocoCheckoutResponse,
  StudentCheckout,
  StudentSubscription
}

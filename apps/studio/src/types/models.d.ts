/**
 * USER RELATED DATA
 * */
interface Admin {
  id: number
  cognitoId: string
  name: string
  email: string
  phoneNumber: string
}

interface Instructor {
  id: number
  cognitoId: string
  name: string
  email: string
  phoneNumber: string
}

interface Student {
  id: number
  cognitoId: string
  name: string
  email: string
  phoneNumber: string
}

interface StudentSubscription {
  id: string
  studentId: string
  planId: string
  status: string
  currentPeriodStart: string
  currentPeriodEnd: string
  cancelAtPeriodEnd: boolean
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

interface TeachingAllocation {
  instructorId: string
  instructorName: string
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
  createdAt?: Date
}

interface Plan {
  id: string
  name: string
  price: number
  duration: number
  isActive: boolean
  grade: number
}

export { Admin, Instructor, Student, Allocation, TeachingAllocation, Subject, Topic, Lesson, StudentSubscription, Plan }

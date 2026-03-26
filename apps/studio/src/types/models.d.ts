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

interface Allocation {
  id: string
  instructorId: string
  subjectId: string
  createdAt?: Date
}

export { Admin, Allocation, Subject, Topic, Lesson }

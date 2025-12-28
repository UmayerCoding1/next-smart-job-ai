export interface Job {
  id: string
  title: string
  department: string
}

interface JOB {
 category: string
 dedline: string
 title: string
 createdAt: string
 _id: string
}

interface Applicant {
  avatar: string
  fullname: string
  _id: string
}

interface JobRelatedQuestions {
  question: string
  questionNumber: string | number
  answer: string
}


 export interface Application  {
  name: string
  email: string
  phone: string
  recruiter: string
  resumeLink: string
  status: string
  _id: string
  matchScore: number
  jobRelatedQuestions: JobRelatedQuestions[]
  job: JOB
  isRead: boolean
  expectedSalary: number
  coverLetter: string
  countryCode?: string
  appliedAt: Date
  applicant: Applicant
  interviewDate?: Date
}


export const mockJobs: Job[] = [
  { id: "1", title: "Senior Frontend Developer", department: "Engineering" },
  { id: "2", title: "Product Designer", department: "Design" },
  { id: "3", title: "Backend Engineer", department: "Engineering" },
  { id: "4", title: "Marketing Manager", department: "Marketing" },
]



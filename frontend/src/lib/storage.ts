export type SavedInterview = {
  id: string
  title: string
  role: string
  status: "Not started" | "In progress" | "Completed"
  due: string
  questions: InterviewQuestion[]
}

export type InterviewQuestion = {
  id: string
  type: "theoretical" | "coding" | "design"
  topic: string
  difficulty?: string
  question_text: string
  estimated_time?: string
  based_on?: string
  maps_to_requirement?: string
}

export type SessionState = {
  current: number
  answers: Record<string, string>
  feedback: Record<string, Feedback>
  codeEvaluations: Record<string, CodeEvaluation>
  followUps: Record<string, string>
  followUpAnswers: Record<string, string>
  followUpFeedback: Record<string, Feedback>
  completed: boolean
}

export type Feedback = {
  score: number
  strengths: string | string[]
  weaknesses: string | string[]
  feedback: string
  missed_key_points: string[]
}

export type CodeEvaluation = {
  score: number
  correctness: "pass" | "partial" | "fail"
  time_complexity_estimate: string
  space_complexity_estimate: string
  strengths: string | string[]
  weaknesses: string | string[]
  edge_cases_missed: string[]
  code_feedback: string
}

const INTERVIEWS_KEY = "interviewai.interviews"
const SESSION_KEY = "interviewai.session"

const starterInterview: SavedInterview = {
  id: "int-1042",
  title: "Backend Developer — Technical Screen",
  role: "Backend Developer",
  status: "Not started",
  due: "Due Friday, 5:00 PM",
  questions: [
    {
      id: "q-1",
      type: "theoretical",
      topic: "PostgreSQL",
      difficulty: "Medium",
      estimated_time: "5 minutes",
      question_text:
        "Explain how database indexes work in PostgreSQL. What trade-offs would you consider before adding one?",
    },
    {
      id: "q-2",
      type: "coding",
      topic: "Strings",
      difficulty: "Medium",
      estimated_time: "20 minutes",
      question_text:
        "Read a string from stdin and print its first non-repeating character. Print -1 if every character repeats.",
    },
    {
      id: "q-3",
      type: "design",
      topic: "API design",
      difficulty: "Medium",
      estimated_time: "8 minutes",
      question_text:
        "How would you design a reliable API endpoint for scheduling interviews while preventing duplicate bookings?",
    },
  ],
}

export function getInterviews(): SavedInterview[] {
  try {
    const value = JSON.parse(localStorage.getItem(INTERVIEWS_KEY) || "null")
    return Array.isArray(value) && value.length ? value : [starterInterview]
  } catch {
    return [starterInterview]
  }
}

export function saveInterview(interview: SavedInterview) {
  const next = [
    interview,
    ...getInterviews().filter((item) => item.id !== interview.id),
  ]
  localStorage.setItem(INTERVIEWS_KEY, JSON.stringify(next))
}

export function getSession(): SessionState {
  const empty: SessionState = {
    current: 0,
    answers: {},
    feedback: {},
    codeEvaluations: {},
    followUps: {},
    followUpAnswers: {},
    followUpFeedback: {},
    completed: false,
  }
  try {
    return {
      ...empty,
      ...JSON.parse(localStorage.getItem(SESSION_KEY) || "{}"),
    }
  } catch {
    return empty
  }
}

export function saveSession(session: SessionState) {
  localStorage.setItem(SESSION_KEY, JSON.stringify(session))
}

export function clearSession() {
  localStorage.removeItem(SESSION_KEY)
}

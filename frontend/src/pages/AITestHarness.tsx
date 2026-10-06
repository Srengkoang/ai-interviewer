import { useState } from "react"
import { ArrowLeft } from "lucide-react"
import { useNavigate } from "react-router"
import { apiPost } from "../lib/api"
import { Button, Card, PageHeader, SectionTitle } from "../components/ui"

type TestResult = {
  loading: boolean
  data: unknown | null
  error: string | null
}

const emptyResult: TestResult = { loading: false, data: null, error: null }

export default function AITestHarnessPage() {
  const navigate = useNavigate()

  const [followUpVague, setFollowUpVague] = useState<TestResult>(emptyResult)
  const [followUpThorough, setFollowUpThorough] = useState<TestResult>(emptyResult)
  const [codeEval, setCodeEval] = useState<TestResult>(emptyResult)
  const [feedback, setFeedback] = useState<TestResult>(emptyResult)
  const [finalReport, setFinalReport] = useState<TestResult>(emptyResult)

  async function runTest(
    setter: (r: TestResult) => void,
    endpoint: string,
    payload: Record<string, unknown>,
  ) {
    setter({ loading: true, data: null, error: null })
    try {
      const result = await apiPost(endpoint, payload)
      setter({ loading: false, data: result, error: null })
    } catch (err) {
      setter({
        loading: false,
        data: null,
        error: err instanceof Error ? err.message : "Request failed.",
      })
    }
  }

  const testFollowUpVague = () =>
    runTest(setFollowUpVague, "/api/ai/follow-up-questions", {
      jobTitle: "Backend Developer",
      experienceLevel: "Mid",
      conversationHistory:
        "Q1: Tell me about your backend experience.\nA1: I've worked with Node.js and Express for about a year building REST APIs.",
      originalQuestion: "What is the difference between PUT and PATCH in REST APIs?",
      candidateAnswer:
        "PUT updates something and PATCH also updates something, but PATCH is more partial I think.",
    })

  const testFollowUpThorough = () =>
    runTest(setFollowUpThorough, "/api/ai/follow-up-questions", {
      jobTitle: "Backend Developer",
      experienceLevel: "Mid",
      conversationHistory:
        "Q1: Tell me about your backend experience.\nA1: I've worked with Node.js and Express for about a year building REST APIs.",
      originalQuestion: "What is the difference between PUT and PATCH in REST APIs?",
      candidateAnswer:
        "PUT replaces the entire resource and is idempotent. PATCH applies a partial update to specific fields.",
    })

  const testCodeEval = () =>
    runTest(setCodeEval, "/api/submissions/execute", {
      candidateCode:
        "const readline = require('readline').createInterface({ input: process.stdin });\nlet input = '';\nreadline.on('line', (line) => input += line);\nreadline.on('close', () => {\n  const str = input.trim();\n  for (let i = 0; i < str.length; i++) {\n    if (str.indexOf(str[i]) === str.lastIndexOf(str[i])) {\n      console.log(str[i]);\n      return;\n    }\n  }\n  console.log('null');\n});",
      testCases: [
        { input: "leetcode", expectedOutput: "l" },
        { input: "aabb", expectedOutput: "-1" },
        { input: "", expectedOutput: "-1" },
      ],
      programmingLanguage: "JavaScript",
      experienceLevel: "Junior",
      problemStatement:
        "Write a function that returns the first non-repeating character in a string. Print -1 if none exists.",
    })

  const testFeedback = () =>
    runTest(setFeedback, "/api/ai/feedback", {
      jobTitle: "Backend Developer",
      experienceLevel: "Mid",
      question: "Explain how indexing works in PostgreSQL and how it affects query performance.",
      idealAnswerCriteria:
        "B-tree structure, trade-off between read speed and write/insert overhead, when indexes are NOT beneficial",
      candidateAnswer:
        "Indexes make queries faster because the database doesn't have to look at every row. It's like a lookup table.",
    })

  const testFinalReport = () =>
    runTest(setFinalReport, "/api/ai/final-report", {
      candidateName: "Alex Chen",
      jobTitle: "Backend Developer",
      experienceLevel: "Mid",
      interviewTranscript:
        "Q1: What is the difference between PUT and PATCH?\nA1: PUT replaces the whole resource, PATCH updates part of it.\nQ2: Explain PostgreSQL indexing.\nA2: Indexes make queries faster because the database doesn't have to look at every row.",
      perQuestionFeedback: [
        { score: 7, missed_key_points: [] },
        {
          score: 2,
          missed_key_points: [
            "B-tree structure",
            "Write overhead trade-off",
            "When indexes are NOT beneficial",
          ],
        },
      ],
      codeEvaluations: [
        { score: 78, correctness: "partial", edge_cases_missed: ["Empty string input"] },
      ],
    })

  function ResultBlock({ result }: { result: TestResult }) {
    if (result.loading) return <p className="test-loading">Running…</p>
    if (result.error) return <p className="test-error">{result.error}</p>
    if (result.data)
      return (
        <pre className="test-output">
          {JSON.stringify(result.data, null, 2)}
        </pre>
      )
    return null
  }

  return (
    <>
      <button className="back-link" onClick={() => navigate("/dashboard")}>
        <ArrowLeft size={16} /> Back to dashboard
      </button>
      <PageHeader
        title="AI Endpoint Test Harness"
        description="Manual test page for AI-004 through AI-007 — not part of the real candidate flow, just for verifying each endpoint works from the frontend before interviewSesssion.jsx is wired up."
      />

      <Card>
        <SectionTitle title="AI-004a: Follow-up (vague answer → expect follow_up_needed: true)" />
        <Button onClick={testFollowUpVague} loading={followUpVague.loading}>
          Run Test
        </Button>
        <ResultBlock result={followUpVague} />
      </Card>

      <Card>
        <SectionTitle title="AI-004b: Follow-up (thorough answer → expect follow_up_needed: false)" />
        <Button onClick={testFollowUpThorough} loading={followUpThorough.loading}>
          Run Test
        </Button>
        <ResultBlock result={followUpThorough} />
      </Card>

      <Card>
        <SectionTitle title="AI-005: Code Evaluation (Docker sandbox — slowest call, 5-15s)" />
        <Button onClick={testCodeEval} loading={codeEval.loading}>
          Run Test
        </Button>
        <ResultBlock result={codeEval} />
      </Card>

      <Card>
        <SectionTitle title="AI-006: Answer Feedback" />
        <Button onClick={testFeedback} loading={feedback.loading}>
          Run Test
        </Button>
        <ResultBlock result={feedback} />
      </Card>

      <Card>
        <SectionTitle title="AI-007: Final Report" />
        <Button onClick={testFinalReport} loading={finalReport.loading}>
          Run Test
        </Button>
        <ResultBlock result={finalReport} />
      </Card>
    </>
  )
}
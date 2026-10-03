import { Badge, Card, SectionTitle } from "../components/ui"
import type { CodeEvaluation, Feedback } from "../lib/storage"

function asList(value: string | string[] | undefined) {
  if (!value) return []
  return Array.isArray(value) ? value : [value]
}

export function ScoreBadge({
  score,
  outOf = 100,
}: {
  score: number
  outOf?: number
}) {
  const normalized = (score / outOf) * 100
  return (
    <div className="score-badge">
      <strong>{score}</strong>
      <span>/ {outOf}</span>
      <div className="score-track">
        <span style={{ width: `${normalized}%` }} />
      </div>
    </div>
  )
}

export function FeedbackCard({
  feedback,
  title = "Answer feedback",
}: {
  feedback: Feedback
  title?: string
}) {
  return (
    <Card className="feedback-card">
      <SectionTitle
        title={title}
        action={<ScoreBadge score={feedback.score} outOf={10} />}
      />
      <p className="feedback-summary">{feedback.feedback}</p>
      <div className="feedback-grid">
        <div>
          <p className="label">What went well</p>
          <ul>
            {asList(feedback.strengths).map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <div>
          <p className="label">Areas to improve</p>
          <ul>
            {asList(feedback.weaknesses).map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </Card>
  )
}

export function CodeResult({ result }: { result: CodeEvaluation }) {
  const tone =
    result.correctness === "pass"
      ? "green"
      : result.correctness === "fail"
        ? "red"
        : "amber"
  return (
    <Card className="feedback-card">
      <SectionTitle
        title="Code evaluation"
        action={
          <div className="inline-actions">
            <Badge tone={tone}>{result.correctness}</Badge>
            <ScoreBadge score={result.score} />
          </div>
        }
      />
      <p className="feedback-summary">{result.code_feedback}</p>
      <div className="metric-row">
        <div>
          <span className="hint">Time complexity</span>
          <strong>{result.time_complexity_estimate || "Not available"}</strong>
        </div>
        <div>
          <span className="hint">Space complexity</span>
          <strong>{result.space_complexity_estimate || "Not available"}</strong>
        </div>
      </div>
    </Card>
  )
}

# InterviewAI — AI Module (AI Developer Documentation)

This module contains all AI-powered features for InterviewAI. It is provider-agnostic:
swapping the underlying model (currently Groq / llama-3.3-70b-versatile) only requires
changes to `config/groq.js` — nothing else in this module needs to change.

## Structure

prompts/ai/ → one prompt-builder file per feature (pure functions, no API calls)
schemas/ai/ → one JSON schema per feature, used to validate AI output
services/aiService.js → wires prompts + schemas together via a shared runPrompt helper
config/groq.js → talks to the Groq API, parses JSON, throws on invalid JSON
utils/aiParser.js → strips markdown fences and parses raw model output into JSON
utils/validateAIOutput.js → validates parsed JSON against a schema, throws on mismatch
### How to run

```bash
cd backend
npm test              # fast suite — schema validation only, no API calls, safe to run anytime
npx jest tests/smoke.test.js   # live smoke test — run sparingly, counts against the 8,000 TPM rate limit
```

## How a request flows

Controller → aiService.<feature>(data)
→ runPrompt(promptBuilder, data, schema, featureName)
→ promptBuilder(data) // fills in the prompt template
→ generateAIResponse(prompt) // calls Groq, parses JSON
→ validateAIOutput(result, schema) // checks shape
→ returns validated JSON, or throws after retrying once

## Features & Endpoints

| Feature | Service Function | Expected Route | Status |
|---|---|---|---|
| AI-001 Technical Questions | `generateInterviewQuestions` | `POST /api/ai/questions` | ✅ Complete |
| AI-002 Resume Questions | `generateResumeQuestions` | `POST /api/ai/resume-questions` | ✅ Complete |
| AI-003 Job Description Questions | `generateJobDescriptionQuestions` | `POST /api/ai/job-description-questions` | ✅ Complete |
| AI-004 Follow-up Question | `generateFollowUpQuestions` | `POST /api/ai/follow-up-questions` | ✅ Complete |
| AI-005 Code Evaluation | *(not yet wired)* | `POST /api/ai/code-evaluation` (planned) | ⏸️ Waiting on Docker sandbox |
| AI-006 Answer Feedback | `generateFeedback` | `POST /api/ai/feedback` | ✅ Complete |
| AI-007 Final Report | `generateFinalReport` | `POST /api/ai/final-report` | ✅ Complete |

## Sample Requests

### AI-001: Technical Questions
```json
{
  "jobTitle": "Backend Developer",
  "experienceLevel": "Mid",
  "techStack": ["Node.js", "Express", "PostgreSQL"],
  "difficulty": "Medium",
  "questionType": "Mixed",
  "questionCount": 3
}
```

### AI-003: Job Description Questions
```json
{
  "jobDescription": "We are looking for a Backend Developer experienced in Node.js and PostgreSQL...",
  "experienceLevel": "Mid",
  "questionType": "Mixed",
  "questionCount": 3
}
```

### AI-004: Follow-up Question
```json
{
  "jobTitle": "Backend Developer",
  "experienceLevel": "Mid",
  "conversationHistory": "Q1: ...\nA1: ...",
  "originalQuestion": "What is the difference between PUT and PATCH?",
  "candidateAnswer": "PUT replaces the whole resource..."
}
```
Returns `follow_up_needed: false, follow_up_question: null` if the answer is already complete —
does not generate a follow-up just because a deeper question is theoretically possible.

### AI-006: Answer Feedback
```json
{
  "jobTitle": "Backend Developer",
  "experienceLevel": "Mid",
  "question": "Explain how indexing works in PostgreSQL...",
  "idealAnswerCriteria": "B-tree structure, write overhead trade-off, when NOT beneficial",
  "candidateAnswer": "Indexes make queries faster..."
}
```

### AI-007: Final Report
```json
{
  "candidateName": "Alex Chen",
  "jobTitle": "Backend Developer",
  "experienceLevel": "Mid",
  "interviewTranscript": "Q1: ...\nA1: ...",
  "perQuestionFeedback": [{ "score": 7, "missed_key_points": [] }],
  "codeEvaluations": [{ "score": 78, "correctness": "partial", "edge_cases_missed": [] }]
}
```

## Error Handling

Every service function can throw an `Error` if:
- The AI returns malformed JSON after retrying (handled inside `generateAIResponse` / `utils/aiParser.js`)
- The AI returns valid JSON that doesn't match the expected schema (handled by `validateAIOutput`)

Controllers should catch these and respond with a `500` and the error message — see existing
pattern in `controllers/aiController.js`.

### AI-005: Code Evaluation (with live Docker sandbox)

Unlike the other 6 features, AI-005 has a preceding execution step. The flow is:
POST /api/submissions/execute
│
▼
judge/judgeService.js → evaluateSubmission()
│ runs candidate code in an isolated Docker container per test case
│ (see judge/dockerRunner.js)
▼
Builds a plain-English executionResult string + list of tested inputs
│
▼
services/aiService.js → generateCodeEvaluation()
│ feeds executionResult + testCasesTested into the AI-005 prompt
▼
Validated JSON response (score, correctness, strengths, weaknesses, etc.)

POST /api/submissions/execute
│
▼
judge/judgeService.js → evaluateSubmission()
│ runs candidate code in an isolated Docker container per test case
│ (see judge/dockerRunner.js)
▼
Builds a plain-English executionResult string + list of tested inputs
│
▼
services/aiService.js → generateCodeEvaluation()
│ feeds executionResult + testCasesTested into the AI-005 prompt
▼
Validated JSON response (score, correctness, strengths, weaknesses, etc.)

## Known Limitations / TODO

- All 7 AI features are implemented, schema-validated, and tested end-to-end against
  real Groq responses and (for AI-005) real Docker execution.
- Current sandbox only supports JavaScript (`node:20-alpine`). Adding another language
  means adding another Docker image and adjusting `dockerRunner.js`'s run command.
- `maxRetries` defaults to 1 (2 total attempts) per call in `runPrompt` — adjust
  per-feature if a specific prompt needs more resilience.
- Frontend integration (Monaco Editor wiring, how test cases are authored/stored per
  problem) is outside this module's scope.

## Model Migration Notes (Groq deprecated llama-3.3-70b-versatile)

Groq deprecated `llama-3.3-70b-versatile` in mid-2026. The module now uses
`openai/gpt-oss-120b` (configured in `config/groq.js`). This migration
surfaced a few model-behavior differences worth knowing about:

- **AI-001 / AI-003 question `type` field**: the new model classifies some
  questions as `"design"` (schema/architecture questions) in addition to
  `"theoretical"` and `"coding"`. Both the prompt and schema now explicitly
  support all three values.
- **AI-007 recommendation consistency**: added a stricter rule requiring
  `recommendation` to match `overall_score` per the guideline table, since
  enum drift is a recurring risk when swapping models.
- If migrating to a different model again in the future, re-run the smoke
  tests for all 7 features and pay close attention to any field with a
  fixed enum (`type`, `correctness`, `recommendation`) — these are the
  fields most likely to need re-tuning after a model swap.

## AI-005 Infrastructure Failure Handling

If the Docker sandbox itself fails (e.g., Docker Desktop isn't running,
the daemon is unreachable) rather than the candidate's code failing, the
system must not score the candidate — doing so would be an invalid,
unfair evaluation based on a broken environment rather than actual code.

This is handled with two layers of defense:

1. **Backend-level check** (`judge/judgeService.js` → `isInfrastructureFailure`,
   used in `controllers/submissionController.js`): deterministically detects
   when all test cases failed with infrastructure-related error text (e.g.
   "docker", "daemon", "npipe", "connect") and returns a fixed fallback
   response **without calling the AI at all**.
2. **Prompt-level check** (`prompts/ai/codeEvaluationPrompt.js`): as a second
   layer, the prompt itself instructs the model to recognize infrastructure
   failures and return the same fallback response, in case an error pattern
   isn't caught by the backend keyword list.

Fallback response shape:
```json
{
  "score": 0,
  "correctness": "fail",
  "time_complexity_estimate": "unknown",
  "space_complexity_estimate": "unknown",
  "strengths": [],
  "weaknesses": [],
  "edge_cases_missed": [],
  "code_feedback": "Evaluation could not be completed due to a sandbox infrastructure failure, not a fault in the candidate's code. This submission should be re-run once the execution environment is available."
}
```
## Multi-Language Sandbox Support

The Docker sandbox supports multiple languages via a central registry in
`judge/languageConfig.js`. Each language entry defines its Docker image,
expected filename, and run command:

```javascript
javascript: { image: "node:20-alpine", filename: "solution.js", runCommand: (f) => `node ${f}` },
python:     { image: "python:3.12-alpine", filename: "solution.py", runCommand: (f) => `python3 ${f}` },
```

Adding a new language means adding one entry here — `dockerRunner.js` and
`judgeService.js` require no changes. `programmingLanguage` from the request
body is normalized via `resolveLanguage()` (e.g. "Python 3", "python", "py"
all map to the same config).

Currently supported: **JavaScript, Python**.

## Concurrency & Rate Limiting

Load testing revealed two separate bottlenecks under concurrent submissions,
handled by two independent queues in `judge/executionQueue.js`:

| Queue | Limit | Purpose |
|---|---|---|
| `sandboxQueue` | 5 concurrent | Caps simultaneous Docker containers, based on empirical host CPU limits (`--cpus=0.5` per container) |
| `aiQueue` | 1 concurrent, 8s min spacing | Prevents exceeding Groq's rate limit (8,000 tokens/minute on the current tier) when multiple AI-005 evaluations would otherwise fire at once |

**Why both are needed:** the Docker queue alone was not sufficient — Groq's
token-per-minute limit is a separate constraint from host CPU, and multiple
AI calls firing simultaneously (even after Docker execution succeeded) can
independently trigger 429 rate-limit errors.

**Result:** 10 concurrent submissions succeed 10/10 with both queues active
(vs. a 40-90% failure rate without them), at the cost of increased total
wait time under load — submissions queue instead of failing.

`runPrompt` in `aiService.js` also parses Groq's rate-limit error message
directly (`"Please try again in Xs"`) and waits that exact duration before
retrying, as a secondary safety net on top of the queue.

**If deploying to different hardware or a higher Groq tier**, these limits
(`sandboxQueue`'s `maxConcurrent`, `aiQueue`'s `maxConcurrent` and
`MIN_GAP_BETWEEN_AI_CALLS_MS`) should be re-tuned via load testing rather
than assumed to transfer as-is.

**Important:** `config/groq.js`'s error handler must preserve the original
Groq error message (not replace it with a generic string) for the rate-limit
parsing in `runPrompt` to work correctly.

## Automated Tests

A Jest test suite exists at `backend/tests/`, covering all 7 AI features
and locking in every consistency rule discovered during manual debugging.

| File | What it covers | Calls real API? |
|---|---|---|
| `tests/aiOutputValidation.test.js` | AI-005 (correctness enum, 0-100 score range, infrastructure-failure fallback) and AI-007 (recommendation enum, score-band consistency) | No — schema validation only |
| `tests/aiOutputValidation2.test.js` | AI-001/003 (the `design` question type), AI-002 (resume traceability via `based_on`), AI-004 (follow-up null/non-null consistency), AI-006 (0-10 score scale, distinct from AI-005's 0-100) | No — schema validation only |
| `tests/smoke.test.js` | Live connectivity check against the real Groq API | Yes |



### Why mocked instead of live

Most tests validate parsed JSON directly against the existing `ajv` schemas
in `schemas/ai/`, rather than calling Groq. This makes the suite fast, free,
and safe to run on every change — the live smoke test exists separately to
confirm the actual API connection still works (e.g., catching a future
model deprecation early), without burning the rate limit on every test run.

### Adding a new test

Follow the existing pattern: import the relevant schema from `schemas/ai/`,
construct a known-good and a known-bad example object, and assert
`validateAIOutput(...)` does or doesn't throw. No live API call needed
unless specifically testing connectivity.
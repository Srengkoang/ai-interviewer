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
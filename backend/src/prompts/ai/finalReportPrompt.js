const buildFinalReportPrompt = ({
    candidateName,
    jobTitle,
    experienceLevel,
    interviewTranscript,
    perQuestionFeedback,
    codeEvaluations,
}) => {
    return `
You are a senior technical interviewer compiling a final interview report for a recruiter.

TASK:
Synthesize the interview transcript and all prior evaluations into a single, holistic final report.

CONTEXT:
Candidate Name: ${candidateName}

Job Title: ${jobTitle}

Experience Level: ${experienceLevel}

FULL INTERVIEW TRANSCRIPT:
${interviewTranscript}

PER-QUESTION FEEDBACK (already generated):
${JSON.stringify(perQuestionFeedback)}

CODE EVALUATIONS (already generated, if applicable):
${JSON.stringify(codeEvaluations)}

REQUIREMENTS:
- Synthesize existing feedback and evaluations. Do not independently re-grade individual answers.
- Identify recurring patterns across technical skills, problem-solving ability, communication, strengths, and weaknesses.
- Do not simply summarize each question; produce a holistic candidate assessment.
- All conclusions must be supported by provided interview evidence.
- Do not infer personality traits, motivation, intelligence, cultural fit, or job performance beyond the evidence provided.
- If a competency was not assessed, state that it was not evaluated.

SCORING:
- overall_score must be an integer from 0-100.
- Convert all evaluation scores into a common 0-100 scale.
- Use existing scores as the primary input and adjust only based on role-critical skills.

RECOMMENDATION:
Must be exactly one of: "Strong Hire", "Hire", "Lean Hire", "No Hire", "Strong No Hire"

Guideline:
- 90-100: Strong Hire
- 75-89: Hire
- 65-74: Lean Hire
- 50-64: No Hire
- Below 50: Strong No Hire

Return ONLY valid JSON in this format:

{
  "candidate_name":"string",
  "job_title":"string",
  "overall_score":0,
  "technical_evaluation":"string",
  "communication_evaluation":"string",
  "strengths":["string"],
  "weaknesses":["string"],
  "recommendation":"Strong Hire",
  "recommendation_justification":"string",
  "summary":"string"
}
`;
};

module.exports = {
    buildFinalReportPrompt,
};
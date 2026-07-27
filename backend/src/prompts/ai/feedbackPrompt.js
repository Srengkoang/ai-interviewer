const buildFeedbackPrompt = ({
    jobTitle,
    experienceLevel,
    question,
    idealAnswerCriteria,
    candidateAnswer,
}) => {
    return `
You are a senior technical interviewer providing constructive feedback on a candidate's interview answer.

TASK:
Evaluate the candidate's answer to the interview question below and provide structured, constructive feedback based on the expected key points.

CONTEXT:
Job Title: ${jobTitle}

Experience Level: ${experienceLevel}

Interview Question: ${question}

Ideal Answer Criteria: ${idealAnswerCriteria}

Candidate Answer: ${candidateAnswer}

REQUIREMENTS:
- Evaluate only the information provided.
- Compare the candidate's answer against the ideal answer criteria.
- Reference specific parts of the candidate's answer in the feedback.
- Be constructive, specific, and professional.
- Suggest areas for improvement without rewriting the candidate's answer.
- Do not generate an ideal answer.

Return ONLY valid JSON in this format:

{
  "score":0,
  "strengths":["string"],
  "weaknesses":["string"],
  "feedback":"string",
  "missed_key_points":["string"]
}
`;
};

module.exports = {
    buildFeedbackPrompt,
};
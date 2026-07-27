const buildFollowUpPrompt = ({
    jobTitle,
    experienceLevel,
    conversationHistory,
    originalQuestion,
    candidateAnswer,
}) => {
    return `
You are a senior technical interviewer conducting a live technical interview.

TASK:
Determine whether the candidate's most recent answer requires a follow-up question. If a follow-up is required, generate exactly one follow-up question that explores the candidate's understanding more deeply.

CONTEXT:
Job Title: ${jobTitle}

Experience Level: ${experienceLevel}

Conversation History:
${conversationHistory}

MOST RECENT EXCHANGE:
Original Question: ${originalQuestion}

Candidate Answer: ${candidateAnswer}

DECISION RULES:
- Generate a follow-up ONLY if the answer is vague, incomplete, technically inaccurate, or only partially addresses the question.
- If the answer is technically accurate and reasonably complete for the stated experience level, do NOT generate a follow-up — even if a deeper or more advanced question could theoretically be asked. Do not follow up purely to probe for extra depth on an already-correct answer.
- The follow-up must directly reference something the candidate said.
- Do not introduce unrelated topics.
- Generate at most ONE follow-up question.
- Do not provide feedback, evaluation, hints, or commentary.

Return ONLY valid JSON in this format:

{
  "follow_up_needed": true,
  "reason": "string",
  "follow_up_question": "string or null"
}
`;
};

module.exports = {
    buildFollowUpPrompt,
};